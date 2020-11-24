import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button } from "react-native-elements";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AsyncStorage } from 'react-native';
import * as WorkoutPlan from '../../../store/actions/WorkoutAction';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { ScrollView } from "react-native-gesture-handler";

function AddWorkout({ navigation }) {

  const dispatch = useDispatch();
  const [exercise, setExercise] = useState();
  const [sets, setSets] = useState();
  const [reps, setReps] = useState();
  const [tempo, setTempo] = useState();
  const [rest, setRest] = useState();
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [selctedDate, setSelectedDate] = useState();

  const addPlan = () => {
    AsyncStorage.getItem('UserId').then((value) => {
      dispatch(WorkoutPlan.createWorkout(exercise, sets, reps, tempo, rest, value, selctedDate));
      navigation.pop();
    })

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


        <Text style={styles.textStyle}>Add Workout</Text>
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


        <Button onPress={() => addPlan()} title="Add" type="outline" />
      </ScrollView>
    </View>

  );
}

export default AddWorkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
