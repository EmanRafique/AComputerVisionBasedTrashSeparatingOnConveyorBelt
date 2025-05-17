import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export const MyBtn = ({ title, onPress, style, txtStyle }) => {
    const [pressing, setPressing] = useState(false);

    return (
        <Pressable
            android_ripple={{ color: 'gray', foreground: true, borderless: false }}
            onPressIn={() => setPressing(true)} // Set the effect visible on press
            onPressOut={() => setPressing(false)} // Hide the effect when press is released
            onPress={onPress}
        >
            <View style={[myStyle.btn, style]}>
                <Text style={[myStyle.txtStyle, txtStyle]}>{title}</Text>

                {/* Display the effect below the button when pressed */}
                {pressing && (
                    <View style={myStyle.pressEffect}></View>
                )}
            </View>
        </Pressable>
    );
};

const myStyle = StyleSheet.create({
    btn: {
        backgroundColor: '#f0b27a',
        borderRadius: 10,
        margin: 10,
        padding: 10,
        position: 'relative',
    },
    txtStyle: {
        textAlign: 'center',
        fontSize: 20,
        color: 'purple',
        fontWeight: 'bold',
    },
    pressEffect: {
        position: 'absolute',
        bottom: -10, // Adjust to control where the effect appears
        left: 0,
        right: 0,
        height: 5,
        backgroundColor: 'gray',
        borderRadius: 5,
    },
});
