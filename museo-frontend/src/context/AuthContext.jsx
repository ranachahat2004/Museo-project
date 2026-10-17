import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("museoToken")
  );
  const [loading, setLoading] = useState(true);

  // =========================
  // GET CURRENT USER
  // =========================

  const getCurrentUser = async () => {
    const savedToken =
      localStorage.getItem("museoToken");

    if (!savedToken) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:5000/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        }
      );

      setUser(response.data.user);
      setToken(savedToken);

      localStorage.setItem(
        "museoUser",
        JSON.stringify(response.data.user)
      );
    } catch (error) {
      console.error(
        "Authentication Error:",
        error
      );

      // Remove invalid token
      localStorage.removeItem("museoToken");
      localStorage.removeItem("museoUser");

      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  // Check login when application starts
  useEffect(() => {
    getCurrentUser();
  }, []);

  // =========================
  // LOGIN
  // =========================

  const login = (loginResponse) => {
    localStorage.setItem(
      "museoToken",
      loginResponse.token
    );

    localStorage.setItem(
      "museoUser",
      JSON.stringify(loginResponse.user)
    );

    setToken(loginResponse.token);
    setUser(loginResponse.user);
  };

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {
    localStorage.removeItem("museoToken");
    localStorage.removeItem("museoUser");
    localStorage.removeItem("museoRememberMe");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        getCurrentUser,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;