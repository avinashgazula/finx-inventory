import ServiceUnavailable from "@/components/ServiceUnavailable";
import DataTableFallback from "@/components/ui/table/fallback/data-table-fallback";
import { Suspense } from "react";
import { getVehiclesAction } from "../../(actions)/getVehiclesAction";
import { DataTable } from "../../../../components/ui/table/data-table";
import { Vehicle } from "../models/Vehicle";
import { columns } from "./columns";

export default async function AllVehiclesTable() {
  const filterColumns = ["make", "model", "year"];
  let vehicles: Vehicle[] = [];
  const res = await getVehiclesAction();
  if (res && res.success) {
    vehicles = res.data as Vehicle[];
  } else {
    return <ServiceUnavailable />;
  }
  return (
    <Suspense
      fallback={
        <DataTableFallback numColumns={10} numRows={10} numFilterColumns={3} />
      }
    >
      {vehicles.length > 0 && (
        <DataTable
          columns={columns}
          data={vehicles}
          filterColumns={filterColumns}
        ></DataTable>
      )}
      {vehicles.length === 0 && "No vehicles in inventory"}
    </Suspense>
  );
}
