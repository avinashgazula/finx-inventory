"use client";
import { logoutAction } from "@/app/(auth)/(actions)/logoutAction";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { DropdownMenuItem } from "./ui/dropdown-menu";

const LogoutItem = () => {
  const router = useRouter();
  const logoutUser = async () => {
    try {
      await logoutAction();
      toast.success("Logged out succesfully");
      router.push("/login");
    } catch (error) {
      console.error(error);
      toast.error("Log out error", {
        description: "Failed to logout. Try again in a bit",
      });
    }
  };

  return (
    <DropdownMenuItem>
      <Button type="submit" variant="link" onClick={logoutUser}>
        <LogOutIcon /> Logout
      </Button>
    </DropdownMenuItem>
  );
};

export default LogoutItem;
