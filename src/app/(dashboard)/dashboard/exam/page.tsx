import { DataTable } from "@/components/table/data-table";
import { buttonVariants } from "@/components/ui/button";
import { getAllExamAction } from "@/features/exam/actions";
import { examColumns } from "@/features/exam/components/columns";
import { cn } from "@/lib/utils";
import { Eye, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const ListExamPage = async () => {
  const [exams, err] = await getAllExamAction();
  return (
    <div>
      <DataTable
        columns={examColumns}
        data={exams ?? []}
        actions={
          <Link
            className={buttonVariants({ variant: "default" })}
            href="/dashboard/exam/new"
          >
            <Plus />
            New Exam
          </Link>
        }
      />
    </div>
  );
};

export default ListExamPage;
