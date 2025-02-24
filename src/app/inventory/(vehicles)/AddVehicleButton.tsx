"use client";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

const AddVehicleButton = () => {
  const handleAddVehicle = async () => {
    redirect("/inventory/add");
  };
  return (
    <Button onClick={handleAddVehicle} className="mr-5">
      Add Vehicle
    </Button>
  );
};

export default AddVehicleButton;
