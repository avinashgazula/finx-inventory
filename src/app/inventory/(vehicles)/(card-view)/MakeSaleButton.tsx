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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { makeSaleAction } from "../../(actions)/makeSaleAction";

const MakeSaleButton = ({
  id,
  onSaleMade,
}: {
  id: number;
  onSaleMade: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selling_price, setSellingPrice] = useState<string | undefined>(
    undefined
  );
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSellingPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSellingPrice(event.target.value as string);
  };

  const handleMakeSale = async () => {
    if (!selling_price) {
      toast.error("Enter selling price to confirm sale");
      return;
    }
    setIsPending(true);

    try {
      const res = await makeSaleAction(id, Number(selling_price).valueOf());
      if (!res?.success) {
        toast.error("Error updating role", { description: res.error });
      } else {
        toast.success(`Vehicle ${id} sold for ${selling_price}`);
        setIsOpen(false);
        onSaleMade();
        router.refresh();
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Error confirming sale, please retry in a bit"
      );
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Make Sale</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] ">
          <DialogHeader>
            <DialogTitle>Enter sale price for the vehicle</DialogTitle>
            <DialogDescription>
              <br />
              <Label htmlFor="selling_price" className="!mt-4">
                Selling Price
              </Label>
              <Input
                onChange={handleSellingPriceChange}
                type="number"
                id="selling_price"
                placeholder="30000"
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={handleMakeSale} disabled={isPending}>
              {isPending ? "Confirming Sale..." : "Make Sale"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MakeSaleButton;
