import { Link } from "react-router-dom";
import "./styles.css";

const ReviewForm = () => {
  return (
    <div>
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
  );
};

export default ReviewForm;
