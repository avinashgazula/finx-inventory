import { ServerCrash } from "lucide-react";
import ReloadPage from "./ReloadPage";

const ServiceUnavailable = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-2">
        <ServerCrash />
        <h1 className="font-semibold ">
          This section of the app is unavailable
        </h1>
        <ReloadPage />
      </div>
    </div>
  );
};

export default ServiceUnavailable;
