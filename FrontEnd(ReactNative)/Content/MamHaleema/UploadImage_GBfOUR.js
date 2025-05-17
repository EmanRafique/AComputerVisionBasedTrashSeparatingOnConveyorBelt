import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, ImageBackground } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const UploadImage_GBFOUR = ({ route, navigation }) => {
    const [imageUri, setImageUri] = useState(null);
    const { employeeId } = route.params; 

    const handleImagePick = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                maxWidth: 1024,
                maxHeight: 1024,
                quality: 1,
            },
            (response) => {
                if (response.didCancel) {
                    Alert.alert('Image selection was cancelled');
                } else if (response.errorCode) {
                    Alert.alert('Error selecting image:', response.errorMessage);
                } else if (response.assets && response.assets[0]?.uri) {
                    setImageUri(response.assets[0].uri);
                }
            }
        );
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('id', employeeId); 
            formData.append('image', {
                uri: imageUri,
                type: 'image/jpeg', 
                name: 'image.jpg',
            });

            const response = await fetch(url+'Employee/UploadImage', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const result = await response.json();
            if (response.ok) {
                Alert.alert('Success', result);
                navigation.navigate('EmployeeManagement');
            } else {
                Alert.alert('Error', result);
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong');
            console.error(error);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={require('../assets/Images_SirNoman/garbage-collector-with-garbage-bags-3316358-2784925.png')}
                style={{ flex: 1, width: '100%', height: '100%' }}
                resizeMode="cover"
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(6, 147, 73, 0.9)', alignItems: 'center'}}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddEmployee')}
                        style={{
                            position: 'absolute',
                            top: 20,
                            left: 15,
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: 'black',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        accessibilityLabel="Go back"
                        testID="back-button"
                    >
                        <Icon name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>

                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: 'bold',
                            color: 'white',
                            textAlign: 'center',
                            marginTop: '20%',
                            marginBottom: 40,
                        }}
                    >Upload Image</Text>

                    <TouchableOpacity
                        onPress={handleImagePick}
                        style={{
                            alignSelf: 'center',
                            width: 250,
                            height: 250,
                            borderRadius: 10,
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 30,
                            overflow: 'hidden',
                        }}
                        accessibilityLabel="Select an image"
                        testID="image-preview"
                    >
                        {imageUri ? (
                            <Image
                                source={{ uri: imageUri }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    resizeMode: 'cover',
                                }}
                            />
                        ) : (
                            <>
                                <Icon name="cloud-upload" size={40} color="black" style={{ marginBottom:10}} />
                                <Text style={{ color: 'black', fontSize: 16 }}>No image selected</Text>
                            </>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleUpload}
                        style={{
                            alignSelf: 'center',
                            width: '80%',
                            paddingVertical: 15,
                            backgroundColor: 'black',
                            borderRadius: 25,
                            alignItems: 'center',
                        }}
                        accessibilityLabel="Upload image"
                        testID="upload-button"
                    >
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Upload</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
};

export default UploadImage_GBFOUR;
