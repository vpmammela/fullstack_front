import { useNavigate} from "react-router-dom";

interface SignedInUserProps {
  user: string;
  setUser: (user: string | null) => void;
  setNotification: (notification: string) => void;
}

const SignedInUser = ({ user, setUser, setNotification }: SignedInUserProps) => {
  const navigate = useNavigate();

  const handleLogout = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      window.localStorage.removeItem("loggedUser");
      console.log("logged out", user);
      setUser(null);
      navigate("/");
    } catch (exception) {
      setNotification(`Logout failed: ${exception.message}`);
    }
  };

  if(window.localStorage.getItem("loggedUser") == null){
    return null
  }
  
  return (
    <div className="signedIn">
      <br></br>
      {user} logged in <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default SignedInUser;
