/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState, createContext, useContext, ReactNode, useCallback } from "react";
import { v4 } from "uuid";
import { User } from "../Types/interfaces";
import { initialUserValues } from "../utils/HelpfulText";
import { getSingleUserInfoFromDB } from "../api/UserInfoRequests/ReadUserInfoRequest";
import { updateUserInfoInDB } from "../api/UserInfoRequests/UpdateUserInfoRequest";

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  order: string;
  updateUserInfoThroughAccount: (saveToProfile: boolean) => Promise<void>;
}

const UserContext = createContext({} as UserContextType);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({ ...initialUserValues });
  const [order, setOrder] = useState("");

  const getUserInfoOnFirstLoad = useCallback(async () => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      const potentialUser = await getSingleUserInfoFromDB(JSON.parse(localUser).id);
      if (potentialUser) {
        setUser({ ...potentialUser[0], userAddress: JSON.parse(potentialUser[0].userAddress) });
      }
    }
  }, [setUser]);

  const updateUserInfoThroughAccount = async (saveToProfile: boolean) => {
    if (saveToProfile) {
      updateUserInfoInDB(user);
    }
  };

  useEffect(() => {
    getUserInfoOnFirstLoad();
  }, [getUserInfoOnFirstLoad]);

  useEffect(() => {
    setOrder(v4());
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        order,
        updateUserInfoThroughAccount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
