import React from "react";
import "../../../styles/Sidebar.css";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <button className="logoutBtn" onClick={handleLogout}>
      <FiLogOut className="logoutIcon" />
      Logout
    </button>
  );
};

export default LogoutButton;
