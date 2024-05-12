/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState, createContext, useContext, ReactNode, useCallback } from "react";
import { v4 } from "uuid";
import { UserInfo } from "../Types/interfaces";
import { initialUserValues } from "../utils/HelpfulText";
import { getSingleUserInfoFromDB } from "../api/UserInfoRequests/ReadUserInfoRequest";
import { updateUserInfoInDB } from "../api/UserInfoRequests/UpdateUserInfoRequest";
import { stringToOrder } from "../utils/HelperFunctions";

interface UserContextType {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  orderUser: UserInfo;
  setOrderUser: React.Dispatch<React.SetStateAction<UserInfo>>;
  getUserFromLocalStorage: () => Promise<void>;
  order: string;
  updateUserInfoThroughAccount: (saveToProfile: boolean) => Promise<void>;
}
const UserContext = createContext({} as UserContextType);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  //! should rename this to account user info
  const [userInfo, setUserInfo] = useState<UserInfo>({ ...initialUserValues });
  const [orderUser, setOrderUser] = useState<UserInfo>({ ...initialUserValues });
  const [order, setOrder] = useState("");

  const getUserFromLocalStorage = useCallback(async () => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      const potentialUser = await getSingleUserInfoFromDB(JSON.parse(localUser).id);
      if (potentialUser) {
        const orderStringToArray = potentialUser[0].orderHistory?.map((order: string) => {
          return stringToOrder(order);
        });
        setUserInfo({
          ...potentialUser[0],
          userAddress: JSON.parse(potentialUser[0].userAddress) || "",
          orderHistory: orderStringToArray || [],
        });
      }
    }
  }, [setUserInfo]);

  const updateUserInfoThroughAccount = async (saveToProfile: boolean) => {
    if (saveToProfile) {
      updateUserInfoInDB(userInfo);
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
        userInfo,
        setUserInfo,
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
