import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidForm, setIsValidForm] = useState(false);

  const auth = useAuth();
  const navigator = useNavigate();

  const handleSignInSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    auth.signIn({ email, password }, () => {
      navigator("/todo", { replace: true });
    });
  };

  useEffect(() => {
    const checkValidForm = () => {
      return email.includes("@") && password.length >= 8;
    };

    setIsValidForm(checkValidForm());
  }, [email, password]);

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSignInSubmit}>
        <label>
          email
          <input
            type="email"
            data-testid="email-input"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          password
          <input
            type="password"
            data-testid="password-input"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          type="submit"
          data-testid="signin-button"
          disabled={!isValidForm}
        >
          login
        </button>
      </form>
      <Link to={"/signup"}>sign up</Link>
    </>
  );
}
