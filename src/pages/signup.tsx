import { useNavigate } from "react-router-dom";
import Sign from "../components/Sign";
import { useAuth } from "../context/auth";

export default function SignUpPage() {
  const auth = useAuth();
  const navigator = useNavigate();

  const submitAction = auth.signUp;
  const submitCallback = () => {
    navigator("/signin", { replace: true });
  };

  return (
    <>
      <h2 className="text-lg text-center">회원가입</h2>
      <Sign submitAction={submitAction} submitCallback={submitCallback} />
    </>
  );
}
