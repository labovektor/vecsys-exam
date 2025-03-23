import { createServerActionProcedure } from "zsa";
import { createClient } from "./supabase/server";
import { redirect } from "next/navigation";
import { getPrismaClient } from "./get-prisma-client";
import { z } from "zod";

/**
 * Transforms an error object into a standardized error response format.
 *
 * @param error - The error object that contains the message and code.
 * @returns An object containing the error message and code.
 */

function shapeError(error: any) {
  return {
    error: {
      message: error.message,
      code: error.code,
    },
  };
}

export const authenticatedAction = createServerActionProcedure()
  .experimental_shapeError(shapeError)
  .handler(async () => {
    const db = getPrismaClient();
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      redirect("/login");
    }
    return { db, user: data.user };
  });

export const unauthenticatedAction = createServerActionProcedure()
  .experimental_shapeError(shapeError)
  .handler(async () => {
    const db = getPrismaClient();
    return { db };
  });
