import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
  Modal,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import icons from "@/constants/icons";
import images from "@/constants/images";
import Comment from "@/components/Comment";
import { facilities } from "@/constants/data";

import { useAppwrite } from "@/lib/useAppwrite";
import { getPropertyById } from "@/lib/appwrite";
import { useState } from "react";

const Property = () => {
  const { id } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [formModalVisible, setFormModalVisible] = useState(false); // For the new form modal
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    location: "",
  });

  const windowHeight = Dimensions.get("window").height;

  const { data: property } = useAppwrite({
    fn: getPropertyById,
    params: {
      id,
    },
  });

  const handleFormSubmit = () => {
    // Start loading animation
    setIsLoading(true);

    // Simulate a delay (e.g., submitting the form to an API)
    setTimeout(() => {
      setIsLoading(false); // Stop loading animation
      setFormModalVisible(false); // Close the form modal
      setModalVisible(true); // Open the existing modal
    }, 2000); // Simulate 2 seconds loading
  };

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 bg-white"
      >
        <View className="relative w-full" style={{ height: windowHeight / 2 }}>
          <Image
            source={{ uri: property?.image }}
            className="size-full"
            resizeMode="cover"
          />
          <Image
            source={images.whiteGradient}
            className="absolute top-0 w-full z-40"
          />

          <View
            className="z-50 absolute inset-x-7"
            style={{
              top: Platform.OS === "ios" ? 70 : 20,
            }}
          >
            <View className="flex flex-row items-center w-full justify-between">
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
              >
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="px-5 mt-7 flex gap-2">
          <Text className="text-2xl font-rubik-extrabold">
            {property?.name}
          </Text>

          <View className="flex flex-row items-center gap-3">
            <View className="flex flex-row items-center px-4 py-2 bg-primary-100 rounded-full">
              <Text className="text-xs font-rubik-bold text-primary-300">
                {property?.type}
              </Text>
            </View>
          </View>

          <View className="flex flex-row items-center mt-5">
            <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10">
              <Image source={icons.bed} className="size-4" />
            </View>
            <Text className="text-black-300 text-sm font-rubik-medium ml-2">
              {property?.bedrooms} Beds
            </Text>
            <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10 ml-7">
              <Image source={icons.bath} className="size-4" />
            </View>
            <Text className="text-black-300 text-sm font-rubik-medium ml-2">
              {property?.bathrooms} Baths
            </Text>
            <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10 ml-7">
              <Image source={icons.area} className="size-4" />
            </View>
            <Text className="text-black-300 text-sm font-rubik-medium ml-2">
              {property?.area} sqft
            </Text>
          </View>

          <View className="mt-7">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Overview
            </Text>
            <Text className="text-black-200 text-base font-rubik mt-2">
              {property?.description}
            </Text>
          </View>

          <View className="mt-7">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Facilities
            </Text>

            {property?.facilities.length > 0 && (
              <View className="flex flex-row flex-wrap items-start justify-start mt-2 gap-5">
                {property?.facilities.map((item, index) => {
                  const facility = facilities.find(
                    (facility) => facility.title === item
                  );

                  return (
                    <View
                      key={index}
                      className="flex flex-1 flex-col items-center min-w-16 max-w-20"
                    >
                      <View className="size-14 bg-primary-100 rounded-full flex items-center justify-center">
                        <Image
                          source={facility ? facility.icon : icons.info}
                          className="size-6"
                        />
                      </View>

                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        className="text-black-300 text-sm text-center font-rubik mt-1.5"
                      >
                        {item}
                      </Text>
                    </View>
                  );
                })}
              </View>
            )}
          </View>

          {property?.gallery.length > 0 && (
            <View className="mt-7">
              <Text className="text-black-300 text-xl font-rubik-bold">
                Gallery
              </Text>
              <FlatList
                contentContainerStyle={{ paddingRight: 20 }}
                data={property?.gallery}
                keyExtractor={(item) => item.$id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Image
                    source={{ uri: item.image }}
                    className="size-40 rounded-xl"
                  />
                )}
                contentContainerClassName="flex gap-4 mt-3"
              />
            </View>
          )}

          <View className="mt-7">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Location
            </Text>
            <View className="flex flex-row items-center justify-start mt-4 gap-2">
              <Image source={icons.location} className="w-7 h-7" />
              <Text className="text-black-200 text-sm font-rubik-medium">
                {property?.address}
              </Text>
            </View>

            <Image
              source={images.map}
              className="h-52 w-full mt-5 rounded-xl"
            />
          </View>
        </View>
      </ScrollView>

      <View className="absolute bg-white bottom-0 w-full rounded-t-2xl border-t border-r border-l border-primary-200 p-7">
        <View className="flex flex-row items-center justify-between gap-10">
          <View className="flex flex-col items-start">
            <Text className="text-black-200 text-xs font-rubik-medium">
              Price
            </Text>
            <Text
              numberOfLines={1}
              className="text-primary-300 text-start text-2xl font-rubik-bold"
            >
              ${property?.price}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => setFormModalVisible(true)} // Show form modal first
            className="flex-1 flex flex-row items-center justify-center bg-primary-300 py-3 rounded-full shadow-md shadow-zinc-400"
          >
            <Text className="text-white text-lg text-center font-rubik-bold">
              Book Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>

