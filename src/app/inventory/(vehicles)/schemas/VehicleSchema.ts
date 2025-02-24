import { z } from "zod";


export const vehicleSchema = z.object({
    make: z.string().min(1, "Make is required"),
    model: z.string().min(1, "Model is required"),
    year: z.coerce.number().min(1900, "Year must be after 1900"),
    price: z.coerce.number().min(0, "Price must be positive"),
    vin: z.string().min(1, "VIN is required"),
    condition: z.enum(["new", "used"]),
    mileage: z.coerce.number().min(0, "Mileage must be positive"),
    status: z.enum(["in-stock", "pending", "sold"]),
    photo_url: z.string().url("Must be a valid URL"),
});
