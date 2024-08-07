"use client";

import { Loader2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNewTransaction } from "@/features/transactions/hooks/useNewTransaction";
import { useGetTransactions } from "@/features/transactions/api/useGetTransactions";
import { useBulkDeleteTransactions } from "@/features/transactions/api/useBulkDeleteTransactions";
import { CustomDataTable } from "@/components/CustomDataTable";
import { Skeleton } from "@/components/ui/skeleton";
import { transactionsColumns } from "@/features/transactions/components/transactionsColumns";

const TransactionsPage = () => {
  const newTransaction = useNewTransaction();
  const transactionsQuery = useGetTransactions();
  const deleteTransactions = useBulkDeleteTransactions();

  const transactions = transactionsQuery.data || [];

  const isDisabled =
    transactionsQuery.isLoading || deleteTransactions.isPending;

  if (transactionsQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48 animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 animate-spin text-slate-300" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Transactions History
          </CardTitle>
          <Button size="sm" onClick={newTransaction.onOpen}>
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <CustomDataTable
            filterKey="payee"
            data={transactions}
            columns={transactionsColumns}
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteTransactions.mutate({ ids });
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsPage;
