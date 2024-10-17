import Routes from "./routes";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <AuthProvider>
      <div className="h-screen font-roboto">
        <Routes />
      </div>
    </AuthProvider>
  );
}

export default App;
