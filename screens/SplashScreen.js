import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  Platform,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "@react-navigation/native";

const SplashScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#694fad" barStyle="light-content" />
      <View style={styles.header}>
        <Ionicons
          name={Platform.OS === "android" ? "md-bus" : "ios-bus"}
          size={200}
          color="white"
        ></Ionicons>
        {/* <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
            // source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="stretch"
            /> */}
      </View>
      <Animatable.View
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
            // backgroundColor: '#ffffff',
            // padding: '0px 5px'
          },
        ]}
        animation="fadeInUpBig"
      >
        <Text style={[styles.title, { color: colors.text }]}>
          LIVEBUS -{" "}
          <Text style={[styles.subtitle, { color: colors.text }]}>
            STAY UPDATED!
          </Text>
        </Text>

        {/* <Text style={[styles.subtitle, { color: colors.text}]}>STAY UPDATED!</Text> */}
        <Text style={styles.text}>Sign in with account</Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
            <LinearGradient
              colors={["#694fad", "#826EB4"]}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>Get Started</Text>
              <MaterialIcons name="navigate-next" color="#fff" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#694fad",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
    // borderRadius: 100
    // height: 100
  },
  title: {
    color: "#05375a",
    fontSize: 25,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#05375a",
    fontSize: 24,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    marginTop: 5,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
});
