import { useNavigate} from "react-router-dom";
import { useUser } from '../../UserContext';
import useAuthStore from "../../stores/auth";


interface SignedInUserProps {
  setNotification: (notification: string) => void;
}

const SignedInUser = ({ setNotification }: SignedInUserProps) => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const authStore = useAuthStore();

  const handleLogout = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      await authStore.logout();

      window.sessionStorage.removeItem("auth-store");
      window.sessionStorage.removeItem("loggedUser");
      console.log("logged out", user);
      setUser(null);
      navigate("/");
    } catch (exception: any) {
      setNotification(`Logout failed: ${exception.message}`);
    }
  };

  if(window.sessionStorage.getItem("auth-store") == null){
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
