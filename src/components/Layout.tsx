import { useAuth } from "../context/auth";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <div className="flex flex-col items-center mt-12">
        <div className="w-80">
          <Header />
          <Outlet />
        </div>
      </div>
    </>
  );
}

const Header = () => {
  let auth = useAuth();
  let navigate = useNavigate();
  return (
    <>
      <div className="self-stretch flex justify-between items-center h-32">
        <h1 className="text-2xl">Todo App</h1>
        {!auth.hasAuth ? (
          <>
            <Link to="/signin">로그인</Link>
            <Link to="/signup">회원가입</Link>
          </>
        ) : (
          <button
            onClick={() => {
              auth.signOut(() => navigate("/signin"));
            }}
            className={"w-20"}
          >
            로그아웃
          </button>
        )}
      </div>
    </>
  );
};
