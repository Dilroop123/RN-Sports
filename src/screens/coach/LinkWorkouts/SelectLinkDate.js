import React, { useState, useRef, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    FlatList,
    TouchableWithoutFeedback,
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from "react-redux";
import { AsyncStorage } from 'react-native';
import { Input, Button, Card } from "react-native-elements";
import ModalSelector from "react-native-modal-selector";
import { Feather } from "@expo/vector-icons";
import * as LinkWorkout from '../../../store/actions/LinkWorkout';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import moment from 'moment';
var data = [];
var dateTimeArray = [];
function SelectDate({ navigation, route }) {

    const [coachName, setCoachName] = useState();
    const dispatch = useDispatch();
    const { differenceDayes } = route.params;
    const workoutdata = useSelector((state) => state.workout.WorkoutData);
    const [refreshValue, setRefreshValue] = useState(false);

    const selctedWorkout = (exercise, item, id) => {
        const index = dateTimeArray.indexOf(item);
        dateTimeArray[index].value = exercise
        dateTimeArray[index].workoutId = id;
        console.log(id);
        setRefreshValue(!refreshValue);
    }
    const linkWorkout = () => {
        AsyncStorage.getItem('UserId').then((value) => {

            for (var key in dateTimeArray) {
                if (dateTimeArray[key].value && dateTimeArray[key].workoutId) {
                    dispatch(LinkWorkout.createLinkWorkout(value, dateTimeArray[key].workoutId, dateTimeArray[key].checkdate));
                }

            }

            navigation.pop();
        })
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", async () => {

            AsyncStorage.getItem('SelectedCoachName').then((value) => {
                setCoachName(value);

            })
            dateTimeArray = [];

            if (data.length == 0) {
                for (var key in workoutdata) {
                    data.push({
                        key: workoutdata[key]._id,
                        label: workoutdata[key].Exercise
                    })
                }
            }


            var checkdate = moment().format('YYYY-MM-DD');
            var displaydate = moment().format("MMM Do YYYY");
            dateTimeArray.push({ checkdate, displaydate });


            for (var i = 1; i < differenceDayes; i++) {

                var addedDay = new Date(new Date().getTime() + (i * 24 * 60 * 60 * 1000));
                var newCheckDate = moment(new Date(addedDay)).format('YYYY-MM-DD');

                var newDisplayDate = moment(new Date(addedDay)).format("MMM Do YYYY");
                dateTimeArray.push({ checkdate: newCheckDate, displaydate: newDisplayDate });
            }


        });
    }, [coachName, dateTimeArray]);


    const renderItems = ({ item }) => (
        <View style={{ height: hp('15%'), alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'tomato', marginHorizontal: 10, marginTop: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.displaydate}</Text>
            <ModalSelector
                data={data}
                initValue="Select Workout"
                supportedOrientations={["portrait", "landscape"]}
                accessible={true}
                scrollViewAccessibilityLabel={"Scrollable options"}
                cancelButtonAccessibilityLabel={"Cancel Button"}
                onChange={(option) => selctedWorkout(option.label, item, option.key)}
            >
                <TextInput
                    style={styles.textinputcustom}
                    editable={false}
                    placeholder="Select Workout"
                    value={item.value}
                />
            </ModalSelector>
        </View>
    );
    return (
        <View style={styles.container}>


            <FlatList
                data={dateTimeArray}
                keyExtractor={(item) => item.checkdate}
                renderItem={renderItems}
                // extraData={refreshValue}
                contentContainerStyle={styles.productList}
            />
            <Button onPress={() => linkWorkout()} title="Link Workout" type="outline" />
        </View>
    );
}

export default SelectDate;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    textinputcustom: {
        fontSize: 16,
        padding: 10,
        height: 50,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 1,


    }
});
