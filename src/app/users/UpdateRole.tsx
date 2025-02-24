"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { User } from "../(auth)/models/User";
import { updateRoleAction } from "./(actions)/updateRoleAction";

const UpdateRole = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | undefined>(
    undefined
  );
  const [isPending, setIsPending] = useState(false);

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
  };

  const handleRoleUpdate = async () => {
    if (!selectedRole) {
      toast.error("Select a role to update");
      return;
    }
    setIsPending(true);

    try {
      const res = await updateRoleAction(user, selectedRole);
      if (!res.success) {
        toast.error("Error updating role", { description: res.error });
      } else {
        toast.success(
          `${user.first_name} ${user.last_name}'s role updated to ${selectedRole}`
        );
        setIsOpen(false);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update role"
      );
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Update Role</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>Select a new role to update to</DialogTitle>
          <DialogDescription>
            <br />
            <Label htmlFor="role" className="!mt-4">
              User Role
            </Label>
            <Select onValueChange={handleRoleChange}>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="sales-rep">Sales rep</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="principal">Principal</SelectItem>
              </SelectContent>
            </Select>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleRoleUpdate} disabled={isPending}>
            {isPending ? "Updating..." : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateRole;
