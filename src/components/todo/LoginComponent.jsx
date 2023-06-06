import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function LoginComponent() {
  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const navigate = useNavigate();

  const authContext = useAuth();

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleSubmit() {
    if (await authContext.login(password, username)) {
      toast.success("Login Successful");
      navigate(`/todos`);
    } else {
      toast.error("Login Failed. Please check your credentials");
      setShowErrorMessage(true);
    }
  }

  return (
    <div className="login-box">
      <h2>Login</h2>
      {showErrorMessage && (
        <div className="errorMessage text-white">
          Authentication Failed. Please check your credentials.
        </div>
      )}
      <form>
        <div className="form-group padding-top--24">
          <input
            className="form-control"
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-group padding-top--24">
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <a href="#" name="login" onClick={handleSubmit}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Log in
        </a>
      </form>
      <div className="footer-link padding-top--24 text-white">
        <span>
          Forgot password?
          <a className="px-2" href="/reset">
            Reset
          </a>
        </span>
      </div>
    </div>
  );
}

export default LoginComponent;
