import React, {useState} from 'react';
import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';

const Login_Lab = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('red');

  const ss = StyleSheet.create({
    mainView: {
      backgroundColor: 'aqua',
      flex: 1,
      padding: 10,
      justifyContent: 'center',
    },
    viewInputs: {
      marginBottom: 20,
    },
    txtInputs: {
      backgroundColor: 'white',
      margin: 10,
      fontSize: 20,
      borderRadius: 15,
      padding: 10,
    },
    messageText: {
      textAlign: 'center',
      fontSize: 18,
      color: messageColor,
      marginVertical: 10,
    },
  });

  const allData = [
    {uName: 'Eman Rafique', pass: '1234'},
    {uName: 'GPT', pass: '123'},
  ];

  const handleLogin = () => {
    let isAuthenticated = false;

    if (userName.trim() === '' || password.trim() === '') {
      setMessageColor('red');
      setMessage('Please enter values');
    }

    for (let i = 0; i < allData.length; i++) {
      if (userName === allData[i].uName && password === allData[i].pass) {
        isAuthenticated = true;
        break;
      }
    }

    if (isAuthenticated) {
      setMessageColor('green');
      setMessage('Logged in successfully!');
    } else {
      setMessageColor('red');
      setMessage('Invalid username or password');
    }
  };

  return (
    <View style={ss.mainView}>
      <View style={ss.viewInputs}>
        <TextInput
          placeholder="Enter Name"
          value={userName}
          onChangeText={val => setUserName(val)}
          style={ss.txtInputs}
        />
        <TextInput
          placeholder="Enter Password"
          value={password}
          onChangeText={val => setPassword(val)}
          secureTextEntry
          style={ss.txtInputs}
        />
      </View>
      <Text style={ss.messageText}>{message}</Text>
      <View style={{alignSelf: 'center'}}>
        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
};

export default Login_Lab;
