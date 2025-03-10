
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

import { router } from "expo-router";
import icons from "@/constants/icons";

// TermsAndConditionItem component to display individual sections
const ListProperties = () => (
  <SafeAreaView className="h-full bg-white">
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerClassName="pb-32 px-7"
    >
      <View className="flex flex-row items-center w-full">
        <View className="flex flex-row items-center w-[10%]">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
          >
            <Image source={icons.backArrow} className="size-5" />
          </TouchableOpacity>
        </View>
        <View className="flex flex-row px-0 mx-0 justify-center w-[80%] ">
          <Text className="text-2xl flex justify-center capitalize font-bold text-gray-800">
            listed properties
          </Text>
        </View>
        <View className="flex flex-row items-center w-[10%]"></View>
      </View>

      {/* Heading */}

      {/* Terms and Conditions Content */}
    </ScrollView>
  </SafeAreaView>
);



export default ListProperties;
