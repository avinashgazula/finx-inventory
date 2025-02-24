import { User } from "@/app/(auth)/models/User";
import { Vehicle } from "@/app/inventory/(vehicles)/models/Vehicle";

export interface Sale {
  id: number;
  sales_rep: User;
  vehicle: Vehicle;
  selling_price: string;
  date: string;
}
