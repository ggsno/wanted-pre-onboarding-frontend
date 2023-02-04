import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidForm, setIsValidForm] = useState(false);

  const auth = useAuth();
  const navigator = useNavigate();

  const handleSignUpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    auth.signUp({ email, password }, () => {
      navigator("/todo", { replace: true });
    });
  };

  useEffect(() => {
    const checkValidForm = () => {
      return (
        email.includes("@") &&
        password.length >= 8 &&
        password === confirmPassword
      );
    };

    setIsValidForm(checkValidForm());
  }, [email, password, confirmPassword]);

  return (
    <>
      <h2>Sign up</h2>
      <form onSubmit={handleSignUpSubmit}>
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
        <label>
          confirm password
          <input
            type="password"
            data-testid="confirm-password-input"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <button
          type="submit"
          data-testid="signup-button"
          disabled={!isValidForm}
        >
          sign up
        </button>
      </form>
    </>
  );
}
