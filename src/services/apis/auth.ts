import axios from "axios";
import { SignRequestProps, SignResponseProps } from "../model/authSchema";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/auth/`,
});

export function fetchSignIn(props: SignRequestProps) {
  return instance.post<SignResponseProps>("signin", props);
}

export function fetchSignup(props: SignRequestProps) {
  return instance.post<SignResponseProps>("signup", props);
}
