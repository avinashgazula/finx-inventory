"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { resetDBAction } from "../(actions)/resetDBAction";

const ResetDBButton = () => {
  const [isPending, setIsPending] = useState(false);

  const handleResetDB = async () => {
    setIsPending(true);
    try {
      const res = await resetDBAction();
      if (res && res.success) {
        toast.success("Success", {
          description: "Database reset successfully.",
        });
      } else {
        toast.error("Error resetting database", { description: res?.error });
      }
    } catch (error) {
      toast.error("Error", {
        description:
          error instanceof Error
            ? error.message
            : "Error downloading file. Retry in a bit",
      });
    } finally {
      setIsPending(false);
    }
  };
  return (
    <Button
      className="max-w-fit"
      variant="destructive"
      onClick={handleResetDB}
      disabled={isPending}
    >
      {isPending ? "Resetting DB..." : "Reset Database"}
    </Button>
  );
};

export default ResetDBButton;
