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
import { Input, Button } from "react-native-elements";
import ModalSelector from "react-native-modal-selector";
import { AsyncStorage } from 'react-native';
import { Feather } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as WorkoutplanAction from "../../../store/actions/WorkoutAction";
import baseUrl from "../../../constants/baseUrl";
function Workout({ navigation }) {
  const dispatch = useDispatch();
  const workoutdata = useSelector((state) => state.workout.WorkoutData);

  const [refreshValue, setRefreshValue] = useState(false);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {

      AsyncStorage.getItem('UserId').then((value) => {
        dispatch(
          WorkoutplanAction.getWorkoutsByCoach(value)
        );
      })


    });
  }, [dispatch, workoutdata]);

  const deleteWorkout = async (workoutId, item) => {
    // WorkoutplanAction.deleteWorkout(userid);


    const index = workoutdata.indexOf(item);
    if (index > -1) {
      workoutdata.splice(index, 1);
    }

    setRefreshValue(!refreshValue);


    const response = await fetch(baseUrl.url + 'AddTrainings/delete', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({

        workoutId
      }),
    });

  }

  const renderItems = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        borderWidth: 1.5,
        borderColor: 'tomato',
        borderRadius: 24,
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: hp("1%"),
        paddingVertical: hp("3%"),
        marginHorizontal: wp('4%')
      }}
    >
      <View style={{ flexDirection: "row", marginLeft: 15 }}>

        <View style={{ flexDirection: "column", marginLeft: 20 }}>
          <View style={{ flexDirection: 'row', fontWeight: "bold" }}>
            <Text style={{ color: 'tomato', fontWeight: 'bold', width: wp('20%') }}>Exercise :</Text>
            <Text style={{ marginLeft: 20 }}>{item.Exercise}</Text>
          </View>
          <View style={{ flexDirection: 'row', fontWeight: "bold" }}>
            <Text style={{ color: 'tomato', fontWeight: 'bold', width: wp('20%') }}>Sets :</Text>
            <Text style={{ marginLeft: 20 }}>{item.Sets}</Text>
          </View>
          <View style={{ flexDirection: 'row', fontWeight: "bold" }}>
            <Text style={{ color: 'tomato', fontWeight: 'bold', width: wp('20%') }}>Reps :</Text>
            <Text style={{ marginLeft: 20 }}>{item.Reps}</Text>
          </View>
          <View style={{ flexDirection: 'row', fontWeight: "bold" }}>
            <Text style={{ color: 'tomato', fontWeight: 'bold', width: wp('20%') }}>Tempo :</Text>
            <Text style={{ marginLeft: 20 }}>{item.Tempo}</Text>
          </View>
          <View style={{ flexDirection: 'row', fontWeight: "bold" }}>
            <Text style={{ color: 'tomato', fontWeight: 'bold', width: wp('20%') }}>Rest :</Text>
            <Text style={{ marginLeft: 20 }}>{item.Rest}</Text>
          </View>
          <View style={{ flexDirection: 'row', fontWeight: "bold" }}>
            <Text style={{ color: 'tomato', fontWeight: 'bold', width: wp('20%') }}>Date :</Text>
            <Text style={{ marginLeft: 20 }}>{item.workoutDate}</Text>
          </View>

        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('EditWorkout', { workout: item })}>
          <MaterialIcons
            style={{ marginRight: 35 }}
            name="edit"
            size={24}
            color="green"
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => deleteWorkout(item._id, item)}>
          <MaterialIcons
            style={{ marginRight: 15 }}
            name="delete"
            size={24}
            color="red"
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={workoutdata}
        keyExtractor={(item) => item._id}
        renderItem={renderItems}
        extraData={refreshValue}
        contentContainerStyle={styles.productList}
      />

      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("AddWorkout")}
      >
        <View style={styles.floatingButton}>
          <Feather name="plus" size={26} color="white" />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

export default Workout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  floatingButton: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    position: "absolute",
    bottom: 70,
    zIndex: 1,
    right: 10,
    height: 60,
    backgroundColor: "tomato",
    borderRadius: 100,
  },
});
