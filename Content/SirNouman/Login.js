import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';

const Login = () => {
  const ss = StyleSheet.create({
    mainView: {
      backgroundColor: 'aqua',
      flex: 1,
      padding: 10,
      justifyContent: 'center',
    },
    viewInputs: {},
    txtInputs: {
      backgroundColor: 'white',
      margin: 10,
      fontSize: 20,
      borderRadius: 15,
    },
  });

  const [userName, setUserName] = useState('hello');
  return (
    <View style={ss.mainView}>
      <View style={ss.viewInputs}>
        <TextInput
          onChangeText={val => {
            setUserName(val);
          }}
          style={ss.txtInputs}></TextInput>
        <TextInput style={ss.txtInputs}></TextInput>
      </View>
      <View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 35,
            color: 'black',
          }}>
          {userName}
        </Text>
      </View>
      <View style={{alignSelf: 'center'}}>
        <Button title="Login"></Button>
      </View>
    </View>
  );
};
export default Login;
