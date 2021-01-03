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
// import firebaseConfig  from "../firebase";
import firebase from "firebase";
import firebaseConfig from "../firebase";
import { Button } from "react-native-paper";
import FeedbackScreen from "../screens/FeedbackScreen";

// import { TouchableOpacity } from 'react-native-gesture-handler';

const height = Dimensions.get("window").height;

const Map = ({ isBookRide, setIsBookRide, navigation }) => {
  const [location, setLocation] = useState({});
  const [driverLocation, setDriverLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [errorMsg, setErrorMsg] = useState(null);

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
          console.log(locs);
          console.warn(locs);
          // currentWriteUserData(locs)
        }
      );
    })(); // async
  }, []); // useEffect

  // // drivers location
  useEffect(() => {
    if (isBookRide) {
    } else {
      setTimeout(async () => {
        try {
          if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
          } else {
            firebase.app(); // if already initialized, use that one
          }
          var loc = firebase
            .database()
            .ref(`Drivers/5fe8741247ca640017e36244`)
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
          alert(e + " Check Map Alert");
        }
      }, 3000);
    }
  });

  _stopGetLocationAsync = async () => {
    const location = await Location.watchPositionAsync();
    return location.remove();
  };

  const _checkOut = async () => {
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
              _stopGetLocationAsync();
              setIsBookRide(false);
              navigation.navigate("FeedbackScreen");
            } catch (e) {
              Alert.alert("IN CATCH", "CHECK CATCH");
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

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
          onPress={() => _checkOut()}
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
