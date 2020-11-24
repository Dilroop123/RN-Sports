import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button } from "react-native-elements";
import ModalSelector from 'react-native-modal-selector'
import * as UserAction from '../../store/actions/UserAction';


function Register({ navigation }) {

  const dispatch = useDispatch();
  const [email, SetEmail] = useState();
  const [password, SetPassword] = useState();
  const [displayName, SetDisplayName] = useState();
  const [textInputValue, setTextinputValue] = useState();
  // const ref_password = useRef();
  // const ref_name = useRef();
  let data = [
    { key: 0, label: 'coach' },
    { key: 1, label: 'athlete' },

  ];

  const addUser = () => {

    dispatch(UserAction.createUser(email, password, displayName, textInputValue));

    // navigation.pop();
  }


  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Register User</Text>
      <Input
        value={email}
        // onSubmitEditing={() => ref_password.current.focus()}
        // returnKeyType={"next"}
        inputContainerStyle={styles.inputstyle}
        containerStyle={styles.textinput}
        onChangeText={(value) => SetEmail(value)}
        label="Email"
      />
      <Input
        // ref={ref_password}
        value={password}
        // onSubmitEditing={() => ref_name.current.focus()}
        // returnKeyType={"next"}
        inputContainerStyle={styles.inputstyle}
        containerStyle={styles.textinput}
        onChangeText={(value) => SetPassword(value)}
        label="Password"
      />
      <Input
        // ref={ref_name}
        value={displayName}
        inputContainerStyle={styles.inputstyle}
        containerStyle={styles.textinput}
        onChangeText={(value) => SetDisplayName(value)}
        label="Name"
      />
      <Text style={{ fontWeight: 'bold', color: 'gray', fontSize: 16 }}> Select UserType</Text>
      <ModalSelector
        data={data}
        initValue="Select User"
        supportedOrientations={['portrait', 'landscape']}
        accessible={true}
        scrollViewAccessibilityLabel={'Scrollable options'}
        cancelButtonAccessibilityLabel={'Cancel Button'}
        onChange={(option) => { setTextinputValue(option.label) }}>

        <TextInput
          style={styles.textinputcustom}
          editable={false}
          placeholder="Select UserType"
          value={textInputValue} />

      </ModalSelector>
      <Button onPress={() => addUser()} title="Submit" type="outline" />
    </View>
  );
}

export default Register;

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
