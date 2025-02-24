import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Link from "next/link";
import { loginAction } from "../(actions)/loginAction";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const LoginForm = async ({ searchParams }: Props) => {
  const error = (await searchParams)?.error as string | undefined;

  return (
    <Card className="mx-auto max-w-sm">
      {error && <p className="flex justify-center text-red-500">{error}</p>}
      <CardHeader>
        <div className="flex justify-center">
          <Logo />
        </div>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your credentials below to login</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={loginAction} className="grid gap-4">
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
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="*************"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
