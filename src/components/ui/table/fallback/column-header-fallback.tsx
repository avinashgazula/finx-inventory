import { Skeleton } from "../../skeleton";

const ColumnHeaderFallback = () => {
  return (
    <div className="flex items-center space-x-2">
      <Skeleton className="-ml-3 h-8 w-8" />
    </div>
  );
};

export default ColumnHeaderFallback;
