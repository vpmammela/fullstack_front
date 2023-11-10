import { useState } from "react";
import { useUser } from '../../UserContext';
import useAuthStore from "../../stores/auth";

const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setUser } = useUser();
  const authStore = useAuthStore();

  const handleLogin = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      //await authStore.login([["username", username], ["password", password]]);
      
      const user = {
        username,
        role: "user role" // value can be student, staff, or admin
      };
      window.sessionStorage.setItem("loggedUser", JSON.stringify(user));

      setUsername("");
      setPassword("");
      console.log("logging in with", user.username, password);
      setUser(user.username)
    } catch (exception) {
      console.log("wrong username or password");
    }
  };

  return (
    <div className="login-form-container">
      <div className="logincontainer">
        <div className="form">
      <h2 className="login-title">Sign in</h2>
      
      <form onSubmit={handleLogin}>
          <div className="usernametext">username</div>
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <div className="passwordtext">password</div>
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        <button id="login-button" type="submit" className="loginbutton">
          Login
        </button>
      </form>
      </div>
    </div>
    </div>
  );
};

export default LoginForm;
