import React, { useState, useEffect } from 'react';
import {View, TouchableOpacity, Text, TextInput, ScrollView, KeyboardAvoidingView, Alert, ActivityIndicator, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const UpdateInfo = ({ navigation }) => {
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
            const response = await fetch(ApiURL + 'showAllEmployee');
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
            item.Name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(results);
    };

    const handleEdit = (id, name) => {  
        console.log('Selected Employee ID:', id);
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
                    onPress: () => navigation.navigate('UpdateDetails', { id })
                },
            ]
        );
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white' }}>
            <View
                style={{
                    backgroundColor: '#069349',
                    height: 70,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        setSearchText('');
                        setFilteredData(employees);
                        navigation.navigate('EmployeeManagement');
                    }}
                    style={{
                        marginRight: 20,
                        width: 35,
                        height: 35,
                        borderRadius: 17.5,
                        left:10,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Icon name="arrow-left" size={24} color="white" />
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>Update Information</Text>
                    <TouchableOpacity onPress={handleSearchPress} style={{ marginRight: 20}}>
                        <Icon name="search" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

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
                <Text style={{ fontSize: 16, fontWeight: '900', flex: 1 }}>Name</Text>
                <Text style={{ fontSize: 16, fontWeight: '900', flex: 4, textAlign: 'center' }}>Email</Text>
                <Text style={{ fontSize: 16, fontWeight: '900', flex: 1, textAlign: 'center' }}>Role</Text>
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
                            <Text style={{ fontSize: 14, flex: 3 }}>{item.name}</Text>
                            <Text style={{ fontSize: 14, flex: 4, textAlign: 'center' }}>{item.email}</Text>
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

export default UpdateInfo;
