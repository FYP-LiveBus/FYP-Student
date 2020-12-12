import React, { useState, useEffect }  from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { StyleSheet, Dimensions } from 'react-native'
import * as Location from 'expo-location';
import { writeUserData} from "../../firebase";

const height = Dimensions.get('window').height;
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

      let location = await Location.getCurrentPositionAsync({});
      setLocation({latitude: location.coords.latitude, longitude: location.coords.longitude});

      // Location.watchPositionAsync(
      // {
      //   // accuracy: Location.Accuracy.BestForNavigation, 
      //   // distanceInterval: 1,
      //   timeInterval: 5000
      // }, (locs) => {
      //   setLocation({latitude: locs.coords.latitude, longitude: locs.coords.longitude});
      //   console.log(locs);
      //   console.warn(locs)
      //   writeUserData(locs)
      // });

    })();   // async
  }, []);   // useEffect

  return (
    <MapView
      style={styles.map}
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
      {/* <Marker 
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
      /> */}

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

export default Map;


// https://lucianasato.eti.br/react-native/build-a-react-native-app-using-expo-installation-navigation-tabs-google-maps-part-1