import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { client } from "@/lib/hono";
import { QKey } from "@/constants";

type ResponseType = InferResponseType<
  (typeof client.api.accounts)[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.accounts)[":id"]["$patch"]
>["json"];

export const useEditAccount = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.accounts[":id"]["$patch"]({
        param: { id },
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Account updated successfully");
      queryClient.invalidateQueries({ queryKey: [QKey.ACCOUNT, { id }] });
      queryClient.invalidateQueries({ queryKey: [QKey.ACCOUNTS] });
      queryClient.invalidateQueries({ queryKey: [QKey.TRANSACTIONS] });
      queryClient.invalidateQueries({ queryKey: [QKey.SUMMARY] });
    },
    onError: () => {
      toast.error("Failed to edit account");
    },
  });

  return mutation;
};
