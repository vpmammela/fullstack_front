import { useState } from "react";

interface LoginFormProps {
  setUser: (user: string) => void;
}

const LoginForm = ({ setUser }: LoginFormProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      // Tähän tulee joku service joka hoitaa kirjautumisen
      const user = {
        username,
        password,
      };
      window.localStorage.setItem("loggedUser", JSON.stringify(user.username));
      setUsername("");
      setPassword("");
      console.log("logging in with", user.username, password);
      setUser(user.username)
    } catch (exception) {
      console.log("wrong username or password");
    }
  };

  // Login page - Login form. 
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
