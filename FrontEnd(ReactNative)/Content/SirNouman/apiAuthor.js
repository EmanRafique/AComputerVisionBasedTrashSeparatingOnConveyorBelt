import React, { useState } from "react";
import { Alert, FlatList, Image, Pressable, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { MyBtn } from "../Controls/allControls";
import * as ImagePicker from 'react-native-image-picker'

const ReactNativeControls = () => {

    const [passShow, setPassShow] = useState(true)
    const [imageURI, setImageURI] = useState();
    const [allAuthors, setAllAuthors] = useState([]);

    const shootImage = () => {
        ImagePicker.launchCamera({ 'mediaType': 'photo' },
            (response) => {
                if (!response.didCancel)
                    setImageURI(response.assets[0].uri)
            }
        );
    }

    const getAllAuthors = async () => {
        var response = await fetch(url + "getAllAuthors");
        if (response.ok) {
            var ans = await response.json();
            setAllAuthors(ans)
            console.log(allAuthors)
        }
        else {
            console.log('error fetching')
        }
    }
    const addNewAuthor = async () => {
        try {
            var formData = new FormData();
            var author = { authorName: "Ishaq Shareef", DOB: "01-01-1962", City: "ISB" };
            formData.append('author', JSON.stringify(author));
            var myImage = {
                uri: imageURI,
                name: 'ishaqKhan.jpg',
                type: 'image/jpeg'
            }
            formData.append('file', myImage);
            var response = await fetch(url + "addNewAuthor",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    body: formData,
                }
            )
            if (response.ok) {
                var ans = await response.text();
                console.log(ans)
            }
            else {
                var ans = await response.text();
                console.log(ans)
            }

        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <View>

            <MyBtn
                title="Capture Image"
                onPress={shootImage}
            />
            <MyBtn
                title="Add Author"
                style={{ backgroundColor: 'blue' }}
                txtStyle={{ color: 'white' }}
                onPress={addNewAuthor}
            />
            <MyBtn
                title="Get Author By ID"
                style={{ backgroundColor: 'lightgreen' }}
                onPress={getAllAuthors}
            />
            <FlatList
                data={allAuthors}
                renderItem={({ item }) => {
                    var data = imgURL + item.profilePic;
                    return (<View>
                        <Image
                            width='100'
                            height='100'
                            source={{ uri: data }}
                        />
                        <Text> {item.authorName}</Text>
                    </View>)
                }}
            />
        </View>
    )
}
export default ReactNativeControls;