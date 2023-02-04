import { Navigate } from "react-router-dom";

export default function RootPage() {
  const token = localStorage.getItem("access_token");
  return (
    <>
      {token ? (
        <Navigate to="todo" replace />
      ) : (
        <Navigate to="signin" replace />
      )}
    </>
  );
}
