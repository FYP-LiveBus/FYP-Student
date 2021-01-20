import React, { useEffect } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";

import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ProfileScreen = () => {
  const [data, setData] = React.useState({
    firstname: "",
    lastname: "",
    username: "",
    phonenumber: "",
    email: "",
  });

  useEffect(() => {
    setTimeout(async () => {
      try {
        let userData = await AsyncStorage.getItem("userObject");
        setData(JSON.parse(userData));
      } catch (e) {
        console.log(e);
      }
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: -20 }}>
          <Avatar.Image
            source={require("../assets/banners/stdLogo.png")}
            size={80}
          />
          <View style={{ marginLeft: 20 }}>
            <Title style={[styles.title, { marginTop: 15, marginBottom: 5 }]}>
              {data.firstname + " " + data.lastname}
            </Title>
            <Caption style={styles.caption}>{"@ " + data.username}</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        {/* <View style={{ marginTop: -15, marginLeft: 0 }}>
          <View style={styles.row}>
            <Icon name="map-marker-radius" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>
              {data.city + ", Pakistan"}
            </Text>
          </View>
        </View> */}

        <View style={{ flexDirection: "row", marginTop: 20 }}>
          {/* <Icon name="ios-person-outline" color="#777777" size={20} /> */}
          <Text style={[styles.title, { marginLeft: 10 }]}>First name</Text>
        </View>
        <Caption style={[styles.caption, { marginLeft: 10 }]}>
          {data.firstname}
        </Caption>

        <View>
          <Title style={[styles.title, { marginLeft: 10, marginTop: 20 }]}>
            Last Name
          </Title>
          <Caption style={[styles.caption, { marginLeft: 10 }]}>
            {data.lastname}
          </Caption>
        </View>

        <View>
          <Title style={[styles.title, { marginLeft: 10, marginTop: 20 }]}>
            Username
          </Title>
          <Caption style={[styles.caption, { marginLeft: 10 }]}>
            {data.username}
          </Caption>
        </View>

        <View>
          {/* <Icon name="phone" color="#777777" size={20} /> */}
          <Title
            style={[
              styles.title,
              {
                marginLeft: 10,
                marginTop: 20,
              },
            ]}
          >
            Phone Number
          </Title>
          <Caption
            style={[
              styles.caption,
              {
                marginLeft: 10,
              },
            ]}
          >
            {data.phonenumber}
          </Caption>
        </View>

        {/* <View>
          <Icon name="email" color="#777777" size={20} />
          <Title
            style={[
              styles.title,
              {
                marginLeft: 10,
                marginTop: 20,
              },
            ]}
          >
            Email
          </Title>
          <Text style={{ color: "#777777", marginLeft: 20 }}>{data.email}</Text>
        </View> */}

        <View>
          {/* <Icon name="email" color="#777777" size={20} /> */}
          <Title
            style={[
              styles.title,
              {
                marginLeft: 10,
                marginTop: 20,
              },
            ]}
          >
            Email
          </Title>
          <Caption
            style={[
              styles.caption,
              {
                marginLeft: 10,
              },
            ]}
          >
            {data.email}
          </Caption>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  userInfoSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  title: {
    fontSize: 21,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
