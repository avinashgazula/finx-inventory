import { Button } from "@/components/ui/button";
import Link from "next/link";

const UpdateVehicleButton = ({ id }: { id: number }) => {
  return (
    <>
      <Button variant="outline" asChild>
        <Link href={`/inventory/update/${id}`}>Update vehicle</Link>
      </Button>
    </>
  );
};

export default UpdateVehicleButton;
