import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoginStack from "./src/navigation/Navigation";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import UserReducer from './src/store/reducers/UserReducer';
import WorkoutReducer from './src/store/reducers/WorkoutReducer';


const rootReducer = combineReducers({
  user: UserReducer,
  workout: WorkoutReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <LoginStack />
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
