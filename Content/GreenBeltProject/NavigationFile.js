import React, { useState, useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Pressable, StyleSheet, Text, View, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import Getstarted from './Getstarted';
import Login from './Login';
import Signup from './Signup';
import OrderNowScreen from './User/OrderNow';
import BarcodePurchase from './User/BarcodePurchase';
import PickupDetails from './User/PickupDetails';
import EmployeeManagement from './Admin/EmployeeManagement';
import AddEmployee from './Admin/AddEmployee';
import UploadImage from './Admin/UploadImage';
import ArchieveEmployee from './Admin/ArchieveEmployee';
import UpdateInfo from './Admin/UpdateInfo';
import UpdateDetails from './Admin/UpdateDetails';
import DeleteEmployee from './Admin/DeleteEmployee';
import DownloadStrips from './User/DownloadStrips';
import Support from './User/Support';
import PickupDays from './User/PickUpDays';
import DonePurchase from './User/DonePurchase';
import UpdateUserInfo from './User/UpdateUserInfo';
import Notifications from './User/Notification';
import ComplaintsScreen from './User/Complaint';
import NewComplaint from './User/NewComplaint';
import ComplaintStatus from './User/ComplaintStatus';
import ComplaintDetails from './User/ComplaintDetails';
import ViewSchedule from './User/ViewSchedule';
import CompletedSchedule from './User/CompletedSchedules';
import DashboardScreen from './Admin/DashboradScreen';
import PickupManagement from './Admin/Pickup';
import ForgetPassword from './ForgetPassword';
import ResetPassword from './ResetPassword';;
import CompletedPickup from './Driver/CompletedPickup';
import DriverSchedule from './Driver/DriverSchedule';
import AllocationManagement from './Admin/AllocationManagement';
import AllocateStaffToTruck from './Admin/AllocateStaffToTruck';
import ChangeTruckStaff from './Admin/ChangeTruckStaff';
import BarcodeManagement from './Admin/BarcodeManagement';
import TruckManagement from './Admin/TruckManagement';
import AddNewTruck from './Admin/AddNewTruck';
import ZoneManagement from './Admin/ZoneManagement';
import TruckScheduleManagement from './Admin/TruckScheduleManagement';
import ReportManagement from './Admin/ReportManagement';
import RankingManagement from './Admin/RankingManagement';
import ComplaintManagement from './Admin/ComplaintManagement';
import Feedback from './User/Feedback';
import RequestVideo from './User/RequestVideo';
import AddZone from './Admin/AddZone';
import AdminResponse from './Admin/AdminResponse';
import MapAddress from './User/MapAddress';
import ScanBarcode from './Collector/ScanBarcode';
import WelcomeDriver from './Driver/WelcomeDriver';
import OperatorScreen from './Operator/Operator';
import TrashSummary from './Operator/TrashSummary';

const Stack = createStackNavigator();

export const Main = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Getstarted" component={Getstarted} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
    <Stack.Screen name="ResetPassword" component={ResetPassword} />
    <Stack.Screen name = "Signup" component={Signup} />
  </Stack.Navigator>
);

export const User = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>    
    <Stack.Screen name = "OrderNow" component={OrderNowScreen} />  
    <Stack.Screen name = "BarcodePurchase" component={BarcodePurchase} /> 
    <Stack.Screen name = "DownloadStrips" component={DownloadStrips} />
    <Stack.Screen name = "Support" component={Support} /> 
    <Stack.Screen name = "Feedback" component={Feedback} /> 
    <Stack.Screen name = "RequestVideo" component={RequestVideo} /> 
    <Stack.Screen name = "Notification" component={Notifications} />  
    <Stack.Screen name = "Complaint" component={ComplaintsScreen} /> 
    <Stack.Screen name = "NewComplaint" component={NewComplaint} /> 
    <Stack.Screen name = "ComplaintStatus" component={ComplaintStatus} />
    <Stack.Screen name = "ComplaintDetails" component={ComplaintDetails} /> 
    <Stack.Screen name = "ViewSchedule" component={ViewSchedule} /> 
    <Stack.Screen name = "CompletedSchedule" component={CompletedSchedule} /> 
    <Stack.Screen name = "DonePurchase" component={DonePurchase} /> 
    <Stack.Screen name = "UpdateUserInfo" component={UpdateUserInfo} />
    <Stack.Screen name = "MapAddress" component={MapAddress} />
    <Stack.Screen name = "PickupDetails" component={PickupDetails} />  
    <Stack.Screen name = "PickupDays" component={PickupDays} />  
  </Stack.Navigator>
);

