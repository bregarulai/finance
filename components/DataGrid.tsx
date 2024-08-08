"use client";

import { useSearchParams } from "next/navigation";
import { FaPiggyBank } from "react-icons/fa";

import { formatDateRange } from "@/lib/utils";
import { useGetSummary } from "@/features/summary/api/useGetSummary";
import DataCard from "./DataCard";

const DataGrid = () => {
  const { data } = useGetSummary();

  const params = useSearchParams();
  const to = params.get("to") || undefined;
  const from = params.get("from") || undefined;
  const parsedTo = parseFloat(to!);

  const dateRangeLabel = formatDateRange({ to: parsedTo, from: from });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
      <DataCard
        title="Remaining"
        value={data?.remainingAmount}
        percentageChange={data?.remainingChange}
        icon={FaPiggyBank}
        variant="default"
        dateRange={dateRangeLabel}
      />
    </div>
  );
};

export default DataGrid;