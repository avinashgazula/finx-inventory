import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../(auth)/utils/auth";
import SalesTable from "./SalesTable";

export const dynamic = "force-dynamic";

const Sales = async () => {
  await cookies();
  const user = await getCurrentUser();

  if (user && user.role === "sales-rep") {
    redirect("/");
  }
  return (
    <Card className="mx-4 lg:w-3/4 overflow-x-scroll  ">
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-0.5">
            <CardTitle>Sales</CardTitle>
            <CardDescription>Manage all vehicle sales</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className=" overflow-x-scroll">
        <SalesTable />
      </CardContent>
    </Card>
  );
};

export default Sales;
