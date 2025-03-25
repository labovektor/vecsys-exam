import { z } from "zod";

export const examSchema = z.object({
  title: z.string(),
  description: z.string(),
  passcode: z.string().length(6),
  startTime: z.date({ coerce: true }),
  endTime: z.date({ coerce: true }),
  duration: z.number({ coerce: true }),
});

export type ExamSchemaType = z.infer<typeof examSchema>;
