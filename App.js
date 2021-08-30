import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import loginScreen from "./screens/loginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import AddChatScreen from "./screens/AddChatScreen";
import ChatScreen from "./screens/ChatScreen";

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#008891" },
  headerTitleStyle: { color: "white" },
  headerTintCOlor: "white",
};

export default function App() {
  console.log("App is excuted");
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="Home"
        screenOptions={globalScreenOptions}
      >
        <Stack.Screen name="login" component={loginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="addChat" component={AddChatScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
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
