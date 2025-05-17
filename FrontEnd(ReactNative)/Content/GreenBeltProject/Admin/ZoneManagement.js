import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { AdminHeader } from "../NavigationFile";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from 'react';

const ZoneManagement = ({ navigation }) => {
    const [zones, setZoneItems] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <AdminHeader />

            <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                    <Text style={{ fontWeight: '900', fontSize: 30 }}>
                        Add Zone
                    </Text>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('AddZone')} 
                        style={{ backgroundColor: 'green', padding: 10, borderRadius: 10 }}
                    >
                        <Icon name="plus" size={25} color="white" />
                    </TouchableOpacity>
                </View>

                {/* List of Zones */}
                <Text style={{ fontWeight: '900', fontSize: 18, marginTop: 40 }}>
                    All Zones
                </Text>
                {zones.map((zone, index) => (
                    <TextInput
                        key={index}
                        value={zone.label}
                        editable={false}
                        style={{
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 8,
                            padding: 10,
                            marginTop: 8,
                            fontSize: 16,
                            backgroundColor: '#f8f8f8'
                        }}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

export default ZoneManagement;












// import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
// import { AdminHeader } from "../NavigationFile";
// import Icon from 'react-native-vector-icons/FontAwesome';

// const ZoneManagement = ({ navigation }) => {
//     const zones = [
//         "Satellite Town", "G-10", "Iqbal Town", "Saddar",
//         "Ghouri Town", "Westrage", "KhannaPul to ZiaMasjid"
//     ];

//     return (
//         <View style={{ flex: 1, backgroundColor: 'white' }}>
//             <AdminHeader />

//             <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}>
//                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
//                     <Text style={{ fontWeight: '900', fontSize: 30 }}>
//                         Add Zone
//                     </Text>
//                     <TouchableOpacity 
//                         onPress={() => navigation.navigate('AddZone')} 
//                         style={{ backgroundColor: 'green', padding: 10, borderRadius: 10 }}
//                     >
//                         <Icon name="plus" size={25} color="white" />
//                     </TouchableOpacity>
//                 </View>

//                 {/* List of Zones */}
//                 <Text style={{ fontWeight: '900', fontSize: 18, marginTop: 40 }}>
//                     All Zones
//                 </Text>
//                 {zones.map((zone, index) => (
//                     <TextInput
//                         key={index}
//                         value={zone}
//                         editable={false}
//                         style={{
//                             borderWidth: 1,
//                             borderColor: '#ccc',
//                             borderRadius: 8,
//                             padding: 10,
//                             marginTop: 8,
//                             fontSize: 16,
//                             backgroundColor: '#f8f8f8'
//                         }}
//                     />
//                 ))}
//             </ScrollView>
//         </View>
//     );
// };

// export default ZoneManagement;
