import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import IrrelevantRoute from "./irrelevantRoute";
import LandingPage from "../pages/LandingPage";

export default function RouterMap() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: (
          <IrrelevantRoute>
            <LandingPage />
          </IrrelevantRoute>
        ),
      },
    ],
    {
      future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
      },
    }
  );

  return (
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  );
}
