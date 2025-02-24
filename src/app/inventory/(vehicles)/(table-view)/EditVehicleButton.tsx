"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

const EditVehicleButton = ({ id }: { id: number }) => {
  const router = useRouter();

  const navigateToEditVehicle = () => {
    router.push(`/inventory/update/${id}`);
  };
  return (
    <div>
      <DropdownMenuItem onClick={navigateToEditVehicle}>
        Edit Vehicle Info
      </DropdownMenuItem>
    </div>
  );
};

export default EditVehicleButton;
