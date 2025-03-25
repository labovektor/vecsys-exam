"use server";

import { unauthenticatedAction } from "@/lib/safe-actions";
import { createClient } from "@/lib/supabase/server";
import { loginSchema, registerSchema } from "./schema";
import { PublicError } from "../../../use-cases/errors";
import { redirect } from "next/navigation";

export const loginAction = unauthenticatedAction
  .createServerAction()
  .input(loginSchema)
  .handler(async ({ input }) => {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword(input);
    if (error) {
      throw new PublicError(error.message, error.code);
    } else {
      redirect("/dashboard");
    }
  });

export const registerAction = unauthenticatedAction
  .createServerAction()
  .input(registerSchema)
  .handler(async ({ input }) => {
    const supabase = await createClient();

    const { error } = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
      options: {
        data: {
          display_name: input.name,
        },
      },
    });
    if (error) {
      throw error;
    }
  });
