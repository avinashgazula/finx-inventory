"use server";
import { getCurrentUser } from '@/app/(auth)/utils/auth';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

export async function makeSaleAction(
    vehicle_id: number,
    selling_price: number
): Promise<{
    success: boolean;
    error?: string;
}> {
    const date = new Date().toISOString().slice(0, 10);

    const currentUser = await getCurrentUser();
    if (!currentUser) {
        toast.error("User not authenticated")
        redirect("/login")
    }
    try {
        const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/sales/sale`);
        url.searchParams.append("user", currentUser.id.toString());
        url.searchParams.append("vehicle", vehicle_id.toString())
        url.searchParams.append("selling_price", selling_price.toString())
        url.searchParams.append("date", date)

        const res = await fetch(url, {
            method: "POST"
        });

        if (!res.ok) {
            return { success: false, error: `Error confirming sale ${res.statusText}` };
        }
        revalidateTag("vehicles");
        revalidateTag("sales");
        return { success: true };
    } catch (error) {
        console.error("Failed to confirm sale:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to confirm sale",
        };
    }
}