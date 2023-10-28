import { useState } from "react";
import { useUser } from '../../UserContext';

const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setUser } = useUser();


  const handleLogin = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      // Here a loginService will take care of logging in the user
      // the login function should return the user's role as well
      /*
      const user = await loginService.login({
        username,
        password,
      });
      */
      // Placeholder user object, until loginService is implemented
      const user = {
        username,
        role: "user role" // value can be student, staff, or admin
      };
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      // reviewService will set a token
      //reviewService.setToken(user.token);
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
