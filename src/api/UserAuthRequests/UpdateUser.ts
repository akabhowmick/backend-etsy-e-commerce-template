import { supabase } from "../supabase-requests";

export const updateUserSupabase = async (email: string, password: string) => {
  console.log("called in the api", email, password);
  const { data, error } = await supabase.auth.updateUser({
    email: email,
    password: password,
  });
  return { data, error };
};
