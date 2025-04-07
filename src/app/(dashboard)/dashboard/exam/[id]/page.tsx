import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { getExamByIdAction } from "@/features/exam/actions";
import ExamStatCard from "@/features/exam/components/stat-card";
import ToggleExamStatus from "@/features/exam/forms/ToggleExamStatus";
import { cn } from "@/lib/utils";
import { AlertCircle, Users } from "lucide-react";
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
          <Card>
            <CardHeader>
              {/* Header Section */}
              <section className=" flex space-x-2">
                <h1 className="text-xl font-bold">{exam.title}</h1>{" "}
                <ToggleExamStatus currentActive={exam.isActive} id={id} />
              </section>
            </CardHeader>
            <CardContent className="grid grid-cols-[repeat(auto-fill,minmax(288px,1fr))] gap-3 py-2">
              <ExamStatCard
                className=" bg-yellow-50 text-yellow-600"
                title="Total Participant"
                value={exam.Participant.length}
              />
              <ExamStatCard
                className=" bg-purple-50 text-purple-600"
                title="Participant Submitted"
                value={
                  exam.Participant.filter((participant) => participant.lockedAt)
                    .length
                }
              />
              <ExamStatCard
                className=" bg-green-50 text-green-600"
                title="Total Question"
                href={`/dashboard/exam/${id}/question`}
                value={exam.sections.reduce(
                  (acc, section) => acc + section.questions.length,
                  0
                )}
              />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default ExamDetailPage;
