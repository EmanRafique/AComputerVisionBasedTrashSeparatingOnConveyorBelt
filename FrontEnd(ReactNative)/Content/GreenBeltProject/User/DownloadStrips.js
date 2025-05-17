import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  PermissionsAndroid,
  Platform
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import RNFetchBlob from "react-native-blob-util";
import { MyBtn, MyHeader } from "../NavigationFile";
import { useNavigation } from "@react-navigation/native";

const DownloadStrips = ({ route }) => {
  const userId = route.params?.userId;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [downloadPath, setDownloadPath] = useState("");
  const [isDownloading, setIsDownloading] = useState(false); // Track download status

  useEffect(() => {
    if (!userId) return;
    console.log(`DownloadStrips Screen Loaded, UserID: ${userId}`);
    setLoading(false);
  }, [userId]);

  // Request Storage Permission for Android
  const requestStoragePermission = async () => {
    if (Platform.OS === "android" && parseInt(Platform.Version, 10) < 29) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage Permission Required",
            message: "App needs access to save the PDF.",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn("⚠ Permission error:", err);
        return false;
      }
    }
    return true;
  };

  // Function to download the PDF from the backend
  const downloadPDF = async () => {
    if (!userId) {
      Alert.alert("Error", "User ID is missing.");
      console.log("❌ User ID missing in the request.");
      return;
    }

    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Alert.alert("Permission Denied", "Cannot save PDF without storage permission.");
      console.log("❌ Storage permission denied.");
      return;
    }

    if (isDownloading) return; // Prevent multiple download attempts

    setIsDownloading(true); // Set downloading flag to true

    const apiUrl = `${global.ApiURL}/getDownloadStripDetails/${userId}`;
    console.log("⬇️ Downloading PDF from:", apiUrl);

    const { dirs } = RNFetchBlob.fs;
    const timestamp = new Date().getTime();
    const filePath = `${dirs.DownloadDir}/Downloaded_Strips_${userId}_${timestamp}.pdf`;
    console.log(`📂 Saving PDF to: ${filePath}`);

    // Fetch the PDF from the backend and save it to the device
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: filePath,
        description: "Downloading Strip PDF",
        mime: "application/pdf",
        mediaScannable: true,
      },
    })
      .fetch("GET", apiUrl, {}, null, 120000) // 120s timeout
      .then((res) => {
        console.log(`✅ PDF downloaded at: ${res.path()}`);
        Alert.alert("Download Complete", `Saved to: ${res.path()}`, [
          { text: "Open Now", onPress: () => openPDF(res.path()) },
          { text: "Cancel", style: "cancel" }
        ]);
        setDownloadPath(res.path());
        setIsDownloaded(true); // Mark download as complete
      })
      .catch((error) => {
        console.error("❌ PDF Download Error:", error);
        Alert.alert("Error", "Failed to download PDF.");
      })
      .finally(() => {
        setIsDownloading(false); 
      });
  };

  const openPDF = (filePath) => {
    if (Platform.OS === "android") {
      console.log(`📄 Opening PDF: ${filePath}`);
      RNFetchBlob.android.actionViewIntent(filePath, "application/pdf");
    }
  };

  const handleDonePress = () => {
    if (!isDownloaded) {
      Alert.alert("Download Required", "Please download the strip before proceeding.");
      console.log("❌ Done pressed before download.");
      return;
    }
    console.log("✅ Proceeding to OrderNow screen.");
    navigation.navigate("OrderNow", { id: userId });
  };

  if (loading) {
    console.log("⏳ Loading...");
    return <ActivityIndicator size="large" color="#069349" style={{ marginTop: 20 }} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f1f1e6", paddingBottom: 20 }}>
      <MyHeader />
      <Text style={{ fontSize: 30, fontWeight: "900", textAlign: "center", marginTop: 20, paddingBottom: 5 }}>
        Download Strips
      </Text>
      <View style={{ marginTop: 20, marginHorizontal: 10, backgroundColor: "white", borderRadius: 8, elevation: 3 }}>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 10, paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: "#ddd" }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Click Icon to Download PDF</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 10 }}>
          <Icon name="download" size={25} color={isDownloading ? "gray" : "#069349"} onPress={downloadPDF} disabled={isDownloading} />
        </View>
      </View>
      <MyBtn 
        title="Done" 
        onPress={handleDonePress} 
        disabled={!isDownloaded} 
        style={{ margin: 40, marginLeft: 50, backgroundColor: isDownloaded ? "black" : "gray" }} 
      />
    </View>
  );
};

export default DownloadStrips;





















