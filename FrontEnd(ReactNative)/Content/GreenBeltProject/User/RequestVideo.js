import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Linking } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MyHeader } from '../NavigationFile';

const RequestVideo = () => {
  // Set a fake 'zero' date
  const [date, setDate] = useState(new Date('0000-04-01T00:00:00Z'));
  const [showPicker, setShowPicker] = useState(false);

  const [requests, setRequests] = useState([
    { id: '1', date: '00/April/0000', status: 'Pending', videoLink: '' },
    { id: '2', date: '00/April/0000', status: 'Pending', videoLink: '' },
    { id: '3', date: '00/April/0000', status: 'Approved', videoLink: 'https://samplevideo.com' },
  ]);

  const handleRequest = () => {
    // No real selected date, keep it fixed
    const formattedDate = '00/April/0000';
    setRequests([...requests, { id: Date.now().toString(), date: formattedDate, status: 'Pending', videoLink: '' }]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
      <MyHeader />
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: '#333' }}>Request Video</Text>

        {/* Date Picker */}
        <TouchableOpacity 
          onPress={() => setShowPicker(true)} 
          style={{ backgroundColor: '#fff', padding: 12, borderRadius: 10, elevation: 2, marginBottom: 15 }}
        >
          <Text style={{ fontSize: 18, color: '#333', textAlign: 'center' }}>
            📅 Select Date: 00/April/0000
          </Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowPicker(false);
              // Even if user selects a date, we still show the fake date
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}

        {/* Submit Button */}
        <TouchableOpacity 
          onPress={handleRequest} 
          style={{ backgroundColor: '#069349', padding: 14, borderRadius: 10, elevation: 2 }}
        >
          <Text style={{ color: 'white', fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>📩 Submit Request</Text>
        </TouchableOpacity>

        {/* Previous Requests Section */}
        <Text style={{ fontSize: 22, fontWeight: 'bold', marginTop: 25, color: '#333' }}>📜 Previous Requests</Text>

        <FlatList
          data={requests}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ padding: 15, backgroundColor: 'white', marginVertical: 10, borderRadius: 10, elevation: 3 }}>
              <Text style={{ fontSize: 18, color: '#444' }}>📅 Date: {item.date}</Text>
              <Text style={{ fontSize: 18, color: '#444' }}>
                ✅ Status: 
                <Text style={{ fontWeight: 'bold', color: item.status === 'Approved' ? 'green' : 'orange' }}> {item.status}</Text>
              </Text>
              {item.videoLink ? (
                <TouchableOpacity onPress={() => Linking.openURL(item.videoLink)}>
                  <Text style={{ color: 'blue', fontSize: 18, textDecorationLine: 'underline', marginTop: 5 }}>▶ Watch Video</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default RequestVideo;




















// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, FlatList, Linking } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { MyHeader } from '../NavigationFile';

// const RequestVideo = () => {
//   const [date, setDate] = useState(new Date());
//   const [showPicker, setShowPicker] = useState(false);
//   const [requests, setRequests] = useState([
//     { id: '1', date: '2025-03-12', status: 'Pending', videoLink: '' },
//     { id: '2', date: '2025-03-10', status: 'Pending', videoLink: '' },
//     { id: '3', date: '2025-03-07', status: 'Approved', videoLink: 'https://example.com/video1' },
//   ]);

//   const handleRequest = () => {
//     const formattedDate = date.toISOString().split('T')[0];
//     setRequests([...requests, { id: Date.now().toString(), date: formattedDate, status: 'Pending', videoLink: '' }]);
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
//       <MyHeader />
//       <View style={{ padding: 20 }}>
//         <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: '#333' }}>Request Video</Text>

//         {/* Date Picker */}
//         <TouchableOpacity 
//           onPress={() => setShowPicker(true)} 
//           style={{ backgroundColor: '#fff', padding: 12, borderRadius: 10, elevation: 2, marginBottom: 15 }}
//         >
//           <Text style={{ fontSize: 18, color: '#333', textAlign: 'center' }}>📅 Select Date: {date.toISOString().split('T')[0]}</Text>
//         </TouchableOpacity>

//         {showPicker && (
//           <DateTimePicker
//             value={date}
//             mode="date"
//             display="default"
//             onChange={(event, selectedDate) => {
//               setShowPicker(false);
//               if (selectedDate) setDate(selectedDate);
//             }}
//           />
//         )}

//         {/* Submit Button */}
//         <TouchableOpacity 
//           onPress={handleRequest} 
//           style={{ backgroundColor: '#069349', padding: 14, borderRadius: 10, elevation: 2 }}
//         >
//           <Text style={{ color: 'white', fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>📩 Submit Request</Text>
//         </TouchableOpacity>

//         {/* Previous Requests Section */}
//         <Text style={{ fontSize: 22, fontWeight: 'bold', marginTop: 25, color: '#333' }}>📜 Previous Requests</Text>

//         <FlatList
//           data={requests}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <View style={{ padding: 15, backgroundColor: 'white', marginVertical: 10, borderRadius: 10, elevation: 3 }}>
//               <Text style={{ fontSize: 18, color: '#444' }}>📅 Date: {item.date}</Text>
//               <Text style={{ fontSize: 18, color: '#444' }}>
//                 ✅ Status: 
//                 <Text style={{ fontWeight: 'bold', color: item.status === 'Approved' ? 'green' : 'orange' }}> {item.status}</Text>
//               </Text>
//               {item.videoLink ? (
//                 <TouchableOpacity onPress={() => Linking.openURL(item.videoLink)}>
//                   <Text style={{ color: 'blue', fontSize: 18, textDecorationLine: 'underline', marginTop: 5 }}>▶ Watch Video</Text>
//                 </TouchableOpacity>
//               ) : null}
//             </View>
//           )}
//         />
//       </View>
//     </View>
//   );
// };

// export default RequestVideo;