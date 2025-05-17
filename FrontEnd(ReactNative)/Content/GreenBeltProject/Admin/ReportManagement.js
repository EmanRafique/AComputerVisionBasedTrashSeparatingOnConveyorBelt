import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AdminHeader } from '../NavigationFile';

const ReportManagement = ({ navigation }) => {

    return (
        <View style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
            <AdminHeader />
            <View style={{ padding: 15 }}>

                {/* Fake Date Picker */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#eeeeee',
                    padding: 10,
                    borderRadius: 5,
                    justifyContent: 'space-between',
                    elevation: 5
                }}>
                    <TextInput
                        value="00/00/0000"
                        editable={false}
                        style={{ fontSize: 16, flex: 1, color: '#333' }}
                    />
                    <TouchableOpacity>
                        <Icon name="calendar-today" size={24} color="#666" />
                    </TouchableOpacity>
                </View>

                {/* Daily Waste Volume */}
                <View style={{
                    backgroundColor: '#ffffff',
                    padding: 30,
                    borderRadius: 10,
                    elevation: 5,
                    alignItems: 'center',
                    marginVertical: 20,
                }}>
                    <Text style={{ fontSize: 20, fontWeight: '800', color: '#333' }}>Daily Waste Volume</Text>
                    <Text style={{ fontSize: 28, fontWeight: '900', top: 10, bottom: 10, color: '#444' }}>0 Kg</Text>
                </View>

                {/* Waste Categories */}
                <ScrollView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        {[
                            { name: 'Metal', weight: '0 KG', img: require('../../assets/Images_GreenBelt/metal.png') },
                            { name: 'Plastic', weight: '0 KG', img: require('../../assets/Images_GreenBelt/Plastic.png') },
                            { name: 'Organic', weight: '0 KG', img: require('../../assets/Images_GreenBelt/organic.png') },
                            { name: 'Paper', weight: '0 KG', img: require('../../assets/Images_GreenBelt/paper.png') },
                            { name: 'Glass', weight: '0 KG', img: require('../../assets/Images_GreenBelt/glass.png') },
                            { name: 'Others', weight: '0 KG', img: require('../../assets/Images_GreenBelt/others.png') }
                        ].map((item, index) => (
                            <View key={index} style={{
                                backgroundColor: '#ffffff',
                                padding: 15,
                                borderRadius: 10,
                                elevation: 5,
                                width: '45%',
                                alignItems: 'center',
                                marginBottom: 15,
                                justifyContent: 'center',
                            }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: '700',
                                        marginTop: 10,
                                        color: '#555',
                                    }}>
                                        {item.name}
                                    </Text>

                                    <Image source={item.img} style={{
                                        width: 35,
                                        height: 35,
                                        marginLeft: 8,
                                        resizeMode: 'contain',
                                    }} />
                                </View>

                                <Text style={{
                                    fontSize: 22,
                                    fontWeight: '800',
                                    marginTop: 5,
                                    color: '#666'
                                }}>
                                    {item.weight}
                                </Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default ReportManagement;

















// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, Platform } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import DatePicker from 'react-native-date-picker';
// import { AdminHeader } from '../NavigationFile';

// const ReportManagement = ({ navigation }) => {
//     const [selectedDate, setSelectedDate] = useState(new Date());
//     const [open, setOpen] = useState(false);

//     // Function to format the date as DD/MM/YYYY
//     const formatDate = (date) => {
//         let day = date.getDate().toString().padStart(2, '0');
//         let month = (date.getMonth() + 1).toString().padStart(2, '0');
//         let year = date.getFullYear();
//         return `${day}/${month}/${year}`;
//     };

//     return (
//         <View style={{ flex: 1, backgroundColor: 'white' }}>
//             <AdminHeader />
//             <View style={{ padding: 15 }}>

//                 {/* Date Picker */}
//                 <View style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     backgroundColor: '#ddd',
//                     padding: 10,
//                     borderRadius: 5,
//                     justifyContent: 'space-between',
//                     elevation: 10
//                 }}>
//                     <TextInput
//                         value={formatDate(selectedDate)}
//                         onChangeText={(text) => {
//                             let parts = text.split('/');
//                             if (parts.length === 3) {
//                                 let newDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
//                                 if (!isNaN(newDate)) {
//                                     setSelectedDate(newDate);
//                                 }
//                             }
//                         }}
//                         style={{ fontSize: 16, flex: 1 }}
//                         keyboardType="numeric"
//                     />
//                     <TouchableOpacity onPress={() => setOpen(true)}>
//                         <Icon name="calendar-today" size={24} color="black" />
//                     </TouchableOpacity>
//                 </View>

//                 {/* Date Picker Modal */}
//                 <DatePicker
//                     modal
//                     open={open}
//                     date={selectedDate}
//                     mode="date"
//                     onConfirm={(date) => {
//                         setOpen(false);
//                         setSelectedDate(date);
//                     }}
//                     onCancel={() => setOpen(false)}
//                 />

//                 {/* Conveyor Waste Volume */}
//                 <View style={{
//                     backgroundColor: 'white',
//                     padding: 30,
//                     borderRadius: 10,
//                     elevation: 10,
//                     alignItems: 'center',
//                     marginVertical: 20,
//                 }}>
//                     <Text style={{ fontSize: 20, fontWeight: '800'}}>Daily Waste Volume</Text>
//                     <Text style={{ fontSize: 28, fontWeight: '900', top:10 , bottom:10 }}>400 Kg</Text>
//                 </View>

//                 {/* Waste Categories */}
//                 <ScrollView>
//                     <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
//                         {/* Waste Cards */}
//                         {[{ name: 'Metal', weight: '100 KG', img: require('../../assets/Images_GreenBelt/metal.png') },
//                         { name: 'Plastic', weight: '120 KG', img: require('../../assets/Images_GreenBelt/Plastic.png') },
//                         { name: 'Organic', weight: '80 KG', img: require('../../assets/Images_GreenBelt/organic.png') },
//                         { name: 'Paper', weight: '90 KG', img: require('../../assets/Images_GreenBelt/paper.png') },
//                         { name: 'Glass', weight: '70 KG', img: require('../../assets/Images_GreenBelt/glass.png') },
//                         { name: 'Others', weight: '100 KG', img: require('../../assets/Images_GreenBelt/others.png') }]
//                             .map((item, index) => (
//                                 <View key={index} style={{
//                                     backgroundColor: 'white',
//                                     padding: 15,
//                                     borderRadius: 10,
//                                     elevation: 10,
//                                     width: '45%',
//                                     alignItems: 'center',
//                                     marginBottom: 15,
//                                     flexDirection: 'column',
//                                     justifyContent: 'center'
//                                 }}>
//                                     <View style={{flexDirection:'row'}}> 
//                                     {/* Title */}
//                                     <Text style={{
//                                         fontSize: 18,
//                                         fontWeight: '800',
//                                         marginTop: 10,
//                                         textAlign: 'center'
//                                     }}>
//                                         {item.name}
//                                     </Text>

//                                     {/* Image */}
//                                     <Image source={item.img} style={{
//                                         width: 40,
//                                         height: 40,
//                                         left:5,
//                                         resizeMode: 'contain',
//                                         marginBottom: 5
//                                     }} />
//                                     </View>

//                                     {/* Weight */}
//                                     <Text style={{
//                                         fontSize: 25,
//                                         fontWeight: '800',
//                                         marginTop: 5,
//                                         textAlign: 'center'
//                                     }}>
//                                         {item.weight}
//                                     </Text>
//                                 </View>
//                             ))}
//                     </View>
//                 </ScrollView>
//             </View>
//         </View>
//     );
// };

// export default ReportManagement;