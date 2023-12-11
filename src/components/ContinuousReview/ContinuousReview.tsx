import React, { useState, ChangeEvent } from 'react';
import { Form } from 'react-router-dom';
import { useUser } from '../../UserContext';
import redSnow from '../../Images/redsnow.jpg';
import logo from '../../Images/logo.png';
import styled from 'styled-components';
import { faSmile, faMeh, faFrown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../header';
import { useNotification } from '../../NotificationContext';
import { useReviewContext } from '../../ReviewContext';
import { createInspectionResult } from '../../services/inspectionresult';
import { getInspectionTargetById, getInspectionTargetsByEnviromentsId } from '../../services/inspectiontarget';
import { createInspectionForm } from '../../services/inspectionform';
import PreviousReviews from '../PreviousReviews/PreviousReviews';

const GrayBackground = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: lightgray;
  border-top-left-radius: 0% 50px;
  border-top-right-radius: 0% 50px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  z-index: 1; /* Ensure it's above the photo container */

  @media (max-width: 768px) {
    padding-top: 70px; /* Adjust padding for smaller screens */
  }
`;

// Photo container for viewing downloaded photo.
const PhotoContainer = styled.div`
  overflow-y: auto; /* Enable vertical scrolling */
  height: 100%;
`;

const FileInput = styled.input`
  margin-top: 5px;
  @media (max-width: 768px) {
    min-width: 100px;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 230px;

  @media (max-width: 768px) {
    padding-top: 100px; /* Adjust padding for smaller screens */
  }

  /* Add styles for making the form scrollable */
  max-height: calc(100vh - 70px); /* Adjust the value based on your design */
  overflow-y: auto;
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

interface ResultData {
  value: number;
  note: string;
  title: string;
  inspectionform_id: number;
}

// ContinuousReview Component
const ContinuousReview = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [value, setValue] = useState<number>(0);
  const [note, setNote] = useState<string>('');

  const { setNotification } = useNotification();

  const { environment_id } = useReviewContext();
  const { inspectiontarget_id } = useReviewContext();



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

  // Function to handle radio button changes
  const handleRadioChange = (choice: number) => {
    setValue(choice);
  };

  // Function to handle text input changes
  const handleTextChange = (comment: string) => {
    setNote(comment);
  };

  // Function to handle data for result
  const handleDataForResult = (inspectionform_id: number): ResultData => {
    return {
      value,
      note,
      title: 'Yleisilme',
      inspectionform_id
    };
  };

  // Sends form data and result data to backend
  const sendResultData = async (inspectiontype: string) => {

    let room: { name: string; } | null = null;
    try {
      room = await getInspectionTargetById(inspectiontarget_id!);
    } catch (e) {
      setNotification(`Virhe huoneen haussa: ${e}`)
    }
    let targets = null;
    let target = null;
    try {
      targets = await getInspectionTargetsByEnviromentsId(environment_id!);
      target = targets.inspectiontargets.filter((target: { name: string; }) => target.name === room!.name);
    } catch (e) {
      setNotification(`Virhe huoneen haussa: ${e}`)
    }

    const formSend = {
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
      inspectionform = await createInspectionForm(formSend);
    } catch (e) {
      setNotification(`Virhe katselmoinnin tallentamisessa: ${e}`)
    }

    // creates result
    const resultData = handleDataForResult(inspectionform!.id);
    try {
      await createInspectionResult(resultData)
    } catch (e) {
      setNotification(`Virhe vastauksen tallentamisessa: ${e}`)
    }
  };

  return (
    <GrayBackground>
      <Header/>
    <FormContainer>
    <div>
      <div>
        <br></br>
        <h2>Yleisilme</h2>
        <label>Puutteellinen</label>
        <input type="radio" value="1" name="general" onChange={() => handleRadioChange(1)} />
        <label>Sitoutunut</label>
        <input type="radio" value="2" name="general" onChange={() => handleRadioChange(2)} />
        <label>Edelläkävijä</label>
        <input type="radio" value="3" name="general" onChange={() => handleRadioChange(3)} />
        <br />
        <br/>
        <label>Huomiot: </label>
        <br/>
        <input type="text" name="generalComment" onChange={(e) => handleTextChange(e.target.value)} />
        <br />
        <br />
        <h3>Valitse kuva</h3>
          <FileInput type="file" accept="image/*" capture="environment" onChange={handleFileChange} />
          <p>
            Image preview:
            {photoUrl ? <img src={photoUrl} alt="Selected" style={{ maxWidth: '50%' }} /> : null}
          </p>
        <div>
            <br/>
            <button type="button" onClick={() => sendResultData("continuous")}>
              Send Data
            </button>
            <br/>
            <br/>
        </div>
      </div>
      <h3>Aiemmat jatkuvat katselmoinnit</h3>
        <PreviousReviews type={"continuous"}></PreviousReviews>
    </div>
    </FormContainer>
    </GrayBackground>
  )
};

export default ContinuousReview;
function handleDataForResult(category: string, id: number) {
  throw new Error('Function not implemented.');
}

