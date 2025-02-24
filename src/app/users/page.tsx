import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DataTableFallback from "@/components/ui/table/fallback/data-table-fallback";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getCurrentUser } from "../(auth)/utils/auth";
import UsersTable from "./(table)/UsersTable";

const Users = async () => {
  const user = await getCurrentUser();

  if (user && (user.role === "sales-rep" || user.role === "manager")) {
    redirect("/");
  }
  return (
    <Card className="mx-4 lg:w-4/5 overflow-x-scroll">
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-0.5">
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage user roles</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className=" overflow-x-scroll">
        <Suspense
          fallback={
            <DataTableFallback
              numColumns={7}
              numRows={10}
              numFilterColumns={3}
            />
          }
        >
          <UsersTable />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default Users;
