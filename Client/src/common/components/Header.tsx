// import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../redux/reducers/auth.reducer";
import { AuthActionCreator } from "../../redux/actions/auth.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faSignInAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

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

  return (
    <div className="bg-teal-500 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Expense Tracker</Link>
        </span>
        <div className="flex space-x-2">
          {isLoggedIn ? (
            <button
              className="w-auto rounded-lg overflow-hidden py-2 px-4 bg-emerald-500 text-white font-bold hover:bg-emerald-600 hover:border-emerald-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Logout
            </button>
          ) : (
            <>
              <span className="rounded-lg overflow-hidden py-1">
                <Link
                  to="/register"
                  className="bg-emerald-50 text-gray px-3 py-2 font-bold hover:bg-grey-100"
                >
                  <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                  Register
                </Link>
              </span>
              <span className="rounded-lg overflow-hidden py-1">
                <Link
                  to="/sign-in"
                  className="bg-emerald-50 text-gray px-3 py-2 font-bold hover:bg-grey-100"
                >
                  <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
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
