"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { getDBFileAction } from "../(actions)/getDBFileAction";

const GetDBButton = () => {
  const [isPending, setIsPending] = useState(false);

  const handleDownload = async () => {
    setIsPending(true);

    try {
      const res = await getDBFileAction();

      if (!res.success || !res.blob) {
        toast.error("Download failed", {
          description: res.error,
        });
      }
      const blobUrl = window.URL.createObjectURL(res.blob as Blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "inventory.db";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);

      toast.success("Success", {
        description: "Download completed successfully!",
      });
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Download failed", {
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
      variant="outline"
      onClick={handleDownload}
      disabled={isPending}
    >
      {isPending ? "Downloading..." : "Download DB file"}
    </Button>
  );
};

export default GetDBButton;
