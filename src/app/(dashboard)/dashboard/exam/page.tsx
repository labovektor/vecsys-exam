import { getAllExamAction } from "@/features/exam/actions";
import React from "react";

const ListExamPage = async () => {
  const [exams, err] = await getAllExamAction();
  return (
    <div>
      <ul>
        {exams?.map((exam) => (
          <li key={exam.id}>{exam.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListExamPage;
