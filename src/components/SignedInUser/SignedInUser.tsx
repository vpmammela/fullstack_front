import { useNavigate} from "react-router-dom";
import { useUser } from '../../UserContext';


interface SignedInUserProps {
  setNotification: (notification: string) => void;
}

const SignedInUser = ({ setNotification }: SignedInUserProps) => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

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
      {user} logged in
        <button className="logoutButton" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default SignedInUser;
