import React, { useState, useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  Platform,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import { Button } from "react-native-paper";
import FeedbackScreen from "../screens/FeedbackScreen";
import axios from "axios";
import * as firebase from "firebase";
import "firebase/firestore";
import firebaseConfig from "../firebase";

// import { TouchableOpacity } from 'react-native-gesture-handler';

const Map = ({
  isBookRide,
  setIsBookRide,
  user,
  selectedRoute,
  selectedStop,
  navigation,
}) => {
  const [location, setLocation] = useState({});

  const [driverLocation, setDriverLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [seats, setSeats] = useState(0);

  // users location
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("PERMSSION NOT GRANTED");
        seterror({ error: "Permission not Granted" });
      }
      // let location = await Location.getCurrentPositionAsync({});
      // setLocation({latitude: location.coords.latitude, longitude: location.coords.longitude});

      Location.watchPositionAsync(
        {
          // accuracy: Location.Accuracy.BestForNavigation,
          distanceInterval: 1,
          // timeInterval: 5000
        },
        (locs) => {
          setLocation(locs);
          // console.log(locs);
          // console.warn(locs);
          // currentWriteUserData(locs)
        }
      );
    })(); // async
  }, []); // useEffect

  // // drivers location
  useEffect(() => {
    if (!isBookRide) {
    } else {
      setTimeout(async () => {
        try {
          if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
          } else {
            firebase.app(); // if already initialized, use that one
          }
          firebase
            .database()
            .ref(`Drivers/` + selectedRoute.driverID)
            .on("value", (snapshot) => {
              // console.log(snapshot.val())
              const latitude = snapshot.val().CurrentPosition.location.coords
                .latitude;
              const longitude = snapshot.val().CurrentPosition.location.coords
                .longitude;
              setDriverLocation({ latitude: latitude, longitude: longitude });
              console.log("Location: " + latitude + ", " + longitude);
            });
        } catch (e) {
          console.log(e);
          alert(e + " Check Map Alert");
        }
      }, 3000);
    }
  });

  const _stopGetLocationAsync = async () => {
    const location = await Location.watchPositionAsync();
    return location.remove();
  };

  const _checkOut = () => {
    axios
      .post(`https://livebusapi.herokuapp.com/api/student/trips`, {
        stdUsername: user.username,
        email: user.email,
        routeNo: selectedRoute.routeNo,
        stopName: selectedStop,
        driver: selectedRoute.driver,
        date: formatDate(Date.now()),
      })
      .then((response) => {
        console.log(response.data);
        _stopGetLocationAsync();
        setIsBookRide(false);
      })
      .catch((e) => {
        alert(e);
      });
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

  const tripCompletedHandler = () => {
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
            try {
              isBookRide = true;
              if (isBookRide) {
                navigation.navigate("FeedbackScreen");
                // checkSeats();
                updateSeats();
                _checkOut();
              } else {
                Alert.alert("Can't End Ride", "Start your ride first...");
                console.warn(isBookRide);
              }
            } catch (e) {
              Alert.alert("IN CATCH", "CHECK CATCH");
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const updateSeats = async () => {
    const no = await firebase
      .firestore()
      .collection("Bus")
      .doc(selectedRoute.busNo)
      .get();
    // setSeats(no.data().seats);
    let updatedseats = no.data().seats + 1;

    const no1 = await firebase
      .firestore()
      .collection("Bus")
      .doc(selectedRoute.busNo)
      .update({ seats: +updatedseats });
  };

  // const updateSeats = async (n) => {
  //   const s = n + 1;
  //   const no = await firebase
  //     .firestore()
  //     .collection("Bus")
  //     .doc(selectedRoute.busNo)
  //     .update({ seats: +s });
  // };

  return (
    <View>
      <MapView
        style={styles.map}
        loadingEnabled={true}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        region={{
          latitude: location.coords != undefined ? location.coords.latitude : 0,
          longitude:
            location.coords != undefined ? location.coords.longitude : 0,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker
          coordinate={{
            latitude: driverLocation.latitude,
            longitude: driverLocation.longitude,
          }}
        />
      </MapView>

      <View style={styles.btnContainer}>
        <Button
          color={Platform.OS === "android" ? "red" : "red"}
          mode="contained"
          style={styles.btn}
          onPress={() => tripCompletedHandler()}
        >
          <Text>End Ride</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    height: "90%",
    width: "96%",
    alignContent: "center",
    alignSelf: "center",
    // zIndex: 10,
    marginTop: -20,
  },
  container: {
    flex: 1,
  },
  btn: {
    height: 45,
    width: "85%",
    alignSelf: "center",
    marginTop: "2%",
  },
  btnContainer: {
    margin: "4%",
  },
});

export default Map;

// https://lucianasato.eti.br/react-native/build-a-react-native-app-using-expo-installation-navigation-tabs-google-maps-part-1
