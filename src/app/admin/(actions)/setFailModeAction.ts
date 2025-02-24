"use server";

export type FailMode = "none" | "delayed" | "error";

export async function setFailModeAction(mode: FailMode): Promise<{
    success: boolean,
    error?: string
}> {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/settings/failing?mode=${mode}`;

    const res = await fetch(url, {
        method: "POST"
    });

    if (!res.ok) {
        return {
            success: false,
            error: `Request failed with error ${res.status}`
        }
    }

    return {
        success: true
    }
}