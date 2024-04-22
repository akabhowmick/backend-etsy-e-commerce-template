import { User } from "../../Types/interfaces";
import { supabase } from "../supabase-requests";
import Swal from "sweetalert2";

export const addUserToDB = async (user: User) => {
  const { firstName, lastName, email, phone, userAddress, orderHistory } = user;
  const { data, error } = await supabase
    .from("UserInfo")
    .insert([
      {
        firstName,
        lastName,
        email,
        phone,
        userAddress,
        orderHistory,
      },
    ])
    .select();
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Failed to register new user!",
    });
    return;
  }
  return data;
};
