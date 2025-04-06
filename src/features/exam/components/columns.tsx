"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ExamRes, ExamSchemaType } from "../schema";
import { beautifyDate } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useServerAction } from "zsa-react";
import { deleteExamAction } from "../actions";
import { toast } from "sonner";
import Link from "next/link";

export const examColumns: ColumnDef<ExamRes>[] = [
  { accessorKey: "title", header: "Title" },
  {
    accessorKey: "startTime",
    header: "Start Time",
    enableGlobalFilter: false,
    cell: ({ row }) => beautifyDate(row.getValue("startTime"), "FULL"),
  },
  {
    accessorKey: "endTime",
    header: "End Time",
    enableGlobalFilter: false,
    cell: ({ row }) => beautifyDate(row.getValue("endTime"), "FULL"),
  },
  {
    accessorKey: "duration",
    header: "Duration",
    enableGlobalFilter: false,
    cell: ({ row }) => `${row.getValue("duration")} minutes`,
  },
  {
    accessorKey: "isActive",
    header: "Active",
    enableGlobalFilter: false,
    cell: ({ row }) =>
      row.getValue("isActive") ? (
        <span className=" text-green-700">Yes</span>
      ) : (
        <span className="text-destructive">No</span>
      ),
  },
  {
    id: "action",
    enableGlobalFilter: false,
    cell: ({ row }) => <EventActionColumn exam={row.original} />,
    header: "Action",
  },
];

export function EventActionColumn({ exam }: { exam: ExamRes }) {
  const { execute, isPending } = useServerAction(deleteExamAction, {
    onError: ({ err }) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      toast.success("Exam Deleted");
    },
  });
  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link href={`/dashboard/exam/${exam.id}`}>View Exam details</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(exam.passcode)}
          >
            Copy Exam Passcode
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="text-destructive">
              Delete Exam
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah Kamu Benar-Benar Yakin?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batalkan</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            onClick={() => execute({ id: exam.id })}
          >
            Konfirmasi
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
