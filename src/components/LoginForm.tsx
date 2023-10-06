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
