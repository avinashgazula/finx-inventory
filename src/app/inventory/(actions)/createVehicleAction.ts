"use server"
import { revalidatePath } from 'next/cache';
import { Vehicle } from "../(vehicles)/models/Vehicle";
import { vehicleSchema } from "../(vehicles)/schemas/VehicleSchema";

export async function createVehicleAction(
    data: Vehicle
): Promise<{
    success: boolean;
    error?: string;
}> {
    try {
        const validatedData = vehicleSchema.parse(data);
        console.log("POST", `${process.env.NEXT_PUBLIC_API_URL}/inventory/vehicle`);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inventory/vehicle`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(validatedData),
        });

        if (!res.ok) {
            return { success: false, error: `Error creating vehicle ${res.statusText}` };
        }
        revalidatePath("/inventory")
        return { success: true };
    } catch (error) {
        console.error("Failed to create vehicle:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to create vehicle",
        };
    }
}