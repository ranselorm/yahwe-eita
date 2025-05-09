import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { router, useRootNavigationState } from 'expo-router';

const Page = () => {
	const rootNavigationState = useRootNavigationState();

	useEffect(() => {
		if (!rootNavigationState?.key) {
			return;
		}

		router.replace('/(auth)');
	}, [rootNavigationState.key]);

	return (
		<View className="" style={styles.container}>
			<Text>Page</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default Page;
