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
import { Feather } from "@expo/vector-icons";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import * as WorkoutPlan from '../../store/actions/WorkoutAction';

function WorkoutDetail({ navigation, route }) {

    const dispatch = useDispatch();
    const { workoutdate } = route.params;
    const workoutdata = useSelector((state) => state.workout.WorkoutDataDetail);
    console.log(workoutdata[0]);
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", async () => {

            AsyncStorage.getItem('SelectedCoachId').then((value) => {
                dispatch(WorkoutPlan.workoutDetail(value, workoutdate));

            })

        })


    });
    return (
        <View style={styles.container}>
            <Card containerStyle={{ padding: 10, marginTop: 100 }} >
                <View style={{ flexDirection: "row", marginLeft: 15 }}>
                    {workoutdata.length > 0 && (


                        <View style={{ flexDirection: "column", marginLeft: 20 }}>
                            <View style={{ flexDirection: 'row', fontWeight: "bold" }}>
                                <Text style={{ color: 'tomato', fontWeight: 'bold', width: wp('20%') }}>Exercise :</Text>
                                <Text style={{ marginLeft: 20 }}>{workoutdata[0].WorkoutId.Exercise}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', fontWeight: "bold", marginTop: 20 }}>
                                <Text style={{ color: 'tomato', fontWeight: 'bold', width: wp('20%') }}>Sets :</Text>
                                <Text style={{ marginLeft: 20 }}>{workoutdata[0].WorkoutId.Sets}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', fontWeight: "bold", marginTop: 20 }}>
                                <Text style={{ color: 'tomato', fontWeight: 'bold', width: wp('20%') }}>Reps :</Text>
                                <Text style={{ marginLeft: 20 }}>{workoutdata[0].WorkoutId.Reps}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', fontWeight: "bold", marginTop: 20 }}>
                                <Text style={{ color: 'tomato', fontWeight: 'bold', width: wp('20%') }}>Tempo :</Text>
                                <Text style={{ marginLeft: 20 }}>{workoutdata[0].WorkoutId.Tempo}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', fontWeight: "bold", marginTop: 20 }}>
                                <Text style={{ color: 'tomato', fontWeight: 'bold', width: wp('20%') }}>Rest :</Text>
                                <Text style={{ marginLeft: 20 }}>{workoutdata[0].WorkoutId.Rest}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', fontWeight: "bold", marginTop: 20 }}>
                                <Text style={{ color: 'tomato', fontWeight: 'bold', width: wp('20%') }}>Date :</Text>
                                <Text style={{ marginLeft: 20 }}>{workoutdata[0].Date}</Text>
                            </View>

                        </View>
                    )}

                </View>
            </Card>

        </View>
    );
}

export default WorkoutDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

});
