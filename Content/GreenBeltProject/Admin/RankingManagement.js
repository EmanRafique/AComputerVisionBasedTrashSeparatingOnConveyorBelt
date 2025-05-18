import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const RankingManagement = ({ navigation }) => {
    const [selectedFilter, setSelectedFilter] = useState('Good');
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("useEffect triggered");

        const fetchUserRanks = async () => {
            setLoading(true);
            try {
                console.log("Fetching User Ranks...");
                const response = await axios.get(`${ApiURL}/getUserRank`);
                console.log("User Ranks:", response.data);
                const categorizedUsers = response.data.map(user => {
                    let category = 'Bad';
                    if (user.rank >= 80) category = 'Good';
                    else if (user.rank >= 50) category = 'Average';
                    return { ...user, rankCategory: category };
                });
                setUsers(categorizedUsers);
            } catch (error) {
                console.error("Error fetching user ranks:", error.message);
            } finally {
                console.log("Stopping loader...");
                setLoading(false);
            }
        };
        fetchUserRanks();
    }, []);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchText.toLowerCase()) &&
        user.rankCategory === selectedFilter
    );

    const getColorByCategory = (category) => {
        switch (category) {
            case 'Good': return '#28a745';
            case 'Average': return '#0056b3';
            case 'Bad': return '#dc3545';
            default: return 'black';
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{
                backgroundColor: '#069349',
                padding: 15,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <TouchableOpacity onPress={() => navigation.navigate("Dashboard")} style={{ padding: 10 }}>
                    <Icon name="arrow-left" size={24} color="white" />
                </TouchableOpacity>
                {/* <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>User Ranking</Text> */}
                <TouchableOpacity onPress={() => setSearchVisible(!searchVisible)} style={{ padding: 10 }}>
                    <Icon name="search" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {searchVisible && (
                <View style={{ padding: 10, backgroundColor: '#f1f1f1' }}>
                    <TextInput
                        placeholder="Enter User Name..."
                        value={searchText}
                        onChangeText={setSearchText}
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

            <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10 }}>
                <TouchableOpacity
                    onPress={() => setSelectedFilter('Good')}
                    style={{
                        backgroundColor: selectedFilter === 'Good' ? 'green' : 'white',
                        borderColor: 'green',
                        borderWidth: 1,
                        borderRadius: 8,
                        paddingVertical: 8,
                        paddingHorizontal: 15,
                        marginHorizontal: 5,
                    }}>
                    <Text style={{ color: selectedFilter === 'Good' ? 'white' : 'green', fontWeight: '900' }}>Good</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setSelectedFilter('Average')}
                    style={{
                        backgroundColor: selectedFilter === 'Average' ? '#007bff' : 'white',
                        borderColor: 'blue',
                        borderWidth: 1,
                        borderRadius: 8,
                        paddingVertical: 8,
                        paddingHorizontal: 15,
                        marginHorizontal: 5,
                    }}>
                    <Text style={{ color: selectedFilter === 'Average' ? 'white' : '#007bff', fontWeight: '900' }}>Average</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setSelectedFilter('Bad')}
                    style={{
                        backgroundColor: selectedFilter === 'Bad' ? 'red' : 'white',
                        borderColor: 'red',
                        borderWidth: 1,
                        borderRadius: 8,
                        paddingVertical: 8,
                        paddingHorizontal: 15,
                        marginHorizontal: 5,
                    }}>
                    <Text style={{ color: selectedFilter === 'Bad' ? 'white' : 'red', fontWeight: '900' }}>Bad</Text>
                </TouchableOpacity>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#069349" style={{ marginTop: 20 }} />
            ) : (
                <ScrollView>
                    <View style={{ padding: 15 }}>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user, index) => (
                                <View
                                    key={index}
                                    style={{
                                        backgroundColor: 'white',
                                        padding: 15,
                                        borderRadius: 10,
                                        elevation: 5,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: 10,
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.2,
                                        shadowRadius: 3,
                                    }}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', flex: 1 }}>{user.name}</Text>
                                    <View style={{
                                        backgroundColor: '#f1f1f1',
                                        paddingHorizontal: 15,
                                        paddingVertical: 5,
                                        borderRadius: 10,
                                    }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: getColorByCategory(user.rankCategory) }}>
                                            {user.rank.toFixed(2)}%
                                        </Text>
                                    </View>
                                </View>
                            ))
                        ) : (
                            <Text style={{ textAlign: 'center', fontSize: 16, color: 'gray' }}>No users found</Text>
                        )}
                    </View>
                </ScrollView>
            )}
        </View>
    );
};

export default RankingManagement;





















// import React, { useState, useEffect } from 'react';

// import { View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import axios from 'axios';

// const RankingManagement = ({ navigation }) => {
//     const [selectedFilter, setSelectedFilter] = useState('Good');
//     const [searchVisible, setSearchVisible] = useState(false);
//     const [searchText, setSearchText] = useState('');
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         console.log("useEffect triggered");

