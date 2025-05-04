"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const signInWithGoogle = async () => {
  const supabase = await createClient();

  const authCallbackUrl = `${process.env.SITE_URL}/auth/callback`;

  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: authCallbackUrl,
    },
  });

  if (error) {
    throw error;
  }

  redirect(data.url);
};

export const signOut = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }

  redirect("/login");
};
