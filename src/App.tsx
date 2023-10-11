import { useEffect, useState } from "react";
import Notification from "./components/Notification/Notification";
import SignedInUser from "./components/SignedInUser/SignedInUser";
import LoginForm from "./components/LoginForm/LoginForm";
import HomeComponent from "./components/HomeComponent/HomeComponent";
import ReviewInfo from "./components/ReviewInfo/ReviewInfo";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ContinuousReview from "./components/ContinuousReview/ContinuousReview";
import ManagementReview from "./components/ManagementReview/ManagementReview";
import SafetyReview from "./components/SafetyReview/SafetyReview";
import SemesterReview from "./components/SemesterReview/SemesterReview";
import backgroundImage from './Images/redsnow.jpg';
import TestBackendConnection from "./components/TestBackendConnection/TestBackendConnection";


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
  
  // Shows LoginForm when user is not signed in. Shows HomeComponent when user is signed in.
  const Home = () => (
    <div>
      {user === null ? <LoginForm setUser={setUser} /> : <HomeComponent />}
    </div>
  );

  return (
    <Router>
      <div>
        <Link to="/">
          Home
        </Link>
      </div>
      <Notification notification={notification}/>
      <SignedInUser user={user || ''} setUser={setUser} setNotification={setNotification} />
      <Routes>
        <Route path="/reviews/:id" element={<ReviewInfo />} />
        <Route path="/continuous" element={<ContinuousReview user={user}/>} />
        <Route path="/semester" element={<SemesterReview user={user}/>} />
        <Route path="/safety" element={<SafetyReview user={user}/>} />
        <Route path="/management" element={<ManagementReview user={user}/>} />
        <Route path="/" element={Home()} />
      </Routes>
      <TestBackendConnection/>
    </Router>
  );
};

export default App;

