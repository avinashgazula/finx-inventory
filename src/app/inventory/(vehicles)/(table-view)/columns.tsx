"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import DeleteVehicleButton from "../(card-view)/DeleteVehicleButton";
import UpdateVehicleButton from "../(card-view)/UpdateVehicleButton";
import { DataTableColumnHeader } from "../../../../components/ui/table/column-header";
import { Vehicle } from "../models/Vehicle";

export const columns: ColumnDef<Vehicle>[] = [
  {
    accessorKey: "photo_url",
    header: "Image",
    cell: ({ row }) => {
      return (
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="28"
          src={row.getValue("photo_url")}
          width="28"
        />
      );
    },
  },
  {
    accessorKey: "make",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Make
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "model",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Model
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "year",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Year
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "CAD",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "vin",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          VIN
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "condition",
    header: "Condition",
  },
  {
    accessorKey: "mileage",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mileage
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return <Badge variant="outline">{row.getValue("status")}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const vehicle = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {vehicle.id && (
              <>
                {vehicle.status !== "sold" && (
                  <DropdownMenuItem>
                    {/* <MakeSaleButton id={vehicle.id} /> */}
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  <UpdateVehicleButton id={vehicle.id} />
                </DropdownMenuItem>
                {vehicle.status !== "sold" && (
                  <DropdownMenuItem>
                    <DeleteVehicleButton
                      id={vehicle.id}
                      onDelete={() => () => {}}
                    />
                  </DropdownMenuItem>
                )}
              </>
            )}
            {/* {vehicle.id && (
              <>
                <DropdownMenuItem>
                  <EditVehicleButton id={vehicle.id} />
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <DeleteVehicleButton id={vehicle.id} onDelete={() => {}} />
                </DropdownMenuItem>
              </>
            )} */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
