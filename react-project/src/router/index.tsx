import { createHashRouter } from "react-router-dom";
import IndexPage from "../pages";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import CourseManage from "../pages/courseManage";

export const router = createHashRouter([
  {
    path: "/",
    element: <IndexPage />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/courseManage",
        element: <CourseManage />,
      },
    ],
  },
]);
