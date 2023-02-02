import { useState } from "react";

const Signup = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");

  const signUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 유효성 체크 및 회원가입 API 연동
  };
  return (
    <>
      <h2>회원가입</h2>
      <form onSubmit={signUp}>
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
        <label>
          비밀번호 확인
          <input
            type="password"
            data-testid="password-input"
            placeholder="password check"
            value={pwCheck}
            onChange={(e) => setPwCheck(e.target.value)}
          />
        </label>
        <button type="submit" data-testid="signup-button">
          회원가입
        </button>
      </form>
    </>
  );
};

export default Signup;
