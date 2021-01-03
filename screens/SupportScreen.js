import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import * as Linking from "expo-linking";

const SupportScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 20 }}>
        Email us at transport@cuilahore.edu.pk
      </Text>
      <Button
        title="Email us"
        onPress={() => {
          Linking.openURL("mailto:faranayyaz@gmail.com");
          navigation.goBack();
        }}
      />
    </View>
  );
};

export default SupportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
