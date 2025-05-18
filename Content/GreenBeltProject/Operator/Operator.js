import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  PermissionsAndroid,
  Platform,
  ScrollView,
} from "react-native";
import { Camera } from "react-native-camera-kit";
import { MyBtn } from "../NavigationFile";
import axios from "axios";
import { launchImageLibrary } from "react-native-image-picker";

const OperatorScreen = ({ navigation, route }) => {
  const operatorid = route.params?.id;
  const [qrDetails, setQrDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [lastScanTime, setLastScanTime] = useState(0);
  const [scannedBarcode, setScannedBarcode] = useState("");
  const DEBOUNCE_TIME = 5000;

  useEffect(() => {
    (async () => {
      if (Platform.OS === "android") {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );
      }
      try {
        const res = await axios.get(
          `${global.ApiURL}getEmployeeById/${operatorid}`
        );
        if (res.status === 200) setName(res.data.name);
      } catch {
        Alert.alert("Error", "Failed to fetch operator details.");
      }
    })();
  }, [operatorid]);

  const onBarcodeScan = async (evt) => {
    const code = evt.nativeEvent.codeStringValue;
    const now = Date.now();
    if (now - lastScanTime < DEBOUNCE_TIME) return;

    setLoading(true);
    try {
      const res = await axios.get(
        `${global.ApiURL}fetchDetailsByQR/${code}`
      );
      if (res.status === 200) {
        setQrDetails(res.data.details);
        setScannedBarcode(code);
      } else {
        Alert.alert("Error", res.data.message || "Unknown error");
      }
    } catch {
      Alert.alert("Error", "Failed to fetch QR details.");
    } finally {
      setLoading(false);
      setLastScanTime(now);
    }
  };

  const uploadVideo = () => {
    if (!scannedBarcode) {
      Alert.alert("Error", "Please scan a barcode first.");
      return;
    }
    launchImageLibrary(
      { mediaType: "video", videoQuality: "high", durationLimit: 60 },
      async ({ didCancel, errorCode, assets }) => {
        if (didCancel || errorCode) return;
        const uri = assets[0].uri;
        const fd = new FormData();
        fd.append("video", { uri, type: "video/mp4", name: "video.mp4" });
        fd.append("barcode", scannedBarcode);

        setLoading(true);
        try {
          await axios.post(`${global.ApiURL}processedVideo`, fd, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          const rankRes = await axios.post(
            `${global.ApiURL}rankingUser`,
            { barcode: scannedBarcode }
          );
          const d = rankRes.data;
          navigation.navigate("TrashSummary", {
            userName: d.name,
            totalItems: d.total_items,
            recyclableCount: d.total_recyclable_items,
            nonRecyclableCount: d.total_non_recyclable_items,
            organicCount: d.total_organic_items,
            previousRank: d.previous_rank,
            updatedRank: d.updated_rank,
            rankingPercentage: Math.round(d.rank_percentage),
          });
        } catch {
          Alert.alert("Error", "Something went wrong while processing.");
        } finally {
          setLoading(false);
        }
      }
    );
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          backgroundColor: "#069349",
          padding: 15,
          borderRadius: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 25, color: "#F8F8F2", fontWeight: "900" }}>
          Welcome {name}
        </Text>
        <Image
          source={require("../../assets/Images_GreenBelt/profile-avatar.jpg")}
          style={{ width: 80, height: 80, borderRadius: 50 }}
        />
      </View>

      <View style={{ padding: 20, height: 300 }}>
        <Camera
          style={{ flex: 1 }}
          scanBarcode
          onReadCode={onBarcodeScan}
          showFrame
          laserColor="green"
          frameColor="white"
        />
      </View>

      <View style={{ padding: 20 }}>
        {loading && (
          <Text style={{ textAlign: "center", marginVertical: 20 }}>
            Loading...
          </Text>
        )}
        {qrDetails && !loading && (
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "900",
                marginBottom: 8,
              }}
            >
              QR Details: {qrDetails.QR_Type}
            </Text>
            <Text style={{ fontSize: 18 }}>User: {qrDetails.User_Name}</Text>
            <Text style={{ fontSize: 18 }}>
              Phone: {qrDetails.PhoneNumber}
            </Text>
            <Text style={{ fontSize: 18 }}>
              Location: {qrDetails.Latitude} - {qrDetails.Longitude}
            </Text>
            <Text style={{ fontSize: 18 }}>Zone: {qrDetails.Zone_Name}</Text>
          </View>
        )}
      </View>

      <MyBtn
        title="Upload Video"
        style={{ marginLeft: 50, marginTop: 10 }}
        onPress={uploadVideo}
      />
    </ScrollView>
  );
};

export default OperatorScreen;

















// import React, { useState, useEffect } from "react";
// import { View, Text, Image, Alert, PermissionsAndroid, Platform, ScrollView } from "react-native";
// import { Camera } from "react-native-camera-kit";
// import { MyBtn } from "../NavigationFile";
// import axios from "axios";
// import { launchImageLibrary } from "react-native-image-picker";

// const OperatorScreen = ({ navigation, route }) => {
//   const operatorid = route.params?.id;
//   const [qrDetails, setQrDetails] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [name, setName] = useState("");
//   const [lastScanTime, setLastScanTime] = useState(0);
//   const [scannedBarcode, setScannedBarcode] = useState("");
//   const [debugInfo, setDebugInfo] = useState("");
//   const DEBOUNCE_TIME = 5000;

//   useEffect(() => {
//     const requestPermission = async () => {
//       if (Platform.OS === "android") {
//         await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
//       }
//     };
//     requestPermission();

