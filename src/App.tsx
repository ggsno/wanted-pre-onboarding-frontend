import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import { AuthProvider, NoNeedAuth, RequireAuth, useAuth } from "./context/auth";
import { TodoProvider } from "./context/todo";
import RootPage from "./pages/root";
import SignInPage from "./pages/signin";
import SignUpPage from "./pages/signup";
import TodoPage from "./pages/todo";

export default function App() {
  return (
    <AuthProvider>
      <h1>Todo app</h1>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<RootPage />} />
          <Route
            path="/signin"
            element={
              <NoNeedAuth>
                <SignInPage />
              </NoNeedAuth>
            }
          />
          <Route
            path="/signup"
            element={
              <NoNeedAuth>
                <SignUpPage />
              </NoNeedAuth>
            }
          />
          <Route
            path="/todo"
            element={
              <RequireAuth>
                <TodoProvider>
                  <TodoPage />
                </TodoProvider>
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
      {!auth.hasAuth ? (
        <p>You are not logged in.</p>
      ) : (
        <p>
          Welcome !
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
