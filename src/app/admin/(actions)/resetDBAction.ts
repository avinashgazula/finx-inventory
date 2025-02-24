"use server";

import { revalidatePath } from "next/cache";

export async function resetDBAction(): Promise<{
    success: boolean,
    error?: string
}> {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/settings/reset-db`;

    const res = await fetch(url, {
        method: "POST"
    });

    if (!res.ok) {
        return {
            success: false,
            error: `Request failed with error ${res.status}`
        }
    }
    revalidatePath("/inventory")
    revalidatePath("/sales")
    revalidatePath("/users")
    return {
        success: true
    }
}