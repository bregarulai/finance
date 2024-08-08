import { useState } from "react";
import {
  AreaChart,
  BarChart3,
  FileSearch,
  LineChart,
  Loader2,
} from "lucide-react";

import { ChartProps, ChartTypes } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AreaVariant from "@/components/dataCharts/AreaVariant";
import BarVariant from "@/components/dataCharts/BarVariant";
import LineVariant from "@/components/dataCharts/LineVariant";
import { chartTypes } from "@/constants";
import { Skeleton } from "@/components/ui/skeleton";

const Chart = ({ data = [] }: ChartProps) => {
  const [chartType, setChartType] = useState<ChartTypes>(chartTypes.AREA);

  const onTypeChange = (type: ChartTypes) => {
    // TODO: Add paywall
    setChartType(type);
  };

  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <CardTitle className="text-xl line-clamp-1">Transactions</CardTitle>
        <Select value={chartType} onValueChange={onTypeChange}>
          <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
            <SelectValue placeholder="Chart Type" />
            <SelectContent>
              <SelectItem value={chartTypes.AREA}>
                <div className="flex items-center">
                  <AreaChart className="size-4 mr-2 shrink-0" />
                  <p className="line-clamp-1">Area chart</p>
                </div>
              </SelectItem>
              <SelectItem value={chartTypes.LINE}>
                <div className="flex items-center">
                  <LineChart className="size-4 mr-2 shrink-0" />
                  <p className="line-clamp-1">Line chart</p>
                </div>
              </SelectItem>
              <SelectItem value={chartTypes.BAR}>
                <div className="flex items-center">
                  <BarChart3 className="size-4 mr-2 shrink-0" />
                  <p className="line-clamp-1">Bar chart</p>
                </div>
              </SelectItem>
            </SelectContent>
          </SelectTrigger>
        </Select>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex flex-col gap-y-4 items-center justify-center h-[350px} w-full">
            <FileSearch className="size-6 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">
              No data for this period
            </p>
          </div>
        ) : (
          <>
            {chartType === chartTypes.LINE && <LineVariant data={data} />}
            {chartType === chartTypes.AREA && <AreaVariant data={data} />}
            {chartType === chartTypes.BAR && <BarVariant data={data} />}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Chart;

export const ChartLoading = () => {
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 lg:w-[120px] w-full" />
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full flex items-center justify-center">
          <Loader2 className="size-6 text-slate-300 animate-spin" />
        </div>
      </CardContent>
    </Card>
  );
};
