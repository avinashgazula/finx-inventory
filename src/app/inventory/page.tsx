"use server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { layoutTester } from "@/lib/layout-tester";
import AllVehiclesCard from "./(vehicles)/(card-view)/AllVehiclesCard";
import AllVehiclesTable from "./(vehicles)/(table-view)/AllVehiclesTable";
import AddVehicleButton from "./(vehicles)/AddVehicleButton";

export default async function Inventory(props: {
  searchParams: Promise<Record<string, string>>;
}) {
  await layoutTester(await props.searchParams);

  return (
    <Card className="mx-4">
      <Tabs defaultValue="card">
        <CardHeader>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col gap-0.5">
              <CardTitle>Vehicles</CardTitle>
              <CardDescription>
                Manage and update Vehicle Inventory
              </CardDescription>
            </div>
            <div>
              <AddVehicleButton />

              <TabsList>
                <TabsTrigger value="card">Card View</TabsTrigger>
                <TabsTrigger value="table">Table View</TabsTrigger>
              </TabsList>
            </div>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-scroll">
          <TabsContent value="card">
            <AllVehiclesCard />
          </TabsContent>
          <TabsContent value="table">
            <AllVehiclesTable />{" "}
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
