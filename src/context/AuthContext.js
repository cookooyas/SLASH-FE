import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState } from "react";
import { authLogin } from "../api/AuthService";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("accessToken")
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (id, password) => {
    const data = await authLogin(id, password);
    if (data.success) {
      const decodedToken = jwtDecode(data.data.accessToken);
      const newUser = { id: decodedToken.id, auth: decodedToken.auth };
      setUser(newUser);
      localStorage.setItem(
        "accessToken",
        JSON.stringify(data.data.accessToken)
      );
      localStorage.setItem("user", JSON.stringify(newUser));
      setIsAuthenticated(true);
    } else {
      throw new Error("로그인 정보를 확인해주세요");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
