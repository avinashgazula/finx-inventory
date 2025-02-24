"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import { Vehicle } from "../models/Vehicle";
import DeleteVehicleButton from "./DeleteVehicleButton";
import MakeSaleButton from "./MakeSaleButton";
import UpdateVehicleButton from "./UpdateVehicleButton";

interface Props {
  vehicle: Vehicle;
  index: number;
  onDelete: (id: number) => void;
  onSaleMade: () => void;
}

const VehicleCard = ({ vehicle, index, onDelete, onSaleMade }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(id);
    }, 500);
  };

  return (
    <Card
      key={`${vehicle.id}-${vehicle.status}`}
      className={`${isDeleting ? "delete-animation" : ""}`}
    >
      <CardHeader>
        <div className="relative w-full h-[168px]">
          <Image
            loading={index < 9 ? "eager" : "lazy"}
            priority={index < 9 ? true : false}
            src={vehicle.photo_url}
            alt={`${vehicle.make} ${vehicle.model}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL="https://placehold.co/600x400"
          />
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle>{`${vehicle.year}, ${vehicle.make} ${vehicle.model}`}</CardTitle>
        <div className="flex flex-row gap-0.5 py-2">
          <Badge variant={vehicle.condition == "new" ? "default" : "secondary"}>
            {vehicle.condition}
          </Badge>
          <Badge variant={vehicle.status === "sold" ? "secondary" : "outline"}>
            {vehicle.status}
          </Badge>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <div>
            <span className="font-semibold">Mileage:</span>{" "}
            {vehicle.mileage.toLocaleString()} km
          </div>
          <div>
            <span className="font-semibold">VIN:</span> {vehicle.vin}
          </div>
          <div className="col-span-2">
            <span className="font-semibold">Price:</span> {vehicle.price}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col md:flex-row gap-2">
          {vehicle.id && (
            <>
              {vehicle.status !== "sold" && (
                <MakeSaleButton id={vehicle.id} onSaleMade={onSaleMade} />
              )}
              <UpdateVehicleButton id={vehicle.id} />
              {vehicle.status !== "sold" && (
                <DeleteVehicleButton
                  id={vehicle.id}
                  onDelete={() => handleDelete(vehicle.id!)}
                />
              )}
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default VehicleCard;
