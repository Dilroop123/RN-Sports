import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


import Register from '../screens/Login/Register';
import Workout from '../screens/coach/workout/Workout';
import AddWorkout from '../screens/coach/workout/AddWorkout';
import EditWorkout from '../screens/coach/workout/EditWorkout';
import LogIn from '../screens/Login/Login';
import Athlete from '../screens/athlete/Athlete';
import SelectCoach from '../screens/athlete/SelectCoach';
import WorkoutDetail from '../screens/athlete/WorkoutDetail';
import SelectDate from '../screens/coach/LinkWorkouts/SelectLinkDate';

import ChooseDate from '../screens/coach/LinkWorkouts/ChooseDate';
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function MyStack() {
  return (
    <Stack.Navigator>


      <Stack.Screen name="Workout" component={Workout} />
      <Stack.Screen name="AddWorkout" component={AddWorkout} />
      <Stack.Screen name="EditWorkout" component={EditWorkout} />



    </Stack.Navigator>
  );
}
function AthleteMyStack() {
  return (
    <Stack.Navigator>


      <Stack.Screen name="Athlete" component={Athlete} />
      <Stack.Screen name="WorkoutDetail" component={WorkoutDetail} />

    </Stack.Navigator>
  );
}

function LinkStack() {
  return (
    <Stack.Navigator>


      <Stack.Screen name="ChooseDate" component={ChooseDate} />
      <Stack.Screen name="SelectDate" component={SelectDate} />


    </Stack.Navigator>
  );
}

function MainNavigationCoach({ navigation }) {
  return (

    <Tab.Navigator
      activeColor='red'
      style={{ backgroundColor: 'tomato' }}
      barStyle={{ backgroundColor: '#fff' }}
    >

      <Tab.Screen name="Profile" component={MyStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-home" size={26} color={color} />
          ),
        }} />
      <Tab.Screen name="Workout" component={Register}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-home" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen name="Link" component={LinkStack}
        options={{
          tabBarLabel: 'Link',
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-home" size={26} color={color} />
          ),
        }}
      />

    </Tab.Navigator>


  );
}


function MainNavigationAthlete({ navigation }) {
  return (

    <Tab.Navigator
      activeColor='red'
      style={{ backgroundColor: 'tomato' }}
      barStyle={{ backgroundColor: '#fff' }}
    >

      <Tab.Screen name="Home" component={AthleteMyStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-home" size={26} color={color} />
          ),
        }} />
      <Tab.Screen name="Coach" component={SelectCoach}
        options={{
          tabBarLabel: 'Coach',
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-home" size={26} color={color} />
          ),
        }}
      />

    </Tab.Navigator>


  );
}

export default function LoginStack() {
  return (
    <Stack.Navigator
      screenOptions={{

        headerShown: false,
        headerTitleAlign: 'center'
      }}>


      <Stack.Screen name="LogIn" component={LogIn} />

      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="MainNavigationCoach" component={MainNavigationCoach} options={({ route }) => ({ title: 'Taxi App' })} />
      <Stack.Screen name="MainNavigationAthlete" component={MainNavigationAthlete} options={({ route }) => ({ title: 'Home' })} />
    </Stack.Navigator>
  );
}