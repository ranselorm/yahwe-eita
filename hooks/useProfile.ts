import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'https://yahwe-eita-api.azurewebsites.net/api/profile';

const fetchProfile = async (token: string) => {
	try {
		const response = await axios.get(API_URL, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data?.data;
	} catch (error) {
		console.error('Error fetching profile:', error);
		throw error;
	}
};

export const useProfile = () => {
	// const token = user?.token;

	return useQuery({
		queryKey: ['profile'],
		queryFn: () => {
			return fetchProfile('');
		},
		// enabled: Boolean(token),
		staleTime: 0,
		refetchOnMount: 'always',
		refetchOnWindowFocus: true,
	});
};
