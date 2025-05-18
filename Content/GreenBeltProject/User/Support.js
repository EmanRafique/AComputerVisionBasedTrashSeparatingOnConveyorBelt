import React from "react"; 
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { MyBtn } from "../NavigationFile"; 
import Icon from "react-native-vector-icons/FontAwesome";

const Support = ({ navigation, route }) => {
  const { id } = route.params;

  const Card = ({ title, steps, buttonTitle, onPress }) => (
    <View
      style={{
        marginBottom: 25,
        padding: 18,
        backgroundColor: "#1e5e3c",
        borderRadius: 12,
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 3 },
      }}
    >
      <Text style={{ fontSize: 22, fontWeight: "bold", color: "#fff", marginBottom: 10 }}>
        {title}
      </Text>
      {steps.map((item, index) => (
        <Text key={index} style={{ fontSize: 16, color: "#fff", marginBottom: 6 }}>
          {index + 1}. {item}
        </Text>
      ))}
      <MyBtn title={buttonTitle} onPress={onPress} style={{ marginTop: 12 }} />
    </View>
  );

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#069349",
        paddingHorizontal: 20,
        paddingTop: 20,
      }}
    >
      <View style={{ 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "space-between",
        marginBottom: 20,
      }}>
        
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5 }}>
          <Icon name="arrow-left" size={26} color="#fff" />
        </TouchableOpacity>

        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ fontSize: 28, fontWeight: "900", color: "#fff" }}>
            Support
          </Text>
        </View>

        <View style={{ width: 28 }} />
      </View>

      <Card
        title="How to add address for pickup trash?"
        steps={[
          "Click on the '3-dots' icon on Home Screen.",
          "Select Update Profile.",
          "Click on add address.",
          "Add Address and Confirm it.",
        ]}
        buttonTitle="Add Address"
        onPress={() => navigation.navigate("MapAddress", { id })}
      />

      <Card
        title="How to make a Purchase Barcode Strip?"
        steps={[
          "Click on the 'Buy' button on the Home Screen.",
          "Select a Zone.",
          "Select the Recyclable, Non-Recyclable.",
          "Check and Pay the Bill.",
          "Download the Strips PDF.",
        ]}
        buttonTitle="Purchase Barcode Strip"
        onPress={() => navigation.navigate("BarcodePurchase", { id })}
      />

      <Card
        title="How to Register a Complaint?"
        steps={[
          "Click on 'Complaints & Services' on the Home Screen.",
          "Click on 'New Complaint'.",
          "Write your Complaint.",
          "Click on 'Submit Your Complaint'.",
        ]}
        buttonTitle="Register Complaint"
        onPress={() => navigation.navigate("Complaint", { id })}
      />

      {/* <Card
        title="Need More Help?"
        steps={[
          "If you have further inquiries or need assistance, feel free to reach out to our support team.",
        ]}
        buttonTitle="Contact Support"
        onPress={() => navigation.navigate("ContactSupport", { id })}
      /> */}
    </ScrollView>
  );
};

export default Support;