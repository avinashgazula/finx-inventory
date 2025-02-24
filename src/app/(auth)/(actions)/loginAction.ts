'use server';

import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { UserAuth } from '../models/UserAuth';
import allUsers from "../users.json";


export async function loginAction(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const users: UserAuth[] = allUsers;
    const user = users.find((u) => u.email === email);

    if (!user) {
        return redirect('/login?error=Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password || '');

    if (!passwordMatch) {
        return redirect('/login?error=Invalid credentials');
    }

    try {
        const token = jwt.sign(
            { email: user.email },
            process.env.JWT_SECRET as Secret,
            { expiresIn: '1h' }
        );

        (await cookies()).set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60,
            path: '/',
        });

    } catch (error) {
        console.error('Login error:', error);
        return redirect('/login?error=An error occurred during login.');
    }
    return redirect('/inventory');
}
