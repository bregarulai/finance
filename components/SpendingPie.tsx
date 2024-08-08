import { useState } from "react";
import { FileSearch, Loader2, PieChart, Radar, Target } from "lucide-react";

import { ChartTypes, SpendingPieProps } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { chartTypes } from "@/constants";
import PieVariant from "./PieVariant";
import RadarVariant from "./RadarVariant";
import RadialVariant from "./RadialVariant";
import { Skeleton } from "./ui/skeleton";

const SpendingPie = ({ data = [] }: SpendingPieProps) => {
  const [chartType, setChartType] = useState<ChartTypes>(chartTypes.PIE);

  const onTypeChange = (type: ChartTypes) => {
    // TODO: Add paywall
    setChartType(type);
  };

  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <CardTitle className="text-xl line-clamp-1">Categories</CardTitle>
        <Select value={chartType} onValueChange={onTypeChange}>
          <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
            <SelectValue placeholder="Chart Type" />
            <SelectContent>
              <SelectItem value={chartTypes.PIE}>
                <div className="flex items-center">
                  <PieChart className="size-4 mr-2 shrink-0" />
                  <p className="line-clamp-1">Pie chart</p>
                </div>
              </SelectItem>
              <SelectItem value={chartTypes.RADAR}>
                <div className="flex items-center">
                  <Radar className="size-4 mr-2 shrink-0" />
                  <p className="line-clamp-1">Radar chart</p>
                </div>
              </SelectItem>
              <SelectItem value={chartTypes.RADIAL}>
                <div className="flex items-center">
                  <Target className="size-4 mr-2 shrink-0" />
                  <p className="line-clamp-1">Radial chart</p>
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
            {chartType === chartTypes.PIE && <PieVariant data={data} />}
            {chartType === chartTypes.RADAR && <RadarVariant data={data} />}
            {chartType === chartTypes.RADIAL && <RadialVariant data={data} />}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SpendingPie;

export const SpendingPieLoading = () => {
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
