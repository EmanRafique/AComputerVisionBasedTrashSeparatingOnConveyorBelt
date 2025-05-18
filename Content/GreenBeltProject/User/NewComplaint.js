import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { MyBtn } from "../NavigationFile";
import axios from "axios";

const NewComplaint = ({ route, navigation }) => {
  const { id } = route.params; 
  const [description, setDescription] = useState(""); 
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${global.ApiURL}/getUserById/${id}`);
        if (response.data) {
          setProfileImage(response.data.profile ? `${global.ApiURL}/${response.data.profile}` : null);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    
    if (id) {
      fetchUserProfile();
    }
  }, [id]);

  const handleSubmitComplaint = async () => {
    if (!description.trim()) {
      Alert.alert("Error", "Please enter a complaint description.");
      return;
    }
  
    try {
      const response = await fetch(`${global.ApiURL}registerComplaint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: id,
          description
        }),
      });
  
      const responseData = await response.json();
      console.log("Complaint API Response:", responseData);
  
      if (!response.ok) throw new Error(responseData.message || "Failed to register complaint");
  
      Alert.alert("Success", "Complaint registered successfully!");
      navigation.navigate("OrderNow", { id });
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", error.message || "Could not connect to the server.");
    }
  };
  

  return (
    <View style={{ flex: 1, backgroundColor: "#069349", alignItems: "center", paddingTop: 30 }}>
      <TouchableOpacity onPress={() => navigation.navigate("Complaint", { id })}>
        <Icon name="arrow-left" size={24} style={{ right: 140, color: "#fff" }} />
      </TouchableOpacity>

      <Image
        source={profileImage ? { uri: profileImage } : require("../../assets/Images_GreenBelt/profile-avatar.jpg")}
        style={{ width: 110, height: 110, borderRadius: 60, marginTop: "5%" }}
      />

      <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff", marginVertical: 20 }}>
        Add Complaint
      </Text>

      <View style={{ width: "90%", backgroundColor: "#b7e1c5", padding: 15, borderRadius: 10, marginBottom: 20,  marginTop: 20 }}>
        <Text style={{ fontWeight: "bold", color: "black", fontSize: 18 }}>Description</Text>
        <TextInput
          placeholder="Enter Description of Complaint..."
          placeholderTextColor="gray"
          multiline
          value={description}
          onChangeText={setDescription}
          style={{ height: 120, textAlignVertical: "top", color: "black", marginTop: 5 }}
        />
      </View>

      <MyBtn title="Submit Complaint" style={{ margin: 10, borderRadius:10 }} onPress={handleSubmitComplaint} />
    </View>
  );
};

export default NewComplaint;













// import React, { useEffect, useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";
// import { MyBtn } from "../NavigationFile";
// import axios from "axios";

// const NewComplaint = ({ route, navigation }) => {
//   const { id } = route.params; 
//   const [description, setDescription] = useState(""); 
//   const [profileImage, setProfileImage] = useState(null);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await axios.get(`${global.ApiURL}/getUserById/${id}`);
//         if (response.data) {
//           setProfileImage(response.data.profile ? `${global.ApiURL}/${response.data.profile}` : null);
//         }
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       }
//     };
    
//     if (id) {
//       fetchUserProfile();
//     }
//   }, [id]);

//   const handleSubmitComplaint = async () => {
//     if (!description.trim()) {
//       Alert.alert("Error", "Please enter a complaint description.");
//       return;
//     }
  
//     try {
//       const response = await fetch(`${global.ApiURL}registerComplaint`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userid: id,
//           description
//         }),
//       });
  
//       const responseData = await response.json();
//       console.log("Complaint API Response:", responseData);
  
//       if (!response.ok) throw new Error(responseData.message || "Failed to register complaint");
  
//       Alert.alert("Success", "Complaint registered successfully!");
//       navigation.navigate("OrderNow", { id });
//     } catch (error) {
//       console.error("Error:", error);
//       Alert.alert("Error", error.message || "Could not connect to the server.");
//     }
//   };
  

//   return (
//     <View style={{ flex: 1, backgroundColor: "#069349", alignItems: "center", paddingTop: 30 }}>
//       <TouchableOpacity onPress={() => navigation.navigate("Complaint", { id })}>
//         <Icon name="arrow-left" size={24} style={{ right: 140, color: "#fff" }} />
//       </TouchableOpacity>

//       <Image
//         source={profileImage ? { uri: profileImage } : require("../../assets/Images_GreenBelt/profile-avatar.jpg")}
//         style={{ width: 110, height: 110, borderRadius: 60, marginTop: "5%" }}
//       />

//       <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff", marginVertical: 20 }}>
//         Add Complaint
//       </Text>

//       <View style={{ width: "90%", backgroundColor: "#b7e1c5", padding: 15, borderRadius: 10, marginBottom: 20,  marginTop: 20 }}>
//         <Text style={{ fontWeight: "bold", color: "black", fontSize: 18 }}>Description</Text>
//         <TextInput
//           placeholder="Enter Description of Complaint..."
//           placeholderTextColor="gray"
//           multiline
//           value={description}
//           onChangeText={setDescription}
//           style={{ height: 120, textAlignVertical: "top", color: "black", marginTop: 5 }}
//         />
//       </View>

//       <MyBtn title="Submit Complaint" style={{ margin: 10, borderRadius:10 }} onPress={handleSubmitComplaint} />
//     </View>
//   );
// };

// export default NewComplaint;




















