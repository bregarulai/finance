import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CategoryFormValues } from "@/types";
import CategoryForm from "./CategoryForm";
import { useNewCategory } from "../hooks/useNewCategory";
import { useCreateCategory } from "../api/useCreateCategory";

const NewCategorySheet = () => {
  const { isOpen, onClose } = useNewCategory();

  const mutation = useCreateCategory();

  const onSubmit = (values: CategoryFormValues) => {
    mutation.mutate(values, { onSuccess: () => onClose() });
  };
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="flex flex-col space-y-4">
        <SheetHeader>
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>
            Create a new category to organize your transactions.
          </SheetDescription>
        </SheetHeader>
        <CategoryForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{ name: "" }}
        />
      </SheetContent>
    </Sheet>
  );
};

export default NewCategorySheet;
