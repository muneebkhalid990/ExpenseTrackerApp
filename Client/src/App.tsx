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
import Graph from "./common/components/Graph";
import Income from "./common/pages/Income";
import Expense from "./common/pages/Expense";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
// import { RootState } from "./redux/reducers/auth.reducer";

interface ProtectedRouteProps {
  user: any;
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  } else {
    return children;
  }
};

function App() {
  const isUser = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <>
      <Router>
        <ToastContainer/>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute user={isUser}>
                <Layout>
                  <Graph />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/about"
            element={
              <ProtectedRoute user={isUser}>
                <Layout>
                  <p>About Page</p>
                </Layout>
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
              <ProtectedRoute user={isUser}>
                <Layout>
                  <Income />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/expense"
            element={
              <ProtectedRoute user={isUser}>
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
