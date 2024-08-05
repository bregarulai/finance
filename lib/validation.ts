import { insertAccountSchema, insertCategorySchema } from "@/db/schema";

export const accountFormValidation = insertAccountSchema.pick({
  name: true,
});

export const categoryFormValidation = insertCategorySchema.pick({
  name: true,
});
