"use client";

import { useEffect, useState } from "react";
import { InputFilter } from "../../../../components/ui/filters/input-filter";
import { SelectFilter } from "../../../../components/ui/filters/select-filter";
import { Vehicle } from "../models/Vehicle";

export interface FiltersState {
  make: string;
  model: string;
  year: string;
  price_smaller: string;
  price_greater: string;
  condition: string;
}

interface VehicleFiltersProps {
  onFilterChange: (filters: FiltersState) => void;
  data: Vehicle[];
}

export function VehicleFilters({ onFilterChange, data }: VehicleFiltersProps) {
  const [filters, setFilters] = useState<FiltersState>({
    make: "",
    model: "",
    year: "",
    price_smaller: "",
    price_greater: "",
    condition: "",
  });

  const handleFilterChange = (key: keyof FiltersState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const makeOptions = Array.from(
    new Set(data.map((vehicle) => vehicle.make))
  ).sort();
  const modelOptions = Array.from(
    new Set(data.map((vehicle) => vehicle.model))
  ).sort();
  const yearOptions = Array.from(
    new Set(data.map((vehicle) => vehicle.year.toString()))
  ).sort((a, b) => b.localeCompare(a));
  const conditionOptions = Array.from(
    new Set(data.map((vehicle) => vehicle.condition))
  ).sort();

  return (
    <div className="mx-6 mb-2 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <SelectFilter
        label="Make"
        value={filters.make}
        onChange={(value) => handleFilterChange("make", value)}
        options={makeOptions}
        placeholder="Select make"
      />
      <SelectFilter
        label="Model"
        value={filters.model}
        onChange={(value) => handleFilterChange("model", value)}
        options={modelOptions}
        placeholder="Select model"
      />
      <SelectFilter
        label="Year"
        value={filters.year}
        onChange={(value) => handleFilterChange("year", value)}
        options={yearOptions}
        placeholder="Select year"
      />
      <InputFilter
        label="Min Price"
        value={filters.price_smaller}
        onChange={(value) => handleFilterChange("price_smaller", value)}
        placeholder="Min Price"
      />
      <InputFilter
        label="Max Price"
        value={filters.price_greater}
        onChange={(value) => handleFilterChange("price_greater", value)}
        placeholder="Max Price"
      />
      <SelectFilter
        label="Condition"
        value={filters.condition}
        onChange={(value) => handleFilterChange("condition", value)}
        options={conditionOptions}
        placeholder="Select condition"
      />
    </div>
  );
}
