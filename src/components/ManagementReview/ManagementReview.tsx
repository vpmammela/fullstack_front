import { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { Form } from "react-router-dom";
import '../styles.css';
import { useReviewContext } from "../../ReviewContext";
import { useNotification } from "../../NotificationContext";
import Header from '../header';
import { getInspectionTargetById, getInspectionTargetsByEnviromentsId } from '../../services/inspectiontarget';
import { createInspectionResult } from "../../services/inspectionresult";
import { createInspectionForm } from "../../services/inspectionform";
import PreviousReviews from '../PreviousReviews/PreviousReviews';
import { createPhoto } from '../../services/photo';

const GrayBackground = styled.div`
  position: fixed; /* Fixed position to keep it visible while scrolling */
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
  z-index: 1; /* Ensure it's above the photo container */
`;

const FormContainer = styled.div`
  padding-top: 185px;
  height: 100%;
  align-items: center;
  overflow-y: auto;
  width: 100vh;

  @media (max-width: 768px) {
    padding-top: /* Adjust for smaller devices */;
    width: 100%; /* Reset width for smaller devices */
  }
`;

const FileInput = styled.input`
  margin-top: 5px;
  @media (max-width: 768px) {
    min-width: 100px;
  }
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

const questionsMap: Record<string, string> = {
  general: 'Yleinen vuosi- ja turvallisuuskatselmointien tilanne',
  goals: '6S-toiminnan tavoitteet',
  updates: '6S-vuosikello ja päivitystarpeet',
  documentation: '6S-dokumentaatio ja dokumenttien säilytyspaikka',
  development: '6S-toiminnassa havaitutu kehitysehdotukset ja niiden edistyminen - kehitysideapankki',
  resources: '6s-resurssoinnin toimivuus ja roolit',
  communication:'6S-viestintä ja brändi',
  leadership:'6S-johtamisen portaikko - tason arviointi',
};


const ManagementReview = () => {
  const { setNotification } = useNotification();
  const [description, setDescription] = useState('');

  const { environment_id } = useReviewContext();
  const { inspectiontarget_id } = useReviewContext();

  // Store the selected photo file.
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);


  // Initialize state to store selected values and notes
  const [formData, setFormData] = useState<FormData>({
    general: { condition: '0', note: '' },
    goals: { condition: '0', note: '' },
    updates: { condition: '0', note: '' },
    documentation: { condition: '0', note: '' },
    development: { condition: '0', note: '' },
    resources: { condition: '0', note: '' },
    communication: { condition: '0', note: '' },
    leadership: { condition: '0', note: '' },
  });

  // Event handler for the "description" input field
  const handleDescriptionChange = (e: { target: { value: any; }; }) => {
    const newDescription = e.target.value;
    setDescription(newDescription);
  };

  // Function to handle radio button changes
  const handleRadioChange = (category: string, property: 'condition', value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [category]: { ...prevData[category], [property]: value },
    }));
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
    const { condition, note } = formData[category];
    const value = parseInt(condition, 10);

    return {
      value,
      note,
      title: questionsMap[category] || 'Unknown Question',
      inspectionform_id
    };
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setPhoto(file || null);

    // photo preview
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPhotoUrl(imageUrl);
    } else {
      setPhotoUrl(null);
    }
  };

  // Sends form data and result data to backend
  const sendResultData = async (inspectiontype: string) => {
    console.log(description);
  
    let room: { name: string } | null = null;
    try {
      room = await getInspectionTargetById(inspectiontarget_id!);
    } catch (e) {
      setNotification(`Virhe huoneen haussa: ${e}`);
    }
    let targets = null;
    let target = null;
    try {
      targets = await getInspectionTargetsByEnviromentsId(environment_id!);
      target = targets.inspectiontargets.filter((target: { name: string }) => target.name === room!.name);
    } catch (e) {
      setNotification(`Virhe huoneen haussa: ${e}`);
    }
  
    const formSend = {
      environment_id,
      inspectiontarget_id: parseInt(target[0].id, 10),
      inspectiontype,
    };

    // creates form
    let inspectionform: { id: number } | null = null;
    try {
      inspectionform = await createInspectionForm(formSend);

      // Upload photo if available
      if (photo) {
        const formData = new FormData();
        formData.append('image', photo);
        await createPhoto(inspectionform!.id, formData);
      }
    } catch (e) {
      setNotification(`Virhe katselmoinnin tallentamisessa: ${e}`);
    }
  
    // creates all results
    Object.keys(questionsMap).forEach(async (category) => {
      const resultData = handleDataForResult(category, inspectionform!.id);
      try {
        await createInspectionResult(resultData);
      } catch (e) {
        setNotification(`Virhe vastauksen tallentamisessa: ${e}`);
      }
    });
  };


  return (
    <GrayBackground>
      <Header />
      <FormContainer>
        <div>
          <h2>
            6S Toimintamallin ja johtamisen katselmointi
          </h2>
          <div>
            <label>Huoneen kuvaus: </label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          <br />
          <Form>
            <div>
              <div>
                <h2>Toimintamallin katselmointi</h2>
                <div>
                  <label>{questionsMap['general']}</label>
                  <div>
                    <br/>
                    <label>Heikko</label>
                    <input type="radio" value="1" name="general" onChange={() => handleRadioChange('general', 'condition', '1')} />
                    <label>Puutteellinen</label>
                    <input type="radio" value="2" name="general" onChange={() => handleRadioChange('general', 'condition', '2')} />
                    <label>Perustaso</label>
                    <input type="radio" value="3" name="general" onChange={() => handleRadioChange('general', 'condition', '3')} />
                    <label>Sitoutunut</label>
                    <input type="radio" value="4" name="general" onChange={() => handleRadioChange('general', 'condition', '4')} />
                    <label>Edelläkävijä</label>
                    <input type="radio" value="5" name="general" onChange={() => handleRadioChange('general', 'condition', '5')} />
                    <br />
                    <br/>
                    <label>Huomiot: </label>
                    <br/>
                    <input type="text" name="generalComment" onChange={(e) => handleTextChange('general', e.target.value)} />
                    <br />
                    <br />
                  </div>
                </div>
              </div>
              
              <div>
                <div>
                  <label>{questionsMap['goals']}</label>
                  <div>
                    <br/>
                    <label>Heikko</label>
                    <input type="radio" value="1" name="goals" onChange={() => handleRadioChange('goals', 'condition', '1')} />
                    <label>Puutteellinen</label>
                    <input type="radio" value="2" name="goals" onChange={() => handleRadioChange('goals', 'condition', '2')} />
                    <label>Perustaso</label>
                    <input type="radio" value="3" name="goals" onChange={() => handleRadioChange('goals', 'condition', '3')} />
                    <label>Sitoutunut</label>
                    <input type="radio" value="4" name="goals" onChange={() => handleRadioChange('goals', 'condition', '4')} />
                    <label>Edelläkävijä</label>
                    <input type="radio" value="5" name="goals" onChange={() => handleRadioChange('goals', 'condition', '5')} />
                    <br />
                    <br/>
                    <label>Huomiot: </label>
                    <br/>
                    <input type="text" name="goalsComment" onChange={(e) => handleTextChange('goals', e.target.value)} />
                    <br />
                    <br />
                  </div>
                </div>
              </div>

              <div>
                <div>
                  <label>{questionsMap['updates']}</label>
                  <div>
                    <br/>
                    <label>Heikko</label>
                    <input type="radio" value="1" name="updates" onChange={() => handleRadioChange('updates', 'condition', '1')} />
                    <label>Puutteellinen</label>
                    <input type="radio" value="2" name="updates" onChange={() => handleRadioChange('updates', 'condition', '2')} />
                    <label>Perustaso</label>
                    <input type="radio" value="3" name="updates" onChange={() => handleRadioChange('updates', 'condition', '3')} />
                    <label>Sitoutunut</label>
                    <input type="radio" value="4" name="updates" onChange={() => handleRadioChange('updates', 'condition', '4')} />
                    <label>Edelläkävijä</label>
                    <input type="radio" value="5" name="updates" onChange={() => handleRadioChange('updates', 'condition', '5')} />
                    <br />
                    <br/>
                    <label>Huomiot: </label>
                    <br/>
                    <input type="text" name="updatesComment" onChange={(e) => handleTextChange('updates', e.target.value)} />
                    <br />
                    <br />
                  </div>
                </div>
              </div>

              <div>
                <div>
                  <label>{questionsMap['documentation']}</label>
                  <div>
                    <br/>
                    <label>Heikko</label>
                    <input type="radio" value="1" name="documentation" onChange={() => handleRadioChange('documentation', 'condition', '1')} />
                    <label>Puutteellinen</label>
                    <input type="radio" value="2" name="documentation" onChange={() => handleRadioChange('documentation', 'condition', '2')} />
                    <label>Perustaso</label>
                    <input type="radio" value="3" name="documentation" onChange={() => handleRadioChange('documentation', 'condition', '3')} />
                    <label>Sitoutunut</label>
                    <input type="radio" value="4" name="documentation" onChange={() => handleRadioChange('documentation', 'condition', '4')} />
                    <label>Edelläkävijä</label>
                    <input type="radio" value="5" name="documentation" onChange={() => handleRadioChange('documentation', 'condition', '5')} />
                    <br />
                    <br/>
                    <label>Huomiot: </label>
                    <br/>
                    <input type="text" name="documentationComment" onChange={(e) => handleTextChange('documentation', e.target.value)} />
                    <br />
                    <br />
                  </div>
                </div>
              </div>

              <div>
                <div>
                  <label>{questionsMap['development']}</label>
                  <div>
                    <br/>
                    <label>Heikko</label>
                    <input type="radio" value="1" name="development" onChange={() => handleRadioChange('development', 'condition', '1')} />
                    <label>Puutteellinen</label>
                    <input type="radio" value="2" name="development" onChange={() => handleRadioChange('development', 'condition', '2')} />
                    <label>Perustaso</label>
                    <input type="radio" value="3" name="development" onChange={() => handleRadioChange('development', 'condition', '3')} />
                    <label>Sitoutunut</label>
                    <input type="radio" value="4" name="development" onChange={() => handleRadioChange('development', 'condition', '4')} />
                    <label>Edelläkävijä</label>
                    <input type="radio" value="5" name="development" onChange={() => handleRadioChange('development', 'condition', '5')} />
                    <br />
                    <br/>
                    <label>Huomiot: </label>
                    <br/>
                    <input type="text" name="developmentComment" onChange={(e) => handleTextChange('development', e.target.value)} />
                    <br />
                    <br />
                  </div>
                </div>
              </div>

              <div>
                <div>
                  <label>{questionsMap['resources']}</label>
                  <div>
                    <br/>
                    <label>Heikko</label>
                    <input type="radio" value="1" name="resources" onChange={() => handleRadioChange('resources', 'condition', '1')} />
                    <label>Puutteellinen</label>
                    <input type="radio" value="2" name="resources" onChange={() => handleRadioChange('resources', 'condition', '2')} />
                    <label>Perustaso</label>
                    <input type="radio" value="3" name="resources" onChange={() => handleRadioChange('resources', 'condition', '3')} />
                    <label>Sitoutunut</label>
                    <input type="radio" value="4" name="resources" onChange={() => handleRadioChange('resources', 'condition', '4')} />
                    <label>Edelläkävijä</label>
                    <input type="radio" value="5" name="resources" onChange={() => handleRadioChange('resources', 'condition', '5')} />
                    <br/>
                    <br/>
                    <label>Huomiot</label>
                    <br/>
                    <input type="text" name="resourcesComment" onChange={(e) => handleTextChange('resources', e.target.value)} />
                    <br />
                    <br />
                  </div>
                </div>
              </div>

              <div>
                <div>
                  <label>{questionsMap['communication']}</label>
                  <div>
                    <br/>
                    <label>Heikko</label>
                    <input type="radio" value="1" name="communication" onChange={() => handleRadioChange('communication', 'condition', '1')} />
                    <label>Puutteellinen</label>
                    <input type="radio" value="2" name="communication" onChange={() => handleRadioChange('communication', 'condition', '2')} />
                    <label>Perustaso</label>
                    <input type="radio" value="3" name="communication" onChange={() => handleRadioChange('communication', 'condition', '3')} />
                    <label>Sitoutunut</label>
                    <input type="radio" value="4" name="communication" onChange={() => handleRadioChange('communication', 'condition', '4')} />
                    <label>Edelläkävijä</label>
                    <input type="radio" value="5" name="communication" onChange={() => handleRadioChange('communication', 'condition', '5')} />
                    <br/>
                    <br/>
                    <label>Huomiot</label>
                    <br/>
                    <input type="text" name="communicationComment" onChange={(e) => handleTextChange('communication', e.target.value)} />
                    <br />
                    <br />
                  </div>
                </div>
              </div>

              <div>
                <h2>Johtamisen katselmointi</h2>
                <div>
                  <label>{questionsMap['leadership']}</label>
                  <div>
                    <br/>
                    <label>Heikko</label>
                    <input type="radio" value="1" name="leadership" onChange={() => handleRadioChange('leadership', 'condition', '1')} />
                    <label>Puutteellinen</label>
                    <input type="radio" value="2" name="leadership" onChange={() => handleRadioChange('leadership', 'condition', '2')} />
                    <label>Perustaso</label>
                    <input type="radio" value="3" name="leadership" onChange={() => handleRadioChange('leadership', 'condition', '3')} />
                    <label>Sitoutunut</label>
                    <input type="radio" value="4" name="leadership" onChange={() => handleRadioChange('leadership', 'condition', '4')} />
                    <label>Edelläkävijä</label>
                    <input type="radio" value="5" name="leadership" onChange={() => handleRadioChange('leadership', 'condition', '5')} />
                    <br />
                    <br/>
                    <label>Huomiot: </label>
                    <br/>
                    <input type="text" name="leadershipComment" onChange={(e) => handleTextChange('leadership', e.target.value)} />
                    <br />
                    <br />
                  </div>
                </div>
              </div>
              <h3>Valitse kuva</h3>
              <FileInput type="file" accept="image/*" capture="environment" onChange={handleFileChange} />
              <p>
                Kuvan esikatselu:
                <br></br>
                {photoUrl ? <img src={photoUrl} alt="Selected" style={{ maxWidth: '50%' }} /> : null}
              </p>
            </div>
            <div>
              <br/>
              <button type="button" onClick={() => sendResultData("management")}>
                Send Data
              </button>
              <br/>
              <br/>
              <h3>Huoneen aiemmat Toimintamallin ja Johtamisen katselmoinnit</h3>
              <PreviousReviews type={"management"}></PreviousReviews>
            </div>
          </Form>
        </div>
      </FormContainer>
    </GrayBackground>
  );
};

export default ManagementReview;