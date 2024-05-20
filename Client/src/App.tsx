/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Layout from "./common/layouts/Layout";
import "./App.css";
import Register from "./common/pages/Register";
import SignIn from "./common/pages/SignIn";
import Income from "./common/pages/Income";
import Expense from "./common/pages/Expense";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Dashboard from "./common/pages/Dashboard";
import OtpVerification from "./common/pages/Otp";
// import { RootState } from "./redux/reducers/auth.reducer";

interface ProtectedRouteProps {
  user: any;
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/sign-in" replace />;
  } else {
    return children;
  }
};

function App() {
  const isUser = useSelector((state: RootState) => state.auth.isAuthenticated);
  const OtpVerified = useSelector((state: RootState)=>state.auth.isOtpVerified);

  return (
    <>
      <Router>
        <ToastContainer/>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute user={OtpVerified}>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/otp"
            element={
              <ProtectedRoute user={isUser}>
                <OtpVerification/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Layout>
                <SignIn />
              </Layout>
            }
          />
          <Route
            path="/income"
            element={
              <ProtectedRoute user={OtpVerified}>
                <Layout>
                  <Income />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/expense"
            element={
              <ProtectedRoute user={OtpVerified}>
                <Layout>
                  <Expense />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/sign-in" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
