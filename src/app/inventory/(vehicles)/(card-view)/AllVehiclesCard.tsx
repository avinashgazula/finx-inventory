import ServiceUnavailable from "@/components/ServiceUnavailable";
import { Suspense } from "react";
import { getVehiclesAction } from "../../(actions)/getVehiclesAction";
import { Vehicle } from "../models/Vehicle";
import VehiclesFallback from "./(fallback)/VehiclesFallback";
import Vehicles from "./Vehicles";

export const revalidate = 60;

export default async function AllVehiclesCard() {
  let vehicles: Vehicle[] = [];
  const res = await getVehiclesAction();
  if (res && res.success) {
    vehicles = res.data as Vehicle[];
  } else {
    return <ServiceUnavailable />;
  }
  return (
    <Suspense fallback={<VehiclesFallback />}>
      {vehicles.length > 0 && <Vehicles vehicles={vehicles} />}
      {vehicles.length === 0 && "No vehicles in inventory"}
    </Suspense>
  );
}
