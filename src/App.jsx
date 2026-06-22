import { useState } from "react";
import Login from "./pages/Login";
import AdminPanel from "./components/AdminPanel";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
    <>
      {token ? (
        <AdminPanel setToken={setToken} />
      ) : (
        <Login setToken={setToken} />
      )}
    </>
  );
}

export default App;
