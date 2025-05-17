import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DraggableFlatList from "react-native-draggable-flatlist";

const { height } = Dimensions.get("window");

const DriverSchedule = ({ navigation }) => {
  const [pickupData, setPickupData] = useState([
    { id: "1", address: "House No. 10, Street 4, near Saddar, Rawalpindi" },
    { id: "2", address: "House No. 22, Street 9, near Mall Road, Rawalpindi" },
    { id: "3", address: "House No. 35, Street 5, near Giga Mall, Islamabad" },
    { id: "4", address: "House No. 48, Street 12, near Bahria Phase 4, Rawalpindi" },
    { id: "5", address: "House No. 51, Street 6, near D-Chowk, Islamabad" },
  ]);

  const [newRequests, setNewRequests] = useState([
    { id: "6", address: "House No. 74, Street 11, near Peshawar Morr, Islamabad" },
    { id: "7", address: "House No. 85, Street 7, near Faizabad, Rawalpindi" },
    { id: "8", address: "House No. 92, Street 3, near Blue Area, Islamabad" },
  ]);

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
      {/* Header */}
      <View
        style={{
          backgroundColor: "#069349",
          padding: 15,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          elevation: 5,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <Image
          source={require("../../assets/Images_GreenBelt/profile-avatar.jpg")}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
      </View>

      {/* Content Section */}
      <View style={{ flex: 1, paddingHorizontal: 10, marginTop: 10 }}>
        {/* Pickup Section */}
        <Text style={{ fontSize: 20, fontWeight: "900", color: "black", marginBottom: 5 }}>
          Pickup Locations
        </Text>
        <DraggableFlatList
          data={pickupData}
          keyExtractor={(item) => item.id}
          onDragEnd={({ data }) => setPickupData(data)}
          renderItem={({ item, drag }) => (
            <TouchableOpacity
              onLongPress={drag}
              style={{
                backgroundColor: "#FFF",
                padding: 15,
                borderRadius: 10,
                marginBottom: 8,
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 3,
              }}
            >
              <Text style={{ fontSize: 16, color: "#333" }}>{item.address}</Text>
            </TouchableOpacity>
          )}
        />

        {/* New Requests Section */}
        <Text style={{ fontSize: 20, fontWeight: "900", color: "black", marginBottom: 5, marginTop: 10 }}>
          New Requests
        </Text>
        <DraggableFlatList
          data={newRequests}
          keyExtractor={(item) => item.id}
          onDragEnd={({ data }) => setNewRequests(data)}
          renderItem={({ item, drag }) => (
            <TouchableOpacity
              onLongPress={drag}
              style={{
                backgroundColor: "#FFF",
                padding: 15,
                borderRadius: 10,
                marginBottom: 8,
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 3,
              }}
            >
              <Text style={{ fontSize: 16, color: "#333" }}>{item.address}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default DriverSchedule;
