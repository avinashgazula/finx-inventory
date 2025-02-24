import ServiceUnavailable from "@/components/ServiceUnavailable";
import { DataTable } from "@/components/ui/table/data-table";
import DataTableFallback from "@/components/ui/table/fallback/data-table-fallback";
import { Suspense } from "react";
import { toast } from "sonner";
import { getSalesAction } from "./(actions)/getSalesAction";
import { Sale } from "./models/Sale";
import { saleColumns } from "./sale-columns";

export const revalidate = 0;

const SalesTable = async () => {
  let sales: Sale[] = [];
  const filterColumns = ["user", "date"];

  try {
    const res = await getSalesAction();
    if (res && res.success) {
      sales = res.data as Sale[];
    } else {
      toast.error("Error", { description: res?.error });
    }
  } catch (error) {
    if (error instanceof Error) {
      return <ServiceUnavailable />;
    }
  }
  return (
    <div>
      <Suspense
        fallback={
          <DataTableFallback numColumns={5} numRows={10} numFilterColumns={2} />
        }
      >
        {sales && sales.length > 0 && (
          <DataTable
            columns={saleColumns}
            data={sales}
            filterColumns={filterColumns}
          ></DataTable>
        )}
        {sales && sales.length === 0 && <p>No Sales available.</p>}
      </Suspense>
    </div>
  );
};

export default SalesTable;
