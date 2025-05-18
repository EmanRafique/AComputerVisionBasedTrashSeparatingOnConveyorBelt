// search: sqlite react native storage
// npm i react-native-sqlite-storage
// cd android
// ./gradlew clean
// Lect# 1. useEffect
//       2. SQLite DB

import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper'; // Proper imports from React Native Paper

const DBlect = () => {
  const [count, setCount] = useState(0); // State for count
  const [square, setSquare] = useState(0); // State for square of count

  // Callback function to update square whenever count changes
  const callBackFunc = () => {
    setSquare(count * count);
  };

  // useEffect will trigger whenever 'count' changes
  useEffect(callBackFunc, [count]);

  return (
    <View style={styles.container}>
      <Text style={styles.txtView}>Count: {count}</Text>
      <Text style={styles.txtView}>Square Count: {square}</Text>
      <Button
        onPress={() => {
          setCount(count + 1); // Increment count
        }}
        mode="contained"
        labelStyle={{ fontSize: 20 }}
        style={styles.button}
      >
        Square Data
      </Button>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  txtView: {
    margin: 10,
    fontSize: 18,
  },
  button: {
    marginTop: 20,
  },
});

export default DBlect;
