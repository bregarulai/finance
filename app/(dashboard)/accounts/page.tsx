"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNewAccount } from "@/features/accounts/hooks/useNewAccount";
import {
  accountsColumns,
  Payment,
} from "@/features/accounts/components/accountCulumns";
import { CustomDataTable } from "@/components/CustomDataTable";

const data: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed67f",
    amount: 100,
    status: "processing",
    email: "a@example2.com",
  },
  // ...
];

const AccountsPage = () => {
  const newAccount = useNewAccount();
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Accounts Page</CardTitle>
          <Button size="sm" onClick={newAccount.onOpen}>
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <CustomDataTable
            filterKey="email"
            data={data}
            columns={accountsColumns}
            onDelete={() => {}}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;
