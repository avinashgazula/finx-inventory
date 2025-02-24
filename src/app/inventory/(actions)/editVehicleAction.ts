"use server"
import { revalidatePath } from 'next/cache';
import { Vehicle } from "../(vehicles)/models/Vehicle";
import { vehicleSchema } from "../(vehicles)/schemas/VehicleSchema";

export async function editVehicleAction(
    id: number,
    data: Vehicle
): Promise<{
    success: boolean;
    error?: string;
}> {
    try {
        const validatedData = vehicleSchema.parse(data);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inventory/vehicle/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(validatedData),
        });

        if (!res.ok) {
            return { success: false, error: `Error updating vehicle ${res.statusText}` };
        }
        revalidatePath("/inventory")
        return { success: true };
    } catch (error) {
        console.error("Failed to update vehicle:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to update vehicle",
        };
    }
}