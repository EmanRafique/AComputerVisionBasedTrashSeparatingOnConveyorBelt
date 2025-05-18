import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { launchImageLibrary } from "react-native-image-picker";
import { MyTextInput, MyBtn } from "../NavigationFile";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";

const UpdateDetails = () => {
  const route = useRoute();
  const { id } = route.params || {};
  console.log("✅ Employee ID from route:", id);

  const navigation = useNavigation();

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [role, setRole] = useState("");

  const roles = ["driver", "collector", "operator"];
  const displayRoles = roles.map(
    (role) => role.charAt(0).toUpperCase() + role.slice(1)
  );

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log("📤 Fetching employee details for ID:", id);
        if (!id) return;

        const response = await fetch(`${global.ApiURL}getEmployeeById/${id}`);
        const data = await response.json();
        console.log("📥 API Response:", data);

        if (data) {
          setName(data.name || "");
          setPhone(data.phonenumber || "");
          setPassword(data.password || "");
          setRole(data.role || "");

          // Construct Image URL
          let imageUrl = data.profile
            ? `${global.ApiURL.replace(/\/$/, "")}/static/${data.profile}?time=${Date.now()}`
            : require("../../assets/Images_GreenBelt/profile-avatar.jpg");

          if (typeof imageUrl === "string") {
            imageUrl = imageUrl.replace(/\\/g, "/");
          }

          setProfileImage(imageUrl);
          console.log("🖼️ Final Profile Image:", imageUrl);
        }
      } catch (error) {
        console.error("🚨 Error fetching user details:", error);
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
        console.log("⚠️ Image selection canceled");
      } else if (response.error) {
        console.error("🚨 ImagePicker Error:", response.error);
      } else {
        const selectedImage = response.assets?.[0]?.uri;
        if (selectedImage) {
          setProfileImage(selectedImage);
          console.log("🖼️ Updated Profile Image URI:", selectedImage);
        }
      }
    });
  };

  const handleUpdateProfile = async () => {
    try {
      console.log("🚀 Starting profile update...");
      const formData = new FormData();

      const roleIndex = displayRoles.indexOf(role);
      const selectedRole = roles[roleIndex] || role;

      console.log("📝 Form Data before submission:");
      console.log(" - ID:", id);
      console.log(" - Phone:", phone);
      console.log(" - Name:", name);
      console.log(" - Password:", password);
      console.log(" - Role:", selectedRole);
      console.log(" - Profile Image:", profileImage);

      formData.append("id", id);
      if (phone) formData.append("phonenumber", phone);
      if (name) formData.append("name", name);
      if (password) formData.append("password", password);
      if (selectedRole) formData.append("role", selectedRole);

      if (profileImage && typeof profileImage === "string") {
        formData.append("profile_image", {
          uri: profileImage,
          type: "image/jpeg",
          name: `profile_${id}_${Date.now()}.jpg`,
        });
      }

      const response = await fetch(`${global.ApiURL}updateEmployeeInfo`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const result = await response.json();
      console.log("📥 Server Response:", result);

      if (response.ok) {
        console.log("✅ Profile updated successfully!");
        Alert.alert("Success", "Profile updated successfully!");
        navigation.navigate("EmployeeManagement");
      } else {
        console.error("🚨 Update failed:", result.error);
        Alert.alert("Error", result.error || "Profile update failed");
      }
    } catch (error) {
      console.error("🚨 Error updating profile:", error);
      Alert.alert("Error", "Something went wrong!");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#069349" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
          padding: 20,
        }}
      >
        <Icon
          name="arrow-left"
          size={28}
          color="white"
          onPress={() => navigation.navigate("EmployeeManagement")}
          style={{ position: "absolute", left: 10 }}
        />
      </View>

      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <TouchableOpacity onPress={selectImage}>
          <Image
            source={
              typeof profileImage === "string"
                ? { uri: profileImage }
                : profileImage
            }
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: "#ddd",
            }}
          />
          <Text style={{ color: "white", marginTop: 5, fontSize: 17 }}>
            Change Picture
          </Text>
        </TouchableOpacity>
      </View>

      <MyTextInput
        iconName="user"
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        keyboardType="default"
      />

      <MyTextInput
        iconName="phone"
        placeholder="Phone Number"
        value={phone}
        onChangeText={(text) => setPhone(text)}
        keyboardType="phone-pad"
      />
      <MyTextInput
        iconName="lock"
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <View style={{ marginVertical: 10 }}>
        <SelectList
          setSelected={(value) => setRole(value.toLowerCase())}
          data={displayRoles}
          placeholder="Select Role"
          defaultOption={{
            key: role.toLowerCase(),
            value: role.charAt(0).toUpperCase() + role.slice(1),
          }}
          search={false}
          boxStyles={{ backgroundColor: "white" }}  
          inputStyles={{ color: "black", fontSize: 15 }}
          dropdownStyles={{
            backgroundColor: "white",
            borderColor: "black",
          }}          
        />
      </View>

      <MyBtn
        title="Update"
        style={{ marginLeft: 25, margin:20 }}
        onPress={handleUpdateProfile}
      />
    </View>
  );
};

export default UpdateDetails;