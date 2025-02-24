'use server';

import bcrypt from 'bcrypt';
import { promises as fs } from "fs";
import { revalidatePath } from 'next/cache';
import path from "path";
import { fileURLToPath } from 'url';
import { User } from '../models/User';
import { UserAuth } from '../models/UserAuth';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export async function registerAction(formData: FormData) {
    console.log(__dirname);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const filePath = path.join(__dirname, "..", "users.json");
        const filePath2 = path.join(__dirname, "..", "user-roles.json");

        let existingUsers: UserAuth[] = [];
        let existingUserRoles: User[] = []

        try {
            const fileContent = await fs.readFile(filePath, "utf-8");
            existingUsers = JSON.parse(fileContent);
            const fileContent2 = await fs.readFile(filePath2, "utf-8");
            existingUserRoles = JSON.parse(fileContent2)
        } catch (error: unknown) {
            console.error("Error reading users.json:", error);
            return { success: "false", message: "error reading file" }
        }
        const newUser: UserAuth = {
            email, password: hashedPassword
        }
        const newUserRole: User = {
            id: Math.random(),
            first_name: formData.get('first_name') as string,
            last_name: formData.get('last_name') as string,
            email,
            role: "sales-rep",
            profile_picture_url: "https://upload.wikimedia.org/wikipedia/en/a/a4/Hide_the_Pain_Harold_%28Andr%C3%A1s_Arat%C3%B3%29.jpg"
        }
        existingUsers.push(newUser);
        existingUserRoles.push(newUserRole)
        await fs.writeFile(filePath, JSON.stringify(existingUsers, null, 2), "utf-8");
        await fs.writeFile(filePath2, JSON.stringify(existingUserRoles, null, 2), "utf-8");

        revalidatePath("/");
        return { success: true, message: "Registered successfully" }

    } catch (error: unknown) {
        console.error("Error adding user:", error);
        return { success: false, message: "error adding user" }

    }

}
