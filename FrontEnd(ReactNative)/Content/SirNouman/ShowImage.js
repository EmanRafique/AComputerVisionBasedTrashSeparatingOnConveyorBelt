import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { Button } from 'react-native-paper';
import * as ImagePicker from 'react-native-image-picker';

const ShowImage = () => {
    const [imagesUri, setImageUri] = useState(null);

    // Function to get image from gallery
    const getFromGallery = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            maxWidth: 150,
            maxHeight: 150,
        };
        ImagePicker.launchImageLibrary(options, (res) => {
            if (res.assets && res.assets.length) {
                setImageUri(res.assets[0].uri);
            } else {
                setImageUri(null);
            }
        });
    };

    // Function to get image from camera
    const getFromCamera = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            maxWidth: 150,
            maxHeight: 150,
        };
        ImagePicker.launchCamera(options, (res) => {
            if (res.assets && res.assets.length) {
                setImageUri(res.assets[0].uri);
            } else {
                setImageUri(null);
            }
        });
    };

    return (
        <View>
            <Image
                source={
                    imagesUri
                        ? { uri: imagesUri }
                        : require('../assets/Images_SirNoman/CAT.jpg')
                }
                style={{
                    alignSelf: 'center',
                    width: 150,
                    height: 200,
                    resizeMode: 'stretch',
                    borderColor: 'black',
                    borderRadius: 20,
                    borderWidth: 2,
                    marginTop: 10,
                }}
            />
            <Button
                onPress={getFromGallery}
                mode="contained"
                style={{
                    fontSize: 20,
                    borderRadius: 20,
                    backgroundColor: 'purple',
                    width: 250,
                    alignSelf: 'center',
                    marginTop: 20,
                }}
            >
                Upload From Gallery
            </Button>
            <Button
                onPress={getFromCamera}
                mode="contained"
                style={{
                    fontSize: 20,
                    borderRadius: 20,
                    backgroundColor: 'purple',
                    width: 250,
                    alignSelf: 'center',
                    marginTop: 10,
                }}
            >
                Take Picture From Camera
            </Button>
        </View>
    );
};

export default ShowImage;
