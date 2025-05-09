import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = `https://yahwe-eita-api.azurewebsites.net/api/transactions/mobile`;

const fetchTransactions = async (
	token: string,
	//   page: number,
	//   page_size: number
) => {
	const response = await axios.get(API_URL, {
		headers: { Authorization: `Bearer ${token}` },
		// params: {
		//   page,
		//   page_size,
		// },
	});
	const transactions = response?.data?.data?.transactions ?? [];
	const count = response?.data?.data?.count ?? 0;
	return { transactions, count };
};

export const useTransactions = () => {
	// const { user } = useUser();
	// const token = user?.token;

	return useQuery({
		queryKey: ['transactions'],
		queryFn: async () => {
			const { transactions, count } = await fetchTransactions(
				'',
				// page,
				// limit
			);
			return { transactions };
		},
		// enabled: !!token,
	});
};
