import { useState } from "react";

const Signin = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const signIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 로그인 API 연동
  };

  return (
    <>
      <h2>로그인</h2>
      <form onSubmit={signIn}>
        <label>
          아이디
          <input
            type="email"
            data-testid="email-input"
            placeholder="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </label>
        <label>
          비밀번호
          <input
            type="password"
            data-testid="password-input"
            placeholder="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
        </label>
        <button type="submit" data-testid="signin-button">
          로그인
        </button>
      </form>
    </>
  );
};

export default Signin;
