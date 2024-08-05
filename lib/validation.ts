import { insertAccountSchema } from "@/db/schema";

export const accountFormValidation = insertAccountSchema.pick({
  name: true,
});