//     const getOperator = async () => {
//       try {
//         const response = await axios.get(`${global.ApiURL}getEmployeeById/${operatorid}`);
//         if (response.status === 200) {
//           setName(response.data.name);
//         } else {
//           Alert.alert("Error", response.data.message || "Unknown error occurred");
//         }
//       } catch (error) {
//         Alert.alert("Error", "Failed to fetch operator details.");
//       }
//     };

//     getOperator();
//   }, [operatorid]);

//   const onBarcodeScan = async (event) => {
//     const scannedQR = event.nativeEvent.codeStringValue;
//     const currentTime = new Date().getTime();

//     if (currentTime - lastScanTime < DEBOUNCE_TIME) {
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.get(`${global.ApiURL}fetchDetailsByQR/${scannedQR}`);
//       if (response.status === 200) {
//         setQrDetails(response.data.details);
//         setScannedBarcode(scannedQR);
//       } else {
//         Alert.alert("Error", response.data.message || "Unknown error occurred");
//       }
//     } catch (error) {
//       Alert.alert("Error", "Failed to fetch data from server.");
//     } finally {
//       setLoading(false);
//       setLastScanTime(currentTime);
//     }
//   };

//   const uploadVideo = () => {
//     if (!scannedBarcode) {
//       Alert.alert("Error", "Please scan a barcode first.");
//       return;
//     }

//     const options = {
//       mediaType: "video",
//       videoQuality: "high",
//       maxWidth: 1080,
//       maxHeight: 1920,
//       durationLimit: 60,
//       saveToPhotos: true,
//     };

//     launchImageLibrary(options, ({ didCancel, errorCode, assets }) => {
//       if (didCancel) return;
//       if (errorCode) {
//         console.log("ImagePicker Error:", errorCode);
//         return;
//       }

//       const videoUri = assets[0].uri;
//       const formData = new FormData();
//       formData.append("video", { uri: videoUri, type: "video/mp4", name: "video.mp4" });
//       formData.append("barcode", scannedBarcode);

//       setLoading(true);
//       axios
//         .post(`${global.ApiURL}processedVideo`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         })
//         .then(() => axios.post(`${global.ApiURL}rankingUser`, { barcode: scannedBarcode }))
//         .then((rankingResponse) => {
//           const data = rankingResponse.data;

//           const debugData = `
//         Recyclable items: ${data.total_recyclable_items}
//         Non-recyclable items: ${data.total_non_recyclable_items}
//         Organic items: ${data.total_organic_items}
//         Recyclable percentage: ${data.rank_percentage ?? "N/A"}%
//         ${data.previous_rank !== undefined ? `Previous rank: ${data.previous_rank}\n` : ""}
//         ${data.updated_rank !== undefined ? `Updated rank: ${data.updated_rank}\n` : ""}
//         `.trim();

//           console.log(debugData);
//           setDebugInfo(debugData);

//           navigation.navigate("TrashSummary", {
//             userName: data.name,
//             totalItems: data.total_items,
//             recyclableItems: data.total_recyclable_items, // update to match TrashSummary's expected parameter
//             nonRecyclableItems: data.total_non_recyclable_items, // update
//             organicItems: data.total_organic_items, // update
//             previousRank: data.previous_rank,
//             updatedRank: data.updated_rank,
//             user: data, // This is for debug info and displaying user object
//           });          
//         })
//         .catch(() => {
//           Alert.alert("Error", "Something went wrong while processing");
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     });
//   };

//   return (
//     <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
//       <View style={{ backgroundColor: "#069349", padding: 10, borderRadius: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
//         <Text style={{ fontSize: 25, color: "#F8F8F2", fontWeight: "900" }}>
//           Welcome {name}
//         </Text>
//         <Image
//           source={require("../../assets/Images_GreenBelt/profile-avatar.jpg")}
//           style={{ width: 80, height: 80, borderRadius: 50 }}
//         />
//       </View>

//       {/* Camera Scanner */}
//       <View style={{ padding: 20, height: 300 }}>
//         <Camera
//           style={{ height: "100%", width: "100%" }}
//           scanBarcode={true}
//           onReadCode={onBarcodeScan}
//           showFrame={true}
//           laserColor="green"
//           frameColor="white"
//         />
//       </View>

//       {/* Display QR Details */}
//       <View style={{ padding: 20 }}>
//         {loading && (
//           <View style={{ alignItems: "center" }}>
//             <Text>Loading...</Text>
//           </View>
//         )}
//         {qrDetails && !loading && (
//           <View style={{ alignItems: "center" }}>
//             <Text style={{ fontSize: 25, fontWeight: "900", textAlign: "center" }}>
//               QR Details: {qrDetails.QR_Type}
//             </Text>
//             <Text style={{ fontSize: 18 }}>User: {qrDetails.User_Name}</Text>
//             <Text style={{ fontSize: 18 }}>Phone: {qrDetails.PhoneNumber}</Text>
//             <Text style={{ fontSize: 18 }}>
//               Location: {qrDetails.Latitude} - {qrDetails.Longitude}
//             </Text>
//             <Text style={{ fontSize: 18 }}>Zone: {qrDetails.Zone_Name}</Text>
//           </View>
//         )}

//         {/* Debug Info Display */}
//         {debugInfo !== "" && (
//           <View style={{ marginTop: 20 }}>
//             <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>
//               Debug Info
//             </Text>
//             <Text style={{ fontSize: 12, color: "#333", textAlign: "left", padding: 5 }}>
//               {debugInfo}
//             </Text>
//           </View>
//         )}
//       </View>

//       {/* Upload Video Button */}
//       <MyBtn title="Upload Video" style={{ marginLeft:50, marginTop: 20 }} onPress={uploadVideo} />
//     </ScrollView>
//   );
// };

// export default OperatorScreen;
