import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, ActivityIndicator, Alert } from "react-native";
import { AdminHeader } from "../NavigationFile";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";

const TruckManagement = ({ navigation }) => {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrucks();
  }, []);

  // Fetch Trucks API
  const fetchTrucks = async () => {
    try {
      console.log("Fetching trucks...");
      const response = await axios.get(`${global.ApiURL}allTrucks`, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      });

      console.log("API Response:", response.data);
      setTrucks(response.data);
    } catch (error) {
      console.error("Error fetching trucks:", error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle Truck Status API
  const toggleTruckStatus = async (truckid, currentStatus) => {
    const apiUrl = `${global.ApiURL}${currentStatus === "active" ? "activeToInactiveTruck" : "inactiveToActiveTruck"}`;
    try {
      const response = await axios.post(apiUrl, { truckid });

      Alert.alert("Success", response.data.message); // Show success message
      fetchTrucks(); // Refresh the list
    } catch (error) {
      console.error("Error updating truck status:", error);
      Alert.alert("Error", "Failed to update truck status.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <AdminHeader />

      {loading ? (
        <ActivityIndicator size="large" color="black" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={trucks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "white",
                padding: 15,
                borderRadius: 10,
                marginHorizontal: 20,
                marginBottom: 10,
                marginTop: index === 0 ? 40 : 0,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: index === 0 ? 15 : 5,
              }}
            >
              <Image
                source={require("../../assets/Images_GreenBelt/Truck.png")}
                style={{ width: 45, height: 40, marginRight: 15 }}
              />

              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.licensenumber}</Text>
                <Text style={{ color: "gray" }}>{item.model}</Text>
              </View>

              {/* Status Toggle Button */}
              <TouchableOpacity
                onPress={() => toggleTruckStatus(item.id, item.status)}
                style={{
                  width: 80,
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: item.status === "active" ? "#4CAF50" : "#FF5733",
                  borderRadius: 5,
                }}
              >
                <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>
                  {item.status === "active" ? "Active" : "Inactive"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* Floating Add Truck Button */}
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 30,
          right: 30,
          width: 50,
          height: 50,
          backgroundColor: "black",
          borderRadius: 25,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => navigation.navigate("AddNewTruck")}
      >
        <Icon name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default TruckManagement;

































// import React from "react";
// import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { AdminHeader } from "../NavigationFile";
// import Icon from "react-native-vector-icons/FontAwesome";

// const trucks = [
//   { id: "1", number: "#FBC 344" },
//   { id: "2", number: "#ABC 123" },
//   { id: "3", number: "#LLC 190" },
//   { id: "4", number: "#RPA 144" },
//   { id: "5", number: "#IBC 654" },
// ];

// const TruckManagement = ({navigation}) => {
//   return (
//     <View style={{ flex: 1, backgroundColor: "white" }}>
//       <AdminHeader />
//       <Text style={{ fontSize: 30, fontWeight: "bold", margin: 20, justifyContent:'center',textAlign:'center' }}>Trucks</Text>
//       <FlatList
//         data={trucks}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={{
//               flexDirection: "row",
//               alignItems: "center",
//               backgroundColor: "white",
//               padding: 15,
//               borderRadius: 10,
//               marginHorizontal: 20,
//               marginBottom: 10,
//               shadowColor: "#000",
//               shadowOffset: { width: 0, height: 1 },
//               shadowOpacity: 0.2,
//               shadowRadius: 2,
//               elevation: 10,  
//             }}
//           >
//             <Image
//               source={require("../../assets/Images_GreenBelt/Truck.png")}
//               style={{ width: 45, height: 40, marginRight: 15 }}
//             />
//             <View style={{ flex: 1 }}>
//               <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.number}</Text>
//               <Text style={{ color: "gray" }}>On the way • 24 June</Text>
//             </View>
//             <Ionicons name="chevron-forward" size={20} color="gray" />
//           </TouchableOpacity>
//         )}
//       />
//     <TouchableOpacity style={{position: "absolute",bottom: 30,right: 30,width: 50,height: 50,
//         backgroundColor: "black",borderRadius: 25,justifyContent: "center",alignItems: "center",}}
//         onPress={() => navigation.navigate("AddNewTruck")} >
//         <Icon name="plus" size={24} color="white" />
//     </TouchableOpacity>
//     </View>
//   );
// };

// export default TruckManagement;
