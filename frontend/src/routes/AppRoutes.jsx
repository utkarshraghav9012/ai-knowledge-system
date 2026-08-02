import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Dashboard from "../pages/Dashboard/Dashboard";
import Admin from "../pages/Admin/Admin";

import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/Layout/Layout";


function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>


        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />


        <Route element={<Layout />}>

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />


          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />

        </Route>


      </Routes>

    </BrowserRouter>

  );

}


export default AppRoutes;