import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function IndexPage() {
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      if (!["/login", "/register"].includes(location.pathname)) {
        nav("/login");
      }
    } else {
      if (["/", "/login", "/register"].includes(location.pathname)) {
        nav("/courseManage");
      }
    }
  }, [location.pathname, nav]);

  return <Outlet />;
}
