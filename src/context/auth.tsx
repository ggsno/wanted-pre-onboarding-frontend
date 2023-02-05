import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { handleError } from "../error";
import { fetchSignIn, fetchSignup } from "../services/apis/auth";
import { storage } from "../storage";
import { AuthContextProps } from "../types/auth";

const AuthContext = createContext<AuthContextProps>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [hasAuth, setHasAuth] = useState(false);

  const signUp: AuthContextProps["signUp"] = async (props, callback) => {
    try {
      await fetchSignup(props);
      callback();
    } catch (err) {
      handleError(err);
    }
  };

  const signIn: AuthContextProps["signIn"] = async (props, callback) => {
    try {
      const res = await fetchSignIn(props);
      storage.set("access_token", res.data.access_token);
      setHasAuth(true);
      callback();
    } catch (err) {
      handleError(err);
    }
  };

  const signOut: AuthContextProps["signOut"] = (callback) => {
    storage.remove("access_token");
    setHasAuth(false);
    callback();
  };

  useEffect(() => {
    setHasAuth(storage.get("access_token") ? true : false);
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
