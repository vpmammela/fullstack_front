import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import '../styles.css';
import { useReviewContext } from "../../ReviewContext";
import { useNotification } from "../../NotificationContext";
import Header from '../header';
import { getInspectionTargetById, getInspectionTargetsByEnviromentsId } from '../../services/inspectiontarget';
import { createInspectionResult } from "../../services/inspectionresult";
import { createInspectionForm } from "../../services/inspectionform";

const ManagementReviewContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-size: cover;
  background-position: center;
  overflow: hidden; /* Scrolling disabled */
`;

// Background for form.
const GrayBackground = styled.div`
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-height: 80vh; 
  background-color: #e7e7e7;

  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
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
  margin-top:10px
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
const SaveButton = styled.button`
  background-color: #C9431B;
  border-radius: 5px;
  color: white;
  font-size: 20px;
  padding: 10px 20px;
  margin-top: auto; // Show button at the bottom of the container.
  margin-left: 38%;
`;


interface FormData {
  [key: string]: {
    condition: string;
    note: string;
  };
}
interface ResultData {
  value: number;
  note: string;
  title: string;
  inspectionform_id: number;
}

const evaluationMap: { [key: string]: number } = {
  heikko: 0,
  puutteelinen: 1,
  perustaso: 2,
  sitoutunut: 3,
  edelläkävijä: 4
};

const ManagementReview = () => {

  // Initialize state to store selected values and notes
  const [formData, setFormData] = useState<FormData>({
    question1: { condition: '', note: '' },
    question2: { condition: '', note: '' },
    question3: { condition: '', note: '' },
    question4: { condition: '', note: '' },
    question5: { condition: '', note: '' },
    question6: { condition: '', note: '' },
    question7: { condition: '', note: '' },
  });

  const { environment_id } = useReviewContext();
  const { inspectiontarget_id } = useReviewContext();
  const [photo, setPhoto] = useState<File | null>(null);
  const [answers, setAnswers] = useState({});
  const [description, setDescription] = useState('');
  const { setNotification } = useNotification();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setPhoto(file || null);
  };

   // Event handler for the "description" input field
   const handleDescriptionChange = (e: { target: { value: any; }; }) => {
    const newDescription = e.target.value;
    setDescription(newDescription);
  };
