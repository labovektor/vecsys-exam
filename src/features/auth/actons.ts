"use server";

import { unauthenticatedAction } from "@/lib/safe-actions";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const loginAction = unauthenticatedAction
  .createServerAction()
  .input(loginSchema)
  .handler(async ({ input }) => {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword(input);
    if (error) {
      throw error;
    }
  });

export const registerAction = unauthenticatedAction
  .createServerAction()
  .input(loginSchema)
  .handler(async ({ input }) => {
    const supabase = await createClient();

    const { error } = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
      options: {
        data: {
          display_name: "Test User",
        },
      },
    });
    if (error) {
      throw error;
    }
  });
