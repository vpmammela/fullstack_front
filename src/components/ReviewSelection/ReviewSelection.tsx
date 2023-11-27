import { Link, Outlet } from "react-router-dom";
import "../styles.css";


// Links to all types of reviews when user is admin/staff. Link to ContinuousReview if user is student
const ReviewSelection = () => {
  // Retrieve the logged user from sessionStorage
  const storedUserJSON = window.sessionStorage.getItem("loggedUser");
  let storedUser = null;

  if (storedUserJSON !== null) {
    storedUser = JSON.parse(storedUserJSON);
  }

  // Students can only access continuous reviews
  if(storedUser?.role === "student"){
    return (
      <Link className="review-link" to="/continuous">
        Continuous Review
      </Link>
    )
  }

  // Admins can access all reviews and other features as well.
  if(storedUser?.role === "admin"){
    return (
      <div className="all-links">
        <h1>ADMIN EXTRA STUFF GOES HERE</h1>
        <Link className="review-link" to="/continuous">
          Continuous Review
        </Link><br></br>
        <Link className="review-link" to="/semester">
          Semester Review
        </Link><br></br>
        <Link className="review-link" to="/safety">
          Safety Review
        </Link><br></br>
        <Link className="review-link" to="/management">
          Management Review
        </Link><br></br>
      </div>
    )
  }

  // Staff can access all reviews
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
};

export default ReviewSelection;