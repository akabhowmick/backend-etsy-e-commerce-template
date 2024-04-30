import { supabase } from "../supabase-requests";
import Swal from "sweetalert2";

export const deleteUserInfoFromDb = async (userId: number) => {
  const { error } = await supabase.from("UserInfo").delete().eq("user_id", userId);
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Failed to delete user",
    });
    return;
  }
};
