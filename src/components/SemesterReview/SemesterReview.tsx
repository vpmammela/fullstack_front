import { useState } from "react";
import "../styles.css";
import { Form } from "react-router-dom";
import { createInspectionResult } from "../../services/inspectionresult";
import { createInspectionForm } from "../../services/inspectionform";
import { getInspectionTargetById, getInspectionTargetsByEnviromentsId } from "../../services/inspectiontarget";
import styled from "styled-components";
import { useReviewContext } from "../../ReviewContext";
import Header from "../header";
import { useNotification } from "../../NotificationContext";
import axios from "axios";
import PreviousReviews from "../PreviousReviews/PreviousReviews";


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
`
const FormInput = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  margin-bottom: 10px;
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
  general: "Onko yleisilme siisti? Millä tasolla päivittäiskatselmointien tulokset ovat? Onko havaittuihin poikkeamiin reagoitu?",
  instructions: "Onko ohjeistukset saatavilla ja ajantasaiset? Noudatetaanko annettuja ohjeita?",
  safety: "Turvallisuushavaitojen läpikäynti, koneiden ja laitteiden kunto ja turvallisuus, henkilösuojaimet",
  waste: "Onko syntyvät erityisjätteet tunnistettu? Onko tarpeelliset kierrätysastiat saatavilla? Huolehditaanko tarvittavat tyhjennykset?",
  chemicals: "Onko kemikaaliluettelot ajantasalla? Säilytetäänkö kemikaalit asianmukaisesti? Onko varoitusmerkit ja käyttöturvatiedotteet saatavilla?",
  equipment: "Onko laitteet ajantasalla kalustonhallintajärjestelmässä?",
};


const SemesterReview = () => {
  const { setNotification } = useNotification();
  const [description, setDescription] = useState('');

  const { environment_id } = useReviewContext();
  const { inspectiontarget_id } = useReviewContext();

  // Store the selected photo file.
  const [photo, setPhoto] = useState<File | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  // Initialize state to store selected values and notes
  const [formData, setFormData] = useState<FormData>({
    general: { condition: '0', note: '' },
    instructions: { condition: '0', note: '' },
    safety: { condition: '0', note: '' },
    waste: { condition: '0', note: '' },
    chemicals: { condition: '0', note: '' },
    equipment: { condition: '0', note: '' },
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
    let target = null;
    try {
      targets = await getInspectionTargetsByEnviromentsId(environment_id!);
      target = targets.inspectiontargets.filter((target: { name: string; }) => target.name === room!.name);
    } catch (e) {
      setNotification(`Virhe huoneen haussa: ${e}`)
    }

    const formSend = {
      environment_id,
      inspectiontarget_id: parseInt(target[0].id, 10),
      inspectiontype
    }
    
    // Upload photo if available
    if (photo) {
      const formData = new FormData();
      formData.append('photo', photo);

      await axios.post('https://localhost:5180/api/v1/images', formData);
    }

    // creates form
    let inspectionform: { id: number; } | null = null;
    try{
      inspectionform = await createInspectionForm(formSend);
    } catch (e) {
      setNotification(`Virhe katselmoinnin tallentamisessa: ${e}`)
    }

    // creates all results
    Object.keys(questionsMap).forEach(async (category) => {
      const resultData = handleDataForResult(category, inspectionform!.id);
      try {
        await createInspectionResult(resultData)
      } catch (e) {
        setNotification(`Virhe vastauksen tallentamisessa: ${e}`)
      }
    });
  };


  return (
    <GrayBackground>
      <Header />
      <FormContainer>
        <div>
          <h2>
            6S Lukukausi / vuosikatselmointi
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
                <h4>Yleisilme</h4>
                <div>
                  <label>{questionsMap['general']}</label>
                  <div>
                    <br/>
                    <label>Puutteellinen</label>
                    <input type="radio" value="1" name="general" onChange={() => handleRadioChange('general', 'condition', '1')} />
                    <label>Sitoutunut</label>
                    <input type="radio" value="2" name="general" onChange={() => handleRadioChange('general', 'condition', '2')} />
                    <label>Edelläkävijä</label>
                    <input type="radio" value="3" name="general" onChange={() => handleRadioChange('general', 'condition', '3')} />
                    <label>Ei sovellettavissa</label>
                    <input type="radio" value="0" name="general" onChange={() => handleRadioChange('general', 'condition', '0')} />
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
                <h4>Ohjeistukset</h4>
                <div>
                  <label>{questionsMap['instructions']}</label>
                  <div>
                    <br/>
                    <label>Puutteellinen</label>
                    <input type="radio" value="1" name="instructions" onChange={() => handleRadioChange('instructions', 'condition', '1')} />
                    <label>Sitoutunut</label>
                    <input type="radio" value="2" name="instructions" onChange={() => handleRadioChange('instructions', 'condition', '2')} />
                    <label>Edelläkävijä</label>
                    <input type="radio" value="3" name="instructions" onChange={() => handleRadioChange('instructions', 'condition', '3')} />
                    <label>Ei sovellettavissa</label>
                    <input type="radio" value="0" name="instructions" onChange={() => handleRadioChange('instructions', 'condition', '0')} />
                    <br />
                    <br/>
                    <label>Huomiot: </label>
                    <br/>
                    <input type="text" name="instructionsComment" onChange={(e) => handleTextChange('instructions', e.target.value)} />
                    <br />
                    <br />
                  </div>
                </div>
              </div>

              <div>
                <h4>Turvallisuus</h4>
                <div>
                  <label>{questionsMap['safety']}</label>
                  <div>
                  <br/>
                    <label>Puutteellinen</label>
                    <input type="radio" value="1" name="safety" onChange={() => handleRadioChange('safety', 'condition', '1')} />
                    <label>Sitoutunut</label>
                    <input type="radio" value="2" name="safety" onChange={() => handleRadioChange('safety', 'condition', '2')} />
                    <label>Edelläkävijä</label>
                    <input type="radio" value="3" name="safety" onChange={() => handleRadioChange('safety', 'condition', '3')} />
                    <label>Ei sovellettavissa</label>
                    <input type="radio" value="0" name="safety" onChange={() => handleRadioChange('safety', 'condition', '0')} />
                    <br />
                    <br/>
                    <label>Huomiot: </label>
                    <br/>
                    <input type="text" name="safetyComment" onChange={(e) => handleTextChange('safety', e.target.value)} />
                    <br />
                    <br />
                  </div>
                </div>
              </div>

              <div>
                <h4>Kiertotalous</h4>
                <div>
                  <label>{questionsMap['waste']}</label>
                  <div>
                    <br/>
                    <label>Puutteellinen</label>
                    <input type="radio" value="1" name="waste" onChange={() => handleRadioChange('waste', 'condition', '1')} />
                    <label>Sitoutunut</label>
                    <input type="radio" value="2" name="waste" onChange={() => handleRadioChange('waste', 'condition', '2')} />
                    <label>Edelläkävijä</label>
                    <input type="radio" value="3" name="waste" onChange={() => handleRadioChange('waste', 'condition', '3')} />
                    <label>Ei sovellettavissa</label>
                    <input type="radio" value="0" name="waste" onChange={() => handleRadioChange('waste', 'condition', '0')} />
                    <br />
                    <br/>
                    <label>Huomiot: </label>
                    <br/>
                    <input type="text" name="wasteComment" onChange={(e) => handleTextChange('waste', e.target.value)} />
                    <br />
                    <br />
                  </div>
                </div>
              </div>

              <div>
                <h4>Kemikaalien hallinta</h4>
                <div>
                  <label>{questionsMap['chemicals']}</label>
                  <div>
                    <br/>
                    <label>Puutteellinen</label>
                    <input type="radio" value="1" name="chemicals" onChange={() => handleRadioChange('chemicals', 'condition', '1')} />
                    <label>Sitoutunut</label>
                    <input type="radio" value="2" name="chemicals" onChange={() => handleRadioChange('chemicals', 'condition', '2')} />
                    <label>Edelläkävijä</label>
                    <input type="radio" value="3" name="chemicals" onChange={() => handleRadioChange('chemicals', 'condition', '3')} />
                    <label>Ei sovellettavissa</label>
                    <input type="radio" value="0" name="chemicals" onChange={() => handleRadioChange('chemicals', 'condition', '0')} />
                    <br />
                    <br/>
                    <label>Huomiot: </label>
                    <br/>
                    <input type="text" name="chemicalsComment" onChange={(e) => handleTextChange('chemicals', e.target.value)} />
                    <br />
                    <br />
                  </div>
                </div>
              </div>

              <div>
                <h4>Trail - kalustonhallinta</h4>
                <div>
                  <label>{questionsMap['equipment']}</label>
                  <div>
                    <br/>
                    <label>Puutteellinen</label>
                    <input type="radio" value="1" name="equipment" onChange={() => handleRadioChange('equipment', 'condition', '1')} />
                    <label>Sitoutunut</label>
                    <input type="radio" value="2" name="equipment" onChange={() => handleRadioChange('equipment', 'condition', '2')} />
                    <label>Edelläkävijä</label>
                    <input type="radio" value="3" name="equipment" onChange={() => handleRadioChange('equipment', 'condition', '3')} />
                    <label>Ei sovellettavissa</label>
                    <input type="radio" value="0" name="equipment" onChange={() => handleRadioChange('equipment', 'condition', '0')} />
                    <br/>
                    <br/>
                    <label>Huomiot</label>
                    <br/>
                    <input type="text" name="equipmentComment" onChange={(e) => handleTextChange('equipment', e.target.value)} />
                    <br />
                    <br />
                  </div>
                </div>
              </div>
              <div>
                <label>Lataa kuva: </label>
                <input type="file" accept="image/*" onChange={handlePhotoChange} />
              </div>
            </div>
            <div>
              <br/>
              <button type="button" onClick={() => sendResultData("semester")}>
                Send Data
              </button>
              <br/>
              <br/>
            </div>
          </Form>
        </div>
        <h3>Aiemmat Lukukausi / vuosikatselmoinnit</h3>
        <PreviousReviews type={"semester"}></PreviousReviews>
      </FormContainer>
    </GrayBackground>
  );
/*
  return (
    <div>
      <h2>
        6S Lukukausi / vuosikatselmointi
      </h2>
      <Form>
        <div>
          <div>
            <label>Yleisilme</label>
            <div>
              <label>Onko yleisilme siisi? Millä tasolla päivittäiskatselmointien tulokset ovat? Onko havaittuihin poikkeamiin reagoitu?</label>
              <div>
              <label>Puutteellinen</label>
                <input type="radio" value="1" name="condition"/>
                <label>Sitoutunut</label>
                <input type="radio" value="2" name="condition"/>
                <label>Edelläkävijä</label>
                <input type="radio" value="3" name="condition"/>
                <label>Ei sovellettavissa</label>
                <input type="radio" value="4" name="condition"/>
                <label>Huomiot</label>
                <input type="text" name="attentions"/>
              </div>
            </div>
          </div>

          <div>
            <label>Ohjeistukset</label>
            <div>
              <label>Onko ohjeistukset saatavilla ja ajantasaiset? Noudatetaanko annettuja ohjeita?</label>
              <div>
              <label>Puutteellinen</label>
                <input type="radio" value="1" name="condition"/>
                <label>Sitoutunut</label>
                <input type="radio" value="2" name="condition"/>
                <label>Edelläkävijä</label>
                <input type="radio" value="3" name="condition"/>
                <label>Ei sovellettavissa</label>
                <input type="radio" value="4" name="condition"/>
                <label>Huomiot</label>
                <input type="text" name="attentions"/>
              </div>
            </div>
          </div>

          <div>
            <label>Turvallisuus</label>
            <div>
              <label>Turvallisuushavaitojen läpikäynti, koneiden ja laitteiden kunto ja turvallisuus, henkilösuojaimet</label>
              <div>
              <label>Puutteellinen</label>
                <input type="radio" value="1" name="condition"/>
                <label>Sitoutunut</label>
                <input type="radio" value="2" name="condition"/>
                <label>Edelläkävijä</label>
                <input type="radio" value="3" name="condition"/>
                <label>Ei sovellettavissa</label>
                <input type="radio" value="4" name="condition"/>
                <label>Huomiot</label>
                <input type="text" name="attentions"/>
              </div>
            </div>
          </div>

          <div>
            <label>Kiertotalous</label>
            <div>
              <label>Onko syntyvät erityisjätteet tunnistettu? Onko tarpeelliset kierrätysastiat saatavilla? Huolehditaanko tarvittavat tyhjennykset?</label>
              <div>
              <label>Puutteellinen</label>
                <input type="radio" value="1" name="condition"/>
                <label>Sitoutunut</label>
                <input type="radio" value="2" name="condition"/>
                <label>Edelläkävijä</label>
                <input type="radio" value="3" name="condition"/>
                <label>Ei sovellettavissa</label>
                <input type="radio" value="4" name="condition"/>
                <label>Huomiot</label>
                <input type="text" name="attentions"/>
             </div>
            </div>
          </div>

          <div>
            <label>Kemikaalien hallinta</label>
            <div>
              <label>Onko kemikaaliluettelot ajantasalla? Säilytetäänkö kemikaalit asianmukaisesti? Onko varoitusmerkit ja käyttöturvatiedotteet saatavilla?</label>
              <div>
              <label>Puutteellinen</label>
                <input type="radio" value="1" name="condition"/>
                <label>Sitoutunut</label>
                <input type="radio" value="2" name="condition"/>
                <label>Edelläkävijä</label>
                <input type="radio" value="3" name="condition"/>
                <label>Ei sovellettavissa</label>
                <input type="radio" value="4" name="condition"/>
                <label>Huomiot</label>
                <input type="text" name="attentions"/>
              </div>
            </div>
          </div>

          <div>
            <label>Trail - kalustonhallinta</label>
            <div>
              <label>Onko laitteet ajantasalla kalustonhallintajärjestelmässä? </label>
              <div>
              <label>Puutteellinen</label>
                <input type="radio" value="1" name="condition"/>
                <label>Sitoutunut</label>
                <input type="radio" value="2" name="condition"/>
                <label>Edelläkävijä</label>
                <input type="radio" value="3" name="condition"/>
                <label>Ei sovellettavissa</label>
                <input type="radio" value="4" name="condition"/>
                <label>Huomiot</label>
                <input type="text" name="attentions"/>
              </div>
            </div>
          </div>

          <div>
            <label>Muita huomioita/ kehitysideat</label>
            <input type="text" name="othetAttentions"/>
          </div>

          <div>
          <label>Mitä positiivista olet huomannut tarkastusjasolla?</label>
          <input type="text" name="positiveThings"></input>
        </div>
        <div>
          <p>VALOKUVAUN LISÄYS TÄHÄN</p>
        </div>

        </div>
      </Form>
    </div>
  );
  */
};

export default SemesterReview;