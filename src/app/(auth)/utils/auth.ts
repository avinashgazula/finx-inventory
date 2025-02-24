import { getUsersAction } from '@/app/users/(actions)/getUsersAction';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { cache } from 'react';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

interface JWTPayload {
    email: string;
}

export const getAuthenticatedUserEmail = cache(async (): Promise<string | null> => {
    const token = (await cookies()).get('token')?.value;

    if (!token) {
        return null;
    }

    try {
        const { payload } = await jwtVerify(token, secret);

        if (typeof payload === 'object' && payload !== null && 'email' in payload) {
            return (payload as unknown as JWTPayload).email;
        } else {
            console.error('Invalid JWT payload: email claim missing or invalid');
            return null;
        }
    } catch (error) {
        console.error('JWT Verification Error:', error);
        return null;
    }
});

export const getCurrentUser = async () => {
    const email = await getAuthenticatedUserEmail();
    const res = await getUsersAction();
    if (res && res.success) {
        const users = res.data!;
        const user = users.find((u) => u.email === email);
        if (user) return user;
        if (email) {
            return {
                id: Math.random(),
                first_name: "",
                last_name: "",
                email,
                role: "sales-rep",
                profile_picture_url: "https://upload.wikimedia.org/wikipedia/en/a/a4/Hide_the_Pain_Harold_%28Andr%C3%A1s_Arat%C3%B3%29.jpg"
            }
        }
    }
    return null;
}


