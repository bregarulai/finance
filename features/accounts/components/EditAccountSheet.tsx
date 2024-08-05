import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import AccountForm from "./AccountForm";
import { FormValues } from "@/types";
import { useCreateAccount } from "../api/useCreateAcount";
import { useOpenAccount } from "../hooks/useOpenAccount";
import { useGetAccount } from "../api/useGetAccount";
import { Loader2 } from "lucide-react";

const EditAccountSheet = () => {
  const { isOpen, onClose, id } = useOpenAccount();

  const accountQuery = useGetAccount(id);

  const mutation = useCreateAccount();

  const isLoading = accountQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, { onSuccess: () => onClose() });
  };

  const defaultValues = accountQuery.data
    ? {
        name: accountQuery.data.name,
      }
    : { name: "" };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="flex flex-col space-y-4">
        <SheetHeader>
          <SheetTitle>Edit Account</SheetTitle>
          <SheetDescription>Edit an existing account.</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <AccountForm
            id={id}
            onSubmit={onSubmit}
            disabled={mutation.isPending}
            defaultValues={defaultValues}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default EditAccountSheet;
