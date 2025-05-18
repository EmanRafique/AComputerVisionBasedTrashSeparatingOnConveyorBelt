import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'react-native-image-picker'


const TestCodes = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [phoneNo, setPhoneNo] = useState();
    const [city, setCity] = useState();
    const [email, setEmail] = useState();
    const [DOB, setDOB] = useState();
    // Function to pick an image
    const pickImage = () => {
        ImagePicker.launchCamera({ mediaType: 'photo' }, (resp) => {
            setSelectedImage(resp.assets[0].uri);
        });
    };

    const getData = async () => {
        // create a url string
        var url = 'http://192.168.4.78/mapcourseapi/api/contact/getContactData?phoneNo=' + phoneNo;
        var response = await fetch(url);
        if (response.ok) {
            var data = await response.json();
            setDOB(data.DOB);
            setEmail(data.email)
            setCity(data.City)
            console.log(data);
        } else {
            var data = await response.text();
            console.log(data)
        }
    }

    const getContact = async () => {
        var url = 'http://192.168.4.78/mapcourseapi/api/contact/getContact';
        var response = await fetch(url);
        if (response.ok) {
            var data = await response.json();
            console.log(data.imagePath)
            setSelectedImage(data.imagePath)
        }
    }


    const saveImage = async () => {
        var formData = new FormData();
        formData.append('phoneNo', '3');

        formData.append('image', {
            uri: selectedImage,
            name: 'photo1.jpg',
            type: 'image/jpeg',
        })
        var url = 'http://192.168.4.78/mapcourseapi/api/contact/addImage';
        try {
            var res = await fetch(url,
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
        }
        catch (ea) {
            console.log(ea.message)
        }
    }

    const SaveData = async () => {
        var contact = { firstName: "Ali", lastName: "Ahmad", phoneNo: phoneNo, email: email, DOB: DOB, City: city };
        try {
            var url = 'http://192.168.4.78/mapcourseapi/api/contact/addcontact';
            var res = await fetch(url,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(contact),
                }
            )
            if (res.ok) {
                var data = await res.text();
                console.log('data = ' + data);
            }
        }
        catch (ea) {

        }
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                {/* Save Data Button */}
                <TouchableOpacity style={styles.uploadButton} onPress={SaveData}>
                    <Text style={styles.uploadButtonText}>Save Data</Text>
                </TouchableOpacity>
                {/* Image Upload Button */}
                <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                    <Text style={styles.uploadButtonText}>Upload Image</Text>
                </TouchableOpacity>
                {/* Image Upload Button */}
                <TouchableOpacity style={styles.uploadButton} onPress={getData}>
                    <Text style={styles.uploadButtonText}>Get Data</Text>
                </TouchableOpacity>
                {/* Image Viewer */}
                {selectedImage && (
                    <Image
                        resizeMode='stretch'
                        source={{ uri: selectedImage }} style={styles.imageViewer} />
                )}

                {/* Contact Data Form */}
                <View style={styles.form}>
                    {/* Phone Number */}
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                        onChangeText={setPhoneNo}
                        style={styles.input} placeholder="Enter phone number" keyboardType="phone-pad" />

                    {/* Email Address */}
                    <Text style={styles.label}>Email Address</Text>
                    <TextInput
                        onChangeText={setEmail}
                        value={email}
                        style={styles.input} placeholder="Enter email address" keyboardType="email-address" />

                    {/* City */}
                    <Text style={styles.label}>City</Text>
                    <TextInput
                        onChangeText={setCity}
                        value={city}
                        style={styles.input} placeholder="Enter city" />

                    {/* DOB */}
                    <Text style={styles.label}>DOB</Text>
                    <TextInput
                        onChangeText={setDOB}
                        value={DOB}
                        style={styles.input} placeholder="Enter DOB" />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    uploadButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    uploadButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    imageViewer: {
        alignSelf: 'center',
        resizeMode: 'stretch',
        width: '65%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: '#eaeaea',
    },
    form: {
        marginTop: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
});

export default TestCodes;