"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ExamSchemaType } from "../schema";

export const examColumns: ColumnDef<ExamSchemaType>[] = [
  { accessorKey: "title", header: "Title" },
  {
    accessorKey: "startTime",
    header: "Start Time",
    enableGlobalFilter: false,
    cell: ({ row }) =>
      new Date(row.getValue("startTime")).toLocaleString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Jakarta",
        timeZoneName: "short",
        hour12: false,
      }),
  },
  {
    accessorKey: "endTime",
    header: "End Time",
    enableGlobalFilter: false,
    cell: ({ row }) =>
      new Date(row.getValue("endTime")).toLocaleString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Jakarta",
        timeZoneName: "short",
        hour12: false,
      }),
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
