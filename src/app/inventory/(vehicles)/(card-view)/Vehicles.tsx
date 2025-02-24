"use client";
import { GridPagination } from "@/components/ui/grid-pagination";
import { useState } from "react";
import { Vehicle } from "../models/Vehicle";
import FiltersCollapsible from "./FiltersCollapsible";
import VehicleCard from "./VehicleCard";
import { FiltersState } from "./VehicleFilters";

interface Props {
  vehicles: Vehicle[];
}

const PAGE_SIZE = 9;

const Vehicles = ({ vehicles: initialVehicles }: Props) => {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeleteVehicle = (id: number) => {
    setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedVehicles = vehicles.slice(startIndex, startIndex + PAGE_SIZE);

  const handleFilterChange = (newFilters: FiltersState) => {
    setFilters(newFilters);
    console.log(filters);
    setCurrentPage(1);
  };

  const handleSaleMade = (vehicleId: number) => {
    setVehicles((prevVehicles) => {
      return prevVehicles.map((vehicle) => {
        if (vehicle.id === vehicleId) {
          return { ...vehicle, status: "sold" };
        }
        return vehicle;
      });
    });
  };

  return (
    <>
      <div className="my-2">
        <FiltersCollapsible
          handleFiltersChange={handleFilterChange}
          vehicles={vehicles}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {paginatedVehicles.map((vehicle, index) => (
          <VehicleCard
            onSaleMade={() => handleSaleMade(vehicle.id!)}
            vehicle={vehicle}
            index={index}
            key={vehicle.id}
            onDelete={handleDeleteVehicle}
          />
        ))}
      </div>
      <div className="flex items-center justify-between mt-4 mx-2">
        <div className="text-sm text-muted-foreground">
          Showing{" "}
          <strong>
            {startIndex + 1}-{Math.min(startIndex + PAGE_SIZE, vehicles.length)}
          </strong>{" "}
          of <strong>{vehicles.length}</strong> vehicles
        </div>
        <GridPagination
          currentPage={currentPage}
          totalItems={vehicles.length}
          pageSize={PAGE_SIZE}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default Vehicles;
