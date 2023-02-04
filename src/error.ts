import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

export function handleError(error: unknown) {
  if (error instanceof AxiosError) {
    toast.error(error.response?.data.message);
  } else {
    toast.error("unknown error");
  }
}
