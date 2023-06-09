import { Navigate, useNavigate } from "react-router-dom";

export const AuthorizedUser = function ({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={"/login"} replace={true}></Navigate>;
  }
  return children;
};
export const AuthorizedUserIsAdmin = function ({ children }) {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("role");
  if (!token || isAdmin !== "admin") {
    return <Navigate to={"/login"} replace={true}></Navigate>;
  }
  return children;
};
export const LoggedUser = function ({ children }) {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to={"/"} replace={true}></Navigate>;
  }
  return children;
};
