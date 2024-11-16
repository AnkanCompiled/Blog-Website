import React from "react";
import { AuthProvider } from "./context/authContext";
import RouterMap from "./routes/RouterMap";

export default function App() {
  return (
    <AuthProvider>
      <div className="h-screen font-roboto">
        <RouterMap />
      </div>
    </AuthProvider>
  );
}
