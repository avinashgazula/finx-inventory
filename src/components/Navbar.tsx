import { getCurrentUser } from "@/app/(auth)/utils/auth";
import { Menu } from "lucide-react";
import Link from "next/link";
import Logo from "./logo";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import UserAvatar from "./UserAvatar";

const Navbar = async () => {
  const user = await getCurrentUser();
  return (
    <div className="flex flex-col md:flex-row justify-between items-center">
      <Logo />
      <nav className="flex flex-col md:flex-row pr-4 items-center">
        <div className="sm:visible md:invisible">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className=" h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <nav className="flex flex-col pr-4 items-center">
                <Button variant="link" asChild>
                  <Link prefetch={true} href="/inventory">
                    Inventory
                  </Link>
                </Button>
                {user && user.role !== "sales-rep" && (
                  <Button variant="link" asChild>
                    <Link href="/sales"> Sales</Link>
                  </Button>
                )}
                {user &&
                  user.role !== "sales-rep" &&
                  user.role !== "manager" && (
                    <Button variant="link" asChild>
                      <Link prefetch={true} href="/users">
                        {" "}
                        Users
                      </Link>
                    </Button>
                  )}
                {user && user.role === "admin" && (
                  <Button variant="link" asChild>
                    <Link href="/admin"> Admin</Link>
                  </Button>
                )}

                {!user && (
                  <Button variant="link" asChild>
                    <Link href="/login"> Login</Link>
                  </Button>
                )}
                {user && <UserAvatar />}
              </nav>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex !flex-row collapse md:visible">
          <Button variant="link" asChild>
            <Link prefetch={true} href="/inventory">
              Inventory
            </Link>
          </Button>
          {user && user.role !== "sales-rep" && (
            <Button variant="link" asChild>
              <Link href="/sales"> Sales</Link>
            </Button>
          )}
          {user && user.role !== "sales-rep" && user.role !== "manager" && (
            <Button variant="link" asChild>
              <Link prefetch={true} href="/users">
                {" "}
                Users
              </Link>
            </Button>
          )}
          {user && user.role === "admin" && (
            <Button variant="link" asChild>
              <Link href="/admin"> Admin</Link>
            </Button>
          )}
          {/* {user && <UserAvatar />} */}
          {!user && (
            <Button variant="link" asChild>
              <Link href="/login"> Login</Link>
            </Button>
          )}
          {user && <UserAvatar />}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
