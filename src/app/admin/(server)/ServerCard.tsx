import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FailureModeForm from "./FailureModeForm";

const ServerCard = () => {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Manage API Server</CardTitle>
        <CardDescription>Manage the failure mode of the server</CardDescription>
      </CardHeader>
      <CardContent>
        <FailureModeForm />
      </CardContent>
    </Card>
  );
};

export default ServerCard;