// Function to handle radio button changes
  const handleRadioChange = (category: string, property: 'condition', value: string) => {
    setFormData((prevData) => ( console.log("p",prevData),{
      ...prevData,
      [category]: { ...prevData[category], [property]: value },
    }));
    console.log("######",JSON.stringify(FormData, null, 2))
  };

    // Function to handle text input changes
    const handleTextChange = (category: string, note: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [category]: { ...prevData[category], note },
    }));
  };

   // Function to handle data for result
   const handleDataForResult = (category: string, inspectionform_id: number): ResultData => {
    console.log("FORMDATA", formData)

    const { condition, note } = formData[category];
    const value = evaluationMap[condition];
    console.log("value", value)
    return {
      value,
      note,
      title: questions[category] || 'Unknown Question',
      inspectionform_id
    };
  };

  // Sends form data and result data to backend
  const sendResultData = async (inspectiontype: string) => {
    console.log(description)

    let room: { name: string; } | null = null;
    try {
      room = await getInspectionTargetById(inspectiontarget_id!);
    } catch (e) {
      setNotification(`Virhe huoneen haussa: ${e}`)
    }
    let targets = null;
    try {
      targets = await getInspectionTargetsByEnviromentsId(environment_id!);
    } catch (e) {
      setNotification(`Virhe huoneen haussa: ${e}`)
    }
    const target = targets.inspectiontargets.filter((target: { name: string; }) => target.name === room.name);

    const formData = {
      environment_id,
      inspectiontarget_id: target[0].id,
      inspectiontype
    }
    
    // Upload photo if available
    if (photo) {
      const formData = new FormData();
      formData.append('photo', photo);

      // TODO: Replace with the actual API endpoint.
      //await axios.post('your-upload-api', formData);
    }

    // creates form
    let inspectionform: { id: number; } | null = null;
    try{
      inspectionform = await createInspectionForm(formData);
    } catch (e) {
      setNotification(`Virhe katselmoinnin tallentamisessa: ${e}`)
    }

    // creates all results
    Object.keys(questions).forEach(async (category) => {
      const resultData = handleDataForResult(category, inspectionform.id);
      try {
        await createInspectionResult(resultData)
      } catch (e) {
        setNotification(`Virhe vastauksen tallentamisessa. Valitse jokaisesta kysymyksestä vaihtoehto: ${e}`)
      }
    });
  };



  const questions =[
    'Yleinen vuosi- ja turvallisuuskatselmointien tilanne',
    '6S-toiminnan tavoitteet',
    '6S-vuosikello ja päivitystarpeet',
    '6S-dokumentaatio ja dokumenttien säilytyspaikka',
   '6S-toiminnassa havaitutu kehitysehdotukset ja niiden edistyminen - kehitysideapankki',
    '6s-resurssoinnin toimivuus ja roolit',
    '6S-viestintä ja brändi'
];
  const questionsManagement =['Johtamisen portaikko - tason arviointi']

  const ratingOptions = ['HEIKKO', 'PUUTTEELLINEN', 'PERUSTASO', 'SITOUTUNUT', 'EDELLÄKÄVIÄ', 'HUOMIOT'];


    
  return (
    <ManagementReviewContainer>
      <Header/>
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
                {option !== 'HUOMIOT' ? (
                  <RadioInput
                    type="radio"
                    name={`question${questionIndex}`}
                    value={option}
                    //checked={answers[questionIndex] === option}
                    onChange={() => handleRadioChange('general', 'condition', option)}
                  />
                ) : (
                  <input
                    type="text"
                    name="generalComment"
                    onChange={(e) => handleTextChange('general', e.target.value)}
                  />
                )}
                </FromTd>
             
              ))}
            </tr>
            ))}
            </tbody>
            <FromThead>
              <FormTitle>Johtamisen katselmointi</FormTitle>
                <tr>
                  <th>AIHE</th>
                  {ratingOptions.map((option, index) => (
                    <th key={index}>{option}</th>
                  ))}
                </tr>
            </FromThead>
            <tbody>
              {questionsManagement.map((question, questionIndex) => (
            <tr key={questionIndex}>
              <FromTd>{question}</FromTd>
              {ratingOptions.map((option, optionIndex) => (
                <FromTd key={optionIndex}>
                {option !== 'HUOMIOT' ? (
                  <RadioInput
                    type="radio"
                    name={`question${questionIndex}`}
                    value={option}
                    //checked={answers[questionIndex] === option}
                    onChange={() => handleRadioChange('general', 'condition', option)}
                  />
                ) : (
                  <input
                    type="text"
                    name="generalComment"
                    onChange={(e) => handleTextChange('general', e.target.value)}
                  />
                )}
                </FromTd>
              ))}
            </tr>
            ))}
            </tbody>
            <tbody>
            <FormRow>
              <td>
                <FormLabel>Muita Huomiota</FormLabel>
                <FormInput type="text" id="comments1" onChange={handleDescriptionChange}/>
              </td>
            </FormRow>
            <FormRow>
              <td>
                <FormLabel htmlFor="comments1">Mitä positiivista olet huomannut tarkastusjaksolla? Palkitsemusehdotus</FormLabel>
                <FormInput type="text" id="comments2" onChange={handleDescriptionChange}/>
              </td>
            </FormRow>
            <FormRow>
              <td>
                <FormLabel>
                  Valitse kuva
                  <FileInput
                    type="file"
                    accept="image"
                    capture="environment"
                    onChange={handleFileChange}
                  />
                </FormLabel>
              </td>
            </FormRow>
            </tbody>
          <br/>
        <br/>
        <div>
        <SaveButton type="button" onClick={() => sendResultData("management")}>
          Tallenna
        </SaveButton>
        </div>
        <br/>
        <br/>
        </FormTable>
      </GrayBackground>
    </ManagementReviewContainer>
  );
};

export default ManagementReview;