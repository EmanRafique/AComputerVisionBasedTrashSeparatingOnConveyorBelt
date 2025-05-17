import React, { useState, useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import { Button, RadioButton } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const SignIn = ({ navigation, route }) => {
  const [users, setUsers] = useState([
    { name: "Ali", email: "ali@gmail.com", gender: "Male", password: "123" },
    { name: "Ahmed", email: "ahmed@gmail.com", gender: "Male", password: "1234" },
    { name: "Ali", email: "ali@gmail.com", gender: "Male", password: "123" },
    { name: "Ahmed", email: "ahmed@gmail.com", gender: "Male", password: "1234" },
    { name: "Ahmed", email: "ahmed@gmail.com", gender: "Male", password: "1234" },
  ]);

  useEffect(() => {
    if (route.params?.newUser) {
      setUsers((prevUsers) => [...prevUsers, route.params.newUser]);
    }
  }, [route.params?.newUser]);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  const handleSignIn = () => {
    const user = users.find((u) => u.name === name && u.password === password);
    if (user) {
      setIsInvalid(false);
      navigation.navigate("Home", { user });
    } else {
      setIsInvalid(true);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20, backgroundColor: "white" }}>
      <Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "center", marginBottom: 20 }}>
        Sign In
      </Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: isInvalid ? "red" : "#ccc",
          borderRadius: 8,
          padding: 10,
          marginBottom: 15,
        }}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: isInvalid ? "red" : "#ccc",
          borderRadius: 8,
          padding: 10,
          marginBottom: 15,
        }}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {isInvalid && <Text style={{ color: "red", textAlign: "center", marginBottom: 10 }}>Invalid name or password!</Text>}
      <Button
        mode="contained"
        onPress={handleSignIn}
        style={{
          backgroundColor: "blue",
          borderRadius: 5,
          alignSelf: "center",
          paddingHorizontal: 40,
        }}
      >
        Sign In
      </Button>
      <Text
        style={{
          textAlign: "center",
          marginTop: 10,
          color: "blue",
          textDecorationLine: "underline",
        }}
        onPress={() => navigation.navigate("SignUp", { users })}
      >
        New User? Click for Sign Up
      </Text>
    </View>
  );
};

const SignUp = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");

  const handleSignUp = () => {
    if (!name || !email || !password || !confirmPassword || !gender) {
      alert("All fields are required!");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const newUser = { name, email, gender, password };
    navigation.navigate("SignIn", { newUser });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20, backgroundColor: "white" }}>
      <Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "center", marginBottom: 20 }}>
        Sign Up
      </Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, marginBottom: 15 }}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, marginBottom: 15 }}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, marginBottom: 15 }}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, marginBottom: 15 }}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Text style={{ fontWeight: "bold", marginBottom: 10 }}>Gender</Text>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}>
        <RadioButton value="Male" status={gender === "Male" ? "checked" : "unchecked"} onPress={() => setGender("Male")} />
        <Text>Male</Text>
        <RadioButton value="Female" status={gender === "Female" ? "checked" : "unchecked"} onPress={() => setGender("Female")} />
        <Text>Female</Text>
      </View>
      <Button
        mode="contained"
        onPress={handleSignUp}
        style={{
          backgroundColor: "blue",
          borderRadius: 5,
          alignSelf: "center",
          paddingHorizontal: 40,
        }}
      >
        Sign Up
      </Button>
    </View>
  );
};

const Home = ({ route, navigation }) => {
  const { user } = route.params;

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
      <Text
        style={{
          backgroundColor: "blue",
          color: "white",
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          padding: 15,
          borderRadius: 5,
          marginBottom: 20,
        }}
      >
        Welcome
      </Text>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Name: {user.name}</Text>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Email: {user.email}</Text>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Gender: {user.gender}</Text>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Password: {user.password}</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("SignIn")}
        style={{
          backgroundColor: "blue",
          borderRadius: 5,
          alignSelf: "center",
          paddingHorizontal: 40,
        }}
      >
        Log Out
      </Button>
    </View>
  );
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
