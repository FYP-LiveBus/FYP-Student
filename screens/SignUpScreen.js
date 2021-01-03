import React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import axios from "axios";

const SignUpScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    username: "",
    password: "",
    confirm_password: "",
    firstname: "",
    lastname: "",
    email: "",
    semester: 0,
    department: "",
    registrationNo: "",
    phone: "",
    check_firstNameInputChange: false,
    check_lastNameInputChange: false,
    check_textInputChange: false,
    check_emailInputChange: false,
    check_semesterInputChange: false,
    check_departmentInputChange: false,
    check_registrationNoInputChange: false,
    check_phoneNumberInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });

  const firstNameInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        firstname: val,
        check_firstNameInputChange: true,
      });
    } else {
      setData({
        ...data,
        firstname: val,
        check_firstNameInputChange: false,
      });
    }
  };

  const lastNameInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        lastname: val,
        check_lastNameInputChange: true,
      });
    } else {
      setData({
        ...data,
        lastname: val,
        check_lastNameInputChange: false,
      });
    }
  };

  const textInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
      });
    }
  };

  const emailInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        email: val,
        check_emailInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_emailInputChange: false,
      });
    }
  };

  const semesterInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        semester: val,
        check_semesterInputChange: true,
      });
    } else {
      setData({
        ...data,
        semester: val,
        check_semesterInputChange: false,
      });
    }
  };

  const departmentInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        department: val,
        check_departmentInputChange: true,
      });
    } else {
      setData({
        ...data,
        department: val,
        check_departmentInputChange: false,
      });
    }
  };

  const registrationNoInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        registrationNo: val,
        check_registrationNoInputChange: true,
      });
    } else {
      setData({
        ...data,
        registrationNo: val,
        check_registrationNoInputChange: false,
      });
    }
  };

  const phoneNumberInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        phone: val,
        check_phoneNumberInputChange: true,
      });
    } else {
      setData({
        ...data,
        phone: val,
        check_phoneNumberInputChange: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirm_password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };

  const signUpHandler = () => {
    if (
      data.check_firstNameInputChange &&
      data.check_lastNameInputChange &&
      data.check_textInputChange &&
      data.check_emailInputChange &&
      data.secureTextEntry &&
      data.check_phoneNumberInputChange &&
      data.check_registrationNoInputChange &&
      data.check_semesterInputChange &&
      data.check_departmentInputChange
    ) {
      axios
        .post("https://livebusapi.herokuapp.com/api/admin/students", {
          firstname: data.firstname,
          lastname: data.lastname,
          username: data.username,
          email: data.email,
          password: data.password,
          phone: data.phone,
          registrationNo: data.registrationNo,
          semester: data.semester,
          department: data.department,
        })
        .then(function (response) {
          var foundUser = response.data;
          Alert.alert(
            "Successfully Signup.",
            "Wait for admin to approve your account."
          );
          (data.firstname = ""),
            (data.lastname = ""),
            (data.username = ""),
            (data.email = ""),
            (data.password = ""),
            (data.phone = ""),
            (data.registrationNo = ""),
            (data.semester = ""),
            (data.department = "");
        })
        .catch(function (error) {
          console.log(error);
          Alert.alert("Invalid User!", "Username or password is incorrect.", [
            { text: "Okay" },
          ]);
        });
    } else {
      Alert.alert("Invalid Details", "Please enter all correct details.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#826EB4" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text style={styles.text_footer}>First Name</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your First Name"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => firstNameInputChange(val)}
            />
            {data.check_firstNameInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          <Text style={[styles.text_footer, { marginTop: 30 }]}>Last Name</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Last Name"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => lastNameInputChange(val)}
            />
            {data.check_lastNameInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          <Text style={[styles.text_footer, { marginTop: 30 }]}>Username</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Username"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          <Text style={[styles.text_footer, { marginTop: 20 }]}>Password</Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Password"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>

          <Text style={[styles.text_footer, { marginTop: 20 }]}>
            Confirm Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Confirm Your Password"
              secureTextEntry={data.confirm_secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>

          <Text style={[styles.text_footer, { marginTop: 30 }]}>Email</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your University Email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => emailInputChange(val)}
            />
            {data.check_emailInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          <Text style={[styles.text_footer, { marginTop: 30 }]}>Semester</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Semester ?"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => semesterInputChange(val)}
            />
            {data.check_semesterInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          <Text style={[styles.text_footer, { marginTop: 30 }]}>
            Department
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Department"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => departmentInputChange(val)}
            />
            {data.check_departmentInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          <Text style={[styles.text_footer, { marginTop: 30 }]}>
            Registration No
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Reg No."
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => registrationNoInputChange(val)}
            />
            {data.check_registrationNoInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          <Text style={[styles.text_footer, { marginTop: 30 }]}>Phone No</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Phone No."
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => phoneNumberInputChange(val)}
            />
            {data.check_phoneNumberInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              By signing up you agree to our
            </Text>
            <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
              {" "}
              Terms of service
            </Text>
            <Text style={styles.color_textPrivate}> and</Text>
            <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
              {" "}
              Privacy policy
            </Text>
          </View>

          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                signUpHandler();
              }}
            >
              <LinearGradient
                colors={["#826EB4", "#826EB4"]}
                style={styles.signIn}
              >
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: "#fff",
                    },
                  ]}
                >
                  Sign Up
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[
                styles.signIn,
                {
                  borderColor: "#826EB4",
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#826EB4",
                  },
                ]}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#826EB4",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === "ios" ? 3 : 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "black",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  color_textPrivate: {
    color: "grey",
  },
});
