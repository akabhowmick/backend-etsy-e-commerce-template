import { supabase } from "../supabase-requests";
import Swal from "sweetalert2";

export const getSingleUserInfoFromDB = async (userId: string) => {
  const { data, error } = await supabase
    .from("UserInfo")
    .select("*")
    .eq("user_id", userId);
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Failed to get user",
    });
    return;
  }
  return data;
};
