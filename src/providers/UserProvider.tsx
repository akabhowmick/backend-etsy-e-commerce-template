/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState, createContext, useContext, ReactNode, useCallback } from "react";
import { v4 } from "uuid";
import { User } from "../Types/interfaces";
import { initialUserValues } from "../utils/HelpfulText";
import { getSingleUserInfoFromDB } from "../api/UserInfoRequests/ReadUserInfoRequest";
import { updateUserInfoInDB } from "../api/UserInfoRequests/UpdateUserInfoRequest";
import { stringToOrder } from "../utils/HelperFunctions";

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  orderUser: User;
  setOrderUser: React.Dispatch<React.SetStateAction<User>>;
  getUserFromLocalStorage: () => Promise<void>;
  order: string;
  updateUserInfoThroughAccount: (saveToProfile: boolean) => Promise<void>;
}
const UserContext = createContext({} as UserContextType);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  //! should rename this to account user info
  const [user, setUser] = useState<User>({ ...initialUserValues });
  const [orderUser, setOrderUser] = useState<User>({ ...initialUserValues });
  const [order, setOrder] = useState("");

  const getUserFromLocalStorage = useCallback(async () => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      const potentialUser = await getSingleUserInfoFromDB(JSON.parse(localUser).id);
      if (potentialUser) {
        const orderStringToArray = potentialUser[0].orderHistory?.map((order: string) => {
          return stringToOrder(order);
        });
        setUser({
          ...potentialUser[0],
          userAddress: JSON.parse(potentialUser[0].userAddress) || "",
          orderHistory: orderStringToArray || [],
        });
      }
    }
  }, [setUser]);

  const updateUserInfoThroughAccount = async (saveToProfile: boolean) => {
    if (saveToProfile) {
      updateUserInfoInDB(user);
    }
  };

  useEffect(() => {
    getUserFromLocalStorage();
  }, [getUserFromLocalStorage]);

  useEffect(() => {
    setOrder(v4());
  }, []);

  return (
    <UserContext.Provider
      value={{
        getUserFromLocalStorage,
        user,
        setUser,
        order,
        updateUserInfoThroughAccount,
        orderUser,
        setOrderUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
