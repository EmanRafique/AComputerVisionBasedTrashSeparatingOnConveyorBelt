import React, {useState} from 'react';
import {View, Image, ImageBackground} from 'react-native';
//import * as ImagePicker from 'react-native-iamge-picker';

const TOYOTA = ()=>{
    //const [imagesUri, setImageUri] = useState(null)
    return(
        <View>
        <ImageBackground source ={require('../assets/Images_SirNoman/CAT.jpg')}>
            {/* for image which is in project folder */}
            <Image
                source = {require('../assets/Images_SirNoman/CAT.jpg')}
                style ={{ width:150 ,height: 200, resizeMode:'stretch'}}
            />
            {/* for image link */}
            <Image
                source = {{uri:' https://th.bing.com/th?id=OIF.%2b6qSRNSUUnL8U7BCkaVx%2bw&w=240&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7' }}
                style ={{ weidth:150,height:150, resizeMode:'stretch',margin:'2%' }}
            />
            </ImageBackground>
        </View>
    )
}
export default TOYOTA;