import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  Button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 20,
    borderRadius: 5,
  },
});

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
