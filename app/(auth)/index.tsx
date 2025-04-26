import {
  View,
  Text,
  Pressable,
  FlatList,
  useColorScheme,
  Image,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { useRef, useState } from "react";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

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

const pages = [
  {
    title: "Welcome",
    icon: <FontAwesome name="handshake-o" size={30} color="#dc6115" />,
    content:
      "Congratulations on joining YAHWE-EITA. We are excited to have you.",
  },
  {
    title: "About Us",
    icon: <FontAwesome name="users" size={30} color="#dc6115" />,
    content:
      "We are a Sales and Marketers platform designed to drive online sales.",
  },
  {
    title: "Get Started",
    icon: <FontAwesome name="rocket" size={30} color="#dc6115" />,
    content: "Join our membership affiliate program and start earning.",
  },
];

export default function WelcomeScreen() {
  const isDarkMode = useColorScheme() === "dark";
  const [currentPage, setCurrentPage] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentPage + 1 });
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const pageIndex = Math.round(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width
    );
    setCurrentPage(pageIndex);
  };

  return (
    <SafeAreaView
      className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"} p-6 h-full`}
    >
      <View className="mb-5 items-center flex-row justify-center">
        <View className="w-20 h-20">
          <Image
            source={require("@/assets/images/logo.png")}
            className="w-full h-full"
          />
        </View>
        <Text
          className={`text-2xl font-bold text-center -ml-6 ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          YAHWE-EITA
        </Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={pages}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="w-full items-center justify-center px-4">
            <View className="mb-4">{item.icon}</View>
            <Text
              className={`text-3xl font-bold text-center ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              {item.title}
            </Text>
            <Text
              className={`mt-5 text-lg text-center ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              {item.content}
            </Text>
            {currentPage === pages.length - 1 && (
              <View className="mt-6 flex-row items-center">
                <Checkbox checked={isChecked} onChange={setIsChecked} />
                <Text
                  className={`ml-2 text-base ${
                    isDarkMode ? "text-white" : "text-gray-600"
                  }`}
                >
                  I agree to the{" "}
                  <Text className="text-orange-500">terms and conditions</Text>
                </Text>
              </View>
            )}
          </View>
        )}
        onMomentumScrollEnd={handleScroll}
      />

      <Pressable
        disabled={currentPage === pages.length - 1 && !isChecked}
        className={`mt-6 px-6 py-3 rounded-lg w-[80%] self-center ${
          currentPage === pages.length - 1
            ? isChecked
              ? "bg-primary"
              : "bg-gray-400"
            : "bg-primary"
        }`}
        onPress={() => {
          if (currentPage === pages.length - 1) {
            router.push("/(auth)/landing");
          } else {
            handleNext();
          }
        }}
      >
        <Text className="text-white text-lg font-semibold text-center">
          {currentPage === pages.length - 1 ? "GET STARTED" : "NEXT"}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
