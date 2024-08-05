import { Loader2 } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useConfirm } from "@/hooks/useConfirm";
import { CategoryFormValues } from "@/types";
import CategoryForm from "./CategoryForm";
import { useGetCategory } from "../api/useGetCategory";
import { useOpenCategory } from "../hooks/useOpenCategory";
import { useEditCategory } from "../api/useEditCategory";
import { useDeleteCategory } from "../api/useDeleteCategory";

const EditCategorySheet = () => {
  const { isOpen, onClose, id } = useOpenCategory();

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this category."
  );

  const categoryQuery = useGetCategory(id);
  const editMutation = useEditCategory(id);
  const deleteMutation = useDeleteCategory(id);

  const isPending = editMutation.isPending || deleteMutation.isPending;
  const isLoading = categoryQuery.isLoading;

  const onSubmit = (values: CategoryFormValues) => {
    editMutation.mutate(values, { onSuccess: () => onClose() });
  };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => onClose(),
      });
    }
  };

  const defaultValues = categoryQuery.data
    ? {
        name: categoryQuery.data.name,
      }
    : { name: "" };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="flex flex-col space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Category</SheetTitle>
            <SheetDescription>Edit an existing category.</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <CategoryForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValues={defaultValues}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditCategorySheet;
