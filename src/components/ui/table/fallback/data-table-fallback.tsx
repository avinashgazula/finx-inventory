import { Skeleton } from "../../skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../table";
import ColumnToggleFallback from "./column-toggle-fallback";
import PaginationFallback from "./pagination-fallback";

const DataTableFallback = ({
  numColumns = 0,
  numRows = 0,
  numFilterColumns = 0,
}) => {
  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 py-4">
        <div className="flex flex-col md:flex-row gap-2">
          {Array.from({ length: numFilterColumns }, (_, i) => (
            <Skeleton key={i} className="h-8 w-[180px]" />
          ))}
        </div>

        <ColumnToggleFallback />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {Array.from({ length: numColumns }, (_, i) => (
                <TableHead key={i} className="w-[100px]">
                  <Skeleton className="h-4 w-[100px]" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: numRows }, (_, i) => (
              <TableRow key={i}>
                {Array.from({ length: numColumns }, (_, j) => (
                  <TableCell key={j}>
                    <Skeleton className="h-4 w-[100px]" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <PaginationFallback />
      </div>
    </>
  );
};

export default DataTableFallback;
