
import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { SafeAreaView, StyleSheet, FlatList, ScrollView, Alert, TouchableWithoutFeedback, KeyboardAvoidingView, View, Text, StatusBar, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
//import color from '../../styles/color';
import { Input } from 'react-native-elements';
import * as UserAction from '../../store/actions/UserAction';



function LogIn({ navigation }) {

    const dispatch = useDispatch();
    const UsersData = useSelector(state => state.user.UserData);

    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const ref_password = useRef();

    var isMyObjectEmpty = Object.keys(UsersData).length;

    if (isMyObjectEmpty) {


        if (UsersData.userType == 'athlete') {

            AsyncStorage.setItem('UserId', UsersData._id);
            navigation.navigate('MainNavigationAthlete');
        }
        else {

            AsyncStorage.setItem('UserId', UsersData._id);
            navigation.navigate('MainNavigationCoach');
        }


    }

    const loginAthlete = () => {
        dispatch(UserAction.loginAthlete(userName, password));

    }

    return (

        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <View style={{ height: hp('30%'), backgroundColor: 'white' }}>

                <Image style={styles.takeImage} source={require('../../Images/cartoon.jpg')} />

            </View>
            <View style={styles.mainContainer}>
                <View style={{ marginTop: hp('2%') }}>
                    <View style={{ marginHorizontal: wp('4%') }}>
                        <Text style={styles.loginText}>Sports Application</Text>

                        <View style={{ marginTop: ('25%') }}>
                            <Input value={userName}
                                onSubmitEditing={() => ref_password.current.focus()}
                                returnKeyType={"next"}
                                placeholder='Name'
                                inputStyle={{ color: '#fff' }}
                                inputContainerStyle={styles.inputstyle}
                                // onFocus={() => setEnableShift(false)}
                                containerStyle={styles.textinput}
                                onChangeText={value => setUserName(value)}
                            />

                            <Input value={password}
                                ref={ref_password}
                                inputStyle={{ color: '#fff' }}
                                returnKeyType={"done"}
                                inputContainerStyle={styles.inputstyle}
                                //  onFocus={() => setEnableShift(false)}
                                containerStyle={styles.textinput}
                                onChangeText={value => setPassword(value)}
                                placeholder="Password" />
                        </View>



                        <View style={styles.buttonContainer}>

                            <TouchableWithoutFeedback onPress={() => loginAthlete()}>
                                <View style={{ marginHorizontal: wp('25%'), backgroundColor: 'green', paddingVertical: hp('1.4%'), flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                    <Text style={{ color: 'white' }}>Log In Athlete</Text>

                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.buttonContainer}>

                            <TouchableWithoutFeedback onPress={() => loginAthlete()}>
                                <View style={{ marginHorizontal: wp('25%'), backgroundColor: 'green', paddingVertical: hp('1.4%'), flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                    <Text style={{ color: 'white' }}>Log In Coach</Text>

                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                    </View>

                </View>
            </View>


        </View >

    );
}

export default LogIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    takeImage: {
        width: undefined,
        height: undefined,
        flex: 1

    }, textinput: {
        height: 70,
        color: 'red'
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: hp('2%')
    },
    inputstyle: {
        height: 35,
        borderWidth: 1,
        borderRadius: 24,
        paddingLeft: 20,
        borderColor: 'orange',
        color: 'red'
    },
    loginText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'orange',
        marginTop: ('2%'),
        marginLeft: wp('5%')
    },
    mainContainer: {
        backgroundColor: 'black',
        flex: 1,
        bottom: 24,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30
    }
});