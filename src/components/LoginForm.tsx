import { useState } from "react";

const LoginForm = ({ setUser, setPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = {
        username,
        password,
      };
      window.localStorage.setItem("loggedUser", JSON.stringify(user.username));
      setUsername("");
      setPassword("");
      console.log("logging in with", user.username, password);
      setUser(user.username)
      setPage("home");
    } catch (exception) {
      console.log("wrong username or password");
    }
  };

  return (
    <div className="login-form-container">
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
