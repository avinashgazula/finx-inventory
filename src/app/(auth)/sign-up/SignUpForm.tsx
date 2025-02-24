"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { toast } from "sonner";
import { registerAction } from "../(actions)/registerAction";

const SignUpForm = () => {
  const router = useRouter();
  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const status = await registerAction(formData);

      if (status.success) {
        toast.success("User created successfully! Login to continue");

        router.push("/login");
      } else {
        toast.error("Error creating account! Retry in a bit");
      }
    });
  };
  return (
    <form action={handleSubmit}>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="first-name">First name</Label>
            <Input
              name="first_name"
              id="first-name"
              placeholder="John"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="last-name">Last name</Label>
            <Input name="last_name" id="last-name" placeholder="Doe" required />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john.doe@gmail.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="*************"
          />
        </div>
        <Button type="submit" className="w-full">
          Create an account
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Sign in
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;
