import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAlert } from "../reducers/noteReducer/alertReducer";

function Navbar(props) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logouthandle = () => {
    localStorage.removeItem("token");
    dispatch(setAlert({ message: "logout successfully", type: "success" }));
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-secondary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${pathname === "/" ? "active" : ""}`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex">
                <Link
                  className="btn btn-outline-primary mx-2"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-outline-primary mx-2"
                  to="/signup"
                  role="button"
                >
                  Sign up
                </Link>
              </form>
            ) : (
              <button className="btn btn-primary" onClick={logouthandle}>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
