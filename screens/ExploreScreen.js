import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-navigation";

import Map from "../components/Map";

const ExploreScreen = ({ route, navigation }) => {
  const { isBookRide, setIsBookRide } = route.params;

  // const isBookRide = props.navigation.getParam("isBookRide");
  // const setIsBookRide = props.navigation.getParam("setIsBookRide");
  // const {isBookRides} = route.params
  // console.log(isBookRide);
  // console.log(routeDetails);
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Map
        isBookRide={isBookRide}
        setIsBookRide={setIsBookRide}
        navigation={navigation}
      />
      {/* <Map user={user} routeDetails={routeDetails} navigation={navigation} /> */}
    </SafeAreaView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
