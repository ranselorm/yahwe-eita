import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import * as SplashScreen from 'expo-splash-screen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { RootState } from '@/store/store';
import { store, persistor } from '@/store/store';
import LoadingScreen from '@/components/LoadingScreen';
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native';
import { useColorScheme } from 'react-native';

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

// AppContent
function AppContent() {
	const theme = useSelector((s: RootState) => s.theme.theme);
	const isDarkMode = theme === 'dark';

	SplashScreen.hideAsync();
	const colorScheme = useColorScheme();

	return (
		<>
			<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
				<StatusBar style={isDarkMode ? 'light' : 'dark'} />
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Screen name="index" />
					<Stack.Screen name="(auth)" />
					<Stack.Screen name="(tabs)" />
					<Stack.Screen name="settings" />
					<Stack.Screen name="notifications" />
				</Stack>
			</ThemeProvider>
		</>
	);
}

export default function RootLayout() {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<QueryClientProvider client={queryClient}>
					<KeyboardProvider>
						<AppContent />
					</KeyboardProvider>
				</QueryClientProvider>
				<Toast />
			</PersistGate>
		</Provider>
	);
}
