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
import { Ionicons } from "@expo/vector-icons";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import * as UserAction from '../../store/actions/UserAction';
let renderFilterListKey = [];
function SelectCoach({ navigation }) {
    const dispatch = useDispatch();
    const [refreshValue, setRefreshValue] = useState(false);
    const coachData = useSelector(state => state.user.CoachData);

    var coachId;

    if (coachData.length > 0 && renderFilterListKey == 0) {

        AsyncStorage.getItem('SelectedCoachId').then((value) => {
            coachId = value;

            for (var index in coachData) {

                renderFilterListKey.push({
                    displayname: coachData[index].displayname,
                    email: coachData[index].email,
                    id: coachData[index]._id,
                    primary: coachId == coachData[index]._id ? true : false
                })

            }
        })

    }

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", async () => {


            await dispatch(UserAction.getCoaches());
        });
    }, [dispatch]);



    const selctedAddress = (item) => {
        const index = renderFilterListKey.indexOf(item);
        const activeIndex = renderFilterListKey.findIndex((e) => e.primary === true);

        if (activeIndex == -1) {
            item.primary = true;
            setRefreshValue(!refreshValue);

            AsyncStorage.setItem('SelectedCoachId', item.id);
            AsyncStorage.setItem('SelectedCoachName', item.displayname);
        }
        else if (activeIndex !== index && activeIndex > -1) {
            renderFilterListKey[activeIndex].primary = false;
            item.primary = true;
            setRefreshValue(!refreshValue);
            AsyncStorage.setItem('SelectedCoachId', item.id);
            AsyncStorage.setItem('SelectedCoachName', item.displayname);
        }



    }


    const renderItems = ({ item }) => (
        <Card containerStyle={{ padding: 0 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: hp('1%'), paddingVertical: hp('3%') }}>
                <View style={{ flexDirection: 'row', marginLeft: 15, alignItems: 'center' }}>
                    <View>
                        <TouchableWithoutFeedback onPress={() => selctedAddress(item)}>
                            {item.primary ? <Ionicons name="ios-radio-button-on" size={24} color='tomato' /> :
                                <Ionicons name="ios-radio-button-off" size={24} color="tomato" />}

                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                        <Text style={{ fontWeight: 'bold' }}>{item.displayname}</Text>
                        <Text style={{}}>{item.email}</Text>

                    </View>
                </View>

            </View>
        </Card>
    );

    return (
        <View style={styles.container}>
            <View>
                <Text style={{ textAlign: 'center', marginTop: 15, color: 'tomato', fontSize: 18 }}>Registered Coaches</Text>
                <FlatList
                    data={renderFilterListKey}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItems}
                    extraData={refreshValue}
                    contentContainerStyle={styles.productList}
                />
            </View>
        </View>
    );
}

export default SelectCoach;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

});
