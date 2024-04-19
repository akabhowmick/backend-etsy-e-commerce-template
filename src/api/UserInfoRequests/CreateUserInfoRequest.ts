
import { User } from "../../Types/interfaces";
import { supabase } from "../supabase-requests";

export const addUserToDB = async (user: User) => {
  const {
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
    .insert([
      {
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
      },
    ])
    .select();
  if (error) {
    console.log(error);
    return;
  }
  return data;
};
