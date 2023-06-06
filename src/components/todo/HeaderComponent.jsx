import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "./security/AuthContext";

function HeaderComponent() {
  const navigate = useNavigate();
  const authContext = useAuth();
  const isAuthenticated = authContext.isAuthenticated;

  function logout() {
    console.log("logout");
    authContext.logout();
  }

  return (
    <header className="border-bottom border-light border-5 mb-5 p-2">
      <div className="container">
        <div className="row">
          <nav className="navbar navbar-expand-lg">
            <a
              className="navbar-brand ms-2 fs-2 fw-bold text-white"
              href="https://www.w3schools.com"
            >
              W3 Schools
            </a>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav">
                {/* <li className="nav-item">
                  {isAuthenticated && (
                    <Link
                      className="nav-link text-white"
                      to="/todos"
                    >
                      Home
                    </Link>
                  )}
                </li> */}
                <li className="nav-item">
                  {isAuthenticated && (
                    <Link className="nav-link text-white" to="/todos">
                      Todos
                    </Link>
                  )}
                </li>
              </ul>
            </div>
            <ul className="navbar-nav">
              <li className="nav-item">
                {!isAuthenticated && (
                  <Link className="nav-link text-white" to="/register">
                    Register
                  </Link>
                )}
              </li>
              <li className="nav-item">
                {!isAuthenticated && (
                  <Link className="nav-link text-white" to="/login">
                    Login
                  </Link>
                )}
              </li>
              <li className="nav-item">
                {isAuthenticated && (
                  <Link
                    className="nav-link text-white"
                    to="/logout"
                    onClick={logout}
                  >
                    Logout
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default HeaderComponent;
