import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import DatabaseCardFallback from "./(database)/DatabaseCardFallback";
import ServerCardFallback from "./(server)/ServerCardFallback";

const AdminFallback = () => {
  return (
    <Card className="mx-4 lg:w-3/4 overflow-x-scroll">
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-1">
            <Skeleton className="h-6 w-[200px]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
      </CardHeader>
      <CardContent className=" overflow-x-scroll">
        <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-4">
          <DatabaseCardFallback />
          <ServerCardFallback />
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminFallback;
