import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";
import { current } from "@reduxjs/toolkit";

const data = [
  {
    id: `Uber-X-${uuidv4()}`,
    title: "Uber X",
    multiplier: 1,
    image:
      "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/UberX.png",
  },
  {
    id: `Uber-XL-${uuidv4()}`,
    title: "Uber XL",
    multiplier: 1.2,
    image:
      "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/UberXL.png",
  },
  {
    id: `Uber-LUX-${uuidv4()}`,
    title: "Uber LUX",
    multiplier: 1.75,
    image:
      "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/Lux.png",
  },
];

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  console.log("travel", travelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <FlatList
        ListHeaderComponent={
          <View>
            <TouchableOpacity
              style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
              onPress={() => navigation.navigate("NavigateCard")}
            >
              <Icon name="chevron-left" type="fontawesome" />
            </TouchableOpacity>
            <Text style={tw`text-center py-5 text-xl`}>
              Select a ride - {travelTimeInformation?.distance?.text}
            </Text>
          </View>
        }
        ListFooterComponent={
          <>
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({
                item: { id, title, multiplier, image },
                item,
              }) => (
                <TouchableOpacity
                  onPress={() => setSelected(item)}
                  style={tw`flex-row justify-between items-center px-10 ${
                    id === selected?.id && "bg-gray-200"
                  }`}
                >
                  <View>
                    <Image
                      style={{ width: 100, height: 100, resizeMode: "contain" }}
                      source={{ uri: image }}
                    />
                  </View>
                  <View style={tw`-ml-6`}>
                    <Text style={tw`text-xl font-semibold`}>{title}</Text>
                    <Text>{travelTimeInformation?.duration?.text}</Text>
                  </View>
                  <Text style={tw`text-xl`}>
                    {new Intl.NumberFormat("en-gb", {
                      style: "currency",
                      currency: "GBP",
                    }).format(
                      (travelTimeInformation?.duration?.value *
                        SURGE_CHARGE_RATE *
                        multiplier) /
                        100
                    )}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <View style={tw`mt-auto border-t border-gray-200`}>
              <TouchableOpacity
                disabled={!selected}
                style={tw`bg-black rounded-full py-3 m-3 ${
                  !selected && "bg-gray-300"
                }`}
              >
                <Text style={tw`text-center text-white text-xl`}>
                  Choose {selected?.title}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        }
      />
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
