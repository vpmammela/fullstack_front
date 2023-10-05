interface SignedInUserProps {
  name: string;
  setUser: (user: string) => void;
  setNotification: (notification: string) => void;
}

const SignedInUser = ({ name, setUser, setNotification }: SignedInUserProps) => {

  const handleLogout = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      window.localStorage.removeItem("loggedUser");
      console.log("logged out", name);
      setUser(null)
    } catch (exception) {
      setNotification(`Logout failed: ${exception.message}`);
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
