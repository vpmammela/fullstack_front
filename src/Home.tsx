
import { Link } from "react-router-dom";
import './components/styles.css'
  
// Shows LoginForm when user is not signed in. Shows HomeComponent when user is signed in.
const Home = () => {
  return (
    <div className="home-container">
      <div className='selection-background'>
        <div className="linkbutton">
          <Link className="review-link" to="/roomselection">
            Tee katselmointi
          </Link>
        </div>
        <div className="linkbutton">
          <Link className="review-link" to="/roomselection">
            Huoneen ohjeet
          </Link>
        </div>
        <div className="linkbutton">
          <Link className="review-link" to="/roomselection">
            Raportit
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home;