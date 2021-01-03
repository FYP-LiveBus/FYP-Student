import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native";
import Swiper from "react-native-swiper";
import { useTheme } from "@react-navigation/native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import * as firebase from "firebase";
import "firebase/firestore";
import firebaseConfig from "../firebase";
import { Picker } from "@react-native-picker/picker";

const HomeScreen = ({ navigation }) => {
  // const {isBookRides} = route.params

  const { colors } = useTheme();

  const [dbRoutes, setDBRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState({});

  const [stops, setStops] = useState([]);
  const [selectedStop, setSelectedStop] = useState("");

  const [user, setUser] = useState({});

  const [bookedRide, setBookedRide] = useState({});
  const [isBookRide, setIsBookRide] = useState(false);
  const theme = useTheme();

  // get user from Async
  useEffect(() => {
    setTimeout(async () => {
      try {
        let userData = await AsyncStorage.getItem("userObject");
        setUser(JSON.parse(userData));
      } catch (e) {
        console.log(e);
      }
    }, 1000);
  }, []);

  // For Push Notification
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    (() => registerForPushNotificationsAsync())();
  }, []);

  // For Active Routes
  useEffect(() => {
    axios
      .get(`https://livebusapi.herokuapp.com/api/admin/routes/status/Active`)
      .then((response) => {
        setDBRoutes(response.data);
      })
      .catch((err) => alert("Network Down. Please try again"));
  }, []);

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("You need to give access in order to recieve notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    const res = await firebase
      .firestore()
      .collection("Tokens")
      .doc(user._id)
      .set({ token });

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  };

  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const bookHandler = () => {
    if (Object.keys(selectedRoute).length == 0 && selectedStop === "") {
      Alert.alert("Invalid details", "Select route and stop");
    } else {
      axios
        .post(`https://livebusapi.herokuapp.com/api/student/trips`, {
          stdUsername: user.username,
          email: user.email,
          routeNo: selectedRoute.routeNo,
          stopName: selectedStop,
          date: formatDate(Date.now()),
        })
        .then((response) => {
          Alert.alert(
            "Alert Title",
            "Are you sure?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: "Yes",
                onPress: () => {
                  setBookedRide(response.data);
                  setIsBookRide(true);
                  navigation.navigate("Explore", {
                    isBookRide: isBookRide,
                    setIsBookRide: setIsBookRide,
                  });
                  setSelectedRoute("");
                  setSelectedStop("");
                },
              },
            ],
            { cancelable: false }
          );
        })
        .catch((err) => {
          Alert.alert("Invalid", "Server link down");
        });
    }
  };

  // console.log(dbRoutes)
  // console.log(stops)
  console.log("Selected Routes here" + JSON.stringify(selectedRoute));
  // console.log("Stops here"+ JSON.stringify(selectedStop))
  // console.log(user)
  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />

      <View style={styles.sliderContainer}>
        <Swiper
          autoplay
          horizontal={false}
          height={200}
          activeDotColor="#FF6347"
        >
          <View style={styles.slide}>
            <Image
              source={require("../assets/banners/banner_1.jpeg")}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require("../assets/banners/banner_2.jpeg")}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require("../assets/banners/banner_3.jpeg")}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
        </Swiper>
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedRoute}
          onValueChange={(itemValue) => {
            setSelectedRoute(itemValue);
            setStops(itemValue.stops);
          }}
        >
          <Picker.Item label="Select Route" value="" />
          {dbRoutes.map((dbRoute) => {
            return (
              <Picker.Item
                key={dbRoute._id}
                label={dbRoute.routeName}
                value={dbRoute}
              />
            );
          })}
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedStop}
          onValueChange={(itemValue) => setSelectedStop(itemValue)}
        >
          <Picker.Item label="Select Stop" value="" />
          {stops.map((stop) => {
            return <Picker.Item key={stop} label={stop} value={stop} />;
          })}
        </Picker>
      </View>

      <View>
        <Button
          // disabled={isBookRide ? !isBookRide : isBookRide}
          style={styles.btnContainer}
          onPress={() => bookHandler()}
        >
          <Text style={styles.textStyle}>Confirm pickup</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderContainer: {
    height: 200,
    width: "90%",
    marginTop: 10,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 8,
  },
  pickerContainer: {
    height: 50,
    backgroundColor: "#F3F3F5",
    width: "90%",
    marginTop: 30,
    // justifyContent: 'center',
    alignSelf: "center",
    borderRadius: 20,
  },
  btnContainer: {
    height: 50,
    backgroundColor: "#8962B0",
    width: "50%",
    marginTop: 30,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 25,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 8,
  },
  sliderImage: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
  },
  textStyle: {
    color: "white",
  },
});
