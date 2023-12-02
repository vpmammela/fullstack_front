import React, { useState, ChangeEvent } from 'react';
import { Form } from 'react-router-dom';
import { useUser } from '../../UserContext';
import redSnow from '../../Images/redsnow.jpg';
import logo from '../../Images/logo.png';
import styled from 'styled-components';
import { faSmile, faMeh, faFrown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ContinuousReviewContainer = styled.div`
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

const GrayBackground = styled.div`
  position: fixed; /* Fixed position to keep it visible while scrolling */
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
  z-index: 1; /* Ensure it's above the photo container */
`;

// Photo container for viewing downloaded photo.
const PhotoContainer = styled.div`
  overflow-y: auto; /* Enable vertical scrolling */
  height: 100%;
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
  width: 200px;
  height: auto;
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

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 20px;
`;

const SaveButton = styled.button`
  background-color: #C9431B;
  border-radius: 5px;
  color: white;
  font-size: 20px;
  padding: 10px 20px;
  margin-top: auto; // Show button at bottom of page.
`;

// ACTION
export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const response = await fetch('', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  console.log(result);
}

// ContinuousReview Component
const ContinuousReview = () => {
  const { user } = useUser();
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string>(''); // 'happy', 'neutral', 'sad'

  const handleMoodSelection = (mood: string) => {
    setSelectedMood(mood);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setPhoto(file || null);

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPhotoUrl(imageUrl);
    } else {
      setPhotoUrl(null);
    }
  };

  return (
    <div>
      <ContinuousReviewContainer>
      <LogoContainer>
          <LogoImage src={logo} alt="Logo" />
        </LogoContainer>
        <GrayBackground>
          <PhotoContainer>
            <FormContainer>
            <h2>Jatkuva katselmointi</h2>
              <Form method="post">
                <FormLabel> Tilan yleisilme</FormLabel>
                <div>
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
                </div>
                <FormInput type="text" name="attentions" placeholder="Huomiot ja kehitysideat" />
                <FormInput type="text" name="developmentIdeas" placeholder="Kirjoita muut huomiot tähän" />
                <FormInput type="text" name="positiveThings" placeholder="Mitä positiivista olet huomannut tarkastusjasolla?" />
                <br />
                <FormLabel>Valitse kuva</FormLabel>
                <FileInput type="file" accept="image/*" capture="environment" onChange={handleFileChange} />
                <p>
                  Image preview:
                  {photoUrl ? <img src={photoUrl} alt="Selected" style={{ maxWidth: '80%' }} /> : null}
                </p>
                <div></div>
              </Form>
              <div>
                <SaveButton type="submit">Tallenna</SaveButton>
              </div>
            </FormContainer>
          </PhotoContainer>
        </GrayBackground>
      </ContinuousReviewContainer>
    </div>
  );
};

export default ContinuousReview;
