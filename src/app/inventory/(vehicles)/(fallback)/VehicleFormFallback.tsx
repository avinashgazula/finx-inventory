import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const VehicleFormFallback = () => {
  return (
    <div className="w-180 pl-2 overflow-scroll">
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="h-4 w-[350px]" />
        </CardHeader>
        <CardContent>
          <form className="space-y-4 g">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
              <div className="!flex !flex-col !gap-2 mb-4">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-8 w-[400px]" />
                <Skeleton className="h-3 w-[250px]" />
              </div>

              <div className="!flex !flex-col !gap-2 mb-4">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-8 w-[400px]" />
                <Skeleton className="h-3 w-[250px]" />
              </div>
              <div className="!flex !flex-col !gap-2 mb-4">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-8 w-[400px]" />
                <Skeleton className="h-3 w-[250px]" />
              </div>
              <div className="!flex !flex-col !gap-2 mb-4">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-8 w-[400px]" />
                <Skeleton className="h-3 w-[250px]" />
              </div>
              <div className="!flex !flex-col !gap-2 mb-4">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-8 w-[400px]" />
                <Skeleton className="h-3 w-[250px]" />
              </div>
              <div className="!flex !flex-col !gap-2 mb-4">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-8 w-[400px]" />
                <Skeleton className="h-3 w-[250px]" />
              </div>
              <div className="!flex !flex-col !gap-2 mb-4">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-8 w-[400px]" />
                <Skeleton className="h-3 w-[250px]" />
              </div>
              <div className="!flex !flex-col !gap-2 mb-4">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-8 w-[400px]" />
                <Skeleton className="h-3 w-[250px]" />
              </div>
              <div className="!flex !flex-col !gap-2 mb-4">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-8 w-[400px]" />
                <Skeleton className="h-3 w-[250px]" />
              </div>
            </div>

            <Skeleton className="h-10 w-[100px]" />
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VehicleFormFallback;
