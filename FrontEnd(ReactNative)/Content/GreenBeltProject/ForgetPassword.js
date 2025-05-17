import React, { useState } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { MyBtn, MyTextInput } from './NavigationFile';  

const ForgetPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [phonenumber, setPhoneNo] = useState('');

  const handleForget = async () => {
    if (!email.trim() || !phonenumber.trim()) {
      Alert.alert("Error", "Please enter both email and phone number");
      return;
    }    
  
    try {
      const response = await axios.post(`${global.ApiURL}forgetPassword`, { 
        email, 
        phonenumber 
      });
  
      console.log("Forgot Password Response:", response.data);
  
      if (response.status === 200 && response.data.userData) {
        const { id, role } = response.data.userData;
        const lowerCaseRole = role ? role.toLowerCase() : "";      

        Alert.alert("Success", response.data.message);
        navigation.navigate("ResetPassword", {lowerCaseRole, id});  
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        const errorMessage = data.message || "Request failed.";
  
        if (status === 400) {
          Alert.alert("Error", errorMessage);
        } else if (status === 404) {
          Alert.alert("Error", "User not found.");
        } else if (status === 401) {
          Alert.alert("Error", "Invalid credentials.");
        } else if (status === 500) {
          Alert.alert("Error", "An unexpected error occurred.");
        }
      } else {
        console.error("Error during request:", error.message);
        Alert.alert("Error", "Could not connect to the server.");
      }
    }
  };
  

  return (
    <View style={{ flex: 1, backgroundColor: '#069349', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <Image source={require('../assets/Images_GreenBelt/garbage-collector-with-garbage-bags-3316358-2784925.png')} style={{ width: 80, height: 100 }} />
        <Text style={{ fontSize: 60, fontWeight: '900', color: 'white', marginRight: 30 }}>Cleany</Text>
      </View>

      <View style={{ width: '100%', marginTop: 30, marginBottom: 10 }}>
        <MyTextInput
          iconName="envelope"
          placeholder="Enter Email"
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={{ alignItems: 'center', width: '100%' }}>
          <MyTextInput
            iconName="phone"
            placeholder="Enter Phone Number"
            value={phonenumber}
            onChangeText={setPhoneNo}
            keyboardType="phone-pad"
          />
        </View>
      </View>

      <MyBtn title="Verify" onPress={handleForget} />  
    </View>
  );
};

export default ForgetPassword;
