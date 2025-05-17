import React, { useEffect, useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";
import SQLite from 'react-native-sqlite-storage';

const DBConnectivity = () => {
    const [ID, setID] = useState();
    const [name, setName] = useState('');
    const [allPersons, setAllPersons] = useState([]);

    const db = SQLite.openDatabase(
        { name: 'myDB.db', location: 'default' },
        () => console.log('Database opened successfully'),
        (error) => console.log('Error opening database', error)
    );

    const createTable = () => {
        db.transaction(
            (txn) => {
                txn.executeSql(
                    'CREATE TABLE IF NOT EXISTS Person(ID INTEGER PRIMARY KEY, pName TEXT)',
                    [],
                    () => console.log('Table Created Successfully'),
                    (error) => console.log('Error Message:', error.message)
                );
            }
        );
    };

    const insertData = () => {
        db.transaction((txn) => {
            txn.executeSql(
                'INSERT INTO Person(ID, pName) VALUES (?, ?)',
                [ID, name],
                () => console.log('Data Inserted Successfully'),
                (error) => console.log('Error inserting data:', error.message)
            );
        });
    };

    const getAllData = () => {
        db.transaction(txn => {
            txn.executeSql(
                'SELECT * FROM Person',
                [],
                (txn, res) => {
                    const tempAllPersons = [];
                    for (let i = 0; i < res.rows.length; i++) {
                        tempAllPersons.push(res.rows.item(i));
                    }
                    setAllPersons(tempAllPersons);
                    console.log('Fetched Data:', tempAllPersons);
                },
                (error) => console.log('Error fetching data:', error.message)
            );
        });
    };

    const getDataByID = () => {
        db.transaction((txn) => {
            txn.executeSql(
                'SELECT * FROM Person WHERE ID = ?',
                [ID],
                (txn, res) => {
                    if (res.rows.length > 0) {
                        console.log('Data by ID:', res.rows.item(0));
                        setName(res.rows.item(0).pName);
                    } else {
                        console.log('No record found');
                    }
                },
                (error) => console.log('Error fetching data by ID:', error.message)
            );
        });
    };

    useEffect(createTable, []);

    return (
        <View style={{ flex: 1 }}>
            <TextInput
                onChangeText={setID}
                placeholder="Enter ID"
                value={ID}
                style={{ borderWidth: 1, borderRadius: 10, margin: 10, fontSize: 20 }}
            />
            <TextInput
                onChangeText={setName}
                placeholder="Enter Name"
                value={name}
                style={{ borderWidth: 1, borderRadius: 10, margin: 10, fontSize: 20 }}
            />
            <Button
                onPress={insertData}
                mode="contained"
                style={{ borderRadius: 10, margin: 10, width: '40%', alignSelf: 'center' }}
            >Add Data</Button>
            <Button
                onPress={getDataByID}
                mode="contained"
                style={{ borderRadius: 10, margin: 10, width: '40%', alignSelf: 'center' }}
            >Show By ID</Button>
            <Button
                onPress={getAllData}
                mode="contained"
                style={{ borderRadius: 10, margin: 10, width: '40%', alignSelf: 'center' }}
            >Show All</Button>
            <FlatList
                data={allPersons}
                keyExtractor={(item) => item.ID.toString()}
                renderItem={({ item }) => <Text>{item.pName}</Text>}
            />
        </View>
    );
};

export default DBConnectivity;
