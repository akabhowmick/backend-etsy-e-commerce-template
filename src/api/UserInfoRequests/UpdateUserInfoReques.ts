import { User } from "../../Types/interfaces";
import { supabase } from "../supabase-requests";
import Swal from "sweetalert2";

export const updateQuizUserInfoInDB = async (user: User) => {
  const { user_id, firstName, lastName, email, phone, userAddress, orderHistory } = user;
  const { data, error } = await supabase
    .from("UserInfo")
    .update({
      firstName,
      lastName,
      email,
      phone,
      userAddress,
      orderHistory,
    })
    .eq("user_id", user_id)
    .select();
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Failed to update user",
    });
    return;
  }
  return data;
};
