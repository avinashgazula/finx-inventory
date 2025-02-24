import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GetDBButton from "./GetDBButton";
import ResetDBButton from "./ResetDBButton";
import UpdateDBForm from "./UpdateDBForm";

const DatabaseCard = () => {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Manage Database</CardTitle>
        <CardDescription>Manage and update database</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-row gap-2">
            <GetDBButton />
            <ResetDBButton />
          </div>

          <UpdateDBForm />
        </div>
      </CardContent>
    </Card>
  );
};

export default DatabaseCard;
