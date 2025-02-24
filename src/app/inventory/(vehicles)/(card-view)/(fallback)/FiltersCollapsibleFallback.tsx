import { Skeleton } from "@/components/ui/skeleton";

const FiltersCollapsibleFallback = () => {
  return (
    <div className="border roounded-3xl border-slate-200 space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4">
        <div className="flex flex-row !justify-between !items-center !w-screen py-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

export default FiltersCollapsibleFallback;
