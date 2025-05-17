



import React, { useEffect, useState } from "react";
import { View, Text, Alert, TextInput, ScrollView } from "react-native";
import { MyBtn, MyHeader } from '../NavigationFile'; 
import axios from "axios";
import { SelectList } from "react-native-dropdown-select-list";
import { ActivityIndicator } from "react-native-paper";

const BarcodePurchase = ({ navigation, route }) => {
    const userId = route.params?.id;
    const [zoneId, setZoneId] = useState(null); 
    const [zoneValue, setZoneValue] = useState("");
    const [zoneItems, setZoneItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [selectedZone, setSelectedZone] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const pricePerStrip = 100;
    const [recyclableStrips, setRecyclableStrips] = useState("");
    const [mixStrips, setMixStrips] = useState("");

    const totalStrips = (parseInt(recyclableStrips) || 0) + (parseInt(mixStrips) || 0);
    const totalAmount = totalStrips * pricePerStrip;

    useEffect(() => {
        const fetchUserProfile = async () => {
          try {
            const response = await axios.get(`${global.ApiURL}/getUserById/${userId}`);
            if (response.data) {
              setProfileImage(response.data.profile ? `${global.ApiURL}/${response.data.profile}` : null);
            }
          } catch (error) {
            console.error("Error fetching profile:", error);
          }
        };
        
        if (userId) {
          fetchUserProfile();
        }
      }, [userId]);

    useEffect(() => {
        const fetchZones = async () => {
          try {
            const response = await fetch(`${global.ApiURL}allZones`);
            const data = await response.json();
            const zonesArray = Array.isArray(data) ? data[0] : [];
            setZoneItems(zonesArray.map(zone => ({
              label: `${zone["Start Point"]} to ${zone["End Point"]}`,
              value: `${zone["Start Point"]} to ${zone["End Point"]}`,
            })));
          } catch (error) {
            console.error("Error fetching zones:", error);
          } finally {
            setLoading(false);
          }
        };
        fetchZones();
      }, []);
    
      const handleZoneSelection = async (selectedZone) => {
        setZoneValue(selectedZone);
        setSelectedZone(selectedZone); 
        const [start, end] = selectedZone.split(" to ").map((item) => item.trim());
      
        try {
          const response = await fetch(`${global.ApiURL}getZoneDetails`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ start, end }),
          });
      
          const data = await response.json();
      
          if (data?.["Zone ID"]) {  
            setZoneId(data["Zone ID"]); 
          } else {
            console.error("Zone ID not found for selected zone.");
          }
        } catch (error) {
          console.error("Error fetching zone ID:", error);
        }
      };

      const handleDonePress = async () => {
        console.log("Handling Done Press...");
        console.log("Selected Zone:", zoneValue);
        console.log("Recyclable Strips:", recyclableStrips || 0);
        console.log("Non-Recyclable Strips:", mixStrips || 0);
        console.log("Total Strips:", totalStrips);
        console.log("Total Amount:", totalAmount);
    
        if (!zoneValue) {
            Alert.alert('Select a zone first!');
            console.error("Error: No zone selected.");
            return;
        }
    
        if (!selectedZone) {
            console.error("No zone selected");
            return;
        }
    
        if (!recyclableStrips && !mixStrips) {
            Alert.alert('Select strips first!');
            console.error("Error: No strips selected.");
            return;
        }
    
        Alert.alert(
            "Confirm your selection",
            `Are you sure you want to purchase ${totalStrips} strips?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Continue",
                    onPress: async () => {
                        try {
                            setLoading(true);
    
                            if (!zoneId) {
                                Alert.alert("Error", "Invalid zone selection. Please try again.");
                                return;
                            }
                            if (!userId) {
                                Alert.alert("Error", "User ID is missing. Please try again.");
                                return;
                            }
    
                            const recyclableCount = parseInt(recyclableStrips) || 0;
                            const mixCount = parseInt(mixStrips) || 0;
    
                            const strips = [];
    
                            if (recyclableCount > 0) {
                                strips.push({ count: recyclableCount, type: "recyclable" });
                            }
                            if (mixCount > 0) {
                                strips.push({ count: mixCount, type: "nonrecyclable" });
                            }
    
                            if (strips.length === 0) {
                                Alert.alert("Error", "Please select at least one strip.");
                                return;
                            }
    
                            const requestBody = {
                                userid: userId,
                                zoneid: zoneId,
                                strips: strips
                            };
    
                            console.log("📤 Sending request:", JSON.stringify(requestBody));
    
                            const response = await fetch(global.ApiURL + "addBarcodeStrip", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(requestBody),
                            });
    
                            const result = await response.json();
                            console.log("✅ Server Response:", result);
    
                            if (response.ok) {
                                console.log("✅ Barcode generated successfully!");
                                navigation.navigate("DownloadStrips", { userId });
                            } else {
                                throw new Error(result.error || "Failed to generate barcode.");
                            }
                        } catch (error) {
                            console.error("❌ Error in handleDonePress:", error);
                            Alert.alert("Error", "Something went wrong. Please try again.");
                        } finally {
                            setLoading(false);
                        }
                    }
                }
            ],
            { cancelable: true }
        );
    };    

    return (
        <View style={{ flex: 1, backgroundColor: "#f1f1e6", paddingBottom: 20 }}>
            {/* <MyHeader/> */}
            <MyHeader userId={route.params?.id} />

            <View style={{ marginHorizontal: 20, marginTop: 40 }}>
                <ScrollView style={{ maxHeight: 250 }}>
                    <SelectList
                        setSelected={handleZoneSelection}
                        data={zoneItems} 
                        placeholder="Select Zone"                 
                        boxStyles={{ backgroundColor: "#fff", borderRadius: 10, borderColor: "grey" }}
                        dropdownStyles={{ borderColor: "grey", width: "100%", backgroundColor: "#fff", elevation: 5, maxHeight: 200 }}
                        defaultOption={zoneValue ? { label: zoneValue, value: zoneValue } : undefined} 
                        onFocus={() => setIsDropdownOpen(true)} 
                        onBlur={() => setIsDropdownOpen(false)}
                    />
                </ScrollView>

                {/* Recyclable Strips */}
                <View style={{ backgroundColor: "#fff", borderRadius: 10, elevation: 3, padding: 15, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>Recyclable</Text>
                    <TextInput
                        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 6, width: "55%", textAlign: 'center', backgroundColor: '#fff' }}
                        placeholder = "Strips  |    XX"
                        value={recyclableStrips}  
                        onChangeText={text => {
                            const cleanedText = text.replace(/[^0-9]/g, '').replace(/^0+/, '') || "0";
                            setRecyclableStrips(cleanedText || "0");
                            console.log("Recyclable Strips Updated:", cleanedText);
                        }}
                        keyboardType="numeric"
                    />
                </View>

                {/* Non-Recyclable Strips */}
                <View style={{ backgroundColor: "#fff", borderRadius: 10, elevation: 3, padding: 15, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 15 }}>
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>Non-Recyclable</Text>
                    <TextInput
                        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 6, width: "55%", textAlign: 'center', backgroundColor: '#fff' }}
                        placeholder="Strips  |    XX"
                        value={mixStrips}  
                        onChangeText={text => {
                            const cleanedText = text.replace(/[^0-9]/g, '').replace(/^0+/, '');
                            setMixStrips(cleanedText || "0");
                            console.log("Non-Recyclable Strips Updated:", cleanedText || 0);
                        }}
                        keyboardType="numeric"
                    />
                </View>
            </View>

            {/* Billing Items Section */}
            <View style={{ backgroundColor: "#fff", marginHorizontal: 20, borderRadius: 10, padding: 15, elevation: 3, marginTop: 20 }}>
                <Text style={{ fontSize: 30, fontWeight: "900", marginBottom: 15, textDecorationLine:'underline' }}>Billing Items</Text>
                <Text style={{ fontSize: 16, marginBottom: 5 }}>Total Strips: {totalStrips}</Text>
                <Text style={{ fontSize: 16, marginBottom: 5 }}>Total Amount: {totalAmount} RS</Text>
                <Text style={{ fontSize: 16, marginBottom: 5 }}>Details: Recyclable {recyclableStrips || 0}, Non-Recyclable {mixStrips || 0}</Text>
            </View>

            {/* Done Button */}
            <MyBtn 
                title="Done" 
                onPress={handleDonePress} 
                style={{ marginTop: 40, marginLeft: 50 }} 
            />
          {loading && (
            <View style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: [{ translateX: -25 }, { translateY: -25 }],
                zIndex: 1
            }}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        )}
        </View>  
    );
};

export default BarcodePurchase;





















// import React, { useEffect, useState } from "react";
// import { View, Text, Alert, TextInput, ScrollView } from "react-native";
// import { MyBtn, MyHeader } from '../NavigationFile'; 
// import axios from "axios";
// import { SelectList } from "react-native-dropdown-select-list";
// import { ActivityIndicator } from "react-native-paper";

// const BarcodePurchase = ({ navigation, route }) => {
//     const userId = route.params?.id;
//     const [zoneId, setZoneId] = useState(null); 
//     const [zoneValue, setZoneValue] = useState("");
//     const [zoneItems, setZoneItems] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [profileImage, setProfileImage] = useState(null);
//     const [selectedZone, setSelectedZone] = useState(null);
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//     const pricePerStrip = 100;
//     const [recyclableStrips, setRecyclableStrips] = useState("");
//     const [mixStrips, setMixStrips] = useState("");

//     const totalStrips = (parseInt(recyclableStrips) || 0) + (parseInt(mixStrips) || 0);
//     const totalAmount = totalStrips * pricePerStrip;

//     useEffect(() => {
//         const fetchUserProfile = async () => {
//           try {
//             const response = await axios.get(`${global.ApiURL}/getUserById/${userId}`);
//             if (response.data) {
//               setProfileImage(response.data.profile ? `${global.ApiURL}/${response.data.profile}` : null);
//             }
//           } catch (error) {
//             console.error("Error fetching profile:", error);
//           }
//         };
        
//         if (userId) {
//           fetchUserProfile();
//         }
//       }, [userId]);

//     useEffect(() => {
//         const fetchZones = async () => {
//           try {
//             const response = await fetch(`${global.ApiURL}allZones`);
//             const data = await response.json();
//             const zonesArray = Array.isArray(data) ? data[0] : [];
//             setZoneItems(zonesArray.map(zone => ({
//               label: `${zone["Start Point"]} to ${zone["End Point"]}`,
//               value: `${zone["Start Point"]} to ${zone["End Point"]}`,
//             })));
//           } catch (error) {
//             console.error("Error fetching zones:", error);
//           } finally {
//             setLoading(false);
//           }
//         };
//         fetchZones();
//       }, []);
    
//       const handleZoneSelection = async (selectedZone) => {
//         setZoneValue(selectedZone);
//         setSelectedZone(selectedZone); 
//         const [start, end] = selectedZone.split(" to ").map((item) => item.trim());
      
//         try {
//           const response = await fetch(`${global.ApiURL}getZoneDetails`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ start, end }),
//           });
      
//           const data = await response.json();
      
//           if (data?.["Zone ID"]) {  
//             setZoneId(data["Zone ID"]); 
//           } else {
//             console.error("Zone ID not found for selected zone.");
//           }
//         } catch (error) {
//           console.error("Error fetching zone ID:", error);
//         }
//       };

//     const handleDonePress = async () => {
//         console.log("Handling Done Press...");
//         console.log("Selected Zone:", zoneValue);
//         console.log("Recyclable Strips:", recyclableStrips || 0);
//         console.log("Non-Recyclable Strips:", mixStrips || 0);
//         console.log("Total Strips:", totalStrips);
//         console.log("Total Amount:", totalAmount);

//         if (!zoneValue) {
//             Alert.alert('Select a zone first!');
//             console.error("Error: No zone selected.");
//             return;
//         }

//         if (!selectedZone) {
//             console.error("No zone selected");
//             return;
//         }

//         if (!recyclableStrips && !mixStrips) {
//             Alert.alert('Select strips first!');
//             console.error("Error: No strips selected.");
//             return;
//         }

//         Alert.alert(
//           "Confirm your selection",
//           `Are you sure you want to purchase ${totalStrips} strips?`,
//           [
//               { text: "Cancel", style: "cancel" },
//               {
//                   text: "Continue",
//                   onPress: async () => {
//                       try {
//                           setLoading(true); // Start loading
//                           if (!zoneId) {
//                               Alert.alert("Error", "Invalid zone selection. Please try again.");
//                               return;
//                           }
//                           if (!userId) {
//                               Alert.alert("Error", "User ID is missing. Please try again.");
//                               return;
//                           }
      
//                           const stripCounts = [];
//                           const types = [];
      
//                           const recyclableCount = parseInt(recyclableStrips) || 0;
//                           const mixCount = parseInt(mixStrips) || 0;
      
//                           if (recyclableCount > 0) {
//                               stripCounts.push(recyclableCount);
//                               types.push("recyclable");
//                           }
//                           if (mixCount > 0) {
//                               stripCounts.push(mixCount);
//                               types.push("nonrecyclable");
//                           }
      
//                           if (stripCounts.length === 0) {
//                               Alert.alert("Error", "Please select at least one strip.");
//                               return;
//                           }
      
//                           const requestBody = {
//                               userid: userId,
//                               stripcount: stripCounts,
//                               type: types,
//                               zoneid: zoneId
//                           };
      
//                           console.log("📤 Sending request:", JSON.stringify(requestBody));
      
//                           const response = await fetch(global.ApiURL + "addBarcodeStrip", {
//                               method: "POST",
//                               headers: { "Content-Type": "application/json" },
//                               body: JSON.stringify(requestBody),
//                           });
      
//                           const result = await response.json();
//                           console.log("✅ Server Response:", result);
      
//                           if (response.ok) {
//                               console.log("✅ Barcode generated successfully!");
//                               navigation.navigate("DownloadStrips", {userId});
//                           } else {
//                               throw new Error(result.error || "Failed to generate barcode.");
//                           }
//                       } catch (error) {
//                           console.error("❌ Error in handleDonePress:", error);
//                           Alert.alert("Error", "Something went wrong. Please try again.");
//                       } finally {
//                         setLoading(false); // Stop loading
//                     }
//                   }
//               }
//           ],
//           { cancelable: true }
//       );      
//     };

//     return (
//         <View style={{ flex: 1, backgroundColor: "#f1f1e6", paddingBottom: 20 }}>
//             {/* <MyHeader/> */}
//             <MyHeader userId={route.params?.id} />

//             <View style={{ marginHorizontal: 20, marginTop: 40 }}>
//                 <ScrollView style={{ maxHeight: 250 }}>
//                     <SelectList
//                         setSelected={handleZoneSelection}
//                         data={zoneItems} 
//                         placeholder="Select Zone"                 
//                         boxStyles={{ backgroundColor: "#fff", borderRadius: 10, borderColor: "grey" }}
//                         dropdownStyles={{ borderColor: "grey", width: "100%", backgroundColor: "#fff", elevation: 5, maxHeight: 200 }}
//                         defaultOption={zoneValue ? { label: zoneValue, value: zoneValue } : undefined} 
//                         onFocus={() => setIsDropdownOpen(true)} 
//                         onBlur={() => setIsDropdownOpen(false)}
//                     />
//                 </ScrollView>

//                 {/* Recyclable Strips */}
//                 <View style={{ backgroundColor: "#fff", borderRadius: 10, elevation: 3, padding: 15, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 20 }}>
//                     <Text style={{ fontSize: 16, fontWeight: "600" }}>Recyclable</Text>
//                     <TextInput
//                         style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 6, width: "55%", textAlign: 'center', backgroundColor: '#fff' }}
//                         placeholder = "Strips  |    XX"
//                         value={recyclableStrips}  
//                         onChangeText={text => {
//                             const cleanedText = text.replace(/[^0-9]/g, '').replace(/^0+/, '') || "0";
//                             setRecyclableStrips(cleanedText || "0");
//                             console.log("Recyclable Strips Updated:", cleanedText);
//                         }}
//                         keyboardType="numeric"
//                     />
//                 </View>

//                 {/* Non-Recyclable Strips */}
//                 <View style={{ backgroundColor: "#fff", borderRadius: 10, elevation: 3, padding: 15, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 15 }}>
//                     <Text style={{ fontSize: 16, fontWeight: "600" }}>Non-Recyclable</Text>
//                     <TextInput
//                         style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 6, width: "55%", textAlign: 'center', backgroundColor: '#fff' }}
//                         placeholder="Strips  |    XX"
//                         value={mixStrips}  
//                         onChangeText={text => {
//                             const cleanedText = text.replace(/[^0-9]/g, '').replace(/^0+/, '');
//                             setMixStrips(cleanedText || "0");
//                             console.log("Non-Recyclable Strips Updated:", cleanedText || 0);
//                         }}
//                         keyboardType="numeric"
//                     />
//                 </View>
//             </View>

//             {/* Billing Items Section */}
//             <View style={{ backgroundColor: "#fff", marginHorizontal: 20, borderRadius: 10, padding: 15, elevation: 3, marginTop: 20 }}>
//                 <Text style={{ fontSize: 30, fontWeight: "900", marginBottom: 15, textDecorationLine:'underline' }}>Billing Items</Text>
//                 <Text style={{ fontSize: 16, marginBottom: 5 }}>Total Strips: {totalStrips}</Text>
//                 <Text style={{ fontSize: 16, marginBottom: 5 }}>Total Amount: {totalAmount} RS</Text>
//                 <Text style={{ fontSize: 16, marginBottom: 5 }}>Details: Recyclable {recyclableStrips || 0}, Non-Recyclable {mixStrips || 0}</Text>
//             </View>

//             {/* Done Button */}
//             <MyBtn 
//                 title="Done" 
//                 onPress={handleDonePress} 
//                 style={{ marginTop: 40, marginLeft: 50 }} 
//             />
//           {loading && (
//             <View style={{
//                 position: 'absolute',
//                 top: '50%',
//                 left: '50%',
//                 transform: [{ translateX: -25 }, { translateY: -25 }],
//                 zIndex: 1
//             }}>
//                 <ActivityIndicator size="large" color="#000" />
//             </View>
//         )}
//         </View>  
//     );
// };

// export default BarcodePurchase;