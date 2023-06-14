import { createContext, useContext, useState } from "react";
import { apiCient } from "../api/ApiClient";
import {
  executeJwtAuthenticationService,
  logoutService,
} from "../api/AuthenticationApiService";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const [username, setUsername] = useState(null);

  const [token, setToken] = useState(null);

  const [refreshToken, setRefreshToken] = useState(null);

  async function login(password, username) {
    try {
      const response = await executeJwtAuthenticationService(
        username,
        password
      );

      if (response.status == 200) {
        const jwtToken = "Bearer " + response.data.token;
        const refreshToken = response.data.refreshToken;
        setAuthenticated(true);
        setUsername(username);
        setToken(jwtToken);
        setRefreshToken(refreshToken);

        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      logout();
      return false;
    }
  }
  function logout() {
    logoutService(token);

    setAuthenticated(false);

    setToken(null);
    setUsername(null);
  }

  const getNewBearerToken = async () => {
    try {
      const response = await fetch(
        "http://192.168.0.105:8085/api/v1/auth/refresh-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + refreshToken,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const newBearerToken = data.token;
        const jwtToken = "Bearer " + newBearerToken;
        setToken(jwtToken);
        // You can store the new bearer token in local storage, state management library, etc.
      } else {
        // Handle the error case if the API request fails
        console.error("Failed to obtain new bearer token");
      }
    } catch (error) {
      // Handle any network or other errors
      console.error(
        "Error occurred while calling the authentication API",
        error
      );
    }
  };

  useEffect(() => {
    // Fetch a new bearer token every 60 minutes (3600000 milliseconds)
    const intervalId = setInterval(getNewBearerToken, 3600000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, username, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}
