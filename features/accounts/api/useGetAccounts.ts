import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { QKey } from "@/constants";

export const useGetAccounts = () => {
  const query = useQuery({
    queryKey: [QKey.ACCOUNTS],
    queryFn: async () => {
      const response = await client.api.accounts.$get();

      if (!response.ok) {
        throw new Error(`Failed to fetch accounts: ${response.statusText}`);
      }

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
