import React from "react";
import { AuthProvider } from "./context/authContext";
import MapRoutes from "./routes/MapRoutes";
import FooterComponent from "./components/FooterComponent";

export default function App() {
  return (
    <>
      <AuthProvider>
        <div className="flex h-screen flex-col">
          <MapRoutes />
        </div>
      </AuthProvider>
    </>
  );
}
