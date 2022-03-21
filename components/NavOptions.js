import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

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
  const navigation = useNavigation();

  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen)}
          style={tw`p-2 pl-6 pr-6 pb-8 pt-4 bg-gray-200 m-2 w-40  rounded-md`}
        >
          <View>
            <Image
              style={{ width: 120, height: 120, resizeMode: "contain" }}
              source={item.image}
            />
            <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
            <Icon
              style={tw`mt-4 p-2 bg-black rounded-full w-10`}
              name="arrowright"
              color="white"
              type="antdesign"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
