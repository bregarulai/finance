import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { QKey } from "@/constants";

export const useGetTransaction = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: [QKey.TRANSACTION, { id }],
    queryFn: async () => {
      const response = await client.api.transactions[":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch transaction: ${response.statusText}`);
      }

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
