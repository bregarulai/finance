import { z } from "zod";

import { accountFormValidation } from "@/lib/validation";

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
