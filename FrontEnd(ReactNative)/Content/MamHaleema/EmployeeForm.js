import React from 'react';
import { View, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MyBtn } from '../SirNouman/allControllers'; // Make sure the path is correct

const EmployeeManagement_GBONE = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#069349', alignItems: 'center', justifyContent: 'center' }}>
            {/* Background Image */}
            <ImageBackground
                source={require('../assets/Images_SirNoman/garbage-collector-with-garbage-bags-3316358-2784925.png')}
                style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.05 }}
                resizeMode="cover"
            />

            {/* Button Section */}
            <View style={{ flexDirection: 'column', alignItems: 'center', width: '100%', gap: 15 }}>
                {/* Navigate to Add Employee Screen */}
                <MyBtn
                    title="Add Employee"
                    onPress={() => navigation.navigate('AddEmployee')} // Navigate to 'AddEmployee' screen
                    style={{
                        backgroundColor: 'black',
                        width: '70%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 10,
                        paddingVertical: 15,
                        borderRadius: 20,
                    }}
                    txtStyle={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}
                >
                    <Icon name="person" size={20} color="white" /> {/* Add Employee Icon */}
                </MyBtn>

                {/* Navigate to Delete Employee Screen */}
                <MyBtn
                    title="Delete Account"
                    onPress={() => navigation.navigate('DeleteEmployee')} // Navigate to 'DeleteEmployee' screen
                    style={{
                        backgroundColor: 'black',
                        width: '70%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 10,
                        paddingVertical: 15,
                        borderRadius: 20,
                    }}
                    txtStyle={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}
                >
                    <Icon name="delete" size={20} color="white" /> {/* Delete Account Icon */}
                </MyBtn>

                {/* Navigate to Update Info Screen */}
                <MyBtn
                    title="Update Info"
                    onPress={() => navigation.navigate('UpdateInfo')} // Navigate to 'UpdateInfo' screen
                    style={{
                        backgroundColor: 'black',
                        width: '70%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 10,
                        paddingVertical: 15,
                        borderRadius: 20,
                    }}
                    txtStyle={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}
                >
                    <Icon name="edit" size={20} color="white" /> {/* Update Info Icon */}
                </MyBtn>
            </View>
        </View>
    );
};

export default EmployeeManagement_GBONE;
