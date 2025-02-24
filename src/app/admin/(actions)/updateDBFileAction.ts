"use server";

export async function updateDBFileAction(file: File): Promise<{
    success: boolean,
    error?: string
}> {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/settings/db`, {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) {
            return { success: false, error: `Error updating database ${res.statusText}` };
        }

        return { success: true };
    } catch (error) {
        console.error('Database update failed:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to update database',
        };
    }
}
