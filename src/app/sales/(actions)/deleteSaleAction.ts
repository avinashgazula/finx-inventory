"use server";

import { revalidatePath } from "next/cache";

export async function deleteSalesAction(id: number): Promise<{
    success: boolean,
    error?: string
}> {
    try {
        const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/sales/sale/${id}`);

        const res = await fetch(url, {
            method: "DELETE",
        });

        if (!res.ok) {
            return { success: false, error: `Failed to delete sale ${res.status} ${res.statusText}` };
        }
        revalidatePath("/sales")
        return { success: true };

    } catch (error) {
        console.error("Failed to delete sale:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to delete sale",
        };
    }
}