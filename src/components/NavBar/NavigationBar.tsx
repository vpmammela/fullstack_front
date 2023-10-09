import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export interface NavigationBarProps {
  handleLogout: () => void;
}

// Navigation bar on the HomePage, with in app navigation through links. 
export const NavigationBar: React.FC<NavigationBarProps> = ({ handleLogout }) => {
  const location = useLocation();

    return (
        <div className="NavBar">
            <button
                className="logoutButton"
                onClick={handleLogout}>
                Kirjaudu ulos
            </button>

            {'Links to other pages go HERE'}
            
            <Link to="/.components/SafetyReview"
                className={`Links 
        ${location.pathname === "/safetyReview" ? "active-link" : ""}`}>
                Turvallisuuskatsaus
            </Link>
        </div>
    );
};