import { User } from "@/app/(auth)/models/User";
import { userColumns } from "@/app/users/user-columns";
import ServiceUnavailable from "@/components/ServiceUnavailable";
import { DataTable } from "@/components/ui/table/data-table";
import { Suspense } from "react";
import { toast } from "sonner";
import { getUsersAction } from "../(actions)/getUsersAction";
import UsersTableFallback from "./UsersTableFallback";

const UsersTable = async () => {
  let users: User[] = [];
  const filterColumns = ["first_name", "last_name", "email"];

  try {
    const res = await getUsersAction();
    if (res && res.success) {
      users = res.data as User[];
    } else {
      toast.error("Error", { description: res.error });
    }
  } catch (error) {
    if (error instanceof Error) {
      return <ServiceUnavailable />;
    }
  }

  return (
    <Suspense fallback={<UsersTableFallback />}>
      {users && users.length > 0 && (
        <DataTable
          data={users}
          columns={userColumns}
          filterColumns={filterColumns}
        />
      )}
      {users && users.length === 0 && <p>No users</p>}
    </Suspense>
  );
};

export default UsersTable;
