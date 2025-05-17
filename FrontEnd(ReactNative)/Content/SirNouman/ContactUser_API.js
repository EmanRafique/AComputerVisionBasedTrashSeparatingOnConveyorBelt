import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Image, Alert } from "react-native";
import { RadioButton } from "react-native-paper";
import * as ImagePicker from "react-native-image-picker";

const API_BASE_URL = "http://192.168.10.11/API-WebApp_MAP2024/api/ContactUser/";

const ContactUser_API = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ph1, setPh1] = useState("");
  const [ph2, setPh2] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("Male");
  const [profilePic, setProfilePic] = useState(null);
  const [contacts, setContacts] = useState([]);

  // PICK IMAGE FUNCTION
  const pickImage = () => {
    ImagePicker.launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) {
        console.log("User canceled image picker");
      } else if (response.errorMessage) {
        console.error("Image Picker Error:", response.errorMessage);
      } else {
        setProfilePic(response.assets[0].uri);
      }
    });
  };

  // ADD NEW CONTACT
  const addContact = async () => {
    const formData = new FormData();
    formData.append("contact", JSON.stringify({ name, email, ph1, ph2, city, gender }));
    if (profilePic) {
      formData.append("profilePic", {
        uri: profilePic,
        name: `${email}-${name}.jpg`,
        type: "image/jpeg",
      });
    }

    try {
      const response = await fetch(`${API_BASE_URL}addContact`, {
        method: "POST",
        body: formData,
      });
      const result = await response.text();
      if (response.ok) {
        Alert.alert("Success", "Contact added successfully.");
        fetchContacts(); // Refresh contacts
      } else {
        Alert.alert("Error", result);
      }
    } catch (error) {
      console.error("Error adding contact:", error.message);
    }
  };

  // FETCH ALL CONTACTS
  const fetchContacts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}showAllContacts`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error.message);
      Alert.alert("Error", `Failed to fetch contacts: ${error.message}`);
    }
  };

  // GET CONTACT BY EMAIL
  const getContactByEmail = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}getContactByEmail?email=${email}`);
      if (!response.ok) {
        Alert.alert("Error", "Contact not found.");
        return;
      }
      const data = await response.json();
      Alert.alert("Contact Details", `Name: ${data.Name}\nPhone 1: ${data.Ph1}\nPhone 2: ${data.Ph2}\nCity: ${data.City}\nGender: ${data.Gender}`);
    } catch (error) {
      console.error("Error fetching contact:", error.message);
    }
  };

  // DELETE CONTACT BY EMAIL
  const deleteContactByEmail = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}deleteContactByEmail?email=${email}`, {
        method: "DELETE",
      });
      const result = await response.text();
      if (response.ok) {
        Alert.alert("Success", "Contact deleted successfully.");
        fetchContacts(); // Refresh contacts
      } else {
        Alert.alert("Error", result);
      }
    } catch (error) {
      console.error("Error deleting contact:", error.message);
    }
  };

  const updateContactByEmail = async () => {
    const formData = new FormData();
    formData.append("contact", JSON.stringify({ name, ph1, ph2, city, gender }));
  
    if (profilePic) {
      formData.append("profilePic", {
        uri: profilePic,
        name: `${email}-${name}.jpg`,
        type: "image/jpeg",
      });
    }
  
    try {
      const response = await fetch(`${API_BASE_URL}updateContactByEmail?email=${email}`, {
        method: "PUT",
        body: formData,
      });
  
      const result = await response.text();
      if (response.ok) {
        Alert.alert("Success", "Contact updated successfully.");
        fetchContacts();
      } else {
        Alert.alert("Error", result);
      }
    } catch (error) {
      console.error("Error updating contact:", error.message);
    }
  };
  

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#f9f9f9" }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
        <Button title="Add" color="green" onPress={addContact} />
        <Button title="GetByEmail" color="blue" onPress={getContactByEmail} />
        <Button title="UpdateByEmail" color="orange" onPress={updateContactByEmail} />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
      <Button title="DeleteByEmail" color="red" onPress={deleteContactByEmail} />
      <Button title="ShowAll" color="purple" onPress={fetchContacts} />
      </View>

      <View style={{ alignItems: "center", marginBottom: 20 }}>
        {profilePic ? (
          <Image source={{ uri: profilePic }} style={{ width: 100, height: 100, borderRadius: 50 }} />
        ) : (
          <Text>No image selected</Text>
        )}
        <TouchableOpacity onPress={pickImage} style={{ backgroundColor: "#007bff", padding: 10, marginTop: 10 }}>
          <Text style={{ color: "#fff" }}>Select Image</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
        placeholder="Phone 1"
        value={ph1}
        onChangeText={setPh1}
      />
      <TextInput
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
        placeholder="Phone 2"
        value={ph2}
        onChangeText={setPh2}
      />
      <TextInput
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <RadioButton
          value="Male"
          status={gender === 'Male' ? 'checked' : 'unchecked'}
          onPress={() => setGender('Male')}
        />
        <Text>Male</Text>
        <RadioButton
          value="Female"
          status={gender === 'Female' ? 'checked' : 'unchecked'}
          onPress={() => setGender('Female')}
        />
        <Text>Female</Text>
      </View>

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.Id.toString()}

        renderItem={({ item }) => (
          <View style={{ padding: 15, borderWidth: 1, borderColor: "#ccc", marginBottom: 10 }}>
            <Text>Name: {item.Name}</Text>
            <Text>Email: {item.Email}</Text>
            <Text>Phone 1: {item.Ph1}</Text>
            <Text>City: {item.City}</Text>
          </View>
        )}
      />

    </View>
  );
};

export default ContactUser_API;
