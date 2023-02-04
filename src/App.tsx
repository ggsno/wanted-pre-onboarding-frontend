import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import { AuthProvider, RequireAuth, useAuth } from "./auth";
import RootPage from "./routes/root";
import SignInPage from "./routes/signIn";
import SignUpPage from "./routes/signUp";
import TodoPage from "./routes/todo";

export default function App() {
  return (
    <AuthProvider>
      <h1>Todo app</h1>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<RootPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/todo"
            element={
              <RequireAuth>
                <TodoPage />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

function Layout() {
  return (
    <div>
      <AuthStatus />
      <Outlet />
    </div>
  );
}

function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();

  return (
    <>
      {!auth.user ? (
        <p>You are not logged in.</p>
      ) : (
        <p>
          Welcome {auth.user.email}!{" "}
          <button
            onClick={() => {
              auth.signOut(() => navigate("/signin"));
            }}
          >
            Sign out
          </button>
        </p>
      )}
    </>
  );
}
