import { User } from "@supabase/supabase-js";
import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import swal from "sweetalert";
import { UserSignIn } from "../Types/interfaces";
import { signOutUserSupabase } from "../api/UserAuthRequests/LogoutUser";
import { signUpUserSupabase } from "../api/UserAuthRequests/SignUpUser";
import { signInUserSupabase } from "../api/UserAuthRequests/SignInUser";
import { updateUserSupabase } from "../api/UserAuthRequests/UpdateUser";

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  userLoading: boolean;
  signUpUser: (user: UserSignIn) => Promise<string | undefined>;
  signInUser: (user: UserSignIn) => Promise<boolean>;
  editUserLogin: (email: string, password: string) => Promise<void>;
  logOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  //! set a timeout function so not forever
  const setLocalStorage = (user: User) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setLoggedIn(true);
    }
  };

  useEffect(() => {
    checkUserSession();
  }, []);

  const checkUserSession = async () => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser));
      setUserLoading(false);
      setLoggedIn(true);
    }
    // import { supabase } from "../api/supabase-requests";
    // const {
    //   data: { user },
    // } = await supabase.auth.getUser();
    // console.log("User session: " + user);
    // if (user) {
    //   setUser(user);
    //   setLoggedIn(true);
    // }
  };

  const logOutUser = async () => {
    const { error } = await signOutUserSupabase();
    if (!error) {
      setUser(null);
      setLoggedIn(false);
      localStorage.removeItem("user");
    }
  };

  const signUpUser = async (userInfo: UserSignIn) => {
    const { data, error } = await signUpUserSupabase(userInfo.email, userInfo.password);
    if (error) {
      swal("Sign up error!", `Invalid credentials: ${error.message}`, "error");
    }
    if (data.user) {
      setLocalStorage(data.user);
      setUser(data.user);
      swal("Sign up success!", "Please verify your account to proceed", "info");
      return data!.user?.id;
    }
  };

  const signInUser = async (userInfo: UserSignIn) => {
    const { data, error } = await signInUserSupabase(userInfo.email, userInfo.password);
    if (data.user) {
      setLocalStorage(data.user);
      return true;
    } else {
      swal("Sign in error!", `Invalid credentials: ${error?.message}`, "error");
      return false;
    }
  };

  const editUserLogin = async (email: string, password: string) => {
    const { data, error } = await updateUserSupabase(email, password);
    if (data.user) {
      setLocalStorage(data.user);
      swal("Login updated!", "The user credentials edit was successful!", "success");
    }
    if (error) {
      swal("Update error!", `Update Error: ${error.message}`, "error");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userLoading,
        loggedIn,
        setLoggedIn,
        signUpUser,
        signInUser,
        editUserLogin,
        logOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);
