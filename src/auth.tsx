import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { Navigate } from "react-router-dom";
import { handleError } from "./error";

interface SignProps {
  email: string;
  password: string;
}

interface AuthContextProps {
  hasAuth: boolean;
  signUp: (props: SignProps, callback: VoidFunction) => void;
  signIn: (props: SignProps, callback: VoidFunction) => void;
  signOut: (callback: VoidFunction) => void;
}

const AuthContext = createContext<AuthContextProps>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [hasAuth, setHasAuth] = useState(false);

  const setLoginStatus = (access_token: string) => {
    localStorage.setItem("access_token", access_token);
    setHasAuth(true);
  };

  const resetLoginStatus = () => {
    localStorage.removeItem("access_token");
    setHasAuth(false);
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
      setLoginStatus(res.data.access_token);
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
      setLoginStatus(res.data.access_token);
      callback();
    } catch (err) {
      handleError(err);
    }
  };

  const signOut: AuthContextProps["signOut"] = (callback) => {
    resetLoginStatus();
    callback();
  };

  useEffect(() => {
    setHasAuth(localStorage.getItem("access_token") ? true : false);
  }, []);

  return (
    <AuthContext.Provider value={{ hasAuth, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  return <>{auth.hasAuth ? children : <Navigate to="/signin" replace />}</>;
}

export function NoNeedAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  return <>{auth.hasAuth ? <Navigate to="/todo" replace /> : children}</>;
}
