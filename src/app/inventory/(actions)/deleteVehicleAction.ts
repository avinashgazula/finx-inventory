"use server"

import { revalidatePath } from "next/cache";

export async function deleteVehicleAction(
    id: number,
): Promise<{
    success: boolean;
    error?: string;
}> {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inventory/vehicle/${id}`, {
            method: "DELETE",
        });

        if (!res.ok) {
            return { success: false, error: `Error deleting vehicle ${res.statusText}` };
        }
        revalidatePath("/inventory")
        return { success: true };
    } catch (error) {
        console.error("Failed to delete vehicle:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to delete vehicle",
        };
    }
}