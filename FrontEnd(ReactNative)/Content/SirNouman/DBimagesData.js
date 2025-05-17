import React, { useEffect, useState } from "react";
import { FlatList, Image, ImageBackground, Pressable, Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";
import * as ImagePicker from 'react-native-image-picker'
import { openDatabase } from 'react-native-sqlite-storage'
const DBimagesData = () => {

    const db = openDatabase({ name: 'Employees.db' });
    useEffect(() => {
        db.transaction(txl => {
            txl.executeSql(
                'create table if not exists Emp' +
                '(empId integer primary key AUTOINCREMENT,name text,' +
                'city text, age integer, department text,Path text)',
                [],
                () => { console.log('table CREATED succesfully') },
                (e) => { console.log(e.message) },
            );
        });
    }, [])

    const [myImage, setMyImage] = useState(null)
    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const [age, setAge] = useState('')
    const [department, setDepartment] = useState('')
    const addImage = () => {
        const opt = { mediaType: 'photo' };
        ImagePicker.launchCamera(opt, (resp) => {
            setMyImage(resp.assets[0].uri);
        })
    }

    const insertEmployee = () => {
        var query = 'insert into Emp(name,city,age,department,Path) values(?,?,?,?,?)';
        db.transaction(txl => {
            txl.executeSql(
                query, 
                [name, city, age, department, myImage],
                () => { console.log('data inserted successfully') },
                (e) => { console.log(e.message) }
            )
        })
    }
    return (
        <View style={{ flex: 1, }}>
            <View style={{
                width: '50%', alignSelf: 'center',
                margin: 10,
            }}>
                <Image
                    style={{ alignSelf: 'center', width: 150, height: 150, backgroundColor: 'gray' }}
                    source={{ uri: myImage }}
                />
                <Button mode='elevated'
                    onPress={addImage}
                > +Image</Button>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ borderWidth: 1, width: '75%' }}>
                    <TextInput placeholder="Name"
                        onChangeText={setName}
                        style={{ margin: 10, borderWidth: 1, fontSize: 25 }} />
                    <TextInput placeholder="CITY"
                        onChangeText={setCity}
                        style={{ margin: 10, borderWidth: 1, fontSize: 25 }} />
                    <TextInput placeholder="AGE"
                        onChangeText={setAge}
                        style={{ margin: 10, borderWidth: 1, fontSize: 25 }} />
                    <TextInput placeholder="DEPARTMENT"
                        onChangeText={setDepartment}
                        style={{ margin: 10, borderWidth: 1, fontSize: 25 }} />
                </View>
                <View>
                    <Button
                        onPress={insertEmployee}
                        mode='elevated'> Save</Button>
                </View>
            </View>
        </View>
    )
}
export default DBimagesData;