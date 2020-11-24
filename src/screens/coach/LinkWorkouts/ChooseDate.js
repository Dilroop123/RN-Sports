import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button } from "react-native-elements";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AsyncStorage } from 'react-native';
import * as WorkoutPlan from '../../../store/actions/WorkoutAction';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { ScrollView } from "react-native-gesture-handler";

function ChooseDate({ navigation }) {



    const [show, setShow] = useState(false);
    const [showEnd, setShowEmd] = useState(false);
    const [date, setDate] = useState(new Date());
    const [dateend, setEnndDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [selctedDate, setSelectedDate] = useState();
    const [EndDate, setEndDate] = useState();


    const showMode = () => {
        setShow(!show);
        setMode('date');
    };

    const showModEnd = () => {
        setShowEmd(!showEnd);
        setMode('date');
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;

        const temp = moment(currentDate).format('YYYY-MM-DD')


        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setSelectedDate(temp);
    };

    const onChangeend = (event, selectedDate) => {

        const currentDate = selectedDate || date;

        const temp = moment(currentDate).format('YYYY-MM-DD')


        setShowEmd(Platform.OS === 'ios');
        setEnndDate(currentDate);
        setEndDate(temp);
    };


    const next = () => {
        // To calculate the time difference of two dates 
        var Difference_In_Time = dateend.getTime() - date.getTime();

        // To calculate the no. of days between two dates 
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        if (Difference_In_Days > 0) {
            navigation.navigate('SelectDate', { differenceDayes: Difference_In_Days });
        } else {
            console.log('Start Date must be greater then End Date');
        }
        console.log(Difference_In_Days);
    }


    return (
        <View style={styles.container}>
            <ScrollView>


                <Text style={styles.textStyle}>Choose Time Period</Text>

                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}

                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}

                {showEnd && (

                    <RNDateTimePicker value={dateend}
                        mode={mode}

                        is24Hour={true}
                        display="default"
                        onChange={onChangeend} />

                )}
                <View style={{ marginHorizontal: wp('4%'), marginVertical: hp('3%') }}>
                    <Text style={{ fontWeight: 'bold', color: 'gray', fontSize: 16 }}>Start Date</Text>
                    <TouchableWithoutFeedback onPress={showMode} >
                        <View style={{ borderWidth: 1, borderColor: '#000', paddingVertical: hp('2%'), paddingLeft: 20 }}>

                            {selctedDate ? <Text style={{ fontSize: 16, color: 'gray' }}>{selctedDate}</Text> :
                                <Text style={{ fontSize: 16, color: 'gray' }}> Select Date</Text>}

                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <View style={{ marginHorizontal: wp('4%'), marginVertical: hp('3%') }}>
                    <Text style={{ fontWeight: 'bold', color: 'gray', fontSize: 16 }}>End Date</Text>
                    <TouchableWithoutFeedback onPress={showModEnd} >
                        <View style={{ borderWidth: 1, borderColor: '#000', paddingVertical: hp('2%'), paddingLeft: 20 }}>

                            {EndDate ? <Text style={{ fontSize: 16, color: 'gray' }}>{EndDate}</Text> :
                                <Text style={{ fontSize: 16, color: 'gray' }}> Select Date</Text>}

                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <Button onPress={() => next()} title="Next" />
            </ScrollView>
        </View>

    );
}

export default ChooseDate;

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
