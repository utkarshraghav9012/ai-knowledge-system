import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Dashboard from "../pages/Dashboard/Dashboard";
import Admin from "../pages/Admin/Admin";
import ComingSoon from "../pages/ComingSoon/ComingSoon";
import Upload from "../pages/Upload/Upload";
import PdfWorkspace from "../pages/PdfWorkspace/PdfWorkspace";
import VideoSearch from "../pages/VideoSearch/VideoSearch";
import Profile from "../pages/Profile/Profile";
import Settings from "../pages/Settings/Settings";

import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/layout/Layout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />

          <Route path="/upload" element={<Upload />} />
          <Route path="/search" element={<VideoSearch />} />
          <Route path="/files" element={<PdfWorkspace />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="/recent" element={<ComingSoon title="Recent" />} />
          <Route path="/bookmarks" element={<ComingSoon title="Bookmarks" />} />
          <Route path="/history" element={<ComingSoon title="History" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;