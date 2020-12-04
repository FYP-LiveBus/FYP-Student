import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import { StyleSheet, Dimensions, View } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { ActivityIndicator, Text, Button } from "react-native";
import Geocoder from "react-native-geocoding";
// import { add } from "react-native-reanimated";

const height = Dimensions.get("window").height;

const initialLocation = {
  latitude: 31.441627,
  longitude: 74.276141,
  latitudeDelta: 0.015,
  longitudeDelta: 0.0121,
};

const Map = () => {
  const [loc, setloc] = useState(initialLocation);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState({ error: "" });
  const [address, setaddress] = useState("");
  const [showAddress, setshowAddress] = useState(false);
  Geocoder.init("AIzaSyAI7fdb3cSLp4-TbhZsonR3Gflc8TSUXs4");
  const _getlocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      console.log("PERMSSION NOT GRANTED");
      seterror({ error: "Permission not Granted" });
    }
    const location = await Location.getCurrentPositionAsync();

    setloc({
      ...location,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    console.log(loc)
  }
 const getAdd = ()=>{
  Geocoder.from({ latitude: loc.latitude, longitude: loc.longitude })
  .then((json) => {
    var addressComponent = json.results[0];
    setaddress(addressComponent.formatted_address);
    console.log(addressComponent.formatted_address);
  })
  .catch((error) => console.warn(error));
};


  const getAddressHandler = async () => {
    setloading(true);
    const getCord = await _getlocation();
    const getadd = getAdd()
    setloading(false);
    setshowAddress(true);
  };
  const genAddress = async () => {
    setloading(true);
    const getadd = getAdd()
    setloading(false);
    setshowAddress(true);
  };
  // useEffect(() => {
  //   _getlocation();
  // }, []);

  return (
    <View>
      <MapView
        style={styles.map}
        loadingEnabled={true}
        provider={MapView.PROVIDER_GOOGLE}
        region={loc}
        showsUserLocation={true}
        maxZoomLevel={19}
      ></MapView>

      <Button title="Locate Me!" onPress={getAddressHandler}></Button>

      {loading === true ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#e67e22" />
        </View>
      ) : (
        <View>
          {showAddress == true ? (
            <View>
              <Text>Your Position is:</Text>
              <Text>Longitude is {loc.longitude}</Text>
              <Text>Longitude is  {loc.latitude}</Text>
              {/* <Text>Your address: {address}</Text> */}
            </View>
          ) : (
            <View>
              <Text>Address Not Set</Text>
            </View>
          )}
        </View>
      )}
      <Button title="Set My address" onPress={genAddress}></Button>
      <Text>Your address: {address}</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default Map;
