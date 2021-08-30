import React, { useState, useEffect } from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import {auth} from "../firebase"

const loginScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const signIn =  () =>{
    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert (error));
  }

  return (
    <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{
          uri: "https://image.flaticon.com/icons/png/512/134/134932.png",
        }}
        style={{ width: 200, height: 200 }}
      />
      <Input
        placeholder="Email"
        autoFocus
        type="email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        placeholder="Password"
        secureTextEntry
        type="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        onSubmitEditing={signIn}
      />
      <Button containerStyle={styles.button} title="Login" onPress={signIn}/>
      <Button
        containerStyle={styles.button}
        title="Register"
        type="outline"
        backgroundColor="#008891"
        onPress={() => navigation.navigate("Register")}
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default loginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 5,
  },

  loginContainer: {
    width: 300,
  },

  inputContainer: {
    marginTop: 20,
    width: 100,
  },

  button: {
    marginTop: 10,
    width: 200,
    
  },
});
