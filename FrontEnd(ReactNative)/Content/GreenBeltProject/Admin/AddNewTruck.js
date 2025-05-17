import React, { useState } from "react";
import { View, Image, Text, Alert } from "react-native";
import { AdminHeader, MyTextInput, MyBtn } from "../NavigationFile";
import axios from "axios";

const AddNewTruck = ({ navigation }) => {
  const [licensenumber, setLicenseNumber] = useState("");
  const [model, setModel] = useState("");
  const [chassisnumber, setChassisNumber] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to add a truck
  const addTruck = async () => {
    if (!licensenumber || !model || !chassisnumber) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${global.ApiURL}addTruck`, {
        licensenumber,
        model,
        chassisnumber,
        status: "active", // Default status
      });

      Alert.alert("Success", response.data); // Show success message
      navigation.goBack(); // Go back to Truck List
    } catch (error) {
      console.error("Error adding truck:", error);
      Alert.alert("Error", "Failed to add truck.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <AdminHeader />

      {/* Centered Image */}
      <View style={{ alignItems: "center", marginVertical: 10 }}>
        <Image
          source={require("../../assets/Images_GreenBelt/Truck.png")}
          style={{ width: 150, height: 150 }}
        />
      </View>

      <View style={{ marginHorizontal: 20 }}>
        <Text style={{ fontWeight: "900", fontSize: 18 }}>Truck Number</Text>
        <MyTextInput iconName="truck" placeholder="Enter truck number" value={licensenumber} onChangeText={setLicenseNumber} />

        <Text style={{ fontWeight: "900", fontSize: 18 }}>Model</Text>
        <MyTextInput iconName="calendar" placeholder="Enter model" value={model} onChangeText={setModel} />

        <Text style={{ fontWeight: "900", fontSize: 18 }}>Chassis Number</Text>
        <MyTextInput iconName="barcode" placeholder="Enter chassis number" value={chassisnumber} onChangeText={setChassisNumber} />

        {/* Add Button */}
        <View style={{ marginTop: 20, left: 20 }}>
          <MyBtn title={loading ? "Adding..." : "Add"} onPress={addTruck} disabled={loading} />
        </View>
      </View>
    </View>
  );
};

export default AddNewTruck;




















// import { View, Image, Text } from 'react-native';
// import { AdminHeader, MyTextInput, MyBtn } from "../NavigationFile";

// const AddNewTruck = () => {
//     return (
//         <View style={{ flex: 1, backgroundColor: 'white' }}>
//             <AdminHeader />
            
//             {/* Centered Image */}
//             <View style={{ alignItems: 'center', marginVertical: 10 }}>
//                 <Image
//                     source={require("../../assets/Images_GreenBelt/Truck.png")}
//                     style={{ width: 150, height: 150 }}
//                 />
//             </View>

//             <View style={{ marginHorizontal: 20 }}>
//                 <Text style={{ fontWeight: '900', fontSize: 18 }}>Truck Number</Text>
//                 <MyTextInput iconName="truck" placeholder="Enter truck number" />

//                 <Text style={{ fontWeight: '900', fontSize: 18 }}>Model</Text>
//                 <MyTextInput iconName="calendar" placeholder="Enter model" />

//                 <Text style={{ fontWeight: '900', fontSize: 18 }}>Chassis Number</Text>
//                 <MyTextInput iconName="barcode" placeholder="Enter chassis number" />

//                 {/* Add Button */}
//                 <View style={{ marginTop: 20 }}>
//                     <MyBtn title="Add" onPress={() => console.log("Truck added")} />
//                 </View>
//             </View>
//         </View>
//     );
// }

// export default AddNewTruck;
