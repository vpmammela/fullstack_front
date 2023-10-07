import { useEffect, useState } from "react";
import Notification from "./components/Notification";
import SignedInUser from "./components/SignedInUser";
import LoginForm from "./components/LoginForm";
import ReviewForm from "./components/ReviewForm";
import ReviewInfo from "./components/ReviewInfo";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ContinuousReview from "./components/ContinuousReview/ContinuousReview";
import ManagementReview from "./components/ManagementReview/ManagementReview";
import SafetyReview from "./components/SafetyReview/SafetyReview";
import SemesterReview from "./components/SemesterReview/SemesterReview";
import TestBackendConnection from "./components/TestBackendConnection/TestBackendConnection";

// Main app
const App = () => {
  const [user, setUser] = useState<string | null>(null);
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
        <LoginForm setUser={setUser} />
      </div>
    );
  };
  
  const Home = () => (
    <div>
      {user === null ? loginForm() : <ReviewForm />}
    </div>
  );

  const Continuous = () => (
    <div>
      {user === null ? loginForm() : <ContinuousReview />}
    </div>
  );

  const Management = () => (
    <div>
      {user === null ? loginForm() : <ManagementReview />}
    </div>
  );

  const Safety = () => (
    <div>
      {user === null ? loginForm() : <SafetyReview />}
    </div>
  );

  const Semester = () => (
    <div>
      {user === null ? loginForm() : <SemesterReview />}
    </div>
  );

  return (
    <Router>
      <div>
        <Link to="/">
          home
        </Link>
      </div>
      <Notification notification={notification}/>
      <SignedInUser user={user || ''} setUser={setUser} setNotification={setNotification} />
      <Routes>
        <Route path="/reviews/:id" element={<ReviewInfo />} />
        <Route path="/continuous" element={Continuous()} />
        <Route path="/semester" element={Semester()} />
        <Route path="/safety" element={Safety()} />
        <Route path="/management" element={Management()} />
        <Route path="/" element={Home()} />
      </Routes>
      <TestBackendConnection/>
    </Router>
  );
};

export default App;

