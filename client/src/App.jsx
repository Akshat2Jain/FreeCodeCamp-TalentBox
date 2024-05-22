import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import PublicRoute from "./ProtectedRoute/PublicRoute";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/signUp" element={<SignUp />} />
          <Route
            path="/signIn"
            element={
              <GoogleOAuthProvider clientId="986693694802-frkc15c010dv9v1c3n87muq2efngd6b0.apps.googleusercontent.com">
                <SignIn />
              </GoogleOAuthProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
