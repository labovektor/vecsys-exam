"use server";

import { authenticatedAction } from "@/lib/safe-actions";
import { examSchema } from "./schema";
import { z } from "zod";
import { NotFoundError } from "../../../use-cases/errors";

export const getAllExamAction = authenticatedAction
  .createServerAction()
  .handler(async ({ ctx }) => {
    const { db, user } = ctx;
    return db.exam.findMany({
      where: {
        userId: user.id,
      },
    });
  });

export const getExamByIdAction = authenticatedAction
  .createServerAction()
  .input(z.object({ id: z.string() }))
  .handler(async ({ input, ctx }) => {
    const { db, user } = ctx;
    return db.exam.findFirst({
      where: {
        id: input.id,
        userId: user.id,
      },
    });
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

    db.exam.update({
      where: {
        id: input.id,
        userId: user.id,
      },
      data: {
        isActive: !currentExam?.isActive,
      },
    });
  });
