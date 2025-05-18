import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Button, Checkbox } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserSignIn = ({ navigation }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfirmPassword] = useState("");

  const handleSignIn = async () => {
    if( !name || !password || !confPassword){
      setTimeout(() => {
        Alert.alert("Error", "All fields are required.");
      }, 0);
      return;
    } if (password !== confPassword) {
      setTimeout(() => {
        Alert.alert("Error", "Passwords do not match!");
      }, 0);
      return;
    } await AsyncStorage.setItem(name, password);
    navigation.navigate("UserLogin");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20, backgroundColor: "white" }}>
      <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: '900', marginBottom: 30, color: "#4A90E2" }}>SIGNUP</Text>
      <TextInput style={{ borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 15, borderColor: "#4A90E2" }} 
      placeholder="UserName"
      value={name}
      onChangeText={setName} />
      <TextInput style={{ borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 15, borderColor: "#4A90E2" }} 
      placeholder="Password" 
      value={password} 
      onChangeText={setPassword} />
      <TextInput style={{ borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 20, borderColor: "#4A90E2" }} 
      placeholder="Confirm Password" 
      value={confPassword} 
      onChangeText={setConfirmPassword} />
      <Button mode="contained" style={{ backgroundColor: "#4A90E2", borderRadius: 5, alignSelf: "center", paddingHorizontal: 40 }} onPress={handleSignIn}>Sign Up</Button>
    </View>
  );
};

const UserLogin = ({ navigation }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const loadCredentials = async () => {
      const savedPassword = await AsyncStorage.getItem(name);
      if (savedPassword) setPassword(savedPassword);
    }; loadCredentials();
  }, [name]);

  const handleLogin = async () => {
    const savedPassword = await AsyncStorage.getItem(name);
    if (!savedPassword) {
      setTimeout(() => {
        Alert.alert("Error", "User not found. Please sign up.");
      }, 0);
      return;
    } if( !name || !password){
      setTimeout(() => {
        Alert.alert("Error", "All fields are required.");
      }, 0);
      return;
    } if (password !== savedPassword) {
      setTimeout(() => {
        Alert.alert("Error", "Incorrect password!");
      }, 0);
      return;
    } if (rememberMe) await AsyncStorage.setItem("rememberedUser", name);
    navigation.navigate("UserHome", { name });
  };
 return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20, backgroundColor: "white" }}>
      <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: '900', marginBottom: 30, color: "#4A90E2" }}>LOGIN</Text>
      <TextInput style={{ borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 15, borderColor: "#4A90E2" }} placeholder="UserName" value={name} onChangeText={setName} />
      <TextInput style={{ borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 15, borderColor: "#4A90E2" }} 
      placeholder="Password" 
      value={password} 
      onChangeText={setPassword} 
      secureTextEntry={!rememberMe} />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Checkbox status={rememberMe ? 'checked' : 'unchecked'} onPress={() => setRememberMe(!rememberMe)} />
        <Text>Remember Me</Text>
      </View>
      <Button mode="contained" style={{ backgroundColor: "#4A90E2", borderRadius: 5, alignSelf: "center", paddingHorizontal: 40, marginVertical: 10 }} onPress={handleLogin}>Login</Button>
      <Text style={{ textAlign: "center", marginTop: 10, color: "#4A90E2", textDecorationLine: "underline" }}
       onPress={() => navigation.navigate("UserSignIn")}>New User? Click for Sign Up</Text>
    </View>
  );
};

const UserHome = ({ navigation, route }) => {
  const { name } = route.params;
  const [oldPass, setOldPass] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {
    const savedPassword = await AsyncStorage.getItem(name);
    if (oldPass !== savedPassword) {
      setTimeout(() => {
        Alert.alert("Error", "Old password is incorrect!");
      }, 0);
      return;
    }
    if (password !== confPassword) {
      setTimeout(() => {
        Alert.alert("Error", "New passwords do not match!");
      }, 0);
      return;
    }
    await AsyncStorage.setItem(name, password);
    setTimeout(() => {
      Alert.alert("Success", "Password changed successfully!");
    }, 0);
  };
  const handleDeleteAccount = async () => {
    await AsyncStorage.removeItem(name);
    setTimeout(() => {
      Alert.alert("Account Deleted", "Your account has been removed.");
    }, 0);
    navigation.navigate("UserSignIn");
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20, backgroundColor: "white" }}>
      <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: '900', marginBottom: 30, color: "#4A90E2" }}>HOME</Text>
      <Text style={{ textAlign: 'center', fontSize: 18, marginBottom: 20 }}>WELCOME {name}</Text>
      <TextInput style={{ borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 15, borderColor: "#4A90E2" }} placeholder="Old Password" 
      value={oldPass} 
      onChangeText={setOldPass} />
      <TextInput style={{ borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 15, borderColor: "#4A90E2" }} 
      placeholder="New Password" 
      value={password} 
      onChangeText={setPassword} />
      <TextInput style={{ borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 20, borderColor: "#4A90E2" }} 
      placeholder="Confirm Password"
      value={confPassword}
      onChangeText={setConfirmPassword} />
      <Button mode="contained" style={{ backgroundColor: "#4A90E2", borderRadius: 5, alignSelf: "center", paddingHorizontal: 40, marginVertical: 10 }} onPress={handleChangePassword}>Change Password</Button>
      <Button mode="contained" style={{ backgroundColor: "#D0021B", borderRadius: 5, alignSelf: "center", paddingHorizontal: 40, marginVertical: 10 }} onPress={handleDeleteAccount}>Delete Account</Button>
      <Button mode="contained" 
      style={{ backgroundColor: "#4A90E2", borderRadius: 5, alignSelf: "center", paddingHorizontal: 40 }}
       onPress={() => navigation.navigate("UserLogin")}>Log out</Button>
    </View>
  )};

const Stack = createStackNavigator();
export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="UserLogin" component={UserLogin} />
        <Stack.Screen name="UserSignIn" component={UserSignIn} />
        <Stack.Screen name="UserHome" component={UserHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
