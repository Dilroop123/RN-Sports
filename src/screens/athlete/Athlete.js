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
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import moment from 'moment';

var dateTimeArray = [];
function Athlete({ navigation }) {
    const [coachName, setCoachName] = useState();



    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", async () => {

            AsyncStorage.getItem('SelectedCoachName').then((value) => {
                setCoachName(value);

            })

            dateTimeArray = [];



            var checkdate = moment().format('YYYY-MM-DD');
            var displaydate = moment().format("MMM Do YYYY");
            dateTimeArray.push({ checkdate, displaydate });


            for (var i = 1; i < 7; i++) {

                var addedDay = new Date(new Date().getTime() + (i * 24 * 60 * 60 * 1000));
                var newCheckDate = moment(new Date(addedDay)).format('YYYY-MM-DD');

                var newDisplayDate = moment(new Date(addedDay)).format("MMM Do YYYY");
                dateTimeArray.push({ checkdate: newCheckDate, displaydate: newDisplayDate });
            }


        });
    }, [coachName, dateTimeArray]);


    const renderItems = ({ item }) => (
        <View style={{ height: hp('7%'), alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'tomato', marginHorizontal: 10, marginTop: 20 }}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('WorkoutDetail', { workoutdate: item.checkdate })}>
                <Text style={{ fontSize: 16 }}>{item.displaydate}</Text>
            </TouchableWithoutFeedback>
        </View>
    );
    return (
        <View style={styles.container}>
            <Card containerStyle={{ padding: 0 }} >
                <View style={{ padding: 20, alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', color: 'tomato', fontSize: 16 }}>{coachName}</Text>
                </View>
            </Card>
            <TouchableWithoutFeedback>
                <Text style={{ textAlign: 'center', marginTop: 10, color: 'blue' }}>View All</Text>
            </TouchableWithoutFeedback>


            <FlatList
                data={dateTimeArray}
                keyExtractor={(item) => item.checkdate}
                renderItem={renderItems}
                // extraData={refreshValue}
                contentContainerStyle={styles.productList}
            />

        </View>
    );
}

export default Athlete;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

});
