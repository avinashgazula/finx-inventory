import { Skeleton } from "@/components/ui/skeleton";
import FiltersCollapsibleFallback from "./FiltersCollapsibleFallback";
import VehicleCardFallback from "./VehicleCardFallback";

const VehiclesFallback = () => {
  return (
    <>
      <div className="my-2">
        <FiltersCollapsibleFallback />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {"abcdefghi".split("").map((_, i) => (
          <VehicleCardFallback key={i} />
        ))}
      </div>
      <div className="flex items-center justify-between mt-4 mx-2">
        <div className="text-sm text-muted-foreground">
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    </>
  );
};

export default VehiclesFallback;
