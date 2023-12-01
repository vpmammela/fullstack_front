import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faMeh, faFrown } from '@fortawesome/free-solid-svg-icons';
import '../styles.css';
import redSnow from '../../Images/redsnow.jpg';
import logo from '../../Images/logo.png';

const ManagementReviewContainer = styled.div`
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

// Background for form.
const GrayBackground = styled.div`
  position: absolute;
  top: 66%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 70vh;
  background-color: lightgray;
  border-top-left-radius: 0% 50px;
  border-top-right-radius: 0% 50px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const FormTable = styled.table`
  width: 100%;
  max-width: 400px;
`;

const FormRow = styled.tr`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-bottom: 10px;
`;

const FormLabel = styled.label`
  margin-bottom: 5px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  margin-bottom: 10px;
`;

const IconButtonContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const IconButton = styled.button`
  background-color: ${(props) => props.color || 'transparent'};
  border: none;
  margin-right: 5px;
  padding: 0;
  cursor: pointer;
`;

const FileInput = styled.input`
  margin-top: 5px;
`;

const IconSize = '3x';

// AMK logo.
const LogoContainer = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%); 
  z-index: 2; /* Logo is on top of everything */
`;

const LogoImage = styled.img`
  width: 200px;
  height: auto;
`;

const ManagementReview = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [selectedMood, setSelectedMood] = useState<string>(''); // 'happy', 'neutral', 'sad'

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setPhoto(file || null);
  };

  const handleMoodSelection = (mood: string) => {
    setSelectedMood(mood);
  };

  return (
    <ManagementReviewContainer>
      <LogoContainer>
        <LogoImage src={logo} alt="Logo" />
      </LogoContainer>
      <GrayBackground>
        <h2>Toimintamallin ja johtamisen katselmointi</h2>
        <FormTable className="table">
          <tbody>
            <FormRow>
              <td>
                <FormLabel htmlFor="roomName">Tila</FormLabel>
                <FormInput type="text" id="roomName" />
              </td>
            </FormRow>
            <FormRow>
              <td>
                <FormLabel>Huomiot</FormLabel>
                <IconButtonContainer>
                  <IconButton
                    type="button"
                    color={selectedMood === 'happy' ? 'green' : 'transparent'}
                    onClick={() => handleMoodSelection('happy')}
                  >
                    <FontAwesomeIcon icon={faSmile} size={IconSize} />
                  </IconButton>
                  <IconButton
                    type="button"
                    color={selectedMood === 'neutral' ? 'yellow' : 'transparent'}
                    onClick={() => handleMoodSelection('neutral')}
                  >
                    <FontAwesomeIcon icon={faMeh} size={IconSize} />
                  </IconButton>
                  <IconButton
                    type="button"
                    color={selectedMood === 'sad' ? 'red' : 'transparent'}
                    onClick={() => handleMoodSelection('sad')}
                  >
                    <FontAwesomeIcon icon={faFrown} size={IconSize} />
                  </IconButton>
                </IconButtonContainer>
              </td>
            </FormRow>
            <FormRow>
              <td>
                <FormLabel htmlFor="comments1">Huomiot</FormLabel>
                <FormInput type="text" id="comments1" />
              </td>
            </FormRow>
            <FormRow>
              <td>
                <FormLabel>
                  Valitse kuva
                  <FileInput
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileChange}
                  />
                </FormLabel>
              </td>
            </FormRow>
          </tbody>
        </FormTable>
      </GrayBackground>
    </ManagementReviewContainer>
  );
};

export default ManagementReview;