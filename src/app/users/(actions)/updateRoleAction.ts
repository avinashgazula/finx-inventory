"use server"
import { User } from '@/app/(auth)/models/User';
import { revalidatePath } from 'next/cache';

export async function updateRoleAction(
    user: User,
    role: string
): Promise<{
    success: boolean;
    error?: string;
}> {
    try {
        console.log("PUT ", `${process.env.NEXT_PUBLIC_API_URL}/users/user/${user.id}`);
        console.log(role);


        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/user/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role
            }),
        });

        if (!res.ok) {
            return { success: false, error: `Error updating role ${res.statusText}` };
        }
        revalidatePath("/")
        revalidatePath("/users")
        return { success: true };
    } catch (error) {
        console.error("Failed to update role:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to update role",
        };
    }
}