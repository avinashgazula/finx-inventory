import { layoutTester } from "@/lib/layout-tester";
import VehicleForm from "../VehicleForm";

const AddVehicle = async (props: {
  searchParams: Promise<Record<string, string>>;
}) => {
  await layoutTester(await props.searchParams);
  return <VehicleForm />;
};

export default AddVehicle;
