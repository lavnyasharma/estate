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
const TermsAndConditionItem = ({ title, content }) => (
  <View className="mb-6">
    <Text className="text-xl font-bold text-black-500">{title}</Text>
    <Text className="text-base text-gray-700 mt-2">{content}</Text>
  </View>
);


const TermsAndCondition = () => {
  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex flex-row items-center w-full justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
          >
            <Image source={icons.backArrow} className="size-5" />
          </TouchableOpacity>
        </View>

        {/* Heading */}
        <View className="flex flex-row justify-center mt-5">
          <Text className="text-2xl font-bold text-gray-800">
            Terms and Conditions
          </Text>
        </View>

        {/* Terms and Conditions Content */}
        <View className="mt-5">
          <TermsAndConditionItem
            title="1. Introduction"
            content="Welcome to our app. These terms and conditions govern your use of the app..."
          />
          <TermsAndConditionItem
            title="2. User Responsibilities"
            content="As a user, you agree to be responsible for your actions while using our app..."
          />
          <TermsAndConditionItem
            title="3. Privacy Policy"
            content="Your privacy is important to us. This section outlines how we collect and protect your data..."
          />
          <TermsAndConditionItem
            title="4. Termination"
            content="We reserve the right to terminate your account if you violate the terms and conditions..."
          />
          <TermsAndConditionItem
            title="4. Termination"
            content="We reserve the right to terminate your account if you violate the terms and conditions..."
          />
          <TermsAndConditionItem
            title="4. Termination"
            content="We reserve the right to terminate your account if you violate the terms and conditions..."
          />
          <TermsAndConditionItem
            title="4. User Accounts"
            content="You may need to create an account to access certain features. You are responsible for maintaining the confidentiality of your login credentials."
          />
          <TermsAndConditionItem
            title="4. Termination"
            content="We reserve the right to terminate your account if you violate the terms and conditions..."
          />
          {/* Add more terms as needed */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsAndCondition;
