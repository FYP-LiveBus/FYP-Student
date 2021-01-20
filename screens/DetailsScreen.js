import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import axios from "axios";
const DetailsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [loader, setloader] = useState(false);
  useEffect(() => {
    setloader(true);
    try {
      axios
        .get(`https://livebusapi.herokuapp.com/api/admin/notifications/`)
        .then((response) => {
          let r = response.data;
          setNotifications(r);
        })
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
    setloader(false);
  }, []);

  console.log(notifications);
  return (
    <View style={styles.container}>
      {loader === true ? (
        <Text>Loading.......</Text>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <Text>Subject: {item.subject}</Text>
              <Text>Messge: {item.message}</Text>
              <Text>Date: {item.date}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    padding: "1%",
    margin: "1%",
    borderColor: "grey",
    borderWidth: 0.4,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
  },
});
