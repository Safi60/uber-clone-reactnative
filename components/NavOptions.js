import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import tw from "twrnc";

const data = [
  {
    id: uuidv4(),
    title: "Course",
    image: require("../assets/course.png"),
    screen: "MapScreen",
  },

  {
    id: uuidv4(),
    title: "Repas",
    image: require("../assets/repas.png"),
    screen: "EatsScreen",
  },
];

const NavOptions = () => {
  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-100 m-2 w-40 h-45 rounded-md`}
        >
          <View>
            <Image
              style={{ width: 120, height: 120, resizeMode: "contain" }}
              source={item.image}
            />
            <Text style={tw`pl-6 text-lg`}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
