import { z } from "zod";
import { InferResponseType } from "hono";
import { SelectSingleEventHandler } from "react-day-picker";

import {
  accountFormValidation,
  categoryFormValidation,
  transactionApiValidation,
  transactionFormValidation,
} from "@/lib/validation";
import { client } from "@/lib/hono";

export type NavButtonProps = {
  href: string;
  label: string;
  isActive: boolean;
};

// ACCOUNTS TYPES
export type NewAccountState = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export type OpenAccountState = {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  onOpen: (id: string) => void;
};

export type AccountFormValues = z.input<typeof accountFormValidation>;

export type AccountColumsType = InferResponseType<
  typeof client.api.accounts.$get,
  200
>["data"][0];

export type AccountActionsProps = {
  id: string;
};

export type AccountFormProps = {
  id?: string;
  defaultValues?: AccountFormValues;
  onSubmit: (values: AccountFormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

// CATEGORIES TYPES
export type NewCategoryState = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export type OpenCategoryState = {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  onOpen: (id: string) => void;
};

export type CategoryFormValues = z.input<typeof categoryFormValidation>;

export type CategoryFormProps = {
  id?: string;
  defaultValues?: CategoryFormValues;
  onSubmit: (values: CategoryFormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export type CategoryColumsType = InferResponseType<
  typeof client.api.categories.$get,
  200
>["data"][0];

export type CategoryActionsProps = {
  id: string;
};

// TRANSACTIONS TYPES
export type OpenTransactionState = {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  onOpen: (id: string) => void;
};

export type NewTransactionState = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export type TransactionFormValues = z.input<typeof transactionFormValidation>;
export type TransactionApiValues = z.input<typeof transactionApiValidation>;

export type Option = {
  label: string;
  value: string;
};

export type TransactionFormProps = {
  id?: string;
  defaultValues?: TransactionFormValues;
  onSubmit: (values: TransactionApiValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
  accountOptions: Option[];
  categoryOptions: Option[];
  onCreateAccount: (name: string) => void;
  onCreateCategory: (name: string) => void;
};

export type CustomSelectProps = {
  onChange: (value?: string) => void;
  onCreate: (value: string) => void;
  options: Option[];
  value?: string | null | undefined;
  disabled?: boolean;
  placeholder?: string;
};

export type CustomDatePickerProps = {
  value?: Date;
  onChange: SelectSingleEventHandler;
  disabled?: boolean;
};

export type AmountInputProps = {
  value: string;
  onChange: (value: string | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
};
