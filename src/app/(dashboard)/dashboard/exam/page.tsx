import { DataTable } from "@/components/table/data-table";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getAllExamAction } from "@/features/exam/actions";
import { examColumns } from "@/features/exam/components/columns";
import NewExamForm from "@/features/exam/forms/NewExamForm";
import { Plus } from "lucide-react";
import React from "react";

const ListExamPage = async () => {
  const [exams, err] = await getAllExamAction();
  return (
    <div>
      <DataTable
        columns={examColumns}
        data={exams ?? []}
        message={err?.message}
        actions={
          <Dialog>
            <DialogTrigger className={buttonVariants({ variant: "default" })}>
              <Plus /> New Exam
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Exam</DialogTitle>
              </DialogHeader>
              <NewExamForm />
            </DialogContent>
          </Dialog>
        }
      />
    </div>
  );
};

export default ListExamPage;
