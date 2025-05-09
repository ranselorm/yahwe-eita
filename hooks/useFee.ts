// hooks/useRegister.ts
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

export interface FeeData {
	phone: string;
	customerName: string;
	customerEmail: string;
	channel: string;
}

const API_URL = 'https://yahwe-eita-api.azurewebsites.net/api/fee';

export const useFee = () => {
	// const { accessToken } = useUser();
	return useMutation<any, AxiosError, FeeData>({
		mutationFn: async (feeData: FeeData) => {
			const url = `${API_URL}`;
			const { data } = await axios.post(url, feeData, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer `,
				},
			});
			return data;
		},
	});
};
