import React, { useState } from "react";
import styled from "styled-components";
import axios from 'axios';

const GrayBackground = styled.div`
  position: fixed;
  top: 66%;
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
  z-index: 1;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormWrapper = styled.form`
  width: 300px;
  text-align: center;
`;

const InputWrapper = styled.div`
  position: relative;
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

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
        email: email // Correct way to access the email state
    };

    axios.post('forgot', data).then(
        res => {
            console.log(res)
        }
    ).catch(
        err => {
            console.log(err);
        }
    )
  };

  return (
    <GrayBackground>
      <FormContainer>
        <FormWrapper onSubmit={handleSubmit}>
          <h4>Unohtuiko salasana?</h4>
          <InputWrapper>
            <Input
              type="email"
              placeholder="email"
              value={email}
              onChange={handleInputChange}
            />
          </InputWrapper>
          <button className="forgot-button" type="submit">
            Submit
          </button>
        </FormWrapper>
      </FormContainer>
    </GrayBackground>
  );
};

export default ForgotPassword;