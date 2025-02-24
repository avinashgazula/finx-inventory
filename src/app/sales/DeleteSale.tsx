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
import { deleteSalesAction } from "./(actions)/deleteSaleAction";

const DeleteSale = ({ id }: { id: number }) => {
  const [isPending, setIsPending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteSale = async () => {
    try {
      setIsPending(true);
      const res = await deleteSalesAction(id);
      if (res && res.success) {
        toast.success(`Deleted sale ${id}`);
        setIsOpen(false);
      } else {
        toast.error("Error deleting sale", { description: res?.error });
      }
    } catch (error) {
      toast.error("Error", {
        description:
          error instanceof Error ? error.message : "Error deleting sale",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Sale</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Sale</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the sale? This action cannot be
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
            variant="destructive"
            onClick={handleDeleteSale}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete sale"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteSale;
