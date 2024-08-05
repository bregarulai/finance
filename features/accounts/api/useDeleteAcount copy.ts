import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { client } from "@/lib/hono";
import { QKey } from "@/constants";

type ResponseType = InferResponseType<
  (typeof client.api.accounts)[":id"]["$delete"]
>;

export const useDeleteAccount = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.accounts[":id"]["$delete"]({
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Account delted successfully");
      queryClient.invalidateQueries({ queryKey: [QKey.ACCOUNT, { id }] });
      queryClient.invalidateQueries({ queryKey: [QKey.ACCOUNTS] });
      // TODO: Invalidate summary and transactions
    },
    onError: () => {
      toast.error("Failed to delete account");
    },
  });

  return mutation;
};
