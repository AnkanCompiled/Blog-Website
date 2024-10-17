import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoute } from "./protectedRoutes";
import { IrrelevantRoute } from "./irrelevantRoute";
import Landing from "../pages/Landing";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";

export default function index() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <IrrelevantRoute>
          <Landing />
        </IrrelevantRoute>
      ),
    },
    {
      path: "/home",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: (
        <IrrelevantRoute>
          <Login />
        </IrrelevantRoute>
      ),
    },
    {
      path: "/register",
      element: (
        <IrrelevantRoute>
          <Register />
        </IrrelevantRoute>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}
