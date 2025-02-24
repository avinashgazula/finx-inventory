"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "sonner";
import { updateDBFileAction } from "../(actions)/updateDBFileAction";

const UpdateDBForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.name.endsWith(".db")) {
        toast.error("Please select a .db file");
        event.target.value = "";
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }

    setIsPending(true);
    try {
      const result = await updateDBFileAction(selectedFile);

      if (!result.success) {
        throw new Error(result.error);
      }

      toast.success("Database updated successfully");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setSelectedFile(null);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update database"
      );
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="file">Update DB File</Label>
        <Input
          ref={fileInputRef}
          id="file"
          name="file"
          type="file"
          accept=".db"
          onChange={handleFileChange}
          disabled={isPending}
          placeholder="Upload sqlite .db file"
        />
      </div>
      <div className="flex justify-end">
        <Button onClick={handleUpload} disabled={!selectedFile || isPending}>
          {isPending ? "Uploading..." : "Update"}
        </Button>
      </div>
      {selectedFile && (
        <p className="text-sm text-slate-500">
          Selected file: {selectedFile.name} (
          {(selectedFile.size / 1024).toFixed(2)} KB)
        </p>
      )}
    </div>
  );
};

export default UpdateDBForm;
