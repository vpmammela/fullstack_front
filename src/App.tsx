import { Fragment, useEffect, useState } from "react";
import Notification from "./components/Notification";
import SignedInUser from "./components/SignedInUser";
import ReviewForm from "./components/ReviewForm";
import ReviewInfo from "./components/ReviewInfo";
import { LoginPage } from "./components/LoginScreen/LoginPage";
import { Outlet, useNavigate } from "react-router-dom";
import { NavigationBar } from "./components/NavBar/NavigationBar";

// This level shows LoginPage, after logging in user goes to HomePage.
const App = () => {
  const [user, setUser] = useState<string | null>(null);
  const [notification, setNotification] = useState<string>("default notification");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      console.log("user:", user)
    }
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // On Logout --> LoginPage.
  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div>
      {isLoggedIn ? (
        <Fragment>
          <NavigationBar handleLogout={handleLogout} />
          <Outlet />
        </Fragment>
      ) : (
        <LoginPage onLoginFunction={setIsLoggedIn} />
      )}
    </div>
  )
};
export default App;

