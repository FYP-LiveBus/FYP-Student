import React, { useState, useEffect, Component }  from 'react'
import MapView, { Marker } from 'react-native-maps'
import { AppRegistry, Text, View, StyleSheet, Dimensions } from 'react-native'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapViewDirections from "react-native-maps-directions";
// // import {PermissionsAndroid} from 'react-native';
// import * as firebase from 'firebase';
// import { firebaseConfig } from "src/firebase";

// firebase.initializeApp(firebaseConfig)

const height = Dimensions.get('window').height
const Map = () => {
  
  const [location, setLocation] = useState({latitude: 0, longitude: 0});
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("PERMSSION NOT GRANTED");
        seterror({ error: "Permission not Granted" });
      }

      Location.watchPositionAsync({timeInterval: 5000}, locs => {
        setLocation({latitude: locs.coords.latitude, longitude: locs.coords.longitude});
        console.log(locs);
        console.warn(locs)
      });
    })();   // async
  }, []);   // useEffect

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  return (

    <MapView
      style={styles.map}
      ref={(ref) => (mapView = ref)} ///
      loadingEnabled={true}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      region={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121
      }}
    >
      <Marker 
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
        // title="Your location"
      />

    </MapView>
    )
}

const styles = StyleSheet.create({
  map: {
    height
  },
  container: {
    flex: 1,
  }
})

export default Map








// https://lucianasato.eti.br/react-native/build-a-react-native-app-using-expo-installation-navigation-tabs-google-maps-part-1