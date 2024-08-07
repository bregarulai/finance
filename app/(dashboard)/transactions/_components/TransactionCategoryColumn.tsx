import { TriangleAlert } from "lucide-react";

import { useOpenCategory } from "@/features/categories/hooks/useOpenCategory";
import { TransactionCategoryColumnProps } from "@/types";
import { cn } from "@/lib/utils";
import { useOpenTransaction } from "@/features/transactions/hooks/useOpenTransaction";

const TransactionCategoryColumn = ({
  id,
  category,
  categoryId,
}: TransactionCategoryColumnProps) => {
  const { onOpen: onOpenCategory } = useOpenCategory();
  const { onOpen: onOpenTransaction } = useOpenTransaction();

  const onClick = () => {
    if (categoryId) {
      onOpenCategory(categoryId);
    } else {
      onOpenTransaction(id);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center cursor-pointer hover:underline",
        !category && "text-rose-500"
      )}
      onClick={onClick}
    >
      {!category && <TriangleAlert className="size-4 mr-2 shrink-0" />}
      {category || "Uncategorized"}
    </div>
  );
};

export default TransactionCategoryColumn;
