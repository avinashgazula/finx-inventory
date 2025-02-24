import { User } from "@/app/(auth)/models/User";
import { getCurrentUser } from "@/app/(auth)/utils/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import LogoutItem from "./LogoutItem";

const UserAvatar = async () => {
  const user: User | undefined | null = await getCurrentUser();
  return (
    <div className="border-s-black flex flex-row ">
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={user.profile_picture_url}
                  alt="User profile picture avatar"
                />
                <AvatarFallback className="uppercase">
                  {user.first_name.charAt(0)}
                  {user.last_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span>{user.first_name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <LogoutItem />
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {!user && (
        <Button variant="link" asChild>
          <Link href="/login"> Login</Link>
        </Button>
      )}
    </div>
  );
};

export default UserAvatar;
