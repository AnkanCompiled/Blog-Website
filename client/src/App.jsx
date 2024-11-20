import React from "react";
import { AuthProvider } from "./context/authContext";
import RouterMap from "./routes/RouterMap";
import FooterComponent from "./components/FooterComponent";

export default function App() {
  return (
    <AuthProvider>
      <div className="h-screen font-roboto">
        <RouterMap />
        <FooterComponent />
      </div>
    </AuthProvider>
  );
}
