import { useState } from "react";

import { ImportCardProps, SelectedColumnsState } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ImportTable from "./ImportTable";

const ImportCard = ({ data, onCancel, onSubmit }: ImportCardProps) => {
  const [setselectedColumns, setSelectedColumns] =
    useState<SelectedColumnsState>({});

  const headers = data[0];
  const body = data.slice(1);

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Import Transaction
          </CardTitle>
          <div className="flex flex-col lg:flex-row gap-2">
            <Button size="sm" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ImportTable
            headers={headers}
            body={body}
            selectedColumns={setselectedColumns}
            onTableHeadSelectChange={() => {}}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportCard;