// import React, { useEffect, useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";
// import { MyBtn } from "../NavigationFile";
// import { SelectList } from "react-native-dropdown-select-list";
// import axios from "axios";

// const NewComplaint = ({ route, navigation }) => {
//   const { id } = route.params; 
//   const [zoneItems, setZoneItems] = useState([]);
//   const [zoneValue, setZoneValue] = useState(""); 
//   const [zoneId, setZoneId] = useState(""); 
//   const [description, setDescription] = useState(""); 
//   const [profileImage, setProfileImage] = useState(null);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   useEffect(() => {
//     const fetchZones = async () => {
//       try {
//         const response = await fetch(`${global.ApiURL}allZones`);
//         if (!response.ok) throw new Error("Failed to fetch zones");

//         const data = await response.json();
//         const zonesArray = Array.isArray(data) ? data[0] : [];

//         setZoneItems(
//           zonesArray.map((zone) => ({
//             label: `${zone["Start Point"]} to ${zone["End Point"]}`,
//             value: `${zone["Start Point"]} to ${zone["End Point"]}`,
//           }))
//         );
//       } catch (error) {
//         console.error("Error fetching zones:", error);
//         Alert.alert("Error", "Failed to load zones.");
//       }
//     };

//     fetchZones();
//   }, []);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await axios.get(`${global.ApiURL}/getUserById/${id}`);
//         if (response.data) {
//           setProfileImage(response.data.profile ? `${global.ApiURL}/${response.data.profile}` : null);
//         }
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       }
//     };
    
//     if (id) {
//       fetchUserProfile();
//     }
//   }, [id]);

//   const handleZoneSelection = async (selectedZone) => {
//     setZoneValue(selectedZone);
//     const [start, end] = selectedZone.split(" to ").map((item) => item.trim());

//     try {
//       const response = await fetch(`${global.ApiURL}getZoneDetails`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ start, end }),
//       });

//       if (!response.ok) throw new Error("Failed to fetch zone details");

//       const data = await response.json();

//       if (data?.["Zone ID"]) {
//         setZoneId(data["Zone ID"]);
//       } else {
//         Alert.alert("Error", "Zone ID not found.");
//       }
//     } catch (error) {
//       console.error("Error fetching zone ID:", error);
//       Alert.alert("Error", "Failed to fetch zone details.");
//     }
//   };

//   const handleSubmitComplaint = async () => {
//     if (!zoneId || !description.trim()) {
//       Alert.alert("Error", "Please select a valid zone and enter a complaint description.");
//       return;
//     }
  
//     try {
//       const response = await fetch(`${global.ApiURL}registerComplaint`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userid: id,
//           description,
//           zoneid: zoneId,
//         }),
//       });
  
//       const responseData = await response.json();
//       console.log("Complaint API Response:", responseData);
  
//       if (!response.ok) throw new Error(responseData.message || "Failed to register complaint");
  
//       Alert.alert("Success", "Complaint registered successfully!");
//       navigation.navigate("OrderNow", { id });
//     } catch (error) {
//       console.error("Error:", error);
//       Alert.alert("Error", error.message || "Could not connect to the server.");
//     }
//   };
  

//   return (
//     <View style={{ flex: 1, backgroundColor: "#069349", alignItems: "center", paddingTop: 30 }}>
//       <TouchableOpacity onPress={() => navigation.navigate("Complaint", { id })}>
//         <Icon name="arrow-left" size={24} style={{ right: 140, color: "#fff" }} />
//       </TouchableOpacity>

//       <Image
//         source={profileImage ? { uri: profileImage } : require("../../assets/Images_GreenBelt/profile-avatar.jpg")}
//         style={{ width: 110, height: 110, borderRadius: 60, marginTop: "5%" }}
//       />

//       <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff", marginVertical: 20 }}>
//         Add Complaint
//       </Text>

//       <View style={{ width: "90%", position: "relative", zIndex: 2 }}>
//         <SelectList
//           setSelected={handleZoneSelection}
//           data={zoneItems}
//           placeholder="Select Zone"
//           boxStyles={{ backgroundColor: "#b7e1c5", borderRadius: 10, borderColor: "grey" }}
//           dropdownStyles={{
//             borderColor: "grey",
//             width: "100%",
//             backgroundColor: "#b7e1c5",
//             elevation: 10,
//             maxHeight: 100,
//             position: isDropdownOpen ? "absolute" : "relative",
//             top: isDropdownOpen ? -160 : 0,
//             zIndex: 10,
//           }}
//           defaultOption={zoneValue ? { label: zoneValue, value: zoneValue } : null}
//           onFocus={() => setIsDropdownOpen(true)}
//           onBlur={() => setIsDropdownOpen(false)}
//         />
//       </View>

//       <View style={{ width: "90%", backgroundColor: "#b7e1c5", padding: 15, borderRadius: 10, marginBottom: 20,  marginTop: 20 }}>
//         <Text style={{ fontWeight: "bold", color: "black", fontSize: 18 }}>Description</Text>
//         <TextInput
//           placeholder="Enter Description of Complaint..."
//           placeholderTextColor="gray"
//           multiline
//           value={description}
//           onChangeText={setDescription}
//           style={{ height: 120, textAlignVertical: "top", color: "black", marginTop: 5 }}
//         />
//       </View>

//       <MyBtn title="Submit Complaint" style={{ margin: 10, borderRadius:10 }} onPress={handleSubmitComplaint} />
//     </View>
//   );
// };

// export default NewComplaint;