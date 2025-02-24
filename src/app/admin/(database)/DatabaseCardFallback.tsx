import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const DatabaseCardFallback = () => {
  return (
    <Card className="">
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-1">
            <Skeleton className="h-6 w-[200px]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-row gap-2">
            <Skeleton className="h-10 w-[100px]" />
            <Skeleton className="h-10 w-[100px]" />
          </div>

          <div className="flex flex-col space-y-1.5">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-6 w-auto" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Skeleton className="h-10 w-[100px]" />
      </CardFooter>
    </Card>
  );
};

export default DatabaseCardFallback;
