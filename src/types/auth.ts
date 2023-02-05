import { SignRequestProps } from "../services/model/authSchema";

export type AuthContextProps = {
  hasAuth: boolean;
  signUp: (props: SignRequestProps, callback: VoidFunction) => void;
  signIn: (props: SignRequestProps, callback: VoidFunction) => void;
  signOut: (callback: VoidFunction) => void;
};
