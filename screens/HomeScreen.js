import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../firebase";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import ChatData from "../components/ChatData";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("login");
    });
  };
  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return unsubscribe;
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Connections",
      headerStyle: { backgroundColor: "#008891" },
      headerTitleStyle: { color: "white" },
      headerTitleColor: "white",
      headerLeft: () => {
        return (
          <View style={{ marginLeft: 20 }}>
            <TouchableOpacity onPress={signOutUser}>
              <Avatar
                rounded
                source={{
                  uri: auth?.currentUser?.photoURL,
                }}
              />
            </TouchableOpacity>
          </View>
        );
      },
      headerRight: () => {
        return (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: 80,
              marginRight: 20,
            }}
          >
            <TouchableOpacity activeOpacity={0.5}>
              <AntDesign name="camerao" color="white" size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate("addChat")}
            >
              <SimpleLineIcons name="pencil" color="white" size={20} />
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, [navigation]);

  const enterChat = (id, chatName) => {
    navigation.navigate("ChatScreen", {
      id: id,
      chatName: chatName,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView style={styles.chats}>
        {chats.map(({ id, data: { chatName } }) => (
          <ChatData
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
