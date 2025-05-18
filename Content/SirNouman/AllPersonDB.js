import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import { Button } from "react-native-paper";
import { openDatabase } from 'react-native-sqlite-storage';

const AllPersonDB = () => {

    const [ID, setID] = useState(0);
    const [name, setName] = useState('');
    const [allPersons, setAllPersons] = useState([])

    const db = openDatabase({ name: 'MapDB.db' });

    const showAll = ({ item }) => {
        return (<View>
            <Text style={ss.txtView}>{item.ID} --- {item.Name}</Text>
        </View>);

    }


    const getAllPersons = () => {
        db.transaction(txn => {
            txn.executeSql(
                'SELECT * FROM PERSON',
                [],
                (txn, res) => {
                    var tempAllPersons = [];
                    for (i = 0; i < res.rows.length; i++) {
                        var p = res.rows.item(i);
                        tempAllPersons.push(p);
                    }
                    setAllPersons([...tempAllPersons])
                },
                (err) => { console.log(err.message) }
            );
        });
    }

    const createTable = () => {
        db.transaction((txn) => {
            txn.executeSql(
                'CREATE TABLE if not exists  Person(ID INTEGER PRIMARY KEY,Name Text)',
                [],
                (txn, result) => { console.log('Table Created Succesfully') },
                (error) => { console.log(error.message) }
            );
        });
    }

    const AddPerson = () => {
        db.transaction((txn) => {
            txn.executeSql(
                `insert into person(id,name) values (?,?)`,
                [ID, name],
                (txn, result) => { console.log('Inserted Successfully') },
                (error) => { console.log(error.message) }
            );
        });
    }

    const getByID = () => {
        db.transaction(txn => {
            txn.executeSql(
                'select * from person where ID=?',
                [ID],
                (txn, res) => {
                    var p = res.rows.item(0);
                    console.log(p.Name)
                    setName(p.Name)
                },
                (error) => { console.log(error.message) }
            );
        });
    }
    useEffect(createTable, []);

    const callBackFunc = () => {
        console.log('FunctionCalled:');
        setSquare(count * count)
    }


    return (

        <View style={{ flex: 1, }}>
            <TextInput placeholder="Enter ID"
                onChangeText={setID}
                style={{ borderWidth: 1, borderRadius: 10, margin: 10, fontSize: 20, }} />
            <TextInput
                value={name}
                placeholder="Enter Name"
                onChangeText={setName}
                style={{ borderWidth: 1, borderRadius: 10, margin: 10, fontSize: 20, }} />
            <Button
                onPress={AddPerson}
                mode="contained" style={{ borderRadius: 10, margin: 10, width: '40%', alignSelf: "center" }}>
                Add Data
            </Button>
            <Button
                onPress={getByID}
                mode="contained" style={{ borderRadius: 10, margin: 10, width: '40%', alignSelf: "center" }}>
                Show By ID
            </Button>
            <Button
                onPress={getAllPersons}
                mode="contained" style={{ borderRadius: 10, margin: 10, width: '40%', alignSelf: "center" }}>
                Show All
            </Button>
            <Button
                onPress={() => { setAllPersons([]) }}
                mode="contained" style={{ borderRadius: 10, margin: 10, width: '40%', alignSelf: "center" }}>
                RESET
            </Button>
            <FlatList
                data={allPersons}
                renderItem={showAll}
            />
        </View>

    );
}

const ss = StyleSheet.create({
    txtView: {
        backgroundColor: 'purple', margin: 10, padding: 10, fontSize: 30,
        color: 'white', textAlign: 'center', borderRadius: 10,
    },
});

export default AllPersonDB;