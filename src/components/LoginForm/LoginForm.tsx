import React, { useState } from 'react';
import styled from 'styled-components';
import { useUser } from '../../UserContext';
import useAuthStore from '../../stores/auth';
import { useNotification } from '../../NotificationContext';
import { useNavigate } from 'react-router-dom';
import Notification from '../Notification/Notification';
import redSnow from '../../Images/redsnow.jpg';
import logo from '../../Images/logo.png';
import ContinuousReview from '../ContinuousReview/ContinuousReview';
import ManagementReview from '../ManagementReview/ManagementReview';
import SafetyReview from '../SafetyReview/SafetyReview';

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

// AMK logo.
const LogoContainer = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%); 
  z-index: 2; /* Logo is on top of everything */
`;

const LogoImage = styled.img`
  width: 300px;
  height: auto;
`;

// Background for loginform.
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

// Login form position.  
const LoginFormContainer = styled.div`
  position: absolute;
  top: 60%; /* Adjust the top position */
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1; /* Login form is on top of the gray half ball */
`;

// Content of login form. 
const LoginFormContent = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 20px;
  box-sizing: border-box;
`;

// Input fields.
const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border: none;
  border-radius: 5px;
  background-color: white; /* White background for the form fields */
`;

// Login button.
const StyledButton = styled.button`
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  border: none;
  border-radius: 5px;
  background-color: #C9431B; /* Custom color for the button */
  color: white; /* Text color for the button */
  cursor: pointer;
`;

const SignInHeader = styled.h2`
  color: red;
  margin-top: 0;
  margin-left: 38%
`;

const LoginForm = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { setUser } = useUser();
  const { setNotification } = useNotification();
  const authStore = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      await authStore.login({ username, password });

      const user = {
        username,
        role: 'user role', // value can be student, staff, or admin
      };
      window.sessionStorage.setItem('loggedUser', JSON.stringify(user));

      setUsername('');
      setPassword('');
      setUser(user.username);

      setNotification(`Logging in with ${user.username}`);
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
          <SignInHeader>Sign in</SignInHeader>
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
              Login
            </StyledButton>
          </form>
        </LoginFormContent>
      </LoginFormContainer>
    </AppContainer>
  );
};

export default LoginForm;
