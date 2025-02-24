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
import { useState } from "react";
import { toast } from "sonner";
import { deleteVehicleAction } from "../../(actions)/deleteVehicleAction";

const DeleteVehicleButton = ({
  id,
  onDelete,
}: {
  id: number;
  onDelete: () => void;
}) => {
  const [isPending, setIsPending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleDelete = async () => {
    try {
      setIsPending(true);
      const res = await deleteVehicleAction(id);
      if (res && res.success) {
        onDelete();
        setIsOpen(false);
        toast.success("Vehicle deleted successfully");
      } else {
        toast.error("Error", { description: res?.error });
      }
    } catch (error) {
      toast.error("Error", {
        description:
          error instanceof Error ? error.message : "Error deleting vehicle",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive">Delete Vehicle</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Sale</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the vehicle? This action cannot be
              undone
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                No
              </Button>
            </DialogClose>
            <Button
              onClick={handleDelete}
              disabled={isPending}
              variant="destructive"
            >
              {isPending ? "Deleting..." : "Delete vehicle"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteVehicleButton;
