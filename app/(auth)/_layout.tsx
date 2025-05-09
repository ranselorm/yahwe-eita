import { Stack, Redirect } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';

export default function AuthLayout() {
	const user = useSelector((state: RootState) => state.user.user);

	console.log(user, 'IN USER');
	if (user?.isLoggedIn) {
		return <Redirect href="/(tabs)" />;
	}

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" />
			<Stack.Screen name="landing" />
			<Stack.Screen name="sponsor" />
			<Stack.Screen name="confirmation" />
			<Stack.Screen name="phone" />
			{/* <Stack.Screen name="verify" /> */}
			<Stack.Screen name="register" />
			<Stack.Screen name="status" />
			<Stack.Screen name="login" />
			<Stack.Screen name="reset-password" />
		</Stack>
	);
}
