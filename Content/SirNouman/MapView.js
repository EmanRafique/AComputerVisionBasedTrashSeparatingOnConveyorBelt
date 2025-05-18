import React, { useState } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker, Polygon, Polyline } from 'react-native-maps';

const Maps = () => {
    const [markers, setMarkers] = useState([]);

    const handleMapPress = (event) => {
        const coordinate = event.nativeEvent.coordinate;
        setMarkers([...markers, coordinate]); 
    };

    return (
        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, textAlign: 'center', color: 'blue', margin: 10 }}>
                MAPS
            </Text>
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 33.642529601249,
                    longitude: 73.07839628309011,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
                onPress={handleMapPress} 
            >
                {markers.map((marker, index) => (
                    <Marker key={index} coordinate={marker} />
                ))}

                {/* {markers.length > 1 && (
                    <Polyline               // the line will  not closed
                        coordinates={markers}
                        fillColor='rgba(28,110,168,0.3)'
                        strokeColor="blue"
                        strokeWidth={3}
                    />
                )} */}
                {markers.length > 2 && (
                    <Polygon               //to make the line closed
                        coordinates={markers}
                        fillColor='rgba(28,110,168,0.3)'
                        strokeColor="blue"
                        strokeWidth={3}
                    />
                )}
            </MapView>
        </View>
    );
};

export default Maps;