// import React, { useEffect, useState } from "react";
// import { 
//   View, 
//   Text, 
//   ActivityIndicator, 
//   Alert, 
//   PermissionsAndroid, 
//   Platform 
// } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";
// import RNFetchBlob from "react-native-blob-util";
// import { MyBtn, MyHeader } from "../NavigationFile";
// import { useNavigation } from "@react-navigation/native";

// const DownloadStrips = ({ route }) => {
//   const userId = route.params?.userId;
//   const navigation = useNavigation();
//   const [loading, setLoading] = useState(true);
//   const [isDownloaded, setIsDownloaded] = useState(false);
//   const [downloadPath, setDownloadPath] = useState("");

//   useEffect(() => {
//     if (!userId) return;
//     console.log(`DownloadStrips Screen Loaded, UserID: ${userId}`);
//     setLoading(false);
//   }, [userId]);

//   const requestStoragePermission = async () => {
//     if (Platform.OS === "android" && parseInt(Platform.Version, 10) < 29) {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//           {
//             title: "Storage Permission Required",
//             message: "App needs access to save the PDF.",
//             buttonPositive: "OK",
//           }
//         );
//         return granted === PermissionsAndroid.RESULTS.GRANTED;
//       } catch (err) {
//         console.warn("⚠ Permission error:", err);
//         return false;
//       }
//     }
//     return true;
//   };

//   const downloadPDF = async () => {
//     if (!userId) {
//       Alert.alert("Error", "User ID is missing.");
//       return;
//     }

//     const hasPermission = await requestStoragePermission();
//     if (!hasPermission) {
//       Alert.alert("Permission Denied", "Cannot save PDF without storage permission.");
//       return;
//     }

//     const apiUrl = `${global.ApiURL}/getDownloadStripDetails/${userId}`;
//     console.log("⬇️ Downloading PDF from:", apiUrl);

//     const { dirs } = RNFetchBlob.fs;
//     const timestamp = new Date().getTime();
//     const filePath = `${dirs.DownloadDir}/Downloaded_Strips_${userId}_${timestamp}.pdf`;

//     RNFetchBlob.config({
//       fileCache: true,
//       addAndroidDownloads: {
//         useDownloadManager: true,
//         notification: true,
//         path: filePath,
//         description: "Downloading Strip PDF",
//         mime: "application/pdf",
//         mediaScannable: true,
//       },
//     })
//       .fetch("GET", apiUrl, {}, null, 120000) // 120s timeout
//       .then((res) => {
//         console.log(`✅ PDF downloaded at: ${res.path()}`);
//         Alert.alert("Download Complete", `Saved to: ${res.path()}`, [
//           { text: "Open Now", onPress: () => openPDF(res.path()) },
//           { text: "Cancel", style: "cancel" }
//         ]);
//         setDownloadPath(res.path());
//         setIsDownloaded(true);
//       })
//       .catch((error) => {
//         console.error("❌ PDF Download Error:", error);
//         Alert.alert("Error", "Failed to download PDF.");
//       });
//   };

//   const openPDF = (filePath) => {
//     if (Platform.OS === "android") {
//       RNFetchBlob.android.actionViewIntent(filePath, "application/pdf");
//     }
//   };

//   const handleDonePress = () => {
//     if (!isDownloaded) {
//       Alert.alert("Download Required", "Please download the strip before proceeding.");
//       return;
//     }
//     navigation.navigate("OrderNow", { id: userId });
//   };

//   if (loading) {
//     return <ActivityIndicator size="large" color="#069349" style={{ marginTop: 20 }} />;
//   }

//   return (
//     <View style={{ flex: 1, backgroundColor: "#f1f1e6", paddingBottom: 20 }}>
//       <MyHeader />
//       <Text style={{ fontSize: 30, fontWeight: "900", textAlign: "center", marginTop: 20, paddingBottom: 5 }}>
//         Download Strips
//       </Text>
//       <View style={{ marginTop: 20, marginHorizontal: 10, backgroundColor: "white", borderRadius: 8, elevation: 3 }}>
//         <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 10, paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: "#ddd" }}>
//           <Text style={{ fontSize: 20, fontWeight: "bold" }}>Download PDF</Text>
//         </View>
//         <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 10 }}>
//           <Icon name="download" size={25} color={isDownloaded ? "gray" : "#069349"} onPress={downloadPDF} />
//         </View>
//       </View>
//       <MyBtn 
//         title="Done" 
//         onPress={handleDonePress} 
//         disabled={!isDownloaded} 
//         style={{ margin: 40, marginLeft: 50, backgroundColor: isDownloaded ? "black" : "gray" }} 
//       />
//     </View>
//   );
// };

// export default DownloadStrips;
