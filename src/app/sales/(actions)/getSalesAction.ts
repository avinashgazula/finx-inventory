"use server";

import { Sale } from "../models/Sale";


export async function getSalesAction(): Promise<{
    success: boolean,
    data?: Sale[],
    error?: string
}> {
    try {
        const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/sales/all`);

        const res = await fetch(url, {
            method: "GET",
            next: {
                revalidate: 0
            }
        });

        if (!res.ok) {
            return { success: false, error: `Failed to retrieve sales ${res.statusText}` };
        }

        const data = await res.json();
        console.log(`sales ${JSON.stringify(data)}`);

        return { success: true, data };

    } catch (error) {
        console.error("Failed to fetch sales:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to fetch sales",
        };
    }
}