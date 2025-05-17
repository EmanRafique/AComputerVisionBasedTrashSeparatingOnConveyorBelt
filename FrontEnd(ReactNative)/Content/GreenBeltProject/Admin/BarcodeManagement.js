import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { AdminHeader } from '../NavigationFile';
import axios from 'axios';

const BarcodeManagement = () => {  
  const [loading, setLoading] = useState(true);
  const [purchaseData, setPurchaseData] = useState([]);
  const [totalStripsPurchased, setTotalStripsPurchased] = useState(0); 

  useEffect(() => {
    fetchBarcodePurchases();
  }, []);

  const fetchBarcodePurchases = async () => {
    try {
      const response = await axios.get(`${global.ApiURL}allBarcodeStripsPurchased`);
      console.log("API Response:", response.data); 
  
      const data = response.data[0];
      const totalStrips = data.find(item => item.hasOwnProperty("Total Strips Purchased"));
      setTotalStripsPurchased(totalStrips ? totalStrips["Total Strips Purchased"] : 0); 
      
      setPurchaseData(data.filter(item => !item.hasOwnProperty("Total Strips Purchased"))); 
  
    } catch (error) {
      console.error("Error fetching barcode purchases:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderPurchaseCard = ({ item }) => (
    <View style={{
      backgroundColor: '#f0f8ff',
      padding: 10,
      marginBottom: 10,
      borderRadius: 15,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4
    }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 15 }}>{item["User Name"]}</Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <View style={{
          backgroundColor: '#4CAF50',
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 20,
          marginRight: 10
        }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Recyclable: {item["Recyclable Count"]}</Text>
        </View>

        <View style={{
          backgroundColor: '#f44336',
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 20
        }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Non-Recyclable: {item["Non-Recyclable Count"]}</Text>
        </View>
      </View>

      <Text style={{ fontSize: 18, marginBottom: 5 }}>
        <Text style={{ fontWeight: 'bold', color: '#555' }}>Total Cost: </Text>
        <Text style={{ color: '#2196F3', fontWeight: 'bold' }}>{item["Total Cost"]} PKR</Text>
      </Text>

      <Text style={{ fontSize: 16, color: '#777', marginTop: 5 }}>
        <Text style={{ fontWeight: 'bold', color: '#555' }}>Purchase Date: </Text>
        {item["Purchase Date"]}
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
      <AdminHeader />

      <View style={{ flex: 1, padding: 20, paddingTop: 0 }}>
        {/* Total Strips Purchased Card */}
        <View style={{
          backgroundColor: '#f0f0f0',
          padding: 20,
          borderRadius: 15,
          alignItems: 'center',
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 3,
          marginTop: 30,
          marginBottom: 20
        }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'black' }}>Total Strips Purchased</Text>
          <Text style={{ fontSize: 36, fontWeight: '900', marginTop: 5, color: 'black' }}>{totalStripsPurchased}</Text>
        </View>

        {/* Loading Indicator */}
        {loading ? (
          <ActivityIndicator size="large" color="black" style={{ marginTop: 50 }} />
        ) : (
          <FlatList
            data={purchaseData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderPurchaseCard}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

export default BarcodeManagement;













// import React, { useEffect, useState } from 'react';
// import { View, Text, ScrollView, FlatList, ActivityIndicator } from 'react-native';
// import { AdminHeader } from '../NavigationFile';
// import axios from 'axios';

// const BarcodeManagement = () => {  
//   const [loading, setLoading] = useState(true);
//   const [purchaseData, setPurchaseData] = useState([]);
//   const [totalStripsPurchased, setTotalStripsPurchased] = useState(0); 

//   useEffect(() => {
//     fetchBarcodePurchases();
//   }, []);

//   const fetchBarcodePurchases = async () => {
//     try {
//       const response = await axios.get(`${global.ApiURL}allBarcodeStripsPurchased`);
//       console.log("API Response:", response.data); 
  
//       const data = response.data[0];
//       const totalStrips = data.find(item => item.hasOwnProperty("Total Strips Purchased"));
//       setTotalStripsPurchased(totalStrips ? totalStrips["Total Strips Purchased"] : 0); 
      
//       setPurchaseData(data.filter(item => !item.hasOwnProperty("Total Strips Purchased"))); // remove total object
  
//     } catch (error) {
//       console.error("Error fetching barcode purchases:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderPurchaseCard = ({ item }) => (
//     <View style={{
//       backgroundColor: 'white',
//       padding: 20,
//       marginBottom: 20,
//       borderRadius: 10,
//       elevation: 5,
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.2,
//       shadowRadius: 4
//     }}>
//       <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>{item["User Name"]}</Text>

//       <Text style={{ fontSize: 16, marginBottom: 5 }}>
//         <Text style={{ fontWeight: 'bold' }}>Recyclable Count:</Text> {item["Recyclable Count"]}
//       </Text>

//       <Text style={{ fontSize: 16, marginBottom: 5 }}>
//         <Text style={{ fontWeight: 'bold' }}>Non-Recyclable Count:</Text> {item["Non-Recyclable Count"]}
//       </Text>

//       <Text style={{ fontSize: 16, marginBottom: 5 }}>
//         <Text style={{ fontWeight: 'bold' }}>Total Cost:</Text> {item["Total Cost"]}
//       </Text>

//       <Text style={{ fontSize: 16 }}>
//         <Text style={{ fontWeight: 'bold' }}>Purchase Date:</Text> {item["Purchase Date"]}
//       </Text>
//     </View>
//   );

//   return (
//     <View style={{ flex: 1, backgroundColor: 'white' }}>
//       <AdminHeader />

//       <View style={{ flex: 1, backgroundColor: 'white', padding: 20, paddingTop: 0 }}>
//         {/* Total Strips Purchased Card */}
//         <View style={{
//           backgroundColor: 'white',
//           padding: 20,
//           borderRadius: 10,
//           alignItems: 'center',
//           elevation: 10,
//           shadowColor: '#000',
//           shadowOffset: { width: 0, height: 2 },
//           shadowOpacity: 0.8,
//           shadowRadius: 3,
//           marginTop: 30,
//           marginBottom: 20
//         }}>
//           <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Total Strips Purchased</Text>
//           <Text style={{ fontSize: 32, fontWeight: 'bold', marginTop: 5 }}>{totalStripsPurchased}</Text>
//         </View>

//         {/* Loading Indicator */}
//         {loading ? (
//           <ActivityIndicator size="large" color="black" style={{ marginTop: 50 }} />
//         ) : (
//           <FlatList
//             data={purchaseData}
//             keyExtractor={(item, index) => index.toString()}
//             renderItem={renderPurchaseCard}
//             showsVerticalScrollIndicator={false}
//           />
//         )}
//       </View>
//     </View>
//   );
// };

// export default BarcodeManagement;
















// import React, { useEffect, useState } from 'react';
// import { View, Text, ScrollView, FlatList, ActivityIndicator } from 'react-native';
// import { AdminHeader } from '../NavigationFile';
// import axios from 'axios';

// const BarcodeManagement = () => {  
//   const [loading, setLoading] = useState(true);
//   const [purchaseData, setPurchaseData] = useState([]);
//   const [totalStripsPurchased, setTotalStripsPurchased] = useState(0); 

//   useEffect(() => {
//     fetchBarcodePurchases();
//   }, []);

//   const fetchBarcodePurchases = async () => {
//     try {
//       const response = await axios.get(`${global.ApiURL}allBarcodeStripsPurchased`);
//       console.log("API Response:", response.data); 
  
//       const data = response.data[0];  
//       const totalStrips = response.data[0].find(item => item.hasOwnProperty("Total Strips Purchased"));
//       setTotalStripsPurchased(totalStrips ? totalStrips["Total Strips Purchased"] : 0); 
      
//       setPurchaseData(data);
  
//     } catch (error) {
//       console.error("Error fetching barcode purchases:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: 'white' }}>
//       <AdminHeader />
  
//       <View style={{ flex: 1, backgroundColor: 'white', padding: 20, paddingTop: 0 }}>
//         {/* Total Strips Purchased by All Users */}
//         <View style={{
//           backgroundColor: 'white',
//           padding: 20,
//           borderRadius: 10,
//           alignItems: 'center',
//           elevation: 10,
//           shadowColor: '#000',
//           shadowOffset: { width: 0, height: 2 },
//           shadowOpacity: 0.8,
//           shadowRadius: 3,
//           marginTop: 30
//         }}>
//           <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Total Strips Purchased</Text>
//           <Text style={{ fontSize: 32, fontWeight: 'bold', marginTop: 5 }}>{totalStripsPurchased}</Text>
//         </View>
  
//         {/* Loading Spinner */}
//         {loading ? (
//           <ActivityIndicator size="large" color="black" style={{ marginTop: 50 }} />
//         ) : (
//           // Scrollable Table (optional, if you want to display the individual user purchases)
//           <ScrollView horizontal style={{ marginTop: 20 }}>
//             <View style={{ minWidth: '100%' }}>
//               {/* Header without padding */}
//               <View style={{
//                 flexDirection: 'row',
//                 backgroundColor: '#f4f4f4',
//                 borderBottomWidth: 2,
//                 borderBottomColor: '#ccc'
//               }}>
//                 <Text style={{ fontSize: 20, fontWeight: '900', color: 'black', flex: 3, textAlign: 'left' }}>Name</Text>
//                 <Text style={{ fontSize: 20, fontWeight: '900', color: 'black', flex: 1, textAlign: 'center' }}>Purchases</Text>
//                 <Text style={{ fontSize: 20, fontWeight: '900', color: 'black', flex: 1, textAlign: 'right' }}>Total Cost</Text>
//               </View>
  
//               {/* Data Rows with Padding */}
//               <FlatList
//                 data={purchaseData}
//                 keyExtractor={(item, index) => index.toString()}
//                 renderItem={({ item }) => (
//                   <View style={{
//                     flexDirection: 'row',
//                     borderBottomWidth: 1,
//                     borderBottomColor: '#ccc',
//                     paddingVertical: 10,
//                     paddingHorizontal: 10
//                   }}>
//                     <Text style={{ fontSize: 18, flex: 1, textAlign: 'left' }}>{item["User Name"]}</Text>
//                     <Text style={{ fontSize: 18, flex: 1, textAlign: 'center' }}>{item["Purchases"]}</Text>
//                     <Text style={{ fontSize: 18, flex: 1, textAlign: 'right' }}>{item["Total Cost"]}</Text>
//                   </View>
//                 )}
//               />
//             </View>
//           </ScrollView>
//         )}
//       </View>
//     </View>
//   );
// };

// export default BarcodeManagement;