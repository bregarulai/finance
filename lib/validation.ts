import { insertAccountsSchema } from "@/db/schema";

export const accountFormValidation = insertAccountsSchema.pick({
  name: true,
});
