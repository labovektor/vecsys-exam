import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { getExamByIdAction } from "@/features/exam/actions";
import ToggleExamStatus from "@/features/exam/forms/ToggleExamStatus";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import React from "react";

const ExamDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const [exam, err] = await getExamByIdAction({ id });

  return (
    <div>
      {!exam && err && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{err.message}</AlertDescription>
        </Alert>
      )}
      {exam && (
        <>
          {/* Header Section */}
          <Card>
            <CardHeader>
              <section className=" flex space-x-2">
                <h1 className="text-xl font-bold">{exam.title}</h1>{" "}
                <ToggleExamStatus currentActive={exam.isActive} id={id} />
                {exam.Participant.length}
                {exam.sections.reduce(
                  (acc, cur) => acc + cur.questions.length,
                  0
                )}
              </section>
            </CardHeader>
          </Card>
        </>
      )}
    </div>
  );
};

export default ExamDetailPage;
