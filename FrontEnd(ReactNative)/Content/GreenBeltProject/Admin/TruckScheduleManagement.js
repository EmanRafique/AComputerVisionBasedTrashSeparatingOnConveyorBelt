import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TruckScheduleManagement = ({ navigation }) => {
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [schedules, setSchedules] = useState([]);
    const [filteredSchedules, setFilteredSchedules] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchSchedules();
    }, []);

    const fetchSchedules = async () => {
        setLoading(true);
        try {
            // Replace this with actual API call
            const data = [
                { id: 1, truckNo: 'LXCL24', address: 'House no 7 Street no 8A defence Colony', day: 'Monday', timeSlot: '6:00 - 6:15' },
                { id: 2, truckNo: 'LXCL24', address: 'House no 9 Street no 8B defence Colony', day: 'Monday', timeSlot: '6:15 - 6:30' },
                { id: 3, truckNo: 'RWPA25', address: 'House no 2 Street no 1 6th road, RWP', day: 'Monday', timeSlot: '6:45 - 7:00' },
                { id: 4, truckNo: 'PSHL12', address: 'House no 32 Street no 4, KRL road RWP', day: 'Tuesday', timeSlot: '6:30 - 6:45' },
                { id: 5, truckNo: 'ABCD56', address: 'House no 3 Street no 3, Commercial Market', day: 'Friday', timeSlot: '3:15 - 3:30' },
            ];
            setSchedules(data);
            setFilteredSchedules(data);
        } catch (error) {
            console.error('Error fetching schedules:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchPress = () => {
        setSearchVisible(!searchVisible);
        setSearchText('');
        setFilteredSchedules(schedules);
    };

    const handleSearch = (text) => {
        const trimmedText = text.trim();
        setSearchText(trimmedText);
        
        if (trimmedText === '') {
            setFilteredSchedules(schedules);
        } else {
            const filteredData = schedules.filter((item) =>
                item.truckNo.toLowerCase().includes(trimmedText.toLowerCase())
            );
            setFilteredSchedules(filteredData);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {/* Header */}
            <View style={{
                backgroundColor: '#069349',
                padding: 15,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                {/* Back Arrow - Aligned Left */}
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
                    <Icon name="arrow-left" size={28} color="white" />
                </TouchableOpacity>

                {/* Search Icon - Aligned Right */}
                <TouchableOpacity onPress={handleSearchPress} style={{ padding: 10 }}>
                    <Icon name="search" size={28} color="white" />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            {searchVisible && (
                <View style={{ padding: 10, backgroundColor: '#f1f1f1' }}>
                    <TextInput
                        placeholder="Enter Truck Number..."
                        value={searchText}
                        onChangeText={handleSearch}
                        style={{
                            backgroundColor: 'white',
                            padding: 12,
                            borderRadius: 5,
                            fontSize: 16,
                            borderWidth: 1,
                            borderColor: '#ddd'
                        }}
                    />
                </View>
            )}

            {/* Table Header */}
            <View style={{
                flexDirection: 'row',
                padding: 12,
                backgroundColor: '#ddd',
                borderBottomWidth: 1,
                borderColor: '#bbb'
            }}>
                <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 18 }}>S.No</Text>
                <Text style={{ flex: 2, fontWeight: 'bold', fontSize: 18 }}>Truck No</Text>
                {searchText ? <Text style={{ flex: 3, fontWeight: 'bold', fontSize: 18 }}>Address</Text> : null}
                <Text style={{ flex: 2, fontWeight: 'bold', fontSize: 18 }}>Day</Text>
                <Text style={{ flex: 2, fontWeight: 'bold', fontSize: 18 }}>Time Slot</Text>
            </View>

            {/* Loading Indicator */}
            {loading ? (
                <View style={{ padding: 20, alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="black" />
                </View>
            ) : (
                <ScrollView>
                    {filteredSchedules.map((item, index) => (
                        <View key={item.id} style={{
                            flexDirection: 'row',
                            padding: 12,
                            borderBottomWidth: 1,
                            borderBottomColor: '#ccc',
                            backgroundColor: searchText ? '#eaffea' : 'white'
                        }}>
                            <Text style={{ flex: 1, fontSize: 16 }}>{index + 1}</Text>
                            <Text style={{ flex: 2, fontSize: 16 }}>{item.truckNo}</Text>
                            {searchText ? <Text style={{ flex: 3, fontSize: 16 }}>{item.address}</Text> : null}
                            <Text style={{ flex: 2, fontSize: 16 }}>{item.day}</Text>
                            <Text style={{ flex: 2, fontSize: 16 }}>{item.timeSlot}</Text>
                        </View>
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

export default TruckScheduleManagement;



























// import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
// import { AdminHeader } from '../NavigationFile';

// const TruckScheduleManagement = () => {
//     const scheduleData = [
//         { id: "1", truckNo: "LXCL24", address: "House no 7 Street no 8A defence Colony", day: "Monday", time: "6:00 - 6:15" },
//         { id: "2", truckNo: "LXCL24", address: "House no 9 Street no 8B defence Colony", day: "Monday", time: "6:15 - 6:30" },
//         { id: "3", truckNo: "RWPA25", address: "House no 2 Street no 1 6th road, RWP", day: "Monday", time: "6:45 - 7:00" },
//         { id: "4", truckNo: "RWPA25", address: "House no 8 Street no 1 6th road, RWP", day: "Monday", time: "7:00 - 7:15" },
//         { id: "5", truckNo: "PSHL12", address: "House no 32 Street no 4, KRL road RWP", day: "Tuesday", time: "6:30 - 6:45" },
//         { id: "6", truckNo: "PSHL12", address: "House no 45 Street no 4, KRL road RWP", day: "Tuesday", time: "7:00 - 7:15" },
//         { id: "7", truckNo: "LXAB23", address: "House no 33 Street no 1, Chandni Chowk", day: "Tuesday", time: "2:00 - 2:15" },
//         { id: "8", truckNo: "LXAB23", address: "House no 49 Street no 7, Chandni Chowk", day: "Tuesday", time: "2:15 - 2:30" },
//         { id: "9", truckNo: "ABCD56", address: "House no 3 Street no 3, Commercial Market", day: "Friday", time: "3:15 - 3:30" },
//         { id: "10", truckNo: "ABCD56", address: "House no 7 Street no 9, Commercial Market", day: "Friday", time: "3:45 - 4:00" },
//         { id: "11", truckNo: "LHRA44", address: "House no 8 Street no 2, Shamsabad RWP", day: "Friday", time: "9:15 - 9:30" },
//         { id: "12", truckNo: "LHRA44", address: "House no 5 Street no 7, Shamsabad RWP", day: "Friday", time: "9:30 - 9:45" },
//         { id: "13", truckNo: "KRCA55", address: "House no 6 Street no 7, Faizabad RWP", day: "Friday", time: "3:15 - 3:30" }
//     ];

//     return (
//         <View style={{ flex: 1, backgroundColor: 'white' }}>
//             <AdminHeader />

//             {/* Search Button */}
//             <TouchableOpacity style={{
//                 backgroundColor: '#4CAF50', padding: 10, borderRadius: 5, alignSelf: 'flex-end',
//                 margin: 10
//             }}>
//                 <Text style={{ color: 'white', fontWeight: 'bold' }}>Search Specific</Text>
//             </TouchableOpacity>

//             {/* Scrollable Table */}
//             <ScrollView style={{ flex: 1, marginHorizontal: 10 }}>
//                 {/* Table */}
//                 <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }}>
//                     {/* Table Header */}
//                     <View style={{ flexDirection: 'row', backgroundColor: '#FFD700', padding: 10 }}>
//                         <Text style={tableHeaderStyle}>S.No</Text>
//                         <Text style={tableHeaderStyle}>Truck No</Text>
//                         {/* <Text style={tableHeaderStyle}>PickUp Address</Text> */}
//                         <Text style={tableHeaderStyle}>Day</Text>
//                         <Text style={tableHeaderStyle}>Time Slot</Text>
//                     </View>

//                     {/* Table Rows */}
//                     {scheduleData.map((item, index) => (
//                         <View key={item.id} style={{ flexDirection: 'row', borderBottomWidth: 1, padding: 10 }}>
//                             <Text style={tableRowStyle}>{index + 1}</Text>
//                             <Text style={tableRowStyle}>{item.truckNo}</Text>
//                             {/* <Text style={tableRowStyle}>{item.address}</Text> */}
//                             <Text style={tableRowStyle}>{item.day}</Text>
//                             <Text style={tableRowStyle}>{item.time}</Text>
//                         </View>
//                     ))}
//                 </View>
//             </ScrollView>
//         </View>
//     );
// };

// // Styles
// const tableHeaderStyle = {
//     fontWeight: 'bold',
//     fontSize: 14,
//     padding: 10,
//     flex: 1,
//     textAlign: 'center',
//     borderRightWidth: 1
// };

// const tableRowStyle = {
//     fontSize: 14,
//     padding: 10,
//     flex: 1,
//     textAlign: 'center',
//     borderRightWidth: 1
// };

// export default TruckScheduleManagement;
