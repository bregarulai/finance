import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { client } from "@/lib/hono";
import { QKey } from "@/constants";

type ResponseType = InferResponseType<
  (typeof client.api.categories)[":id"]["$delete"]
>;

export const useDeleteCategory = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.categories[":id"]["$delete"]({
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Category deleted successfully");
      queryClient.invalidateQueries({ queryKey: [QKey.CATEGORY, { id }] });
      queryClient.invalidateQueries({ queryKey: [QKey.CATEGORIES] });
      queryClient.invalidateQueries({ queryKey: [QKey.TRANSACTIONS] });
      queryClient.invalidateQueries({ queryKey: [QKey.SUMMARY] });
    },
    onError: () => {
      toast.error("Failed to delete category");
    },
  });

  return mutation;
};
