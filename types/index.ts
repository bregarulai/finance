import { z } from "zod";
import { InferResponseType } from "hono";

import {
  accountFormValidation,
  categoryFormValidation,
} from "@/lib/validation";
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

export type NewCategoryState = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export type AccountFormValues = z.input<typeof accountFormValidation>;
export type CategoryFormValues = z.input<typeof categoryFormValidation>;

export type AccountFormProps = {
  id?: string;
  defaultValues?: AccountFormValues;
  onSubmit: (values: AccountFormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};
export type CategoryFormProps = {
  id?: string;
  defaultValues?: CategoryFormValues;
  onSubmit: (values: CategoryFormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export type AccountColumsType = InferResponseType<
  typeof client.api.accounts.$get,
  200
>["data"][0];

export type CategoryColumsType = InferResponseType<
  typeof client.api.categories.$get,
  200
>["data"][0];

export type OpenAccountState = {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  onOpen: (id: string) => void;
};

export type OpenCategoryState = {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  onOpen: (id: string) => void;
};

export type AccountActionsProps = {
  id: string;
};

export type CategoryActionsProps = {
  id: string;
};
