import { User } from "../../Types/interfaces";
import { supabase } from "../supabase-requests";

export const updateQuizUserInfoInDB = async (user: User) => {
  const {
    user_id,
    firstName,
    lastName,
    email,
    phone,
    addressLine1,
    city,
    state,
    country,
    zipCode,
    orderHistory,
  } = user;
  const { data, error } = await supabase
    .from("QuizUsersInfo")
    .update({
      firstName,
      lastName,
      email,
      phone,
      addressLine1,
      city,
      state,
      country,
      zipCode,
      orderHistory,
    })
    .eq("user_id", user_id)
    .select();
  if (error) {
    console.log(error);
    return;
  }
  return data;
};
