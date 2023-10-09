import React, { useState } from 'react';
import { LoginForm } from '../LoginForm';
import { useNavigate } from 'react-router-dom';

interface Props {
    onLoginFunction: Function
}

export const LoginPage = (props: Props) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSuccessfulLogin = async () => {
        props.onLoginFunction(true);
        // TODO: Login user data here.
    };

    return (
        <div className={`flex justify-center items-center h-screen w-screen`}>
          {!isLoggedIn && <LoginForm onLogin={handleSuccessfulLogin}/>}
          {/*isLoggedIn && <NavigationBar handleLogout={handleLogout}/>} {/* Only render NavigationBar when isLoggedIn is true */}
        </div>
      );
};