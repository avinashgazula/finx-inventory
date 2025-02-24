import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getCurrentUser } from "../(auth)/utils/auth";
import DatabaseCard from "./(database)/DatabaseCard";
import DatabaseCardFallback from "./(database)/DatabaseCardFallback";
import ServerCard from "./(server)/ServerCard";
import ServerCardFallback from "./(server)/ServerCardFallback";

const Admin = async () => {
  const user = await getCurrentUser();

  if (user && user.role !== "admin") {
    redirect("/");
  }
  return (
    <Card className="mx-4 lg:w-3/4 overflow-x-scroll">
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-0.5">
            <CardTitle>Admin Dashboard</CardTitle>
            <CardDescription>Manage database and server</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className=" overflow-x-scroll">
        <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-4">
          <Suspense fallback={<DatabaseCardFallback />}>
            <DatabaseCard />
          </Suspense>
          <Suspense fallback={<ServerCardFallback />}>
            <ServerCard />
          </Suspense>
        </div>
      </CardContent>
    </Card>
  );
};

export default Admin;
