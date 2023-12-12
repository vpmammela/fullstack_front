import { Link, Outlet, useNavigate } from "react-router-dom";
import "../styles.css";
import useAuthStore from "../../stores/auth";
import { useEffect, useState } from "react";
import { useNotification } from "../../NotificationContext";
import styled from "styled-components";

const GrayBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: lightgray;
  border-top-left-radius: 0% 50px;
  border-top-right-radius: 0% 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Center content vertically */
  box-sizing: border-box;
  z-index: -1000; /* Adjust the z-index as needed */
`;


// Links to all types of reviews when user is admin/staff. Link to ContinuousReview if user is student
const ReviewSelection = () => {

  const allowedRoles = ["student", "admin", "staff"];
  const authStore = useAuthStore();
  const [role] = useState(authStore.role)
  const navigate = useNavigate();
  const { setNotification } = useNotification();
  
  useEffect(() => {
    if (role === null || !allowedRoles.includes(role)) {
      (async () => {
        await authStore.logout();
        setNotification('Wrong user role!');
        navigate('/login');
      })();
    }
  }, [navigate, role, authStore]);

  // Students can only access continuous reviews
  if(role === "student"){
    return (
      <GrayBackground>
      <div className="all-links">
        <div className="linkbutton">
          <Link className="review-link" to="/continuous">
            Jatkuvakatselmointi
          </Link>

          <Outlet></Outlet>
        </div>
        <Outlet></Outlet>
      </div>
      </GrayBackground>
    )
  }

  // Admins can access all reviews and other features as well.
  if(role === "admin"){
    return (
      <GrayBackground>
        
      <div className="all-links">
      
        <div className="linkbutton">
          <Link className="review-link" to="/continuous">
          Jatkuvakatselmointi
          </Link>
        </div>
        <div className="linkbutton">
          <Link className="review-link" to="/semester">
            Lukukausikatselmointi
          </Link>
        </div>
        <div className="linkbutton">
          <Link className="review-link" to="/safety">
            Turvallisuuskatselmointi
          </Link>
        </div>
        <div className="linkbutton">
          <Link className="review-link" to="/management">
            Johtamisenkatselmointi
          </Link>
        </div>
        
        <Outlet></Outlet>
      </div>
      </GrayBackground>
    )
  }

  // Staff can access all reviews
  if(role === "staff"){
    return (
      <GrayBackground>
      <div>
        <div className="linkbutton">
          <Link className="review-link" to="/continuous">
          Jatkuvakatselmointi
          </Link>
        </div>
        <div className="linkbutton">
          <Link className="review-link" to="/semester">
            lukukausikatselmointi
          </Link>
        </div>
        <div className="linkbutton">
          <Link className="review-link" to="/safety">
            Turvallisuuskatselmointi
          </Link>
        </div>
        <div className="linkbutton">
          <Link className="review-link" to="/management">
            Johtamisenkatselmointi
          </Link>
        </div>
    
        <Outlet></Outlet>
      </div>
      </GrayBackground>
    )
  }
};

export default ReviewSelection;