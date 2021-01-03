import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Title, Caption, TextInput, Button } from "react-native-paper";
import axios from "axios";

const FeedbackScreen = ({ navigation }) => {
  const [message, setMessage] = React.useState("");

  const [rating, setRating] = React.useState("");

  const submitFeedback = () => {
    if (message === "" && rating === "") {
      Alert.alert("Enter details first");
    } else {
      axios
        .post(`https://livebusapi.herokuapp.com/api/student/feedbacks`, {
          message: message,
          rating: rating,
        })
        .then((response) => {
          console.log(response.data);
          navigation.navigate("Home");
          Alert.alert("Your Feedback has been submitted!");
          setMessage("");
          setRating("");
        })
        .catch((err) => alert(err));
    }
  };

  const alertMsg = () => {
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
          text: "OK",
          onPress: () => {
            submitFeedback();
            // navigation.navigate("Home");
          },
        },
      ],
      { cancelable: false }
    );
  };
  console.log(message);
  console.log(rating);
  return (
    <View style={styles.container}>
      <View>
        <Title
          style={{ alignSelf: "flex-start", marginLeft: 10, fontSize: 30 }}
        >
          Feedback
        </Title>

        <Caption
          style={{
            alignSelf: "flex-start",
            marginLeft: 10,
            fontSize: 14,
            marginTop: -5,
          }}
        >
          Your review will be helpful for us
        </Caption>
      </View>

      <View
        style={{
          width: "95%",
          marginLeft: 10,
          fontSize: 14,
          marginTop: 10,
          marginBottom: 20,
        }}
      >
        <TextInput
          label="Your message here"
          value={message}
          flat
          multiline={true}
          onChangeText={(text) => setMessage(text)}
          style={{ height: 130 }}
          required
        />

        <TextInput
          label="Rating out of 5"
          keyboardType="number-pad"
          value={rating}
          flat
          multiline={true}
          onChangeText={(text) => setRating(text)}
          style={{ height: 70, marginTop: 5 }}
          required
        />
      </View>

      <Button
        onPress={() => {
          // alert("Your Feedback has been submitted");
          alertMsg();
        }}
        mode="outlined"
        style={{
          borderColor: "#25208C",
          alignSelf: "flex-end",
          width: "40%",
          marginRight: 10,
        }}
      >
        Submit
      </Button>
    </View>
  );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
