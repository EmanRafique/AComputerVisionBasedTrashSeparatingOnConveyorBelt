import React, { useState } from "react";
import { TextInput, View, FlatList } from "react-native";
import { Button, Text } from "react-native-paper";
import {SelectList} from 'react-native-dropdown-select-list';
const MobileShop = () => {
    const [mobileList, setMobileList] = useState([
        { Id: 1, name: "iPhone", category: "iOS", price: 350000, quantity: 1 },
    ]);
    const [name, setName] = useState("");
    const [category, setCategory] = useState(""); 
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [showStock, setShowStock] = useState(false);
    const add = () => {
        const newMobile = {
            Id: mobileList.length + 1,
            name: name,
            category: category,
            price: parseInt(price),
            quantity: parseInt(quantity)
        };
        setMobileList([...mobileList, newMobile]);
        setName("");
        setCategory(""); 
        setPrice("");
        setQuantity("");
    };
    const deleteMobile = (id) => {
        setMobileList(mobileList.filter(mobile => mobile.Id !== id));
    };
    const categoryOptions = [
        { key: '1', value: 'Android' },
        { key: '2', value: 'iOS' },
    ];
    return (
        <View style={{ flex:1,padding: 16, backgroundColor:'pink'}}>
            <Text>Mobile Name</Text>
            <TextInput                 
                onChangeText={setName} 
                style={{borderWidth: 1, borderColor: "gray", padding: 8, marginVertical: 8, borderRadius: 5,}}/>          
            <Text>Category</Text>
            <SelectList
                setSelected={setCategory}
                data={categoryOptions}
                defaultOption={{ key: '1', value: 'Android' }}
                boxStyles={{borderWidth: 1,borderColor: "gray",borderRadius: 5,paddingHorizontal: 10,height: 50,}} 
                dropdownStyles={{borderColor: "gray"}} 
            />
            <Text>Price</Text>
            <TextInput                 
                onChangeText={setPrice}                 
                style={{borderWidth: 1, borderColor: "gray", padding: 8, marginVertical: 8, borderRadius: 5,}}/>          
            <Text>Quantity</Text>
            <TextInput                 
                onChangeText={setQuantity}                  
                style={{borderWidth: 1, borderColor: "gray", padding: 8, marginVertical: 8, borderRadius: 5,}}/>                     
            <Button mode="contained" onPress={add} style={{marginVertical: 8,}}>ADD</Button>
            <Button mode="contained" onPress={() => setShowStock(!showStock)} style={{marginVertical: 8}}>
                {showStock ? "Hide Stock" : "Show Stock"}
            </Button>
            
            {showStock && (
                <FlatList
                    data={mobileList}                    
                    renderItem={({ item }) => (
                        <View style={{borderWidth: 1,borderColor: "gray",padding: 16,
                            marginVertical: 8,borderRadius: 5,backgroundColor: "white"}}>
                            <Text>Name: {item.name}</Text>
                            <Text>Category: {item.category}</Text>
                            <Text>Price: {item.price}</Text>
                            <Text>Quantity: {item.quantity}</Text>
                        <Button mode="text" onPress={() => deleteMobile(item.Id)}
                             style={{marginTop: 8,color: "blue",}}>
                        Delete</Button>
                        </View>
                    )}
                />
            )}
        </View>
    );
};
export default MobileShop;
