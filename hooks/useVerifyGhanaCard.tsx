import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import axios from "axios";
import { setUsers } from "@/store/userSlice";

const API_URL = "https://yahwe-eita-api.azurewebsites.net/api/users";

const fetchUsers = async (
  token: string,
  page?: number,
  page_size?: number,
  search?: string
) => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      page,
      page_size,
      ...(search ? { search } : {}),
    },
  });

  const users = response?.data?.data?.users ?? [];
  const count = response?.data?.data?.count ?? 0;
  return { users, count };
};

export const useUsers = (page?: number, limit?: number, search?: string) => {
  const token = useSelector((state: RootState) => state.user.token);
  const dispatch = useDispatch();

  return useQuery<any, Error>({
    queryKey: ["users", token, search, page, limit],
    queryFn: async () => {
      const { users, count } = await fetchUsers(token!, page, limit, search);
      dispatch(setUsers(users));
      return { users, count };
    },
    enabled: !!token,
  });
};
