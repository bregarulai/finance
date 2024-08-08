"use client";

import { useGetSummary } from "@/features/summary/api/useGetSummary";
import Chart, { ChartLoading } from "@/components/dataCharts/Chart";
import SpendingPie, {
  SpendingPieLoading,
} from "@/components/dataCharts/SpendingPie";

const DataCharts = () => {
  const { data, isLoading } = useGetSummary();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-8">
        <div className="cols-span-1 lg:col-span-3 xl:col-span-4">
          <ChartLoading />
        </div>
        <div className="cols-span-1 lg:col-span-3 xl:col-span-4">
          <SpendingPieLoading />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-8">
      <div className="cols-span-1 lg:col-span-3 xl:col-span-4">
        <Chart data={data?.days} />
      </div>
      <div className="cols-span-1 lg:col-span-3 xl:col-span-4">
        <SpendingPie data={data?.categories} />
      </div>
    </div>
  );
};

export default DataCharts;
