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
import { GoogleOAuthProvider } from "@react-oauth/google";
import EditProduct from "./Home/EditProduct";
import AdminDashboard from "./Admin/Pages/AdminDashboard";
import AdminBank from "./Admin/Pages/AdminBank";
import AdminLayout from "./Admin/Layout/AdminLayout";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import BusinessPage from './Pages/BusinessPage';

const App = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <CartProvider>
        <div className="font-normal text-gray-800 bg-gray-100 min-h-screen max-w-screen *:min-h-screen *:max-w-screen">
          <Toaster
            position="top-right"
            toastOptions={{
              success: {
                style: {
                  background: "#10B981",
                  color: "white",
                },
                duration: 3000,
              },
              error: {
                style: {
                  background: "#EF4444",
                  color: "white",
                },
                duration: 3000,
              },
            }}
          />
          <BrowserRouter>
            <Routes>
              <Route index element={<AuthPage />} />
              <Route path="/auth" element={<Authentication />} />

              {/* Student Routes */}
              <Route element={<HomePage />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/bank" element={<Bank />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/edit-product" element={<EditProduct />} />
                <Route path="/name" element={<Product />} />
              </Route>

              {/* Admin Routes */}
              <Route element={<AdminLayout />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/bank" element={<AdminBank />} />
              </Route>

              <Route path="/business" element={<BusinessPage />} />

              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </CartProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
