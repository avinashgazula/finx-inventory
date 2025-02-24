import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import VehiclesFallback from "./(vehicles)/(card-view)/(fallback)/VehiclesFallback";

const InventoryFallback = () => {
  return (
    <Card className="mx-4">
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-0.5">
            <Skeleton className="h-6 w-[100px]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <Skeleton className="h-10 w-[100px]" />
            <Skeleton className="h-10 w-[200px]" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-scroll">
        <VehiclesFallback />
      </CardContent>
    </Card>
  );
};

export default InventoryFallback;
