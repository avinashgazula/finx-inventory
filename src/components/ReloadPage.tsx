"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";

const ReloadPage = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const handleRefresh = () => {
    setIsPending(true);
    try {
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };
  return (
    <Button className="w-fit ml-2" variant="outline" onClick={handleRefresh}>
      {isPending ? "Retrying..." : "Retry"}
    </Button>
  );
};

export default ReloadPage;
