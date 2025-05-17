import React, { useEffect, useState } from 'react';
import { Alert, View, Text, Image, TextInput, FlatList } from 'react-native';
import { MyBtn } from './allControllers';
import * as ImagePicker from 'react-native-image-picker';
import SQLite from 'react-native-sqlite-storage';

const DBpract = () => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [area, setArea] = useState('');
    const [salary, setSalary] = useState('');
    const [department, setDepartment] = useState('');
    const [imagePath, setImagePath] = useState('');
    const [allUsers, setAllUsers] = useState([]);

    const db = SQLite.openDatabase({ name: 'PracticeDB', location: 'default' });

    useEffect(() => {
        db.transaction(txl => {
            txl.executeSql(
                'CREATE TABLE IF NOT EXISTS USER (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, area TEXT, salary FLOAT, department TEXT, imagePath TEXT)',
                [],
                () => { console.log('Table created successfully'); },
                (error) => { console.log(error); }
            );
        });
    }, []);

    const addUser = () => {
        db.transaction(txl => {
            txl.executeSql(
                'INSERT INTO USER (name, email, area, salary, department, imagePath) VALUES (?, ?, ?, ?, ?, ?)',
                [name, email, area, salary, department, imagePath],
                () => { Alert.alert('User Added Successfully'); },
                (error) => { Alert.alert(error.message); }
            );
        });
    };

    const showAllUser = () => {
        db.transaction(txl => {
            txl.executeSql(
                'SELECT * FROM USER',
                [],
                (txl, resp) => {
                    const temp = [];
                    for (let i = 0; i < resp.rows.length; i++) {
                        temp.push(resp.rows.item(i));
                    }
                    setAllUsers(temp);
                },
                (error) => { Alert.alert(error.message); }
            );
        });
    };

    const showById = () => {
        db.transaction(txl => {
            txl.executeSql(
                'SELECT * FROM USER WHERE id = ?',
                [id],
                (txl, resp) => {
                    if (resp.rows.length > 0) {
                        const u = resp.rows.item(0);
                        setName(u.name);
                        setEmail(u.email);
                        setArea(u.area);
                        setSalary(u.salary.toString());
                        setDepartment(u.department);
                        setImagePath(u.imagePath);
                    } else {
                        Alert.alert('No user found with this ID.');
                    }
                },
                (error) => { Alert.alert(error.message); }
            );
        });
    };

    const deleteUser = () => {
        db.transaction(txl => {
            txl.executeSql(
                'DELETE FROM USER WHERE id = ?',
                [id],
                () => { Alert.alert('User deleted successfully'); },
                (error) => { Alert.alert(error.message); }
            );
        });
    };

    const updateUser = () => {
        db.transaction(txl => {
            txl.executeSql(
                'UPDATE USER SET name = ?, email = ?, salary = ?, area = ?, department = ?, imagePath = ? WHERE id = ?',
                [name, email, salary, area, department, imagePath, id],
                () => { Alert.alert('User Updated Successfully'); },
                (error) => { Alert.alert(error.message); }
            );
        });
    };

    const addImage = () => {
        const option = { mediaType: 'photo' };
        ImagePicker.launchImageLibrary(option, (response) => {
            if (response.assets && response.assets.length > 0) {
                setImagePath(response.assets[0].uri);
                Alert.alert('Image Added Successfully');
            }
        });
    };

    const showUserId = (userId) => {
        Alert.alert('User ID: ', userId.toString());
    };

    const renderUser = ({ item }) => (
        <View>
            {item.imagePath && <Image source={{ uri: item.imagePath }} style={{ width: 50, height: 50 }} />}
            <Text>Name: {item.name}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Area: {item.area}</Text>
            <Text>Salary: {item.salary}</Text>
            <Text>Department: {item.department}</Text>
            <MyBtn title='Show Id' onPress={() => showUserId(item.id)} />
            <MyBtn title='Delete' onPress={() => deleteUser(item.id)} />
        </View>
    );

    return (
        <View>
            <TextInput
                placeholder='ID field'
                value={id}
                onChangeText={(text) => setId(text)}
                keyboardType='numeric'
            />
            <TextInput placeholder='Enter Name' value={name} onChangeText={setName} />
            <TextInput placeholder='Enter Email' value={email} onChangeText={setEmail} />
            <TextInput placeholder='Enter Area' value={area} onChangeText={setArea} />
            <TextInput placeholder='Enter Salary' value={salary} onChangeText={setSalary} keyboardType='numeric' />
            <TextInput placeholder='Enter Department' value={department} onChangeText={setDepartment} />
            <View style={{ flexDirection: 'row' }}>
                <MyBtn title='Add User' onPress={addUser} />
                <MyBtn title='Add Image' onPress={addImage} />
                <MyBtn title='Show All Users' onPress={showAllUser} />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <MyBtn title='Show by ID' onPress={showById} />
                <MyBtn title='Delete User' onPress={deleteUser} />
                <MyBtn title='Update User' onPress={updateUser} />
            </View>
            <FlatList data={allUsers} keyExtractor={(item) => item.id.toString()} renderItem={renderUser} />
        </View>
    );
};

export default DBpract;
