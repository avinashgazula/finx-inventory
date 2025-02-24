import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const VehicleCardFallback = () => {
  return (
    <Card>
      <CardHeader>
        <div className="relative w-full h-[168px]">
          <Skeleton className="h-[200px] w-[400px]" />
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="mt-6">
          <Skeleton className=" h-4 w-[100px]" />
        </CardTitle>
        <div className="flex flex-row gap-0.5 py-2">
          <Skeleton className="h-3 w-[40px]" />
          <Skeleton className="h-3 w-[40px]" />
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <Skeleton className="h-3 w-[150px]" />
          <Skeleton className="h-3 w-[150px]" />
          <div className="col-span-2">
            <Skeleton className="h-3 w-[150px]" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-row gap-2">
          <Skeleton className="h-10 w-[100px]" />
          <Skeleton className="h-10 w-[100px]" />
          <Skeleton className="h-10 w-[100px]" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default VehicleCardFallback;
