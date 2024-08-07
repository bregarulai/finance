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

export type TransactionCategoryColumnProps = {
  id: string;
  category: string | null;
  categoryId: string | null;
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

export type TransactionColumsType = InferResponseType<
  typeof client.api.transactions.$get,
  200
>["data"][0];

export type TransactionActionsProps = {
  id: string;
};

export type TransactionAccountColumnProps = {
  account: string;
  accountId: string;
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

export type UploadButtonProps = {
  onUpload: (results: any) => void;
};

export type ImportCardProps = {
  data: string[][];
  onCancel: () => void;
  onSubmit: (data: any) => void;
};

export type SelectedColumnsState = {
  [key: string]: string | null;
};

export type ImportTableProps = {
  headers: string[];
  body: string[][];
  selectedColumns: Record<string, string | null>;
  onTableHeadSelectChange: (columnIndex: number, value: string | null) => void;
};

export type TableHeadSelectProps = {
  columnIndex: number;
  selectedColumns: Record<string, string | null>;
  onChange: (columnIndex: number, value: string | null) => void;
};