//         const fetchUserRanks = async () => {
//             setLoading(true);
//             try {
//                 console.log("Fetching User Ranks...");
//                 const response = await axios.get(`${ApiURL}/getUserRank`);
//                 console.log("User Ranks:", response.data);
//                 const categorizedUsers = response.data.map(user => {
//                     let category = 'Bad';
//                     if (user.rank >= 80) category = 'Good';
//                     else if (user.rank >= 50) category = 'Average';
//                     return { ...user, rankCategory: category };
//                 });
//                 setUsers(categorizedUsers);
//             } catch (error) {
//                 console.error("Error fetching user ranks:", error.message);
//             } finally {
//                 console.log("Stopping loader...");
//                 setLoading(false);
//             }
//         };
//         fetchUserRanks();
//     }, []);

//     const filteredUsers = users.filter(user =>
//         user.name.toLowerCase().includes(searchText.toLowerCase()) &&
//         user.rankCategory === selectedFilter
//     );

//     return (
//         <View style={{ flex: 1, backgroundColor: 'white' }}>
//             <View style={{
//                 backgroundColor: '#069349',
//                 padding: 15,
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'space-between'
//             }}>
//                 <TouchableOpacity onPress={() => navigation.navigate("Dashboard")} style={{ padding: 10 }}>
//                     <Icon name="arrow-left" size={24} color="white" />
//                 </TouchableOpacity>
//                 <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>User Ranking</Text>
//                 <TouchableOpacity onPress={() => setSearchVisible(!searchVisible)} style={{ padding: 10 }}>
//                     <Icon name="search" size={24} color="white" />
//                 </TouchableOpacity>
//             </View>

//             {searchVisible && (
//                 <View style={{ padding: 10, backgroundColor: '#f1f1f1' }}>
//                     <TextInput
//                         placeholder="Enter User Name..."
//                         value={searchText}
//                         onChangeText={setSearchText}
//                         style={{
//                             backgroundColor: 'white',
//                             padding: 12,
//                             borderRadius: 5,
//                             fontSize: 16,
//                             borderWidth: 1,
//                             borderColor: '#ddd'
//                         }}
//                     />
//                 </View>
//             )}

//             <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10 }}>
//                 <TouchableOpacity
//                     onPress={() => setSelectedFilter('Good')}
//                     style={{
//                         backgroundColor: selectedFilter === 'Good' ? 'green' : 'white',
//                         borderColor: 'green',
//                         borderWidth: 1,
//                         borderRadius: 8,
//                         paddingVertical: 8,
//                         paddingHorizontal: 15,
//                         marginHorizontal: 5,
//                     }}>
//                     <Text style={{ color: selectedFilter === 'Good' ? 'white' : 'green', fontWeight: 'bold' }}>Good</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                     onPress={() => setSelectedFilter('Average')}
//                     style={{
//                         backgroundColor: selectedFilter === 'Average' ? 'blue' : 'white',
//                         borderColor: 'blue',
//                         borderWidth: 1,
//                         borderRadius: 8,
//                         paddingVertical: 8,
//                         paddingHorizontal: 15,
//                         marginHorizontal: 5,
//                     }}>
//                     <Text style={{ color: selectedFilter === 'Average' ? 'white' : 'blue', fontWeight: 'bold' }}>Average</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                     onPress={() => setSelectedFilter('Bad')}
//                     style={{
//                         backgroundColor: selectedFilter === 'Bad' ? 'red' : 'white',
//                         borderColor: 'red',
//                         borderWidth: 1,
//                         borderRadius: 8,
//                         paddingVertical: 8,
//                         paddingHorizontal: 15,
//                         marginHorizontal: 5,
//                     }}>
//                     <Text style={{ color: selectedFilter === 'Bad' ? 'white' : 'red', fontWeight: 'bold' }}>Bad</Text>
//                 </TouchableOpacity>
//             </View>

//             {loading ? (
//                 <ActivityIndicator size="large" color="#069349" style={{ marginTop: 20 }} />
//             ) : (
//                 <ScrollView>
//                     <View style={{ padding: 15 }}>
//                         {filteredUsers.length > 0 ? (
//                             filteredUsers.map((user, index) => (
//                                 <View
//                                     key={index}
//                                     style={{
//                                         backgroundColor: 'white',
//                                         padding: 15,
//                                         borderRadius: 10,
//                                         elevation: 5,
//                                         flexDirection: 'row',
//                                         justifyContent: 'space-between',
//                                         alignItems: 'center',
//                                         marginBottom: 10,
//                                         shadowColor: '#000',
//                                         shadowOffset: { width: 0, height: 2 },
//                                         shadowOpacity: 0.2,
//                                         shadowRadius: 3,
//                                     }}>
//                                     <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{user.name}</Text>
//                                     <View
//                                         style={{
//                                             backgroundColor: user.rankCategory === 'Good' ? '#27ae60' : 
//                                             user.rankCategory === 'Average' ? '#2980b9' : '#e74c3c',
//                                             paddingVertical: 5,
//                                             paddingHorizontal: 15,
//                                             borderRadius: 10,
//                                         }}>
//                                         <Text style={{ color: 'white', fontWeight: 'bold' }}>{user.rankCategory}</Text>
//                                     </View>
//                                 </View>
//                             ))
//                         ) : (
//                             <Text style={{ textAlign: 'center', fontSize: 16, color: 'gray' }}>No users found</Text>
//                         )}
//                     </View>
//                 </ScrollView>
//             )}
//         </View>
//     );
// };

