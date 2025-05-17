import React from "react";
import { View, Text, FlatList } from "react-native";
import { MyHeader } from "../NavigationFile";

const pickups = [
  { id: "1", address: "House No. 25, Street 7, near BIIT institute, Rawalpindi", day: "Monday", status: "Completed" },
  { id: "2", address: "House No. 45, Street 10, near G-15, Rawalpindi", day: "Tuesday", status: "Completed" },
  { id: "3", address: "House No. 77, Street 11, near Dubai Plaza, Rawalpindi", day: "Wednesday", status: "Completed" },
  { id: "4", address: "House No. 67, Street 8, near NADRA Office Rehmanabad, Rawalpindi", day: "Thursday", status: "Completed" },
  { id: "5", address: "House No. 85, Street 9, near Rehmanabad, Rawalpindi", day: "Friday", status: "Completed" },
];

const CompletedSchedule = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#F8F8F2" }}>
      <MyHeader />

      <View style={{ flexDirection: "row", padding: 10, borderBottomWidth: 1, borderColor: "#ddd" }}>
        <Text style={{ flex: 2, fontWeight: "900", fontSize: 18 }}>Location</Text>
        <Text style={{ flex: 1, fontWeight: "900", fontSize: 18, textAlign: "center" }}>Status</Text>
      </View>

      <FlatList
        data={pickups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", padding: 10, alignItems: "center", borderBottomWidth: 1, borderColor: "#ddd" }}>
            <View style={{ flex: 2 }}>
              <Text style={{ fontSize: 16 }}>{item.address}</Text>
              <Text style={{ fontSize: 15, color: "#555", marginTop:8 }}>{item.day}</Text> 
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <View style={{ backgroundColor: "#069349", paddingVertical: 5, paddingHorizontal: 15, borderRadius: 10 }}>
                <Text style={{ color: "white", fontWeight: "bold" }}>{item.status}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default CompletedSchedule;
