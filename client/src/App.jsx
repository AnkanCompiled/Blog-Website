import React from "react";
import { AuthProvider } from "./context/authContext";
import MapRoutes from "./routes/MapRoutes";
import { ModeProvider } from "./context/modeContext";

export default function App() {
  return (
    <>
      <ModeProvider>
        <AuthProvider>
          <MapRoutes />
        </AuthProvider>
      </ModeProvider>
    </>
  );
}
