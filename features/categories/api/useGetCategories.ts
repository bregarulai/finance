import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { QKey } from "@/constants";

export const useGetCategories = () => {
  const query = useQuery({
    queryKey: [QKey.CATEGORIES],
    queryFn: async () => {
      const response = await client.api.categories.$get();

      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.statusText}`);
      }

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
