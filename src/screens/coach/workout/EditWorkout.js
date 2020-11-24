import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button } from "react-native-elements";
import baseUrl from "../../../constants/baseUrl";
//import * as WorkoutPlan from '../../../store/actions/WorkoutAction';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { ScrollView } from "react-native-gesture-handler";

function EditWorkout({ navigation, route }) {


    const { workout } = route.params;


    const dispatch = useDispatch();
    const [exercise, setExercise] = useState(workout.Exercise);
    const [sets, setSets] = useState(workout.Sets);
    const [reps, setReps] = useState(workout.Reps);
    const [tempo, setTempo] = useState(workout.Tempo);
    const [rest, setRest] = useState(workout.Rest);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [selctedDate, setSelectedDate] = useState();

    const editWorkout = async () => {


        const response = await fetch(baseUrl.url + 'AddTrainings/edit', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({

                workoutId: workout._id,
                Exercise: exercise,
                Sets: sets,
                Reps: reps,
                Tempo: tempo,
                Rest: rest,
                userId: workout.userId,
                workoutDate: selctedDate
            }),
        });



        navigation.pop();
    }
    const showMode = () => {
        setShow(true);
        setMode('date');
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;

        const temp = moment(currentDate).format('YYYY-MM-DD')


        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setSelectedDate(temp);
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.textStyle}>Edit Workout</Text>
                <Input
                    value={exercise}
                    // onSubmitEditing={() => ref_password.current.focus()}
                    // returnKeyType={"next"}
                    inputContainerStyle={styles.inputstyle}
                    containerStyle={styles.textinput}
                    onChangeText={(value) => setExercise(value)}
                    label="Exercise"
                />
                <Input
                    // ref={ref_password}
                    value={sets}
                    // onSubmitEditing={() => ref_name.current.focus()}
                    // returnKeyType={"next"}
                    inputContainerStyle={styles.inputstyle}
                    containerStyle={styles.textinput}
                    onChangeText={(value) => setSets(value)}
                    label="Sets"
                />
                <Input
                    // ref={ref_name}
                    value={reps}
                    inputContainerStyle={styles.inputstyle}
                    containerStyle={styles.textinput}
                    onChangeText={(value) => setReps(value)}
                    label="Reps"
                />

                <Input
                    // ref={ref_name}
                    value={tempo}
                    inputContainerStyle={styles.inputstyle}
                    containerStyle={styles.textinput}
                    onChangeText={(value) => setTempo(value)}
                    label="Tempo"
                />

                <Input
                    // ref={ref_name}
                    value={rest}
                    inputContainerStyle={styles.inputstyle}
                    containerStyle={styles.textinput}
                    onChangeText={(value) => setRest(value)}
                    label="Rest"
                />



                <Button onPress={() => editWorkout()} title="Update Workout" type="outline" />
            </ScrollView>
        </View>
    );
}

export default EditWorkout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    textStyle: {
        fontWeight: "bold",
        textAlign: "center",
        color: 'tomato'
    },
    textinput: {
        height: 70,
    },
    inputstyle: {
        height: 35,
    },
});
