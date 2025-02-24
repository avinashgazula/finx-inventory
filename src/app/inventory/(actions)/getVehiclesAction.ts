"use server";

import { Vehicle } from "../(vehicles)/models/Vehicle";

export async function getVehiclesAction(filters?: unknown): Promise<{
    success: boolean,
    data?: Vehicle[],
    error?: string,
    status?: number
}> {
    try {
        const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/inventory/vehicles`);

        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                    url.searchParams.append(key, value.toString());
                }
            });
        }

        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: {
                revalidate: 0
            }
        });

        if (!res.ok) {
            return { success: false, error: `Failed to retrieve vehicles ${res.statusText}`, status: res.status };
        }

        const data = await res.json();
        console.log(`vehicles ${JSON.stringify(data)}`);

        return { success: true, data };

    } catch (error) {
        console.error("Failed to fetch vehicles:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to fetch vehicles",
        };
    }
}