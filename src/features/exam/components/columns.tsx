"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ExamSchemaType } from "../schema";
import { beautifyDate } from "@/lib/utils";

export const examColumns: ColumnDef<ExamSchemaType>[] = [
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
    id: "action",
    enableGlobalFilter: false,
    cell: () => null,
    header: "Action",
  },
];
