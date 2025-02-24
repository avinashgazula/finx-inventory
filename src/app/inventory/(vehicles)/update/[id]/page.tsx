import { getVehiclesAction } from "@/app/inventory/(actions)/getVehiclesAction";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import VehicleForm from "../../VehicleForm";

interface Props {
  params: Promise<{ id: string }>;
}

const EditVehicle = async ({ params }: Props) => {
  const { id } = await params;
  let vehicle = undefined;

  const res = await getVehiclesAction({ id });
  if (!res?.success) {
    toast.error(
      "Error retrieving current vehicle information, try again later"
    );
    redirect("/inventory");
  }
  if (res?.data) {
    vehicle = res.data[0];
  }

  return (
    <div className="px-1">
      <Breadcrumb className="ml-4 mb-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Finx</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/inventory">Inventory</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Update</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <VehicleForm vehicle={vehicle} />
    </div>
  );
};

export default EditVehicle;
