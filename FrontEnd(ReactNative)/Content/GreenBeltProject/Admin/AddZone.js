import React, { useState } from 'react';
import { View, TextInput, Alert } from 'react-native';
import { AdminHeader, MyBtn } from '../NavigationFile';
import MapView, { Marker, Polygon, Polyline } from 'react-native-maps';
import axios from 'axios';

const AddZone = ({navigation}) => {
    const [zoneName, setZoneName] = useState('');
    const [markers, setMarkers] = useState([]);

    const handleMapPress = (event) => {
        const coordinate = event.nativeEvent.coordinate;
        setMarkers(prevMarkers => [...prevMarkers, coordinate]);
    };

    const removeLastMarker = () => {
        if (markers.length > 0) {
            setMarkers(markers.slice(0, -1));
        } else {
            Alert.alert('No markers to remove.');
        }
    };

    const saveZone = async () => {
        if (!zoneName) {
            Alert.alert('Error', 'Please enter a zone name.');
            return;
        }
        if (markers.length < 3) {
            Alert.alert('Error', 'Please mark at least 3 points.');
            return;
        }

        const [startPoint, endPoint] = zoneName.split(' to ').map(point => point?.trim());

        if (!startPoint || !endPoint) {
            Alert.alert('Error', 'Please use the format "Start to End" for the zone name.');
            return;
        }

        const zoneData = {
            start_point: startPoint,
            end_point: endPoint,
            coordinates: markers,
        };

        console.log("Zone Data to Send:", JSON.stringify(zoneData, null, 2));

        try {
            const response = await axios.post(`${global.ApiURL}addZone`, zoneData);
            console.log("API Response:", response.data);

            if (response.status >= 200 && response.status < 300) {
                Alert.alert('Success', 'Zone saved successfully!');
                setZoneName('');
                setMarkers([]);
                navigation.navigate("ZoneManagement");
            } else {
                Alert.alert('Error', response.data.error || 'Failed to save zone.');
            }            
        } catch (error) {
            console.error('Error saving zone:', error);
            Alert.alert('Error', 'An error occurred while saving the zone.');
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <AdminHeader />

            <TextInput
                placeholder="Enter zone name (Start to End)"
                value={zoneName}
                onChangeText={setZoneName}
                style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 8,
                    padding: 10,
                    margin: 20,
                    fontSize: 16,
                }}
            />

            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 33.642529601249,
                    longitude: 73.07839628309011,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
                onPress={handleMapPress}
            >
                {markers.map((marker, index) => (
                    <Marker key={index} coordinate={marker} />
                ))}

                {markers.length > 1 && (
                    <Polyline
                        coordinates={markers}
                        strokeColor="blue"
                        strokeWidth={3}
                    />
                )}

                {markers.length > 2 && (
                    <Polygon
                        coordinates={markers}
                        fillColor="rgba(28,110,168,0.3)"
                        strokeColor="blue"
                        strokeWidth={3}
                    />
                )}
            </MapView>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10, backgroundColor: 'white' }}>
                <MyBtn title="One Step Back" onPress={removeLastMarker} style={{ width: 180, height: 40 }} />
                <MyBtn title="Save Zone" onPress={saveZone} style={{ width: 120, height: 40 }} />
            </View>
        </View>
    );
};

export default AddZone;













// import React, { useState } from 'react';
// import { View, Text, TextInput, Alert } from 'react-native';
// import { AdminHeader, MyBtn } from '../NavigationFile';
// import MapView, { Marker, Polygon } from 'react-native-maps';

// const AddZone = () => {
//     const [zoneName, setZoneName] = useState('');
//     const [markers, setMarkers] = useState([]);

//     const handleMapPress = (e) => {
//         const { latitude, longitude } = e.nativeEvent.coordinate;
//         setMarkers([...markers, { latitude, longitude }]);
//     };

//     const removeLastMarker = () => {
//         if (markers.length > 0) {
//             setMarkers(markers.slice(0, -1));
//         } else {
//             Alert.alert('No markers to remove.');
//         }
//     };
//     const saveZone = () => {
//         if (!zoneName) {
//             Alert.alert('Error', 'Please enter a zone name.');
//             return;
//         }
//         if (markers.length < 3) {
//             Alert.alert('Error', 'Please mark at least 3 points.');
//             return;
//         }

//         console.log('Zone Name:', zoneName);
//         console.log('Coordinates:', markers);

//         Alert.alert('Success', 'Zone saved successfully!');
//         resetZone();
//     };

//     return (
//         <View style={{ flex: 1, backgroundColor: 'white' }}>
//             <AdminHeader title="Add Zone" />

//             <TextInput
//                 placeholder="enter zone name"
//                 value={zoneName}
//                 onChangeText={setZoneName}
//                 style={{
//                     borderWidth: 1,
//                     borderColor: '#ccc',
//                     borderRadius: 8,
//                     padding: 10,
//                     margin: 20,
//                     fontSize: 16,
//                 }}
//             />

//             <MapView
//                 style={{ flex: 1 }}
//                 initialRegion={{
//                     latitude: 33.6844,
//                     longitude: 73.0479,
//                     latitudeDelta: 0.05,
//                     longitudeDelta: 0.05,
//                 }}
//                 onPress={handleMapPress}
//             >
//                 {markers.map((marker, index) => (
//                     <Marker key={index} coordinate={marker} />
//                 ))}

//                 {markers.length > 2 && (
//                     <Polygon
//                         coordinates={markers}
//                         fillColor="rgba(0, 200, 0, 0.3)"
//                         strokeColor="green"
//                         strokeWidth={2}
//                     />
//                 )}
//             </MapView>

//             <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10, backgroundColor: 'white' }}>
//                 <MyBtn title="One Step Back" onPress={removeLastMarker} style={{ width: 180, height: 40 }} />
//                 <MyBtn title="Save Zone" onPress={saveZone} style={{ width: 120, height: 40 }} />
//             </View>
//         </View>
//     );
// };

// export default AddZone;