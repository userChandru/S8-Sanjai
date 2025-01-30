import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./Pages/AuthPage";
import Dashboard from "./Home/Dashboard";
import Marketplace from "./Home/Marketplace";
import Bank from "./Home/bank";
import Profile from "./Home/Profile";
import ErrorPage from "./Pages/ErrorPage";
import HomePage from "./Pages/HomePage";
import Authentication from "./Admin/Authentication";
import Product from "./Home/Product";
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="font-normal text-gray-800 bg-gray-100 min-h-screen max-w-screen *:min-h-screen *:max-w-screen">
        <BrowserRouter>
          <Routes>
            {" "}
            <Route index element={<AuthPage />} />
            <Route path="/auth" element={<Authentication />} />
            <Route element={<HomePage />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/bank" element={<Bank />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/name" element={<Product />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
