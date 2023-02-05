import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import { AuthProvider, useAuth } from "./context/auth";
import { TodoProvider } from "./context/todo";
import RootPage from "./pages/root";
import SignInPage from "./pages/signin";
import SignUpPage from "./pages/signup";
import TodoPage from "./pages/todo";

export default function App() {
  return (
    <AuthProvider>
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

function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  return <>{auth.hasAuth ? children : <Navigate to="/signin" replace />}</>;
}

function NoNeedAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  return <>{auth.hasAuth ? <Navigate to="/todo" replace /> : children}</>;
}
