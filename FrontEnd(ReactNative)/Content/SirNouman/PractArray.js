import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { MyBtn } from './allControllers';
import { FlatList } from 'react-native-gesture-handler';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

const PractArray = () =>{
    const initialUserList = [
        {ID:1, name:'EMAN', age:21},
        {ID:2, name: 'RIMSHA', age:23}
    ];
    const [users, setUsers] = useState(initialUserList);
    const handleReset = ()=>{
        setUsers(initialUserList);
    }
    const showAllUser = ({item}) =>{
        return(
            <View>
                <Text>Name: {item.name}</Text>
                <Text>Age: {item.age}</Text>
                <MyBtn
                title = "Delete"
                onPress = {()=> deleteUser(item.ID)}
                />
                <MyBtn
                title = 'showId'
                onPress={()=>showID(item.ID)}
                />
            </View> 
        )
    }
    const deleteUser = id =>{
        const filterList = users.filter(val =>val.ID !==id)
        setUsers(filterList)
    }
    const showId =(id)=>{
        Alert.alert('Id: ',id)
    }
    return(
        <View>
            <MyBtn
            title="Reset Data"
            onPress ={handleReset}
            />
            <FlatList
            data = {item}
            keyExtractor={item => item.ID.toString()}
            renderItem={showAllUser}
            />
        </View>
    )
}