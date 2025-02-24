"use server";

import { User } from "@/app/(auth)/models/User";


export async function getUsersAction(): Promise<{
    success: boolean,
    data?: User[],
    error?: string
}> {
    try {
        const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/users/all`);

        const res = await fetch(url, {
            method: "GET",
            cache: 'force-cache',
            next: {
                revalidate: 60
            }
        });

        if (!res.ok) {
            return { success: false, error: `Failed to retrieve users ${res.statusText}` };
        }

        const data = await res.json();
        return { success: true, data };

    } catch (error) {
        console.error("Failed to fetch users:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to fetch users",
        };
    }
}