import { useEffect, useState } from "react";
import Notification from "./components/Notification";
import SignedInUser from "./components/SignedInUser";
import LoginForm from "./components/LoginForm";
import ReviewForm from "./components/ReviewForm";
import ReviewInfo from "./components/ReviewInfo";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Main app
const App = () => {
  const [page, setPage] = useState<string>("home");
  const [user, setUser] = useState<string>(null);
  const [notification, setNotification] = useState<string>("default notification")

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      console.log("user:", user)
    }
  }, []);

  const loginForm = () => {
    return (
      <div>
        <LoginForm setUser={setUser} setPage={setPage} />
      </div>
    );
  };

  const reviewForm = () => (
    <div>
      <SignedInUser name={user} setUser={setUser} setNotification={setNotification} />
      <ReviewForm />
    </div>
  );

  const userForm = () => (
    <div>
      <SignedInUser name={user} setUser={setUser} setNotification={setNotification} />
      <h1>all users</h1>
    </div>
  );
  
  const Home = () => (
    <div>
      <Notification notification={notification}/>
      {user === null ? loginForm() : reviewForm()}
    </div>
  );

  const Users = () => (
    <div>
      <Notification notification={notification}/>
      {user === null ? loginForm() : userForm()}
    </div>
  );

  const padding = {
    padding: 5,
  };

  return (
    <Router>
      <div>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
      </div>

      <Routes>
        <Route
          path="/reviews/:id"
          element={<ReviewInfo />}
        />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={Home()} />
      </Routes>
    </Router>
  );
};

export default App;

