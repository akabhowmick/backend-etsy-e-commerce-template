import { UserInfo } from "../../Types/interfaces";
import { supabase } from "../supabase-requests";
import Swal from "sweetalert2";

export const addUserToDB = async (user: UserInfo) => {
  const { user_id, email } = user;
  const { data, error } = await supabase
    .from("UserInfo")
    .insert([
      {
        user_id,
        email,
      },
    ])
    .select();
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
    return;
  }
  return data;
};
