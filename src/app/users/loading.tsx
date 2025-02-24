import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import DataTableFallback from "@/components/ui/table/fallback/data-table-fallback";

const UsersFallback = () => {
  return (
    <Card className="mx-4 lg:w-4/5 overflow-x-scroll">
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-0.5">
            <Skeleton className="h-6 w-[100px]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
      </CardHeader>
      <CardContent className=" overflow-x-scroll">
        <DataTableFallback numColumns={7} numRows={10} numFilterColumns={3} />
      </CardContent>
    </Card>
  );
};

export default UsersFallback;
