import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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

const ResetPassword = () => {
  const { id } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    const data = {
      token: id,
      password: password,
    };

    try {
      // Make an API request to update the user's password
      const response = await axios.post('/api/reset-password', data);
      console.log(response);

      // Display a message to user that the password has been reset.
      alert('Password reset successfully.');
      // You can redirect the user to the login page or another appropriate page
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('Failed to reset password. Please try again.');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h4>Reset Password</h4>
        <Input
          type="password"
          name="password"
          placeholder="Enter new password"
          value={password}
          onChange={handleInputChange}
          required
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={handleInputChange}
          required
        />
        <Button type="submit">Reset Password</Button>
      </Form>
    </Container>
  );
};

export default ResetPassword;