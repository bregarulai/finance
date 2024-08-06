import {
  insertAccountSchema,
  insertCategorySchema,
  insertTransactionSchema,
} from "@/db/schema";
import { z } from "zod";

export const accountFormValidation = insertAccountSchema.pick({
  name: true,
});

export const categoryFormValidation = insertCategorySchema.pick({
  name: true,
});

export const transactionApiValidation = insertTransactionSchema.omit({
  id: true,
});

export const transactionFormValidation = z.object({
  date: z.coerce.date(),
  accountId: z.string(),
  categoryId: z.string().nullable().optional(),
  payee: z.string(),
  amount: z.string(),
  notes: z.string().nullable().optional(),
});
