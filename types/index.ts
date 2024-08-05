import { z } from "zod";
import { InferResponseType } from "hono";

import { accountFormValidation } from "@/lib/validation";
import { client } from "@/lib/hono";

export type NavButtonProps = {
  href: string;
  label: string;
  isActive: boolean;
};

export type NewAccountState = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export type FormValues = z.input<typeof accountFormValidation>;

export type AccountFormProps = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export type AccountColumsType = InferResponseType<
  typeof client.api.accounts.$get,
  200
>["data"][0];

export type OpenAccountState = {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  onOpen: (id: string) => void;
};

export type ActionsProps = {
  id: string;
};
