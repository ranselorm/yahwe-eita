import React, { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

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
	TouchableOpacity,
	Linking,
} from 'react-native';
import { router } from 'expo-router';
import { EvilIcons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height: windowHeight } = Dimensions.get('window');

const onboardingData = [
	{
		title: 'Welcome',
		text: 'Congratulations on your decision to join Yahwe-eita Culture Ventures, a registered company.\n\nYahwe-eita Culture, is a Sales and Marketing concept designed to drive sales of goods and services online. The concept is a membership affiliate programme that is designed essentially to reward loyal customers of a chosen brand, via a simple referral and compensation formula.',
	},
	{
		title: 'OUR PURPOSE',
		text: 'Is to modernize and digitize the Ghanaian culture of voluntarily Giving (for example, to help out-door a newly born, or to bereaved friends and associates in raising funds to bury their dead).\n\nIt is a rewarding system to the network of Givers and Receivers that is routed through the Mobile phone Airtime and Data that we buy.\n\nYahwe-eita thus offers affiliate members an exciting opportunity to earn some supplementary income together with their reliable relations and friends in cycles of Eight-week periods by way of sharing their mobile phone Airtime credit with their uplines.',
	},

	{
		title: 'OUR CORPORATE VALUES',
		text: '• Rewarding outstanding performance\n\n• Decent self-application in the Social Media space and in seeking beneficial relationships.\n\n• Teamwork, Loyalty and Trust in building solid relationships and networks.\n\n• Strict adherence to the highest ethical and professional standards.\n\n• Genuine contentment in helping others to succeed.',
	},
	{
		title: 'TERMS AND CONDITIONS',
		text: `Every Prospective Member must:

1. Be over 17 years, an MTN subscriber and must be introduced by an existing affiliate member in good standing.\n\n

2. Have an Android or iOS phone or tab with the Momo wallet and with enough money to buy GHC 80 of Airtime or Data credit.\n\n

3. Register and purchase GHC 80 of MTN Mobile Airtime credit.\n\n

4. Must also introduce at least 3 people to join the scheme within 8 Days after registration to stay as a benefiting Member.\n\n

5. Understand that members earn their Rewards only after fulfilling their individual responsibilities as in Point 4.\n\n

6. Only click on the \"I AGREE TO TERMS\" icon when they have understood How It Works; that their registration and entry expires in 8 weeks, after which they may restart for a new cycle. (You may click on How It Works for re-direction to the website for further explanation.)\n\n

7. Understand that it takes good relationships and constant reminders on every member's part to earn the cash, one registration at a time.\n\n

8. Understand that every reward is received as INSTANTLY as your Downlines Register and buy their credit.\n\n

9. Understand that YAHWE-EITA HAS A TERMINAL POINT OF ONLY 8 WEEKS and that...\n\n

10. YAHWE-EITA DOES NOT MOBILIZE OR KEEP MONEY FOR ITS MEMBERS. ALL REWARDS ARE RECEIVED INSTANTLY ON YOUR PHONE. YAHWE-EITA SIMPLY RETAILS AIRTIME AND DATA CREDIT.\n\n

We are confident that if you introduce very reliable friends and they also do likewise, you’d earn day by day, the targeted amount of GHC 49,185 PLUS GHC 45 AIRTIME IN 8 WEEKS from the get-go.\n\n

We wish you every Success.\n\n

Yawhe-eita Team.`,
	},
];

function Checkbox({ checked, onChange }: any) {
	const isDarkMode = useColorScheme() === 'dark';

	return (
		<Pressable
			onPress={() => onChange(!checked)}
			className={`w-6 h-6 border rounded-md justify-center items-center ${
				isDarkMode ? 'border-white' : 'border-black'
			}`}>
			{checked && (
				<MaterialIcons
					name="check"
					size={18}
					color={isDarkMode ? 'white' : 'black'}
				/>
			)}
		</Pressable>
	);
}