export const Admin = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name = "Dashboard" component={DashboardScreen} />
    <Stack.Screen name = "PickupManagement" component={PickupManagement} />
    <Stack.Screen name = "EmployeeManagement" component={EmployeeManagement} />
    <Stack.Screen name = "AddEmployee" component={AddEmployee} />
    <Stack.Screen name = "UploadImage" component={UploadImage} />
    <Stack.Screen name = "ArchiveEmployee" component={ArchieveEmployee} /> 
    <Stack.Screen name = "UpdateInfo" component={UpdateInfo} />
    <Stack.Screen name = "UpdateDetails" component={UpdateDetails} />
    <Stack.Screen name = "DeleteEmployee" component={DeleteEmployee} />  
    <Stack.Screen name = "AllocationManagement" component={AllocationManagement} />
    <Stack.Screen name = "AllocateStaffToTruck" component={AllocateStaffToTruck} />
    <Stack.Screen name = "ChangeTruckStaff" component={ChangeTruckStaff} /> 
    <Stack.Screen name = "BarcodeManagement" component={BarcodeManagement} /> 
    <Stack.Screen name = "TruckManagement" component={TruckManagement} /> 
    <Stack.Screen name = "AddNewTruck" component={AddNewTruck} />   
    <Stack.Screen name = "ZoneManagement" component={ZoneManagement} />  
    <Stack.Screen name = "AddZone" component={AddZone} /> 
    <Stack.Screen name = "TruckScheduleManagement" component={TruckScheduleManagement} />  
    <Stack.Screen name = "ReportManagement" component={ReportManagement} />   
    <Stack.Screen name = "RankingManagement" component={RankingManagement} />  
    <Stack.Screen name = "ComplaintManagement" component={ComplaintManagement} />
    <Stack.Screen name = "AdminResponse" component={AdminResponse} />
  </Stack.Navigator>
);

export const Collector = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name= "ScanBarcode" component={ScanBarcode} />
  </Stack.Navigator>
);

export const Driver = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
  <Stack.Screen name = "WelcomeDriver" component = {WelcomeDriver} />
  <Stack.Screen name = "CompletedPickup" component = {CompletedPickup} />
  <Stack.Screen name = "DriverSchedule" component = {DriverSchedule} />
</Stack.Navigator>
);

export const Operator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name= "OperatorScreen" component={OperatorScreen} />
    <Stack.Screen name= "TrashSummary" component={TrashSummary} />
  </Stack.Navigator>
);

export const MyTextInput = ({ iconName, placeholder, value, onChangeText, secureTextEntry, keyboardType }) => {
  const inputStyle = {
    flex: 1,
    height: 45,
    fontSize: 16,
    paddingHorizontal: 10,
    color: '#4d4d4d',
  };

  const containerStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: 'white',

  };

  return (
    <View style={containerStyle}>
      <Icon name={iconName} size={20} color="#4d4d4d" style={{ marginLeft: 15, marginRight: 10 }} />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={inputStyle}
        placeholderTextColor="#4d4d4d"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export const MyBtn = ({ title, onPress, style, txtStyle }) => {
  const [pressing, setPressing] = useState(false);

  const myStyle = StyleSheet.create({
    btn: {
      backgroundColor: 'black',
      borderRadius: 20,
      marginBottom: 30,
      marginLeft: 10,
      paddingVertical: 10,
      paddingHorizontal: 30,
      alignItems: 'center',
      width: 270,
      position: 'relative',
    },
    txtStyle: {
      color: 'white',
      fontSize: 20,
      fontWeight: '900',
      textAlign: 'center',
    },
    pressEffect: {
      position: 'absolute',
      left: 20,
      right: 20,
      height: 5,
      backgroundColor: 'white',
      borderRadius: 5,
    },
  });

  return (
    <Pressable
      android_ripple={{ color: 'gray', foreground: true, borderless: false }}
      onPressIn={() => setPressing(true)}
      onPressOut={() => setPressing(false)}
      onPress={onPress}
    >
      <View style={[myStyle.btn, style]}>
        <Text style={[myStyle.txtStyle, txtStyle]}>{title}</Text>
        {pressing && <View style={myStyle.pressEffect}></View>}
      </View>
    </Pressable>
  );
};

export const MyHeader = ({ style, userId }) => {
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${global.ApiURL}/getUserById/${userId}`);
        if (response.data && response.data.profile) {
          setProfileImage(`${global.ApiURL}/${response.data.profile}`);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  const myStyle = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 15,
      backgroundColor: "#069349",
      alignItems: "center",
    },
    iconStyle: {
      color: "#fff",
      fontSize: 24,
    },
    profileImageContainer: {
      borderRadius: 50,
      overflow: "hidden",
      marginRight: 15,
    },
    profileImage: {
      width: 50,
      height: 50,
      borderRadius: 50,
    },
  });

  return (
    <View style={[myStyle.container, style]}>
      <Icon name="arrow-left" style={myStyle.iconStyle} onPress={() => navigation.goBack()} />
      <View style={myStyle.profileImageContainer}>
        <Image
          source={profileImage ? { uri: profileImage } : require("../assets/Images_GreenBelt/profile-avatar.jpg")}
          style={myStyle.profileImage}
        />
      </View>
    </View>
  );
};

export const AdminHeader = ({ style }) => {
  const navigation = useNavigation();

  const myStyle = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 20,
      backgroundColor: "#069349",
      alignItems: "center",
    },
    iconStyle: {
      color: "#fff",
      fontSize: 24,
    },
    profileImageContainer: {
      borderRadius: 50,
      overflow: "hidden",
      marginRight: 15,
    },
    profileImage: {
      width: 50,
      height: 50,
      borderRadius: 50,
    },
  });

  return (
    <View style={[myStyle.container, style]}>
      <Icon name="arrow-left" style={myStyle.iconStyle} onPress={() => navigation.goBack()} />
    </View>
  );
};