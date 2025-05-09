import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'https://yahwe-eita-api-dev.azurewebsites.net/api/invite';

const fetchInvitedUsers = async (token: string) => {
	const response = await axios.get(API_URL, {
		headers: { Authorization: `Bearer ${token}` },
	});
	return response.data?.data ?? [];
};

export const useInvitedUsers = () => {
	// const token = user?.token;

	return useQuery({
		queryKey: ['invitedUsers'],
		queryFn: () => fetchInvitedUsers(''),
		// enabled: !!token,
	});
};
