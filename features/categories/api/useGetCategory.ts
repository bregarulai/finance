import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { QKey } from "@/constants";

export const useGetCategory = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: [QKey.CATEGORY, { id }],
    queryFn: async () => {
      const response = await client.api.categories[":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch category: ${response.statusText}`);
      }

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
