import DataCharts from "@/components/dataCharts/DataCharts";
import DataGrid from "@/components/dataGrid/DataGrid";

const DashboardPage = () => {
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <DataGrid />
      <DataCharts />
    </div>
  );
};

export default DashboardPage;
