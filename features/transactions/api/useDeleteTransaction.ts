import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { client } from "@/lib/hono";
import { QKey } from "@/constants";

type ResponseType = InferResponseType<
  (typeof client.api.transactions)[":id"]["$delete"]
>;

export const useDeleteTransaction = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.transactions[":id"]["$delete"]({
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Transaction deleted successfully");
      queryClient.invalidateQueries({ queryKey: [QKey.TRANSACTION, { id }] });
      queryClient.invalidateQueries({ queryKey: [QKey.TRANSACTIONS] });
      queryClient.invalidateQueries({ queryKey: [QKey.SUMMARY] });
    },
    onError: () => {
      toast.error("Failed to delete transaction");
    },
  });

  return mutation;
};
