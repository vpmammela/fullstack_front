import { useUser } from '../../UserContext';
import useAuthStore from "../../stores/auth";
import { useNotification } from "../../NotificationContext";


const SignedInUser = () => {
  const { user, setUser } = useUser();
  const authStore = useAuthStore();
  const { setNotification } = useNotification();
  

  const handleLogout = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      await authStore.logout();

      window.sessionStorage.removeItem("auth-store");
      window.sessionStorage.removeItem("loggedUser");
      setNotification(`logged out ${user}`);
      setUser(null);
    } catch (exception: any) {
      setNotification(`Logout failed: ${exception.message}`);
    }
  };

  if(!authStore.isAuth){
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
