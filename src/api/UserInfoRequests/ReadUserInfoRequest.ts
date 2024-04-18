import { supabase } from "../supabase-requests";

export const getSingleQuizUserInfoFromDB = async (userId: string) => {
  const { data, error } = await supabase
    .from("QuizUsersInfo")
    .select("*")
    .eq("user_id", userId);
  if (error) {
    console.log(error);
    return;
  }
  return data;
};
