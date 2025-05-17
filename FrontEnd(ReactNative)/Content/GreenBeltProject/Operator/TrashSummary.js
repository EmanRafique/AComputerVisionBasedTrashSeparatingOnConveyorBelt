import React from "react";
import { View, Text, ScrollView } from "react-native";
import { AdminHeader } from "../NavigationFile";

const TrashSummary = ({ route }) => {
  const {
    userName,
    totalItems,
    recyclableCount,
    nonRecyclableCount,
    organicCount,
    previousRank,
    updatedRank,
  } = route.params;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <AdminHeader />

      <Text
        style={{
          fontSize: 28,
          fontWeight: "900",
          textAlign: "center",
          marginVertical: 20,
        }}
      >
        Trash Summary
      </Text>

      <View
        style={{
          margin: 20,
          borderWidth: 1,
          borderColor: "#000",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        {/* User Name */}
        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            borderColor: "#000",
          }}
        >
          <Text style={{ flex: 1, padding: 12, fontWeight: "800" }}>
            User Name
          </Text>
          <Text style={{ flex: 1, padding: 12 }}>{userName}</Text>
        </View>

        {/* Total Items */}
        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            borderColor: "#000",
          }}
        >
          <Text style={{ flex: 1, padding: 12 }}>Total Items</Text>
          <Text style={{ flex: 1, padding: 12 }}>{totalItems}</Text>
        </View>

        {/* Recyclable */}
        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            borderColor: "#000",
          }}
        >
          <Text style={{ flex: 1, padding: 12 }}>Recyclable</Text>
          <Text style={{ flex: 1, padding: 12 }}>{recyclableCount}</Text>
        </View>

        {/* Non-Recyclable */}
        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            borderColor: "#000",
          }}
        >
          <Text style={{ flex: 1, padding: 12 }}>Non-Recyclable</Text>
          <Text style={{ flex: 1, padding: 12 }}>{nonRecyclableCount}</Text>
        </View>

        {/* Organic */}
        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            borderColor: "#000",
          }}
        >
          <Text style={{ flex: 1, padding: 12 }}>Organic</Text>
          <Text style={{ flex: 1, padding: 12 }}>{organicCount}</Text>
        </View>

        {/* Previous Rank */}
        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            borderColor: "#000",
          }}
        >
          <Text style={{ flex: 1, padding: 12 }}>Previous Rank</Text>
          <Text style={{ flex: 1, padding: 12 }}>{previousRank}%</Text>
        </View>

        {/* Updated Rank */}
        <View style={{ flexDirection: "row" }}>
          <Text style={{ flex: 1, padding: 12, fontWeight: "900", fontSize:18 }}>
            Updated Rank
          </Text>
          <Text style={{ flex: 1, padding: 12, fontWeight: "900", fontSize:18  }}>{updatedRank}%</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default TrashSummary;





















// import React, { useEffect } from "react";
// import { View, Text, FlatList, ScrollView } from "react-native";
// import { AdminHeader } from "../NavigationFile";

// const TrashSummary = ({ route }) => {
//   const {
//     userName,
//     totalItems,
//     recyclableItems,
//     nonRecyclableItems,
//     organicItems,
//     previousRank,
//     updatedRank,
//     user,
//   } = route.params;

//   useEffect(() => {
//     console.log("Recyclable items:", recyclableItems);
//     console.log("Non-recyclable items:", nonRecyclableItems);
//     console.log("Organic items:", organicItems);
//     console.log("User fetched:", user);
//     console.log("Previous rank:", previousRank);
//     console.log("Updated rank:", updatedRank);
//   }, []);

//   const renderItem = (title, data) => (
//     <View style={{ marginBottom: 15 }}>
//       <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 5 }}>{title}</Text>
//       <FlatList
//         data={data}
//         renderItem={({ item }) => (
//           <Text style={{ fontSize: 16, paddingLeft: 10 }}>
//             ID: {item.id}, CategoryID: {item.categoryid}, BarcodeID: {item.barcode_id}
//           </Text>
//         )}
//         keyExtractor={(item, index) => `${title}-${index}`}
//       />
//     </View>
//   );

//   return (
//     <View style={{ flex: 1, backgroundColor: "#fff" }}>
//       <AdminHeader />
//       <ScrollView contentContainerStyle={{ padding: 20 }}>
//         <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>Trash Summary</Text>

//         <Text style={{ fontSize: 18, marginBottom: 10 }}>User: {userName}</Text>
//         <Text style={{ fontSize: 18, marginBottom: 10 }}>Total Items: {totalItems}</Text>

//         {/* Item Lists */}
//         {renderItem("Recyclable Items", recyclableItems)}
//         {renderItem("Non-Recyclable Items", nonRecyclableItems)}
//         {renderItem("Organic Items", organicItems)}

//         {/* Ranking Info */}
//         <Text style={{ fontSize: 18 }}>
//           Rank Change: {(updatedRank - previousRank).toFixed(2)}%
//         </Text>
//         <Text style={{ fontSize: 18 }}>Previous Rank: {previousRank}</Text>
//         <Text style={{ fontSize: 18, marginBottom: 10 }}>Updated Rank: {updatedRank}</Text>

//         {/* Optional: Debug user object */}
//         <Text style={{ fontSize: 18, marginTop: 10 }}>User Object:</Text>
//         <Text style={{ fontSize: 14, color: "#666", paddingLeft: 10 }}>
//           {JSON.stringify(user, null, 2)}
//         </Text>
//       </ScrollView>
//     </View>
//   );
// };

// export default TrashSummary;