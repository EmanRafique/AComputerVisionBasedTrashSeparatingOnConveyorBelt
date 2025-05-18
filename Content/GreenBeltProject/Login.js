import React, { useState } from 'react';
import { View, Text, Image, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {MyBtn, MyTextInput} from './NavigationFile';  

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }
  
    try {
      const response = await fetch(`${global.ApiURL}userLogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
  
      const data = await response.json();
      console.log("Fetch API Response:", data);
  
      if (response.status === 200 && data.userData) {
        const { id, role } = data.userData;
        const lowerCaseRole = role.toLowerCase();
  
        let navigator = "";
        let screen = "";
  
        switch (lowerCaseRole) {
          case "collector":
            navigator = "Collector";
            screen = "ScanBarcode";
            break;
          case "driver":
            navigator = "Driver";
            screen = "WelcomeDriver";
            break;
          case "admin":
            navigator = "Admin";
            screen = "Dashboard";
            break;
          case "operator":
            navigator = "Operator"; 
            screen = "OperatorScreen"; 
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
        console.log("Navigating with ID:", id);
  
        if (lowerCaseRole === "user" || lowerCaseRole === "driver" || lowerCaseRole === "collector" || lowerCaseRole === "admin" || lowerCaseRole === "operator") {
          navigation.reset({
            index: 0,
            routes: [{ name: navigator, params: { screen, params: { id } } }],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: navigator }],
          });
        }
      } else {
        Alert.alert("Error", data?.message || "Login failed.");
      }
    } catch (error) {
      console.error("Fetch API Error:", error);
      Alert.alert("Error", "Could not connect to the server.");
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

        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
          <MyTextInput
            iconName="lock"
            placeholder="Enter Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
            style={{ flex: 1 }}
          />  
          <TouchableOpacity onPress={togglePasswordVisibility} style={{ position: 'absolute', right: 10 }}>
            <Icon name={isPasswordVisible ? 'eye' : 'eye-slash'} size={20} color="black" />
          </TouchableOpacity>
        </View>

        <View style={{ width: '100%', alignItems: 'flex-end', marginTop: 7, marginBottom: 40 }}>
          <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
            <Text style={{ color: 'yellow', fontSize: 17, textDecorationLine: 'underline' }}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>

      <MyBtn title="Login" onPress={handleLogin} />
    </View>
  );
};
export default Login;
