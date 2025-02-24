"use client";
import { Button } from "@/components/ui/button";
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
import { FailMode, setFailModeAction } from "../(actions)/setFailModeAction";

const FailureModeForm = () => {
  const [isPending, setIsPending] = useState(false);
  const handleSubmit = async (formData: FormData) => {
    const mode = formData.get("mode") as FailMode;
    console.log(mode);

    setIsPending(true);
    try {
      const res = await setFailModeAction(mode);
      if (res && res.success) {
        toast.success("Success", {
          description: `Datbase mode set to ${mode}.`,
        });
      } else {
        toast.error("Error updating fail mode", { description: res?.error });
      }
    } catch (error) {
      toast.error("Error", {
        description:
          error instanceof Error ? error.message : "Error updating fail mode",
      });
    } finally {
      setIsPending(false);
    }
  };
  return (
    <form action={handleSubmit}>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="framework">Failure mode</Label>
          <Select name="mode" required>
            <SelectTrigger id="framework">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="none">None (Normal operation)</SelectItem>
              <SelectItem value="delayed">
                Delayed (Introduces a 0.5s-2.5s delay to all requests)
              </SelectItem>
              <SelectItem value="error">
                Error (20% of the requests fail)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="!flex !justify-end mt-4">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Setting fail mode..." : "Update"}
        </Button>
      </div>
    </form>
  );
};

export default FailureModeForm;
