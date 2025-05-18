import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { MyBtn } from "../NavigationFile";
import { useNavigation, useRoute } from "@react-navigation/native";

const MapAddress = () => {
    const [marker, setMarker] = useState(null);
    const navigation = useNavigation();
    const route = useRoute();
    const userId = route.params?.id;

    // Fetch saved location when the component mounts
    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const response = await fetch(`${global.ApiURL}/addAddress/${userId}`, {
                    method: "GET",
                });
                const data = await response.json();
                if (response.ok) {
                    setMarker({
                        latitude: data.latitude,
                        longitude: data.longitude,
                    });
                }
            } catch (error) {
                console.log("Error fetching saved location:", error);
            }
        };
        fetchAddress();
    }, [userId]);

    // Handle map press
    const handleMapPress = (event) => {
        setMarker(event.nativeEvent.coordinate);
    };

    // Handle Save Button Press
    const handleSave = async () => {
        if (!marker) {
            Alert.alert("Error", "Please select a location on the map.");
            return;
        }

        try {
            const response = await fetch(`${global.ApiURL}/saveLocation`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: userId,
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                Alert.alert("Success", "Location saved successfully!");
                navigation.goBack(); // or navigation.navigate("OrderNow", { id: userId });
            } else {
                Alert.alert("Error", result.message || "Failed to save location.");
            }
        } catch (error) {
            console.error("Error saving location:", error);
            Alert.alert("Error", "Something went wrong!");
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {/* Header */}
            <View style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: 15,
                backgroundColor: "#069349"
            }}>
                <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
                    Select Address
                </Text>
            </View>

            {/* Map */}
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 33.6425296,
                    longitude: 73.0783963,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onPress={handleMapPress}
            >
                {marker && (
                    <Marker
                        coordinate={marker}
                        title="Selected Location"
                    />
                )}
            </MapView>

            {/* Save Button */}
            <MyBtn title="Save" onPress={handleSave} style={{ marginLeft: '12%', marginBottom: 10 }} />
        </View>
    );
};

export default MapAddress;













// import React, { useState } from "react";
// import { View, Text, Alert, TouchableOpacity } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import { MyBtn } from "../NavigationFile";

// const MapAddress = () => {
//     const [marker, setMarker] = useState(null);
//     const [dialogVisible, setDialogVisible] = useState(false);
//     const [address, setAddress] = useState("");

//     // Handle user tap on the map
//     const handleMapPress = (event) => {
//         setMarker(event.nativeEvent.coordinate);
//     };

//     // Handle Search Icon Press
//     const handleSearchPress = () => {
//         setDialogVisible(true); // Open input dialog
//     };

//     // Handle Address Submission
//     const handleAddressSubmit = () => {
//         setDialogVisible(false);
//         if (address.trim()) {
//             Alert.alert("Address Entered", `Searching for: ${address}`);
//             console.log("Entered Address:", address);
//         } else {
//             Alert.alert("Error", "Please enter a valid address.");
//         }
//     };

//     return (
//         <View style={{ flex: 1 }}>
//             {/* Top Bar with Search Icon */}
//             <View style={{
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 padding: 15,
//                 backgroundColor: "#069349"
//             }}>
//                 <Text style={{ fontSize: 20, color: "white", fontWeight: "bold", textAlign:'center' }}>
//                     Select Address
//                 </Text>
//                 {/* <TouchableOpacity onPress={handleSearchPress}>
//                     <Icon name="search" size={24} color="white" />
//                 </TouchableOpacity> */}
//             </View>

//             {/* Map View */}
//             <MapView
//                 style={{ flex: 1 }}
//                 initialRegion={{
//                     latitude: 33.6425296,
//                     longitude: 73.0783963,
//                     latitudeDelta: 0.0922,
//                     longitudeDelta: 0.0421
//                 }}
//                 onPress={handleMapPress}
//             >
//                 {marker && <Marker coordinate={marker} title="Selected Location" />}
//             </MapView>

//             {/* Address Input Dialog
//             <Dialog.Container visible={dialogVisible}>
//                 <Dialog.Title>Enter Address</Dialog.Title>
//                 <Dialog.Description>
//                     Format: 147, Street 7, Defence Colony, KRL Road, Rawalpindi
//                 </Dialog.Description>
//                 <Dialog.Input
//                     placeholder="Enter Address"
//                     value={address}
//                     onChangeText={setAddress}
//                 />
//                 <Dialog.Button label="Cancel" onPress={() => setDialogVisible(false)} />
//                 <Dialog.Button label="Search" onPress={handleAddressSubmit} />
//             </Dialog.Container> */}
//             <MyBtn  title={"Save"} style={{ marginLeft:'10%'}}/>
//         </View>
//     );
// };

// export default MapAddress;