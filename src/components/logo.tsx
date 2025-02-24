import { CarFront } from "lucide-react";

const Logo = () => {
  const title = "Finx Inventory";
  return (
    <div className="flex flex-row items-center gap-1 pl-4">
      <CarFront />
      <h1 className="text-2xl">{title}</h1>
    </div>
  );
};

export default Logo;
