"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import React from "react";
import { useServerAction } from "zsa-react";
import { toggleExamsStatusAction } from "../actions";
import { toast } from "sonner";

const ToggleExamStatus = ({
  currentActive,
  id,
}: {
  currentActive: boolean;
  id: string;
}) => {
  const {
    data: isActive,
    execute,
    isPending,
    setOptimistic,
  } = useServerAction(toggleExamsStatusAction, {
    initialData: currentActive,
    onSuccess: () => {
      toast.success("Status Updated");
    },
    onError: ({ err }) => {
      toast.error(err.message);
    },
  });
  return (
    <div
      className={cn(
        "flex items-center space-x-2 py-2 px-3 rounded-full",
        isActive ? "bg-primary-foreground" : "bg-muted"
      )}
    >
      <Switch
        id="exam-status"
        checked={isActive}
        disabled={isPending}
        onCheckedChange={() => {
          setOptimistic(!isActive);
          execute({ id });
        }}
      />
      <Label htmlFor="exam-status">{isActive ? "Active" : "Inactive"}</Label>
    </div>
  );
};

export default ToggleExamStatus;