export default function WelcomeScreen() {
	const flatListRef = useRef<FlatList>(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isChecked, setIsChecked] = useState(false);
	const isDarkMode = useColorScheme() === 'dark';

	const BG = isDarkMode ? '#000' : '#fff';

	// function to open urls in the default browser
	const openURL = async (url: string) => {
		const supported = await Linking.canOpenURL(url);

		if (supported) {
			await Linking.openURL(url);
		} else {
			console.error('Cannot open URL:', url);
		}
	};

	const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const index = Math.round(event.nativeEvent.contentOffset.x / width);
		setCurrentIndex(index);
	};

	const handleNext = () => {
		if (currentIndex < onboardingData.length - 1) {
			flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
		} else {
			if (isChecked) {
				router.push('/(auth)/sponsor');
			}
		}
	};

	const renderItem = ({ item, index }: any) => {
		const descriptionParagraphs = item.text.split('\n\n');

		return (
			<SafeAreaView
				className={`flex-1 p-6 w-screen ${
					isDarkMode ? 'bg-black' : 'bg-white'
				}`}>
				<View className="flex-1 px-6 -mt-16">
					{/* <FontAwesome name="handshake-o" size={30} color="#dc6115" /> */}

					<Text
						className={`text-2xl font-bold uppercase ${
							isDarkMode ? 'text-white' : 'text-black'
						}`}>
						{item.title}
					</Text>

					{/* Fixed height description area */}
					<View style={{ height: windowHeight * 0.55 }} className="w-full mt-6">
						<ScrollView
							showsVerticalScrollIndicator={false}
							contentContainerStyle={{ paddingBottom: 10 }}>
							{descriptionParagraphs.map((para: any, idx: any) => (
								<Text
									key={idx}
									className={`text-lg text-left ${
										isDarkMode ? 'text-white' : 'text-black'
									} ${idx > 0 ? 'mt-4' : ''}`}>
									{para.trim()}
								</Text>
							))}
						</ScrollView>
					</View>

					{/* Checkbox only on last screen */}
					<View className="flex-row items-center mt-6">
						{index === onboardingData.length - 1 && (
							<View className="flex-row items-center justify-between">
								<View className="flex-row items-center">
									<Checkbox checked={isChecked} onChange={setIsChecked} />
									<Text
										className={`ml-2 text-lg ${
											isDarkMode ? 'text-white' : 'text-black'
										}`}>
										I agree to the{' '}
										<Text className="font-bold">Terms and Conditions</Text>
									</Text>
								</View>
							</View>
						)}
					</View>
					{item.title === 'TERMS AND CONDITIONS' && (
						<TouchableOpacity
							onPress={() =>
								openURL('https://www.yahwe-eitaglobal.com/#features')
							}>
							<View className="flex-row items-center justify-center mt-6 gap-x-3">
								<EvilIcons name="external-link" size={24} color="#3b82f6" />
								<Text
									className={`text-lg text-center ${
										isDarkMode ? 'text-blue-500' : 'text-blue-500'
									}`}>
									How It Works
								</Text>
							</View>
						</TouchableOpacity>
					)}
				</View>
			</SafeAreaView>
		);
	};

	return (
		<>
			<SafeAreaView
				className={`flex-1 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
				<View className="flex-row items-center justify-between p-6">
					<View className="items-center justify-left flex-row">
						<View className="w-16 h-16">
							{/* <Image
                source={require("@/assets/images/logo.png")}
                className="w-full h-full"
              /> */}
						</View>
						<Text
							className={`text-lg font-bold text-center -ml-6 ${
								isDarkMode ? 'text-white' : 'text-black'
							}`}>
							YAHWE-EITA
						</Text>
					</View>
					<Pressable
						className={`py-2 px-4 rounded-full ${
							isDarkMode ? 'bg-white' : 'bg-black'
						}`}
						onPress={() => router.push('/(auth)/login')}
						// onPress={() => router.push("/(auth)/status")}
					>
						<Text
							className={`font-bold ${
								isDarkMode ? 'text-black' : 'text-white'
							}`}>
							Login
						</Text>
					</Pressable>
				</View>
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

				<Pressable
					onPress={handleNext}
					className={`absolute bottom-3 left-10 right-10 rounded-xl py-3 ${
						currentIndex === onboardingData.length - 1 && !isChecked
							? 'bg-gray-400'
							: 'bg-primary'
					}`}
					disabled={currentIndex === onboardingData.length - 1 && !isChecked}>
					<Text className="text-white text-center text-lg font-semibold">
						{currentIndex === onboardingData.length - 1
							? 'Get Started'
							: 'Next'}
					</Text>
				</Pressable>
			</SafeAreaView>
		</>
		// <LoadingScreen />
	);
}
