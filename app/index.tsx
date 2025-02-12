import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../src/screens/LoginScreen";
import DashboardScreen from "../src/screens/DashboardScreen";

const Stack = createStackNavigator();

export default function IndexPage() {
  return (
    <>
      <StatusBar style="light" />
        <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
        </Stack.Navigator>
    </>
  );
}
