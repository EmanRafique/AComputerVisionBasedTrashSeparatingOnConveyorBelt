import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const CompletedPickup = ({ navigation, route }) => {
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  const driverid = route?.params?.driverid; 

  useEffect(() => {
    if (driverid) {
      fetchCompletedPickups();
    }
  }, [driverid]);

  const fetchCompletedPickups = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${global.ApiURL}driverTodaysCompletedPickup/${driverid}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      const data = await response.json();
      if (response.ok) {
        setPickups(data || []); // ✅ Directly set the response since it's already an array
      } else {
        setPickups([]);
      }
    } catch (error) {
      console.error("Error fetching pickups:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      {/* Header Section */}
      <View style={{ backgroundColor: "#069349", padding: 15, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 15 }}>
          <FontAwesome name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <Image source={require("../../assets/Images_GreenBelt/profile-avatar.jpg")} style={{ width: 50, height: 50, borderRadius: 25 }} />
      </View>

      {/* Pickup List Header */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 15, paddingHorizontal: 5 }}>
        <Text style={{ fontSize: 20, fontWeight: "900", color: "#000", marginLeft: 5 }}>Location</Text>
        <Text style={{ fontSize: 20, fontWeight: "900", color: "#000", marginRight: 20 }}>Status</Text>
      </View>

      {/* Pickup List */}
      {loading ? (
        <ActivityIndicator size="large" color="#069349" style={{ marginTop: 20 }} />
      ) : pickups.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20, fontSize: 16, color: "#666" }}>No completed pickups found.</Text>
      ) : (
        <ScrollView style={{ flex: 1 }}>
          {pickups.map((item) => (
            <View
              key={item.id}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: "#ddd",
                alignItems: "center",
                paddingHorizontal: 5,
              }}
            >
              <Text style={{ flex: 1, fontSize: 16, color: "#333" }}> {item.pickupaddress}</Text>
              <View style={{ backgroundColor: "#069349", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10 }}>
                <Text style={{ color: "#FFF", fontWeight: "900" }}>{item.status}  </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default CompletedPickup;
























// import React, { useState } from "react";
// import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
// import FontAwesome from "react-native-vector-icons/FontAwesome";

// const CompletedPickup = ({navigation}) => {
//   const pickups = [
//     { id: 1, address: "House No. 10, Street 4, near Saddar, Rawalpindi", status: "Completed" },
//     { id: 2, address: "House No. 22, Street 9, near Mall Road, Rawalpindi", status: "Completed" },
//     { id: 3, address: "House No. 35, Street 5, near Giga Mall, Islamabad", status: "Completed" },
//     { id: 4, address: "House No. 48, Street 12, near Bahria Phase 4, Rawalpindi", status: "Completed" },
//     { id: 5, address: "House No. 51, Street 6, near D-Chowk, Islamabad", status: "Completed" },
//     { id: 6, address: "House No. 63, Street 8, near Metro Station, Rawalpindi", status: "Completed" },
//     { id: 7, address: "House No. 74, Street 11, near Peshawar Morr, Islamabad", status: "Completed" },
//     { id: 8, address: "House No. 85, Street 7, near Faizabad, Rawalpindi", status: "Completed" },
//     { id: 9, address: "House No. 92, Street 3, near Blue Area, Islamabad", status: "Completed" },
//     { id: 10, address: "House No. 104, Street 2, near F-10 Markaz, Islamabad", status: "Completed" },
//     { id: 11, address: "House No. 115, Street 5, near G-9 Markaz, Islamabad", status: "Completed" },
//     { id: 12, address: "House No. 127, Street 10, near Murree Road, Rawalpindi", status: "Completed" },
//     { id: 13, address: "House No. 133, Street 8, near Diplomatic Enclave, Islamabad", status: "Completed" },
//     { id: 14, address: "House No. 146, Street 4, near Centaurus Mall, Islamabad", status: "Completed" },
//     { id: 15, address: "House No. 159, Street 6, near Gulberg Greens, Islamabad", status: "Completed" },
//   ];

//   return (
//     <View style={{ flex: 1, backgroundColor: "#FFF",  }}>
//       {/* Header Section */}
//       <View
//         style={{
//             backgroundColor: "#069349",
//             padding: 15,
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "space-between", 
//         }}
//         >
//         {/* Back Arrow */}
//         <TouchableOpacity onPress={()=> navigation.goBack()} style={{ marginRight: 15 }}>
//             <FontAwesome name="arrow-left" size={24} color="#FFF" />
//         </TouchableOpacity>

//         {/* Profile Image */}
//         <Image
//             source={require("../../assets/Images_GreenBelt/profile-avatar.jpg")}
//             style={{ width: 50, height: 50, borderRadius: 25 }}
//         />
//     </View>


//       {/* Pickup List Header */}
//       <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 15, paddingHorizontal: 5 }}>
//         <Text style={{ fontSize: 20, fontWeight: "900", color: "#000", marginLeft:5}}>Location</Text>
//         <Text style={{ fontSize: 20, fontWeight: "900", color: "#000", marginRight:20 }}>Status</Text>
//       </View>

//       {/* Pickup List */}
//       <ScrollView style={{ flex: 1 }}>
//         {pickups.map((item) => (
//           <View
//             key={item.id}
//             style={{
//               flexDirection: "row",
//               justifyContent: "space-between",
//               paddingVertical: 12,
//               borderBottomWidth: 1,
//               borderBottomColor: "#ddd",
//               alignItems: "center",
//               paddingHorizontal: 5,
//             }}
//           >
//             <Text style={{ flex: 1, fontSize: 16, color: "#333" }}>{item.address}</Text>

//             <View
//               style={{
//                 backgroundColor: "#069349",
//                 paddingVertical: 5,
//                 paddingHorizontal: 10,
//                 borderRadius: 10,
//               }}
//             >
//               <Text style={{ color: "#FFF", fontWeight: "900" }}>{item.status}</Text>
//             </View>
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// export default CompletedPickup;
