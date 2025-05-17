import React, { useState } from "react";
import { Alert, FlatList, Image, Modal, ScrollView, Text, View } from "react-native";
import * as ImagePicker from 'react-native-image-picker'
import { MyBtn } from "../Controls/allControls";
const TestCodes = () => {

    const [myArray, setMyArray] = useState([])
    const [ImageUri, setImageUri] = useState(null)
    const [modalVisibility, setModalVisibility] = useState(true)


    const addAuthor = async () => {
        try {
            var author = { "authorName": "Shahid", "DOB": "02-02-1995", "City": "RWP" }
            var formData = new FormData();

            formData.append('author', JSON.stringify(author));
            formData.append('image', {
                uri: ImageUri,
                name: 'myPhoto.jpg',
                type: 'image/jpeg'
            })
            var addAuthorURL = url + 'addAuthor';
            var res = await fetch(addAuthorURL,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    body: formData,
                }
            )
            if (res.ok) {
                var text = await res.text();
                console.log('response = ' + text)
            }
            else
                console.log('Error in response');
        } catch (error) {
            console.log('catch Message' + error.message)
        }
    }

    const getTPCategory = async () => {
        try {
            var getTPCatURL = url + 'getTotalPriceByCat';
            console.log(getTPCatURL)
            var response = await fetch(getTPCatURL);
            if (response.ok) {
                var data = await response.json();
                console.log(data)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const insertAllBooks = async () => {
        var bookData = [{ "bookName": "MAP", "Price": "3400", "publishYear": "2001", "category": "CS", "AuID": "6" },
        { "bookName": "ADBMS", "Price": "400", "publishYear": "2003", "category": "CS", "AuID": "6" },
        { "bookName": "ITM", "Price": "300", "publishYear": "2022", "category": "MKT", "AuID": "6" },
        { "bookName": "AICT", "Price": "3500", "publishYear": "2012", "category": "CS", "AuID": "7" }
        ];
        try {
            var response = await fetch(url + "insertAllBooks",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(bookData),
                }
            )
            if (response.ok) {
                var ans = await response.text();
                console.log(ans)
            }
            else {
                var ans = await response.text();
                console.log('error in response' + ans)
            }
        } catch (error) {
            console.log(error.message)
        }

    }

    const getAuthorBooks = async () => {
        var response = await fetch(url + "getAuthorsBook");
        if (response.ok) {
            var allBooks = await response.json();
            setMyArray(allBooks)
            console.log(myArray)
        }
        else {
            var error = await response.text();
            console.log(error);
        }
    }

    const getAllAuthors = async () => {
        if (modalVisibility)
            setModalVisibility(false)
        else
            setModalVisibility(true)
        try {
            var response = await fetch(url + "getAllAuthors");
            console.log(url)
            if (response.ok) {
                var allAuthors = await response.json();
                for (var i = 0; i < allAuthors.length; i++) {
                    allAuthors[i].profilePic = imgURL + allAuthors[i].profilePic;
                }
                setMyArray(allAuthors)
                console.log(myArray)
            }
        } catch (error) {
            console.log(error.message)
        }

    }

    const showAuthorsFlatList = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', borderRadius: 10, borderWidth: 1, margin: 5, }}>
                <View style={{ borderWidth: 1, margin: 5, }}>
                    <Image
                        resizeMode='stretch'
                        style={{ width: 100, height: 100, }}
                        source={{ uri: item.profilePic }} />
                </View>
                <View>
                    <Text>{item.authorName}</Text>
                    <Text>{item.City}</Text>
                </View>
            </View>
        );
    }
    const getAuthor = async () => {
        try {
            var response = await fetch(url + `getAuthor?id=6`);
            if (response.ok) {
                var author = (await response).json();
                setImageUri(imageURL + author.profilePic);
                console.log(author)
            }
        } catch (error) {
            console.log(error.message)
        }


    }

    return (
        <View>
            <ScrollView>
                <Image
                    resizeMode='stretch'
                    style={{ width: 100, height: 100, borderWidth: 1, backgroundColor: 'yellow', }}
                    source={{ uri: ImageUri }} />
                <MyBtn
                    onPress={() => {
                        ImagePicker.launchCamera({
                            'mediaType': 'photo',
                        }, (res) => {
                            if (!res.didCancel)
                                setImageUri(res.assets[0].uri);
                        });
                    }}
                    title="Capture Image"
                />
                <MyBtn
                    onPress={addAuthor}
                    title="Add Author"
                />
                <MyBtn
                    onPress={insertAllBooks}
                    title="Insert All Books"
                />
                <MyBtn
                    onPress={getTPCategory}
                    title="Get Total Price Cat"
                />
                <MyBtn
                    onPress={getAuthorBooks}
                    title="Author Books"
                />
                <MyBtn
                    onPress={getAllAuthors}
                    title="All Authors"
                />
                <MyBtn
                    onPress={getAuthor}
                    title="Author By ID"
                />
            </ScrollView>

            <Modal
                animationType='slide'
                transparent={false}
                style={{ backgroundColor: 'orange', width: '300', height: '600', }}
                visible={modalVisibility}
                onRequestClose={() => {
                    setModalVisibility(!modalVisibility);
                    console.warn('Model Visiblity' + modalVisibility)
                }}
            >
                <MyBtn
                    onPress={() => { setModalVisibility(false) }}
                    title="Close"
                />
                <FlatList
                    style={{ margin: 10, }}
                    data={myArray}
                    renderItem={showAuthorsFlatList}
                />
            </Modal>
        </View>
    );
}
export default TestCodes;