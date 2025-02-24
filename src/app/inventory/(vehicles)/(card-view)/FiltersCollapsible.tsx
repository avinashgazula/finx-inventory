"use client";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Vehicle } from "../models/Vehicle";
import { FiltersState, VehicleFilters } from "./VehicleFilters";

type VoidFunction = (filters: FiltersState) => void;

interface Props {
  handleFiltersChange: VoidFunction;
  vehicles: Vehicle[];
}

const FiltersCollapsible = ({ handleFiltersChange, vehicles }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="border roounded-3xl border-slate-200 space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <CollapsibleTrigger asChild>
          <div className="flex flex-row !justify-between !items-center !w-screen">
            <h4 className="text-sm font-semibold">Filter Vehicles</h4>
            <Button variant="ghost" size="sm">
              <ChevronDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </div>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2 space-x-2">
        <VehicleFilters onFilterChange={handleFiltersChange} data={vehicles} />
      </CollapsibleContent>
    </Collapsible>
  );
};

export default FiltersCollapsible;
