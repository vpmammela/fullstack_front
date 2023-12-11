import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useUser } from '../../UserContext';
import useAuthStore from '../../stores/auth';
import { useNotification } from '../../NotificationContext';
import { Link, useNavigate } from 'react-router-dom';
import Notification from '../Notification/Notification';
import redSnow from '../../Images/redsnow.jpg';
import logo from '../../Images/logo.png';
import ForgotPassword from '../ForgotPassword';

const AppContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url(${redSnow});
  background-size: cover;
  background-position: center;
  overflow: hidden; /* Scrolling disabled */
`;

const LogoContainer = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%); 
  z-index: 2;
`;

const LogoImage = styled.img`
  width: 300px;
  height: auto;
`;

const GrayHalfBall = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60vh;
  background-color: lightgray;
  border-top-left-radius: 40% 50px;
  border-top-right-radius: 40% 50px;
  overflow: hidden;
`;

const LoginFormContainer = styled.div`
  position: absolute;
  top: 65%; 
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const LoginFormContent = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border: none;
  border-radius: 5px;
  background-color: white;
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  border: none;
  border-radius: 5px;
  background-color: #C9431B;
  color: white;
  cursor: pointer;
  font-weight: bold;
`;

const SignInHeader = styled.h2`
  color: red;
  margin-top: 0;
  margin-bottom: 20px;
  text-align: center;
`;

const LoginForm = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { setUser } = useUser();
  const { setNotification } = useNotification();
  const authStore = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Disable scrolling when the component mounts.
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling when the component unmounts.
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      await authStore.login({ username, password });
      //authStore.isAuth = true;

      setUsername('');
      setPassword('');
      setUser(username);

      setNotification(`Logging in with ${username}`);
      navigate('/');
    } catch (exception) {
      setNotification('Tarkista kirjautumistiedot');
    }
  };

  return (
    <AppContainer>
      <LogoContainer>
        <Notification />
        <LogoImage src={logo} alt="Logo" />
      </LogoContainer>
      <GrayHalfBall />
      <LoginFormContainer>
        <LoginFormContent>
          <SignInHeader>Kirjaudu sisään</SignInHeader>
          <form onSubmit={handleLogin}>
            <StyledInput
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
              placeholder="Username"
            />
            <StyledInput
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
              placeholder="Password"
            />
            <StyledButton id="login-button" type="submit">
              Kirjaudu
            </StyledButton>
          </form>
          <br/>
          {/*<Link to="/forgotPassword">Unohtuiko salasana?</Link>*/}
        </LoginFormContent>
      </LoginFormContainer>
    </AppContainer>
  );
};

export default LoginForm;