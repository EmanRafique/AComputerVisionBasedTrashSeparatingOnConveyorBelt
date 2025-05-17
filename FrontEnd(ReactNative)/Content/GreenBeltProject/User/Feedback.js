import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import { MyBtn } from "../NavigationFile";

const Feedback = ({ navigation }) => {
  const [feedback, setFeedback] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [description, setDescription] = useState(""); 

  const handleSubmit = () => {
    if (feedback.length < 10) {
      Alert.alert('Feedback too short', 'Please enter at least 10 characters.');
      return;
    }
    Alert.alert('Feedback Submitted', 'Thank you for your feedback!');
    setFeedback('');
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#069349", alignItems: "center", paddingTop: 30 }}>
      <TouchableOpacity onPress={() => navigation.navigate("OrderNow", { id })}>
        <Icon name="arrow-left" size={24} style={{ right: 140, color: "#fff" }} />
      </TouchableOpacity>

      <Image
        source={profileImage ? { uri: profileImage } : require("../../assets/Images_GreenBelt/profile-avatar.jpg")}
        style={{ width: 110, height: 110, borderRadius: 60, marginTop: "5%" }}
      />

      <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff", marginVertical: 20 }}>
       Feedback
      </Text>

      <View style={{ width: "90%", backgroundColor: "#b7e1c5", padding: 15, borderRadius: 10, marginBottom: 20,  marginTop: 20 }}>
        <Text style={{ fontWeight: "bold", color: "black", fontSize: 18 }}>Description</Text>
        <TextInput
          placeholder="Enter Description of feedback..."
          placeholderTextColor="gray"
          multiline
          value={description}
          onChangeText={setDescription}
          style={{ height: 120, textAlignVertical: "top", color: "black", marginTop: 5 }}
        />
      </View>

      <MyBtn title="Submit Feedback" style={{ margin: 10, borderRadius:10 }} onPress={handleSubmit} />
    </View>
  );
};

export default Feedback;