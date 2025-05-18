import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";
import * as ImagePicker from 'react-native-image-picker';
import { openDatabase } from 'react-native-sqlite-storage';

const DBEmployeeTask = () => {

    const db = openDatabase({ name: 'Employees.db' });

    useEffect(() => {
        db.transaction(txl => {
            txl.executeSql(
                'create table if not exists Emp' +
                '(empId integer primary key AUTOINCREMENT,name text,' +
                'city text, age integer, department text, Path text)',
                [],
                () => { console.log('Table CREATED successfully'); },
                (e) => { console.log(e.message); }
            );
        });
    }, []);

    const [myImage, setMyImage] = useState(null);
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [age, setAge] = useState('');
    const [department, setDepartment] = useState('');
    const [allEmployees, setAllEmployees] = useState([]);

    const addImage = () => {
        const opt = { mediaType: 'photo' };
        ImagePicker.launchCamera(opt, (resp) => {
            if (resp.assets && resp.assets[0].uri) {
                setMyImage(resp.assets[0].uri);
            }
        });
    };

    const insertEmployee = () => {
        const query = 'insert into Emp(name, city, age, department, Path) values(?,?,?,?,?)';
        db.transaction(txl => {
            txl.executeSql(
                query,
                [name, city, age, department, myImage],
                () => { console.log('Data inserted successfully'); },
                (e) => { console.log(e.message); }
            );
        });
    };

    const deleteEmployee = (empId) => {
        const query = 'delete from Emp where empId = ?';
        db.transaction(txl => {
            txl.executeSql(
                query,
                [empId],
                () => {
                    console.log(`Employee with ID ${empId} deleted successfully`);
                    getAllEmployees();
                },
                (e) => { console.log(e.message); }
            );
        });
    };

    const getAllEmployees = () => {
        console.log('Fetching all employees');
        db.transaction(txl => {
            txl.executeSql(
                'select * from Emp',
                [],
                (txl, resp) => {
                    console.log(resp.rows.length);
                    const tempAllEmployees = [];
                    for (let i = 0; i < resp.rows.length; i++) {
                        const emp = resp.rows.item(i);
                        tempAllEmployees.push({
                            empId: emp.empId,
                            name: emp.name,
                            city: emp.city,
                            age: emp.age,
                            Path: emp.Path
                        });
                    }
                    setAllEmployees(tempAllEmployees);
                },
                (error) => { console.error(error.message); }
            );
        });
    };

    const populateList = ({ item }) => (
        <View style={{ marginBottom: 20 }}>
            <Image
                source={{ uri: item.Path }}
                style={{ width: 150, height: 150, marginBottom: 10 }}
            />
            <Text>Name: {item.name}</Text>
            <Text>City: {item.city}</Text>
            <Text>Age: {item.age}</Text>
            <Button
                mode="contained"
                onPress={() => deleteEmployee(item.empId)}
                style={{ marginTop: 10 }}
            >Delete</Button>
        </View>
    );

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <Image
                    style={{ width: 150, height: 150, backgroundColor: 'gray', marginBottom: 10 }}
                    source={myImage ? { uri: myImage } : null}
                />
                <Button mode='contained' onPress={addImage}>+ Add Image</Button>
            </View>

            <View style={{ marginBottom: 20 }}>
                <TextInput
                    placeholder="Name"
                    onChangeText={setName}
                    style={{ marginBottom: 10, borderWidth: 1, padding: 10, fontSize: 18 }}
                />
                <TextInput
                    placeholder="City"
                    onChangeText={setCity}
                    style={{ marginBottom: 10, borderWidth: 1, padding: 10, fontSize: 18 }}
                />
                <TextInput
                    placeholder="Age"
                    keyboardType="numeric"
                    onChangeText={setAge}
                    style={{ marginBottom: 10, borderWidth: 1, padding: 10, fontSize: 18 }}
                />
                <TextInput
                    placeholder="Department"
                    onChangeText={setDepartment}
                    style={{ marginBottom: 10, borderWidth: 1, padding: 10, fontSize: 18 }}
                />
            </View>

            <Button mode='contained' onPress={insertEmployee} style={{ marginBottom: 20 }}>Save Employee</Button>

            <Button mode='contained' onPress={getAllEmployees} style={{ marginBottom: 20 }}>Show All Employees</Button>

            <FlatList
                data={allEmployees}
                renderItem={populateList}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

export default DBEmployeeTask;
