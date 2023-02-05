import { useNavigate } from "react-router-dom";
import Sign from "../components/Sign";
import { useAuth } from "../context/auth";

export default function SignInPage() {
  const auth = useAuth();
  const navigator = useNavigate();

  const submitAction = auth.signIn;
  const submitCallback = () => {
    navigator("/todo", { replace: true });
  };

  return (
    <>
      <h2 className="text-lg text-center">로그인</h2>
      <Sign submitAction={submitAction} submitCallback={submitCallback} />
    </>
  );
}
