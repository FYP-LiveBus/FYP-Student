import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Title, Button } from "react-native-paper";
import axios from "axios";

const BookRideScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const [dbRoutes, setDBRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState({});

  const [stops, setStops] = useState([]);
  const [selectedStop, setSelectedStop] = useState({});

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  // For Active Routes
  useEffect(() => {
    axios
      .get(`https://livebusapi.herokuapp.com/api/admin/routes/status/Active`)
      .then((response) => {
        setDBRoutes(response.data);
      })
      .catch((err) => alert("Network Down. Please try again"));
  }, []);

  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  console.log(formatDate(date));
  console.log(formatDate(Date.now()));
  return (
    <View style={styles.container}>
      <Title style={{ alignSelf: "center", fontSize: 30, marginBottom: 20 }}>
        Book Your Ride
      </Title>

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
        {/* <Button onPress={showDatepicker} title="Select Date!" /> */}

        <TouchableOpacity
          style={styles.dateTimeContainer}
          onPress={showDatepicker}
          minimumDate={new Date(Date.now())}
          selectedValue={date}
        >
          <Text style={styles.textStyle}>Select Date</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity 
          style={styles.dateTimeContainer}
          onPress={showTimepicker}
        >  
          <Text style={styles.textStyle}>Select Time</Text>
        </TouchableOpacity> */}

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            min
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>

      <Button
        color={Platform.OS === "android" ? "red" : "red"}
        mode="contained"
        style={styles.buttonContainer}
        onPress={() => {
          if (formatDate(Date.now()) < formatDate(date)) {
            alert("Suucessfully Booked");
          } else {
            alert("Enter correct details");
          }
        }}
      >
        <Text style={styles.btnTextStyle}>Book My Ride</Text>
      </Button>

      {/* <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          if (formatDate(Date.now()) < formatDate(date)) {
            alert("Suucessfully Booked");
          } else {
            alert("Enter correct details");
          }
        }}
      >
        <Text style={styles.btnTextStyle}>Book my ride</Text>
      </TouchableOpacity> */}

      {/* <View>
        <View >
          <Button onPress={showDatepicker} title="Select Date!" />
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={showTimepicker} title="Select Time!" />
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
    </View> */}

      {/* <Text>Book Ride Screen</Text>
      <Button
        title="Click Here"
        onPress={() => navigation.navigate("Home")}
      /> */}
    </View>
  );
};

export default BookRideScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 80,
    // alignItems: 'center',
    justifyContent: "center",
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
  dateTimeContainer: {
    height: 50,
    backgroundColor: "#F3F3F5",
    width: "90%",
    marginTop: 30,
    // justifyContent: 'center',
    alignSelf: "center",
    borderRadius: 20,
  },
  buttonContainer: {
    height: 50,
    backgroundColor: "#8962B0",
    width: "44%",
    marginTop: 30,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 25,
  },
  textStyle: {
    marginLeft: 8,
    color: "black",
    marginTop: 14,
    fontSize: 16,
  },
  btnTextStyle: {
    alignSelf: "center",
    // justifyContent: "center",
    color: "white",
    // marginTop: 14,
  },
});
