'use server'



export async function getDBFileAction(): Promise<{
    success: boolean,
    blob?: Blob
    error?: string
}> {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/settings/db`;

        const res = await fetch(url);

        if (!res.ok) {
            return {
                success: false,
                error: `Request failed with error ${res.status}`
            }
        }

        const blob = await res.blob();
        return { success: true, blob };

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error)
            return {
                success: false,
                error: (error as Error).message
            }
        }
        return {
            success: false,
            error: "Failed to download DB file"
        }

    }
}