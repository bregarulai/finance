import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { transactionFormValidation } from "@/lib/validation";
import {
  AccountFormProps,
  AccountFormValues,
  TransactionFormProps,
  TransactionFormValues,
} from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CustomSelect from "@/components/CustomSelect";

const TransactionForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
  accountOptions,
  categoryOptions,
  onCreateAccount,
  onCreateCategory,
}: TransactionFormProps) => {
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormValidation),
    defaultValues,
  });

  const handleSubmit = (values: TransactionFormValues) => {
    // onSubmit(values);
    console.log({ values });
  };

  const handleDelete = () => {
    onDelete?.();
  };
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          name="accountId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account</FormLabel>
              <FormControl>
                <CustomSelect
                  placeholder="Select an account"
                  options={accountOptions}
                  onChange={field.onChange}
                  onCreate={onCreateAccount}
                  disabled={disabled}
                  value={field.value}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button disabled={disabled}>
          {id ? "Save changes" : "Create transaction"}
        </Button>

        {!!id && (
          <Button
            type="button"
            disabled={disabled}
            onClick={handleDelete}
            variant="outline"
          >
            <Trash className="size-4" />
            <span className="ml-2">Delete transaction</span>
          </Button>
        )}
      </form>
    </Form>
  );
};

export default TransactionForm;
