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
import { categoryFormValidation } from "@/lib/validation";
import { CategoryFormProps, CategoryFormValues } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CategoryForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
}: CategoryFormProps) => {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormValidation),
    defaultValues,
  });

  const handleSubmit = (values: CategoryFormValues) => {
    onSubmit(values);
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
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="e.g. Food, Travel, etc."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button disabled={disabled}>
          {id ? "Save changes" : "Create category"}
        </Button>

        {!!id && (
          <Button
            type="button"
            disabled={disabled}
            onClick={handleDelete}
            variant="outline"
          >
            <Trash className="size-4" />
            <span className="ml-2">Delete category</span>
          </Button>
        )}
      </form>
    </Form>
  );
};

export default CategoryForm;
