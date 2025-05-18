import React, { useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { Camera } from 'react-native-camera-kit';
import { useRoute } from '@react-navigation/native';

const ScanBarcode = () => {
  const route = useRoute();
  const collectorid = route?.params?.id;
  console.log('Collector id:', collectorid);

  const [scanned, setScanned] = useState(false);

  const onBarcodeScan = async (event) => {
    if (!scanned) {
      setScanned(true);
      const code = event.nativeEvent.codeStringValue;
      console.log('Scanned QR:', code);
  
      let userName = null;
  
      try {
        // Step 1: Try GET /fetchDetailsByQR/:code
        const getResponse = await fetch(`${ApiURL}/fetchDetailsByQR/${code}`);
        const getResult = await getResponse.json();
        console.log('GET /fetchDetailsByQR Response:', getResult);
  
        if (getResponse.ok && getResult.details) {
          userName = getResult.details.User_Name;
        }
  
        // Step 2: POST to /scanBarcode
        const postResponse = await fetch(`${ApiURL}/scanBarcode`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            barcode: code,
            collectorid: collectorid,
          }),
        });
  
        const postResult = await postResponse.json();
        console.log('POST /scanBarcode Response:', postResult);
  
        if (postResponse.ok) {
          Alert.alert('Success', `Scanned successfully\n${userName || 'User'}`);
        } else {
          Alert.alert('Error', postResult.error || 'Scan failed');
        }
  
      } catch (error) {
        console.error('API call error:', error);
        Alert.alert('Error', 'Network error. Please try again.');
      }
  
      setTimeout(() => setScanned(false), 5000);
    }
  };  

  return (
    <View style={styles.container}>
      <Camera
        style={{ flex: 1 }}
        scanBarcode={true}
        onReadCode={onBarcodeScan}
        showFrame={true}
        laserColor="red"
        frameColor="white"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScanBarcode;





















// import React, { useState } from 'react';
// import { View, Alert, StyleSheet } from 'react-native';
// import { Camera } from 'react-native-camera-kit';
// import { useRoute } from '@react-navigation/native';  

// const ScanBarcode = () => {
//   const route = useRoute();
//   const collectorid = route?.params?.id;
//   console.log("Collector id", collectorid)

//   const [scanned, setScanned] = useState(false);

//   const onBarcodeScan = async (event) => {
//     if (!scanned) {
//       setScanned(true);
//       const code = event.nativeEvent.codeStringValue;
//       console.log('Scanned QR:', code);

//       try {
//         const response = await fetch(`${ApiURL}/scanBarcode`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             barcode: code,
//             collectorid: collectorid,  
//           }),
//         });

//         const result = await response.json();
//         console.log('API Response:', result);

//         if (response.ok) {
//           Alert.alert('Success', result.message || 'Scanned successfully!');
//         } else {
//           Alert.alert('Error', result.error || 'Something went wrong');
//         }
//       } catch (error) {
//         console.error('API call error:', error);
//         Alert.alert('Error', 'Failed to connect to server');
//       }

//       setTimeout(() => setScanned(false), 5000);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Camera
//         style={{ flex: 1 }}
//         scanBarcode={true}
//         onReadCode={onBarcodeScan}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default ScanBarcode;