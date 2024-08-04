import { z } from "zod";
import { InferResponseType } from "hono";

import { accountFormValidation } from "@/lib/validation";
import { client } from "@/lib/hono";

declare type NavButtonProps = {
  href: string;
  label: string;
  isActive: boolean;
};

declare type NewAccountState = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

declare type FormValues = z.input<typeof accountFormValidation>;

declare type AccountFormProps = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

declare type AccountColumsType = InferResponseType<
  typeof client.api.accounts.$get,
  200
>["data"][0];
