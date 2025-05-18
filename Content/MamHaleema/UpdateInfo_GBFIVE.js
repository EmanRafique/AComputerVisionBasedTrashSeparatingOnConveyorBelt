import React, { useState, useEffect } from 'react';
import {View,TouchableOpacity,Text,TextInput,ScrollView,KeyboardAvoidingView,Alert,
    ActivityIndicator, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const UpdateInfo_GBFIVE = ({ navigation }) => {
    const [employees, setEmployees] = useState([]);
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);  

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const response = await fetch(url+'Employee/GetEmployee');
            const data = await response.json();
            setEmployees(data);
            setFilteredData(data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        } finally {
            setLoading(false);  
        }
    };

    const handleSearchPress = () => {
        setSearchVisible(!searchVisible);
        setSearchText('');
        setFilteredData(employees); 
    };

    const handleSearch = (text) => {
        setSearchText(text);
        const results = employees.filter((item) =>
            item.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(results);
    };

    const handleEdit = (id, name) => {
        Alert.alert(
            'Edit Profile',
            `Are you sure you want to edit "${name}'s" profile?`,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Edit canceled'),
                    style: 'cancel',
                },
                {
                    text: 'Proceed',
                    onPress: () => navigation.navigate('UpdateDetails', { id, name }),
                },
            ]
        );
    };

    // Format date to dd/mm/yyyy
    const formatDate = (date) => {
        const d = new Date(date);
        const day = d.getDate().toString().padStart(2, '0');
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white' }}>
            {/* Header Section */}
            <View
                style={{
                    backgroundColor: '#069349',
                    paddingVertical: 20,
                    paddingHorizontal: 15,
                    height: 100,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                {/* Back Button */}
                <TouchableOpacity
                    onPress={() => {
                        setSearchText('');
                        setFilteredData(employees);
                        navigation.navigate('EmployeeManagement');
                    }}
                    style={{
                        marginRight: 15,
                        width: 35,
                        height: 35,
                        borderRadius: 17.5,
                        backgroundColor: 'black',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Icon name="arrow-back" size={25} color="white" />
                </TouchableOpacity>

                {/* Title and Search Icon */}
                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>Update Information</Text>
                    <TouchableOpacity onPress={handleSearchPress} style={{ marginLeft: 10 }}>
                        <Icon name="search" size={35} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Search Bar */}
            {searchVisible && (
                <View style={{ backgroundColor: '#f1f1f1', paddingHorizontal: 10, paddingVertical: 8 }}>
                    <TextInput
                        placeholder="Search by name..."
                        value={searchText}
                        onChangeText={handleSearch}
                        style={{
                            backgroundColor: 'white',
                            borderRadius: 5,
                            paddingHorizontal: 10,
                            fontSize: 16,
                        }}
                    />
                </View>
            )}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    backgroundColor: '#f1f1f1',
                }}
            >
                <Text style={{ fontSize: 16, fontWeight: '900', flex: 2 }}>Name</Text>
                <Text style={{ fontSize: 16, fontWeight: '900', flex: 3, textAlign: 'center' }}>Date</Text>
                <Text style={{ fontSize: 16, fontWeight: '900', flex: 3, textAlign: 'center' }}>Role</Text>
                <Text style={{ fontSize: 16, fontWeight: '900', flex: 1, textAlign: 'center' }}>Edit</Text>
            </View>

            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',paddingVertical:20}}>
                    <ActivityIndicator size="large" color="black" />
                </View>
            ) : filteredData.length > 0 ? (
                <ScrollView>
                    {filteredData.map((item, index) => (
                        <View
                            key={index}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: '#ddd',
                                alignItems: 'center',
                                backgroundColor: searchText ? '#d3f9d8' : 'white',
                            }}
                        >
                            <Text style={{ fontSize: 14, flex: 2 }}>{item.name}</Text>
                            <Text style={{ fontSize: 14, flex: 3, textAlign: 'center' }}>
                                {formatDate(item.date)}
                            </Text>
                            <Text style={{ fontSize: 14, flex: 3, textAlign: 'center' }}>{item.role}</Text>
                            <TouchableOpacity
                                onPress={() => handleEdit(item.id, item.name)} 
                                style={{ flex: 1, alignItems: 'center' }}
                            >
                                <Icon name="edit" size={20} color="#069349" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            ) : (
                <View style={{ padding: 20, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, color: '#777' }}>No results found.</Text>
                </View>
            )}
        </KeyboardAvoidingView>
    );
};

export default UpdateInfo_GBFIVE;
