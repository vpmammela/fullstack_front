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
  overflow: hidden; /* Scrolling disabled */
`;

// Background for form.
const GrayBackground = styled.div`
  position: absolute;
  top: 66%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: #e7e7e7;
 
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
`;

const FormTable = styled.table`
  width: 100%;
  max-width: 400px;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  
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
const FromThead = styled.thead`
`
const FromTd = styled.td`
  background-color: white;
  color: #333;
  border-bottom: 1px solid #e9e9e9;
  text-align: left;
  padding: 15px;
  position: relative;`

  const RadioInput = styled.input`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`
const FormTitle =styled.h3`
display: grid;
  place-items: center;

`
const FromTr = styled.tr`

`

const ManagementReview = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [selectedMood, setSelectedMood] = useState<string>(''); // 'happy', 'neutral', 'sad'
  const [answers, setAnswers] = useState({});

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setPhoto(file || null);
  };

  const handleMoodSelection = (mood: string) => {
    setSelectedMood(mood);
  };

  const questions = [
    'Yleinen vuosi- ja turvallisuuskatselmointien tilanne',
    '6S-toiminnan tavoitteet',
    '6S-vuosikello ja päivitystarpeet',
    '6S-dokumentaatio ja dokumenttien säilytyspaikka',
    '6S-toiminnassa havaitutu kehitysehdotukset ja niiden edistyminen - kehitysideapankki',
    '6s-resurssoinnin toimivuus ja roolit',
    '6S-viestintä ja brändi'
  ];
  const ratingOptions = ['HEIKKO', 'PUUTTEELLINEN', 'PERUSTASO', 'SITOUTUNUT', 'EDELLÄKÄVIÄ'];

  const handleRadioChange = (questionIndex, rating) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: rating,
    }));
  };

  return (
    <ManagementReviewContainer>
      
      <GrayBackground>
        <h2>Toimintamallin ja johtamisen katselmointi</h2>
        <FormTable className="table">
        <FromThead>
        <FormTitle>Toimintamallin katselmointi</FormTitle>
        <tr>
          <th>AIHE</th>
          {ratingOptions.map((option, index) => (
            <th key={index}>{option}</th>
          ))}
        </tr>
        </FromThead>
          <tbody>
          {questions.map((question, questionIndex) => (
          <tr key={questionIndex}>
            <FromTd>{question}</FromTd>
            {ratingOptions.map((option, optionIndex) => (
              <FromTd key={optionIndex}>
                <RadioInput
                  type="radio"
                  name={`question${questionIndex}`}
                  value={option}
                  checked={answers[questionIndex] === option}
                  onChange={() => handleRadioChange(questionIndex, option)}
                />
              </FromTd>
            ))}
          </tr>
          ))}
            <FormRow>
              <td>
                <FormLabel>Muita Huomiota</FormLabel>
                <FormInput type="text" id="comments1" />
              </td>
            </FormRow>
            <FormRow>
              <td>
                <FormLabel htmlFor="comments1">Mitä positiivista olet huomannut tarkastusjaksolla? Palkitsemusehdotus</FormLabel>
                <FormInput type="text" id="comments2" />
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