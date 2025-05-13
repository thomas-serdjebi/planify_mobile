import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../src/screens/LoginScreen";
import DashboardScreen from "../src/screens/DashboardScreen";
import ItineraireScreen from "../src/screens/ItineraireScreen";

const Stack = createNativeStackNavigator();

export default function IndexPage() {
  return (
    <>
      <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Itineraire" component={ItineraireScreen} />
      </Stack.Navigator>
    </>
  );
}
