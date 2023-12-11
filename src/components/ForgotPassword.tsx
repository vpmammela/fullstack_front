import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const GrayBackground = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100vh;
  background-color: lightgray;
  border-top-left-radius: 0% 50px;
  border-top-right-radius: 0% 50px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  z-index: -1; 
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Form = styled.form`
  width: 300px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border: none;
  border-radius: 5px;
  background-color: white;
`;

const Button = styled.button`
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

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const data = {
      email: email,
    };

    try {
      // API request to send a reset link to provided email.
      const response = await axios.post('/api/reset-password', data);
      console.log(response);

      // Display a message to user that the reset link has been sent.
      alert('Password reset link sent to your email.');
    } catch (error) {
      console.error('Error sending reset link:', error);
      alert('Failed to send reset link. Please try again.');
    }
  };

  return (
    <><GrayBackground />
    <Container>
      <Form onSubmit={handleSubmit}>
        <h4>Resetoi salasana</h4>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleInputChange}
          required />
        <Button type="submit">Lähetä</Button>
      </Form>
    </Container></>
  );
};

export default ForgotPassword;