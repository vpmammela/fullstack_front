import { Link, Outlet, useNavigate } from "react-router-dom";
import "../styles.css";
import useAuthStore from "../../stores/auth";
import { useEffect, useState } from "react";
import { useNotification } from "../../NotificationContext";


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

  if(role === null || !allowedRoles.includes(role)) {
    navigate("/login")
  }

  // Students can only access continuous reviews
  if(role === "student"){
    return (
      <div className="linkbutton">
        <Link className="review-link" to="/continuous">
          Continuous Review
        </Link>

        <Outlet></Outlet>
      </div>
    )
  }

  // Admins can access all reviews and other features as well.
  if(role === "admin"){
    return (
      <div className="all-links">
        <h1>ADMIN EXTRA STUFF GOES HERE</h1>
      
        <div className="linkbutton">
          <Link className="review-link" to="/continuous">
            Continuous Review
          </Link>
        </div>
        <div className="linkbutton">
          <Link className="review-link" to="/semester">
            Semester Review
          </Link>
        </div>
        <div className="linkbutton">
          <Link className="review-link" to="/safety">
            Safety Review
          </Link>
        </div>
        <div className="linkbutton">
          <Link className="review-link" to="/management">
            Management Review
          </Link>
        </div>
    
        <Outlet></Outlet>
      </div>
    )
  }

  // Staff can access all reviews
  if(role === "staff"){
    return (
      <div>
        <div className="linkbutton">
          <Link className="review-link" to="/continuous">
            Continuous Review
          </Link>
        </div>
        <div className="linkbutton">
          <Link className="review-link" to="/semester">
            Semester Review
          </Link>
        </div>
        <div className="linkbutton">
          <Link className="review-link" to="/safety">
            Safety Review
          </Link>
        </div>
        <div className="linkbutton">
          <Link className="review-link" to="/management">
            Management Review
          </Link>
        </div>
    
        <Outlet></Outlet>
      </div>
    )
  }
};

export default ReviewSelection;