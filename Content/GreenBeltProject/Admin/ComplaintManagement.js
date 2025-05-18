import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ComplaintManagement = ({ navigation }) => {
    const [allComplaints, setAllComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCompleted, setShowCompleted] = useState(false);

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${global.ApiURL}allComplaints`);
            setAllComplaints(response.data);
        } catch (error) {
            setError(error.response?.data?.message || "Failed to fetch complaints");
            Alert.alert("Error", error.response?.data?.message || "Server error");
        } finally {
            setLoading(false);
        }
    };

    const filteredComplaints = allComplaints.filter(item => {
        const status = item?.Status?.toLowerCase() || "unknown";
        return showCompleted ? status === "closed" : status === "review";
    });

    const getFirstName = (fullName) => {
        return fullName ? fullName.split(" ")[0] : "Unknown";
    };

    const formatDate = (dateTime) => {
        if (!dateTime) return "N/A";
        const date = new Date(dateTime);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#F9F9F9' }}>
            {/* Header */}
            <View style={{
                backgroundColor: '#069349',
                paddingVertical: 15,
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                elevation: 5,
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
                    <Icon name="arrow-left" size={24} color="white" />
                </TouchableOpacity>

                {/* <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
                    Complaint Management
                </Text> */}

                <TouchableOpacity
                    onPress={() => setShowCompleted(!showCompleted)}
                    style={{
                        backgroundColor: showCompleted ? '#FF4500' : '#32CD32',
                        paddingVertical: 8,
                        paddingHorizontal: 15,
                        borderRadius: 20,
                    }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                        {showCompleted ? "Pending" : "Completed"}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Loading or Error */}
            {loading ? (
                <ActivityIndicator size="large" color="#069349" style={{ marginTop: 20 }} />
            ) : error ? (
                <Text style={{ textAlign: "center", marginTop: 20, color: "red", fontSize: 16 }}>
                    {error}
                </Text>
            ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                    {filteredComplaints.map((item, index) => {
                        const status = item?.Status?.toLowerCase() || "unknown";
                        return (
                            <View
                                key={index}
                                style={{
                                    backgroundColor: 'white',
                                    marginHorizontal: 15,
                                    marginVertical: 8,
                                    padding: 15,
                                    borderRadius: 15,
                                    shadowColor: "#000",
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 4,
                                    elevation: 5,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <View style={{ flex: 3 }}>
                                    <Text style={{ fontSize: 16, fontWeight: '900', color: '#333' }}>
                                        {getFirstName(item["User Name"])}
                                    </Text>
                                    <Text style={{ color: '#888', marginTop: 5, fontSize: 15  }}>
                                        {item.Reason || "No reason provided"}
                                    </Text>
                                    <Text style={{ color: '#555', marginTop: 8, fontSize: 15 }}>
                                        {formatDate(item["Complaint Date"])}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {showCompleted && (
                                        <Text style={{
                                            color: status === "closed" ? "#32CD32" : "#FF6347",
                                            fontWeight: 'bold',
                                            marginRight: 10
                                        }}>
                                            {status.toUpperCase()}
                                        </Text>
                                    )}

                                    {!showCompleted && (
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate("AdminResponse", {
                                                ticketNumber: item["Ticket Number"],
                                                userName: getFirstName(item["User Name"]),
                                                reason: item.Reason
                                            })}
                                            style={{
                                                backgroundColor: '#FFD700',
                                                padding: 10,
                                                borderRadius: 50,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                elevation: 3,
                                            }}
                                        >
                                            <Icon name="plus" size={20} color="white" />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        );
                    })}

                    {filteredComplaints.length === 0 && (
                        <Text style={{ textAlign: "center", marginTop: 20, fontSize: 16, color: "gray" }}>
                            No complaints found.
                        </Text>
                    )}
                </ScrollView>
            )}
        </View>
    );
};

export default ComplaintManagement;



















// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const ComplaintManagement = ({ navigation }) => {
//     const [allComplaints, setAllComplaints] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [showCompleted, setShowCompleted] = useState(false);

//     useEffect(() => {
//         fetchComplaints();
//     }, []);

//     const fetchComplaints = async () => {
//         setLoading(true);
//         try {
//             const response = await axios.get(`${global.ApiURL}allComplaints`);
//             setAllComplaints(response.data);
//         } catch (error) {
//             setError(error.response?.data?.message || "Failed to fetch complaints");
//             Alert.alert("Error", error.response?.data?.message || "Server error");
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Filter complaints based on status
//     const filteredComplaints = allComplaints.filter(item => {
//         const status = item?.Status?.toLowerCase() || "unknown";
//         return showCompleted ? status === "closed" : status === "review";
//     });

//     // Extract first name from full name
//     const getFirstName = (fullName) => {
//         return fullName ? fullName.split(" ")[0] : "Unknown";
//     };

//     // Format date as DD-MM-YYYY
//     const formatDate = (dateTime) => {
//         if (!dateTime) return "N/A";
//         const date = new Date(dateTime);
//         const day = String(date.getDate()).padStart(2, '0');
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const year = date.getFullYear();
//         return `${day}-${month}-${year}`;
//     };

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
//                 {/* Back Button */}
//                 <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
//                     <Icon name="arrow-left" size={24} color="white" />
//                 </TouchableOpacity>

//                 {/* Toggle Button (Pending <-> Completed) */}
//                 <TouchableOpacity
//                     onPress={() => setShowCompleted(!showCompleted)}
//                     style={{
//                         backgroundColor: showCompleted ? 'blue' : 'green',
//                         paddingVertical: 5,
//                         paddingHorizontal: 15,
//                         borderRadius: 15,
//                     }}>
//                     <Text style={{ color: 'white', fontWeight: 'bold' }}>
//                         {showCompleted ? "Pending" : "Completed"}
//                     </Text>
//                 </TouchableOpacity>
//             </View>

//             {/* Table Header */}
//             <View style={{
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 padding: 10,
//                 backgroundColor: '#F5F5F5',
//                 borderBottomWidth: 1,
//                 borderColor: '#ddd'
//             }}>
//                 <Text style={{ fontWeight: 'bold', flex: 1 }}>Name</Text>
//                 <Text style={{ fontWeight: 'bold', flex: 1 }}>Reason</Text>
//                 <Text style={{ fontWeight: 'bold', flex: 2, textAlign: 'center' }}>Date</Text>
//                 {showCompleted && <Text style={{ fontWeight: 'bold', flex: 1 }}>Status</Text>}
//             </View>

//             {/* Loading State */}
//             {loading ? (
//                 <ActivityIndicator size="large" color="#069349" style={{ marginTop: 20 }} />
//             ) : error ? (
//                 <Text style={{ textAlign: "center", marginTop: 20, color: "red" }}>{error}</Text>
//             ) : (
//                 <ScrollView>
//                     {filteredComplaints.map((item, index) => {
//                         const status = item?.Status?.toLowerCase() || "unknown";
//                         return (
//                             <View
//                                 key={index}
//                                 style={{
//                                     flexDirection: 'row',
//                                     justifyContent: 'space-between',
//                                     alignItems: 'center',
//                                     padding: 10,
//                                     borderBottomWidth: 1,
//                                     borderColor: '#ddd',
//                                 }}>
//                                 <Text style={{ flex: 1, fontSize: 14 }}>{getFirstName(item["User Name"])}</Text>
//                                 <Text style={{ flex: 2, fontSize: 14, color: 'gray' }}>{item.Reason || "No reason yet"}</Text>
//                                 <Text style={{ flex: 1, fontSize: 14, textAlign: 'center' }}>{formatDate(item["Complaint Date"])}</Text>

//                                 {/* Show Status only for Completed Complaints */}
//                                 {showCompleted && (
//                                     <Text style={{ flex: 1, fontSize: 14, color: "green" }}>{status}</Text>
//                                 )}

//                                 {!showCompleted && (
//                                     <TouchableOpacity
//                                     onPress={() => navigation.navigate("AdminResponse", {
//                                         ticketNumber: item["Ticket Number"],
//                                         userName: getFirstName(item["User Name"]),
//                                         reason: item.Reason
//                                     })}
//                                     style={{ padding: 5 }}>
//                                     <Icon name="plus" size={20} color="#FFD700" />
//                                 </TouchableOpacity>
                                
//                                 )}
//                             </View>
//                         );
//                     })}
//                 </ScrollView>
//             )}
//         </View>
//     );
// };

// export default ComplaintManagement;