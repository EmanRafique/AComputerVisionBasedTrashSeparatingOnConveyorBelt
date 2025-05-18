import React, { useState, useEffect } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import axios from 'axios';
import { MyBtn, MyTextInput } from './NavigationFile';  

const ResetPassword = ({ navigation, route }) => {
  const { lowerCaseRole, id } = route.params;
  const [userId, setUserId] = useState(null);
  const [password, setPassword] = useState('');
  const [confPass, setConfPass] = useState('');

  useEffect(() => {
    if (id) {
      setUserId(id);
    } else {
      Alert.alert("Error", "User ID not found. Please try again.");
      navigation.navigate("ForgetPassword");
    }
  }, [id, navigation]);

  const handleReset = async () => {
    if (!userId || !password.trim() || !confPass.trim()) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long.");
      return;
    }

    if (password !== confPass) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    if (!lowerCaseRole) {
      Alert.alert("Error", "User role is missing.");
      return;
    }

    try {
      const response = await axios.post(`${global.ApiURL}resetPassword`, { 
        id: userId,  
        password, 
        confirm_password: confPass
      });

      console.log("Reset Password Response:", response.data);

      if (response.status === 200) {
        Alert.alert("Success", response.data.message);
        
        let navigator = "";
        let screen = "";
        
        switch (lowerCaseRole) {
          case "collector":
            navigator = "Collector";
            screen = "Dummy";
            break;
          case "driver":
            navigator = "Driver";
            screen = "DriverDummy";
            break;
          case "admin":
            navigator = "Admin";
            screen = "Dashboard";
            break;
          case "user":
            navigator = "User";
            screen = "OrderNow";
            break;
          default:
            Alert.alert("Error", "Invalid role.");
            return;
        }

        console.log(`Navigating to: ${navigator} -> ${screen}`);
        
        navigation.reset({
          index: 0,
          routes: [{ name: navigator, params: { id } }],
        });
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        const errorMessage = data.message || "Request failed.";

        if (status === 400) {
          Alert.alert("Error", errorMessage);
        } else if (status === 404) {
          Alert.alert("Error", "User not found.");
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
          iconName="lock"
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <MyTextInput
          iconName="lock"
          placeholder="Confirm Password"
          value={confPass}
          onChangeText={setConfPass}
          secureTextEntry={true}
        />
      </View>

      <MyBtn title="Reset Password" onPress={handleReset} />  
    </View>
  );
};

export default ResetPassword;