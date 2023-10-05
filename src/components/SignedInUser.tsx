const SignedInUser = ({ name, setUser, setNotification }) => {

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      window.localStorage.removeItem("loggedUser");
      console.log("logged out", name);
      setUser(null)
    } catch (exception) {
      setNotification(`Logout failed: ${exception.message}`, 3);
    }
  };

  return (
    <div className="signedIn">
      <br></br>
      {name} logged in <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default SignedInUser;
