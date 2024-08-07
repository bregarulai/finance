import { useOpenAccount } from "@/features/accounts/hooks/useOpenAccount";
import { TransactionAccountColumnProps } from "@/types";

const TransactionAccountColumn = ({
  account,
  accountId,
}: TransactionAccountColumnProps) => {
  const { onOpen: onOpenAccount } = useOpenAccount();

  const onClick = () => {
    onOpenAccount(accountId);
  };

  return (
    <div
      className="flex items-center cursor-pointer hover:underline"
      onClick={onClick}
    >
      {account}
    </div>
  );
};

export default TransactionAccountColumn;
