import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'https://yahwe-eita-api.azurewebsites.net/api/geneology';

const fetchGenealogy = async (token: string) => {
	try {
		const response = await axios.get(API_URL, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data?.data;
	} catch (error) {
		console.error('Error fetching genealogy:', error);
		throw error;
	}
};

export const useGenealogy = () => {
	// const { user } = useUser();
	// const token = user?.token;

	return useQuery({
		queryKey: ['genealogy'],
		queryFn: async () => {
			if (true) {
				const data = await fetchGenealogy('');
				return data;
			}
			throw new Error('No token or user_id found');
		},
		// enabled: !!token,
	});
};
