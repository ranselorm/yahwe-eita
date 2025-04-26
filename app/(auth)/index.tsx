import React, { useRef, useState } from "react";
import {
  View,
  FlatList,
  Dimensions,
  Text,
  Pressable,
  useColorScheme,
  Image,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height: windowHeight } = Dimensions.get("window");

const onboardingData = [
  {
    title: "Welcome",
    text: "Congratulations on your decision to join Yahwe-eita Culture Ventures, a registered company.\n\nYahwe-eita Culture, is a Sales and Marketing concept designed to drive sales of goods and services online. The concept is a membership affiliate programme that is designed essentially to reward loyal customers of a chosen brand, via a simple referral and compensation formula.",
  },
  {
    title: "OUR PURPOSE",
    text: "Is to modernize and digitize the Ghanaian culture of voluntarily Giving (for example, to help out-door a newly born, or to bereaved friends and associates in raising funds to bury their dead).\n\nIt is a rewarding system to the network of Givers and Receivers that is routed through the Mobile phone Airtime and Data that we buy.\n\nYahwe-eita thus offers affiliate members an exciting opportunity to earn some supplementary income together with their reliable relations and friends in cycles of Eight-week periods by way of sharing their mobile phone Airtime credit with their uplines.",
  },

  {
    title: "OUR CORPORATE VALUES",
    text: "• Rewarding outstanding performance\n\n• Decent self-application in the Social Media space and in seeking beneficial relationships.\n\n• Teamwork, Loyalty and Trust in building solid relationships and networks.\n\n• Strict adherence to the highest ethical and professional standards.\n\n• Genuine contentment in helping others to succeed.",
  },
  {
    title: "OUR CORPORATE VALUES",
    text: "Get compensated for every successful referral.",
  },
];

function Checkbox({ checked, onChange }: any) {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <Pressable
      onPress={() => onChange(!checked)}
      className="w-6 h-6 border rounded-md justify-center items-center"
    >
      {checked && (
        <MaterialIcons
          name="check"
          size={18}
          color={isDarkMode ? "white" : "black"}
        />
      )}
    </Pressable>
  );
}

export default function WelcomeScreen() {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const isDarkMode = useColorScheme() === "dark";

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      if (isChecked) {
        router.push("/(auth)/landing");
      }
    }
  };

  const renderItem = ({ item, index }: any) => {
    const descriptionParagraphs = item.text.split("\n\n");

    return (
      <SafeAreaView
        className={`flex-1 p-6 w-screen ${
          isDarkMode ? "bg-black" : "bg-white"
        }`}
      >
        <View className="flex-1 px-6 mt-24">
          <FontAwesome name="handshake-o" size={30} color="#dc6115" />

          <Text
            className={`text-3xl font-bold uppercase mt-6 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            {item.title}
          </Text>

          {/* Fixed height description area */}
          <View style={{ height: windowHeight * 0.5 }} className="w-full mt-6">
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 10 }}
            >
              {descriptionParagraphs.map((para: any, idx: any) => (
                <Text
                  key={idx}
                  className={`text-lg text-left ${
                    isDarkMode ? "text-white" : "text-black"
                  } ${idx > 0 ? "mt-4" : ""}`}
                >
                  {para.trim()}
                </Text>
              ))}
            </ScrollView>
          </View>

          {/* Checkbox only on last screen */}
          {index === onboardingData.length - 1 && (
            <View className="flex-row items-center mt-8">
              <Checkbox checked={isChecked} onChange={setIsChecked} />
              <Text
                className={`ml-2 ${
                  isDarkMode ? "text-white" : "text-gray-700"
                }`}
              >
                I agree to the{" "}
                <Text className="text-orange-500">Terms and Conditions</Text>
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"}`}>
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        snapToInterval={width}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ flexGrow: 1 }}
      />

      {/* Bottom Next / Get Started Button */}
      <Pressable
        onPress={handleNext}
        className={`absolute bottom-10 left-10 right-10 rounded-lg py-4 ${
          currentIndex === onboardingData.length - 1 && !isChecked
            ? "bg-gray-400"
            : "bg-primary"
        }`}
        disabled={currentIndex === onboardingData.length - 1 && !isChecked}
      >
        <Text className="text-white text-center text-lg font-semibold">
          {currentIndex === onboardingData.length - 1 ? "Get Started" : "Next"}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
