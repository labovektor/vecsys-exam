import { createServerActionProcedure } from "zsa";
import { createClient } from "./supabase/server";
import { redirect } from "next/navigation";
import { prisma } from "./get-prisma-client";
import { PublicError } from "../../use-cases/errors";

/**
 * Transforms an error object into a standardized error response format.
 *
 * @param { err } - The error object that contains the message and code.
 * @returns An object containing the error message and code.
 */

function shapeError({ err }: any) {
  const isAllowed = err instanceof PublicError;
  const isDev = process.env.NODE_ENV === "development";

  if (isAllowed || isDev) {
    return {
      code: err.code ?? "UNKNOWN_ERROR",
      message: err.message,
    };
  } else {
    return {
      code: "UNKNOWN_ERROR",
      message: "Oops! Terjadi kesalahan",
    };
  }
}

export const authenticatedAction = createServerActionProcedure()
  .experimental_shapeError(shapeError)
  .handler(async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      redirect("/login");
    }
    return { db: prisma, user: data.user };
  });

export const unauthenticatedAction = createServerActionProcedure()
  .experimental_shapeError(shapeError)
  .handler(async () => {
    return { db: prisma };
  });
