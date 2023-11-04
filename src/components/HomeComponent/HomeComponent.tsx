import { Link } from "react-router-dom";
import "../styles.css";
import QRreader from "../QRcomponent/QRreader";

// Links to all types of reviews when user is admin/staff. Link to ContinuousReview if user is student
const HomeComponent = () => {
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
    <div className="gray-background">
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
      <QRreader/>
    </div>
  )
};

export default HomeComponent;