{/* Form Modal */}
<Modal
  transparent={true}
  visible={formModalVisible}
  animationType="fade"
  onRequestClose={() => setFormModalVisible(false)}
>
  <View className="flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50">
    <View className="bg-white p-8 rounded-xl w-80 shadow-lg">
      <Text className="text-2xl font-rubik-bold text-center text-gray-700 mb-4">
        Enter Your Details
      </Text>

      {/* Name Input */}
      <Text className="text-sm font-rubik-medium">Name</Text>
      <TextInput
        placeholder="Enter your name"
        value={formData.name}
        onChangeText={(text) =>
          setFormData((prev) => ({ ...prev, name: text }))
        }
        className="border-b border-gray-300 p-3 mb-4 rounded-md"
      />

      {/* Phone Number Input */}
      <Text className="text-sm font-rubik-medium">Phone Number</Text>
      <TextInput
        placeholder="Enter your phone number"
        value={formData.phoneNumber}
        onChangeText={(text) =>
          setFormData((prev) => ({ ...prev, phoneNumber: text }))
        }
        keyboardType="phone-pad"
        className="border-b border-gray-300 p-3 mb-4 rounded-md"
      />

      {/* Location Input */}
      <Text className="text-sm font-rubik-medium">Location</Text>
      <TextInput
        placeholder="Enter your location"
        value={formData.location}
        onChangeText={(text) =>
          setFormData((prev) => ({ ...prev, location: text }))
        }
        className="border-b border-gray-300 p-3 mb-4 rounded-md"
      />

      <TouchableOpacity
        onPress={handleFormSubmit}
        className="bg-primary-300 py-3 rounded-full mt-5"
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-lg text-center font-rubik-bold">
            Submit
          </Text>
        )}
      </TouchableOpacity>
    </View>
  </View>
</Modal>

{/* Confirmation Modal */}
<Modal
  transparent={true}
  visible={modalVisible}
  animationType="fade"
  onRequestClose={() => setModalVisible(false)}
>
  <View className="flex justify-center items-center absolute top-0 left-0 right-0 bottom-0  bg-[rgba(0,0,0,0.5)] bg-opacity-50">
    <View className="bg-white p-8 rounded-xl w-80 shadow-lg">
      <Text className="text-xl font-rubik-bold text-center text-gray-700 mb-4">
        Thank you for viewing the property. We appreciate your interest
        and are happy to confirm it's still available. A team member
        will contact you shortly for any further queries.
      </Text>
      <TouchableOpacity
        onPress={() => setModalVisible(false)}
        className="bg-primary-300 py-3 rounded-full"
      >
        <Text className="text-white text-lg text-center font-rubik-bold">
          OK
        </Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

    </View>
  );
};

export default Property;
