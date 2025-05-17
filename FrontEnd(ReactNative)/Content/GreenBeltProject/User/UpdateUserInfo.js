import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { launchImageLibrary } from "react-native-image-picker";
import { MyTextInput, MyBtn } from "../NavigationFile";
import { useNavigation } from "@react-navigation/native";

const EditProfileScreen = ({ route }) => {
  const [id, setId] = useState(route.params?.id || null);
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log("Fetching user details for ID:", id);
        if (!id) {
          console.error("User ID is missing!");
          return;
        }
        
        const response = await fetch(`${global.ApiURL}/getUserById/${id}`);
        const data = await response.json();
        console.log("API Response:", data);

        if (data) {
          setUsername(data.name || "");
          setEmail(data.email || "");
          setPassword(data.password || "");
          setPhone(data.phonenumber || "");
          setProfileImage(data.profile ? `${global.ApiURL}/${data.profile}` : null);
        } else {
          console.error("User details not found in response.");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [id]);

  const selectImage = () => {
    const options = {
      mediaType: "photo",
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.8,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image selection");
      } else if (response.error) {
        console.error("ImagePicker Error:", response.error);
      } else {
        const selectedImage = response.assets[0].uri;
        setProfileImage(selectedImage);
      }
    });
  };

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("email", email);
      formData.append("name", username);
      formData.append("phonenumber", phone);
      formData.append("password", password);

      if (profileImage) {
        formData.append("profile_image", {
          uri: profileImage,
          type: "image/jpeg",
          name: "profile.jpg",
        });
      }

      const response = await fetch(`${global.ApiURL}/user/updateUserProfile`, {
        method: "POST",
        body: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Profile updated successfully!");
        navigation.navigate("OrderNow", { id, refresh: true });
      } else {
        Alert.alert("Error", result.error || "Profile update failed");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Something went wrong!");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#069349" }}>
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10, padding:20 }}>
        <Icon
          name="arrow-left"
          size={28}
          color="white"
          onPress={() => navigation.navigate("OrderNow",{id})}
          style={{ position: "absolute", left: 10 }}
        />
      </View>

      <View style={{ alignItems: "center", marginBottom: 30, marginTop:30 }}>
        <TouchableOpacity onPress={selectImage}>
          <Image
            source={profileImage ? { uri: profileImage } : require("../../assets/Images_GreenBelt/profile-avatar.jpg")}
            style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: "#ddd" }}
          />
          <Text style={{ color: "white", marginTop: 5, fontSize: 18 }}>Change Picture</Text>
        </TouchableOpacity>
      </View>

      {/* Form Inputs */}
      <MyTextInput iconName="user" placeholder="Enter Name" value={username} onChangeText={setUsername} />
      <MyTextInput iconName="envelope" placeholder="Enter Email" value={email} onChangeText={setEmail} />
      <MyTextInput iconName="phone" placeholder="Enter Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <MyTextInput iconName="lock" placeholder="Enter Password" value={password} onChangeText={setPassword}/>

      <Text onPress={()=>{ navigation.navigate("MapAddress",{id})}}
      style={{ color: "yellow", marginTop: 10, fontSize: 18, fontWeight:'bold', textDecorationLine:'underline', textAlign:'center' }}>Click to add Address</Text>

      {/* Update Button */}
      <MyBtn title="Update" style={{ margin: 20, marginLeft: 22 }} onPress={handleUpdateProfile} />
    </View>
  );
};

export default EditProfileScreen;