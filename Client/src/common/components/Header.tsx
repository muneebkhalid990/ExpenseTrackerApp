// import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthActionCreator } from "../../redux/actions/auth.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faSignIn,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
// import { useEffect } from "react";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleLogout = () => {
    dispatch(AuthActionCreator.logout());
    navigate("/sign-in");
  };

  if (!isLoggedIn) {
    localStorage.removeItem("token");
    // localStorage.removeItem("income");
    // localStorage.removeItem("expense");
    dispatch(AuthActionCreator.clearAuthError());
  }
  

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     localStorage.removeItem("token");
  //     // localStorage.removeItem("income");
  //     // localStorage.removeItem("expense");
  //     dispatch(AuthActionCreator.clearAuthError());
  //   }
  // }, [isLoggedIn, dispatch]);

  return (
    <div className="bg-teal-500 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight font-serif">
          <Link to="/">Expense Tracker</Link>
        </span>
        <div className="flex space-x-2">
          {isLoggedIn ? (
            <button
              className="w-auto rounded-lg overflow-hidden py-2 px-4 bg-emerald-500 text-white font-bold hover:bg-emerald-600 hover:border-emerald-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon={faPowerOff} className="mr-2" />
              Logout
            </button>
          ) : (
            <>
              <span className="rounded-lg overflow-hidden py-1">
                <Link
                  to="/register"
                  className="inline-flex items-center bg-teal-500 text-white px-3 py-2 font-bold rounded-md hover:bg-teal-600 focus:outline-none focus:bg-teal-600"
                >
                  <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
                  Register
                </Link>
              </span>
              <span className="rounded-lg overflow-hidden py-1">
                <Link
                  to="/sign-in"
                  className="inline-flex items-center bg-teal-500 text-white px-3 py-2 font-bold rounded-md hover:bg-teal-600 focus:outline-none focus:bg-teal-600"
                >
                  <FontAwesomeIcon icon={faSignIn} className="mr-2" />
                  Sign In
                </Link>
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
