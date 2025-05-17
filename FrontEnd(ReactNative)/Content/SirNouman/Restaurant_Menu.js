import React, { useState } from "react";
import { View, FlatList } from "react-native";
import { Button, Text } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";

const Restaurant_Menu = () => {
  const [FoodList] = useState([
    { Id: 1, name: "Spring Rolls", category: "Appetizers", price: 500 },
    { Id: 2, name: "Cheese Burger", category: "Main Course", price: 800 },
    { Id: 3, name: "Pasta Alfredo", category: "Main Course", price: 1000 },
    { Id: 4, name: "Pizza", category: "Main Course", price: 1500 },
    { Id: 5, name: "Noodles", category: "Appetizers", price: 200 },
    { Id: 6, name: "Chinees", category: "Main Course", price: 1500 },
    { Id: 7, name: "Macaroni", category: "Appetizers", price: 500 },
    { Id: 8, name: "Custerd", category: "Desserts", price: 150 },
  ]);

  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [filteredFoodList, setFilteredFoodList] = useState(FoodList);

  const categoryOptions = [
    { key: "1", value: "All" },
    { key: "2", value: "Appetizers" },
    { key: "3", value: "Main Course" },
    { key: "4", value: "Desserts" },
  ];

  const priceRangeOptions = [
    { key: "1", value: "All" },
    { key: "2", value: "Below 1000 PKR" },
    { key: "3", value: "1000-1500 PKR" },
    { key: "4", value: "Above 1500 PKR" },
  ];

  const filterFoodList = () => {
    let result = FoodList;

    // Filter by category
    if (category !== "All") {
      result = result.filter((item) => item.category === category);
    }

    // Filter by price range
    if (priceRange !== "All") {
      result = result.filter((item) => {
        if (priceRange === "Below 1000 PKR") {
          return item.price < 1000;
        } else if (priceRange === "1000-1500 PKR") {
          return item.price >= 1000 && item.price <= 1500;
        } else if (priceRange === "Above 1500 PKR") {
          return item.price > 1500;
        }
        return true;
      });
    }

    setFilteredFoodList(result);
  };

  return (
    <View style={{ padding: 16, flex: 1, backgroundColor: "pink" }}>
      <Text
        style={{
          fontSize: 20,
          textAlign: "center",
          padding: 20,
          color: "white",
          backgroundColor: "blue",
        }}
      >
        Restaurant Menu
      </Text>
      <Text style={{ fontSize: 15, paddingTop: 20, color: "black" }}>
        Select Category
      </Text>
      <SelectList
        setSelected={setCategory}
        data={categoryOptions}
        defaultOption={{ key: "1", value: "All" }}
        boxStyles={{
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 10,
          paddingHorizontal: 10,
          height: 50,
        }}
        dropdownStyles={{ borderColor: "gray" }}
      />

      <Text style={{ fontSize: 15, paddingTop: 20, color: "black" }}>
        Select Price Range
      </Text>
      <SelectList
        setSelected={setPriceRange}
        data={priceRangeOptions}
        defaultOption={{ key: "1", value: "All" }}
        boxStyles={{
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 10,
          paddingHorizontal: 10,
          height: 50,
        }}
        dropdownStyles={{ borderColor: "gray" }}
      />

      <Button
        onPress={filterFoodList}
        mode="contained"
        style={{
          backgroundColor: "red",
          margin: 30,
          width: "40%",
          alignSelf: "center",
        }}
      >
        Done
      </Button>

      <FlatList
        data={filteredFoodList}
        keyExtractor={(item) => item.Id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              borderWidth: 1,
              borderColor: "gray",
              padding: 16,
              marginVertical: 8,
              borderRadius: 5,
              backgroundColor: "white",
            }}
          >
            <Text>{item.name}</Text>
            <Text>{item.category} -- {item.price} PKR</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Restaurant_Menu;