// export default RankingManagement;
















// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const RankingManagement = ({ navigation }) => {
//     const [selectedFilter, setSelectedFilter] = useState('Good');
//     const [searchVisible, setSearchVisible] = useState(false);
//     const [searchText, setSearchText] = useState('');

//     const users = [
//         { name: 'Sharjeel Ahmed', rank: 'Good' },
//         { name: 'Faizan Ali', rank: 'Good' },
//         { name: 'Noman Haider', rank: 'Good' },
//         { name: 'Zeeshan Farooq', rank: 'Good' },
//         { name: 'Luqman Ali', rank: 'Good' },
//         { name: 'Muhammad Adnan', rank: 'Good' },
//         { name: 'Awais Khan', rank: 'Good' },
//         { name: 'Muhammad Hassan', rank: 'Good' },
//         { name: 'Talah Malik', rank: 'Good' },
//     ];

//     const filteredUsers = users.filter(user => 
//         user.name.toLowerCase().includes(searchText.toLowerCase())
//     );

//     return (
//         <View style={{ flex: 1, backgroundColor: 'white' }}>
//             {/* Header */}
//             <View style={{
//                 backgroundColor: '#069349',
//                 padding: 15,
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'space-between'
//             }}>
//                 {/* Back Arrow */}
//                 <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
//                     <Icon name="arrow-left" size={24} color="white" />
//                 </TouchableOpacity>

//                 {/* Title */}
//                 <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>User Ranking</Text>

//                 {/* Search Icon (Toggle Search Bar) */}
//                 <TouchableOpacity onPress={() => setSearchVisible(!searchVisible)} style={{ padding: 10 }}>
//                     <Icon name="search" size={24} color="white" />
//                 </TouchableOpacity>
//             </View>

//             {/* Search Bar (Visible when toggled) */}
//             {searchVisible && (
//                 <View style={{ padding: 10, backgroundColor: '#f1f1f1' }}>
//                     <TextInput
//                         placeholder="Enter User Name..."
//                         value={searchText}
//                         onChangeText={setSearchText}
//                         style={{
//                             backgroundColor: 'white',
//                             padding: 12,
//                             borderRadius: 5,
//                             fontSize: 16,
//                             borderWidth: 1,
//                             borderColor: '#ddd'
//                         }}
//                     />
//                 </View>
//             )}

//             {/* Filter Buttons */}
//             <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10 }}>
//                 <TouchableOpacity
//                     onPress={() => setSelectedFilter('Average')}
//                     style={{
//                         backgroundColor: selectedFilter === 'Average' ? 'blue' : 'white',
//                         borderColor: 'blue',
//                         borderWidth: 1,
//                         borderRadius: 8,
//                         paddingVertical: 8,
//                         paddingHorizontal: 15,
//                         marginHorizontal: 5,
//                     }}>
//                     <Text style={{ color: selectedFilter === 'Average' ? 'white' : 'blue', fontWeight: 'bold' }}>Average</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                     onPress={() => setSelectedFilter('Bad')}
//                     style={{
//                         backgroundColor: selectedFilter === 'Bad' ? 'red' : 'white',
//                         borderColor: 'red',
//                         borderWidth: 1,
//                         borderRadius: 8,
//                         paddingVertical: 8,
//                         paddingHorizontal: 15,
//                         marginHorizontal: 5,
//                     }}>
//                     <Text style={{ color: selectedFilter === 'Bad' ? 'white' : 'red', fontWeight: 'bold' }}>Bad</Text>
//                 </TouchableOpacity>
//             </View>

//             {/* User List */}
//             <ScrollView>
//                 <View style={{ padding: 15 }}>
//                     {filteredUsers.length > 0 ? (
//                         filteredUsers.map((user, index) => (
//                             <View
//                                 key={index}
//                                 style={{
//                                     backgroundColor: 'white',
//                                     padding: 15,
//                                     borderRadius: 10,
//                                     elevation: 5,
//                                     flexDirection: 'row',
//                                     justifyContent: 'space-between',
//                                     alignItems: 'center',
//                                     marginBottom: 10,
//                                     shadowColor: '#000',
//                                     shadowOffset: { width: 0, height: 2 },
//                                     shadowOpacity: 0.2,
//                                     shadowRadius: 3,
//                                 }}>
//                                 <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{user.name}</Text>
//                                 <View
//                                     style={{
//                                         backgroundColor: 'green',
//                                         paddingVertical: 5,
//                                         paddingHorizontal: 15,
//                                         borderRadius: 15,
//                                     }}>
//                                     <Text style={{ color: 'white', fontWeight: 'bold' }}>{user.rank}</Text>
//                                 </View>
//                             </View>
//                         ))
//                     ) : (
//                         <Text style={{ textAlign: 'center', fontSize: 16, color: 'gray' }}>No users found</Text>
//                     )}
//                 </View>
//             </ScrollView>
//         </View>
//     );
// };

// export default RankingManagement;
