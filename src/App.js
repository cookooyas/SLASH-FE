import React from "react";
import Router from "./shared/Router";
import { AuthProvider } from "./context/AuthContext";
function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
