import { UserInfo } from "../../Types/interfaces";
import { ordersToString } from "../../utils/HelperFunctions";
import { supabase } from "../supabase-requests";
import Swal from "sweetalert2";

export const updateUserInfoInDB = async (user: UserInfo) => {
  const { user_id, firstName, lastName, email, phone, userAddress, orderHistory } = user;
  const stringAddress = JSON.stringify(userAddress);
  const stringOrders = ordersToString(orderHistory);
  const { data, error } = await supabase
    .from("UserInfo")
    .update({
      firstName,
      lastName,
      email,
      phone,
      userAddress: stringAddress,
      orderHistory: stringOrders,
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
