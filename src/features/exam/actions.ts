"use server";

import { authenticatedAction } from "@/lib/safe-actions";
import { examSchema } from "./schema";
import { z } from "zod";
import { NotFoundError } from "../../../use-cases/errors";
import { revalidatePath, unstable_cache } from "next/cache";

export const getAllExamAction = authenticatedAction
  .createServerAction()
  .handler(async ({ ctx }) => {
    const { db, user } = ctx;

    return unstable_cache(
      () =>
        db.exam.findMany({
          where: {
            userId: user.id,
          },
        }),
      ["exams", user.id],
      {
        tags: ["exams"],
      }
    )();
  });

export const getExamByIdAction = authenticatedAction
  .createServerAction()
  .input(z.object({ id: z.string() }))
  .handler(async ({ input, ctx }) => {
    const { db, user } = ctx;
    return unstable_cache(
      () =>
        db.exam.findFirst({
          where: {
            id: input.id,
            userId: user.id,
          },
          include: {
            Participant: true,
            sections: {
              include: { questions: true },
            },
          },
        }),
      [input.id],
      { tags: [input.id] }
    )();
  });

export const createNewExamAction = authenticatedAction
  .createServerAction()
  .input(examSchema)
  .handler(async ({ input, ctx }) => {
    const { db, user } = ctx;

    const exam = db.exam.create({
      data: {
        userId: user.id,
        ...input,
      },
    });

    revalidatePath("/dashboard/exam");

    return exam;
  });

export const toggleExamsStatusAction = authenticatedAction
  .createServerAction()
  .input(z.object({ id: z.string() }))
  .handler(async ({ input, ctx }) => {
    const { db, user } = ctx;

    const currentExam = await db.exam.findFirst({
      where: {
        id: input.id,
        userId: user.id,
      },
      select: {
        isActive: true,
      },
    });

    if (!currentExam) {
      throw new NotFoundError();
    }

    await db.exam.update({
      where: {
        id: input.id,
        userId: user.id,
      },
      data: {
        isActive: !currentExam.isActive,
      },
    });

    revalidatePath("/dashboard/exam");
    return !currentExam.isActive;
  });

export const deleteExamAction = authenticatedAction
  .createServerAction()
  .input(z.object({ id: z.string() }))
  .handler(async ({ input, ctx }) => {
    const { db } = ctx;

    await db.exam.delete({
      where: {
        id: input.id,
      },
    });

    revalidatePath("/dashboard/exam");
  });
