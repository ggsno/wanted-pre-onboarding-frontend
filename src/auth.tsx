import axios from "axios";
import { createContext, ReactNode, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { handleError } from "./error";

interface UserProps {
  email: string;
}

interface SignProps {
  email: string;
  password: string;
}

interface AuthContextProps {
  user: UserProps | null;
  signUp: (props: SignProps, callback: VoidFunction) => void;
  signIn: (props: SignProps, callback: VoidFunction) => void;
  signOut: (callback: VoidFunction) => void;
}

const AuthContext = createContext<AuthContextProps>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthContextProps["user"]>(null);

  const setLoginUserInfo = (user: UserProps, access_token: string) => {
    localStorage.setItem("access_token", access_token);
    setUser(user);
  };

  const resetLoginUserInfo = () => {
    localStorage.removeItem("access_token");
    setUser(null);
  };

  const signUp: AuthContextProps["signUp"] = async (
    { email, password },
    callback
  ) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/signup`,
        { email, password }
      );
      setLoginUserInfo({ email }, res.data.access_token);
      callback();
    } catch (err) {
      handleError(err);
    }
  };

  const signIn: AuthContextProps["signIn"] = async (
    { email, password },
    callback
  ) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/signin`,
        { email, password }
      );
      setLoginUserInfo({ email }, res.data.access_token);
      callback();
    } catch (err) {
      handleError(err);
    }
  };

  const signOut: AuthContextProps["signOut"] = (callback) => {
    resetLoginUserInfo();
    callback();
  };

  const value = { user, signUp, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();

  if (!auth.user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
