import { useState } from "react";
import "../styles.css";
import { Form } from "react-router-dom";
import { createInspectionResult } from "../../services/inspectionresult";
import { createInspectionForm } from "../../services/inspectionform";
import { createInspectionTarget, getInspectionTargetById, getInspectionTargetsByEnviromentsId } from "../../services/inspectiontarget";
import styled from "styled-components";
import { useReviewContext } from "../../ReviewContext";

// TODO: this page in order? What's going on here???
const GrayBackground = styled.div`
  position: fixed; /* Fixed position to keep it visible while scrolling */
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
  z-index: 1; /* Ensure it's above the photo container */
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

const evaluationMap: { [key: string]: number } = {
  inadequate: 1,
  involved: 2,
  precursor: 3,
  notaApplicable: 0,
};

const SemesterReview = () => {
  const [description, setDescription] = useState('');

  const { environment_id } = useReviewContext();
  const { inspectiontarget_id } = useReviewContext();

  // Initialize state to store selected values and notes
  const [formData, setFormData] = useState<FormData>({
    general: { condition: '', note: '' },
    instructions: { condition: '', note: '' },
    safety: { condition: '', note: '' },
    waste: { condition: '', note: '' },
    chemicals: { condition: '', note: '' },
    equipment: { condition: '', note: '' },
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
    const value = evaluationMap[condition];

    return {
      value,
      note,
      title: questionsMap[category] || 'Unknown Question',
      inspectionform_id
    };
  };

  // Sends form data and result data to backend
  const sendResultData = async () => {
    console.log(description)

    const room = await getInspectionTargetById(inspectiontarget_id!);
    const targets = await getInspectionTargetsByEnviromentsId(environment_id!);
    const target = targets.inspectiontargets.filter((target: { name: string; }) => target.name === room.name);

    const formData = {
      environment_id,
      inspectiontarget_id: target[0].id,
      inspectiontype: "semester"
    }
    
    // creates form
    const inspectionform = await createInspectionForm(formData);

    // creates all results
    Object.keys(questionsMap).forEach(async (category) => {
      const resultData = handleDataForResult(category, inspectionform.id);
      await createInspectionResult(resultData)
    });
  };


  return (
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
      <br/>
      <Form>
        <div>
          <div>
            <label>Yleisilme</label>
            <div>
              <label>{questionsMap['general']}</label>
              <div>
              <label>Puutteellinen</label>
                <input type="radio" value="inadequate" name="general" onChange={() => handleRadioChange('general', 'condition', 'inadequate')}/>
                <label>Sitoutunut</label>
                <input type="radio" value="involved" name="general" onChange={() => handleRadioChange('general', 'condition', 'involved')}/>
                <label>Edelläkävijä</label>
                <input type="radio" value="precursor" name="general" onChange={() => handleRadioChange('general', 'condition', 'precursor')}/>
                <label>Ei sovellettavissa</label>
                <input type="radio" value="notaApplicable" name="general" onChange={() => handleRadioChange('general', 'condition', 'notaApplicable')}/>
                <br/>
                <label>Huomiot: </label>
                <input type="text" name="generalComment" onChange={(e) => handleTextChange('general', e.target.value)}/>
                <br/>
                <br/>
              </div>
            </div>
          </div>

          <div>
            <label>Ohjeistukset</label>
            <div>
              <label>{questionsMap['instructions']}</label>
              <div>
              <label>Puutteellinen</label>
                <input type="radio" value="inadequate" name="instructions" onChange={() => handleRadioChange('instructions', 'condition', 'inadequate')}/>
                <label>Sitoutunut</label>
                <input type="radio" value="involved" name="instructions" onChange={() => handleRadioChange('instructions', 'condition', 'involved')}/>
                <label>Edelläkävijä</label>
                <input type="radio" value="precursor" name="instructions" onChange={() => handleRadioChange('instructions', 'condition', 'precursor')}/>
                <label>Ei sovellettavissa</label>
                <input type="radio" value="notaApplicable" name="instructions" onChange={() => handleRadioChange('instructions', 'condition', 'notaApplicable')}/>
                <br/>
                <label>Huomiot: </label>
                <input type="text" name="instuctionsComment" onChange={(e) => handleTextChange('instructions', e.target.value)}/>
                <br/>
                <br/>
              </div>
            </div>
          </div>

          <div>
            <label>Turvallisuus</label>
            <div>
              <label>{questionsMap['safety']}</label>
              <div>
              <label>Puutteellinen</label>
                <input type="radio" value="inadequate" name="safety" onChange={() => handleRadioChange('safety', 'condition', 'inadequate')}/>
                <label>Sitoutunut</label>
                <input type="radio" value="involved" name="safety" onChange={() => handleRadioChange('safety', 'condition', 'involved')}/>
                <label>Edelläkävijä</label>
                <input type="radio" value="precursor" name="safety" onChange={() => handleRadioChange('safety', 'condition', 'precursor')}/>
                <label>Ei sovellettavissa</label>
                <input type="radio" value="notaApplicable" name="safety" onChange={() => handleRadioChange('safety', 'condition', 'notaApplicable')}/>
                <br/>
                <label>Huomiot: </label>
                <input type="text" name="safetyComment" onChange={(e) => handleTextChange('safety', e.target.value)}/>
                <br/>
                <br/>
              </div>
            </div>
          </div>

          <div>
            <label>Kiertotalous</label>
            <div>
              <label>{questionsMap['waste']}</label>
              <div>
              <label>Puutteellinen</label>
                <input type="radio" value="inadequate" name="waste" onChange={() => handleRadioChange('waste', 'condition', 'inadequate')}/>
                <label>Sitoutunut</label>
                <input type="radio" value="involved" name="waste" onChange={() => handleRadioChange('waste', 'condition', 'involved')}/>
                <label>Edelläkävijä</label>
                <input type="radio" value="precursor" name="waste" onChange={() => handleRadioChange('waste', 'condition', 'precursor')}/>
                <label>Ei sovellettavissa</label>
                <input type="radio" value="notaApplicable" name="waste" onChange={() => handleRadioChange('waste', 'condition', 'notaApplicable')}/>
                <br/>
                <label>Huomiot: </label>
                <input type="text" name="wasteComment" onChange={(e) => handleTextChange('waste', e.target.value)}/>
                <br/>
                <br/>
             </div>
            </div>
          </div>

          <div>
            <label>Kemikaalien hallinta</label>
            <div>
              <label>{questionsMap['chemicals']}</label>
              <div>
              <label>Puutteellinen</label>
                <input type="radio" value="inadequate" name="chemicals" onChange={() => handleRadioChange('chemicals', 'condition', 'inadequate')}/>
                <label>Sitoutunut</label>
                <input type="radio" value="involved" name="chemicals" onChange={() => handleRadioChange('chemicals', 'condition', 'involved')}/>
                <label>Edelläkävijä</label>
                <input type="radio" value="precursor" name="chemicals" onChange={() => handleRadioChange('chemicals', 'condition', 'precursor')}/>
                <label>Ei sovellettavissa</label>
                <input type="radio" value="notaApplicable" name="chemicals" onChange={() => handleRadioChange('chemicals', 'condition', 'notaApplicable')}/>
                <br/>
                <label>Huomiot: </label>
                <input type="text" name="chemicalsComment" onChange={(e) => handleTextChange('chemicals', e.target.value)}/>
                <br/>
                <br/>
              </div>
            </div>
          </div>

          <div>
            <label>Trail - kalustonhallinta</label>
            <div>
              <label>{questionsMap['equipment']}</label>
              <div>
              <label>Puutteellinen</label>
                <input type="radio" value="inadequate" name="equipment" onChange={() => handleRadioChange('equipment', 'condition', 'inadequate')}/>
                <label>Sitoutunut</label>
                <input type="radio" value="involved" name="equipment" onChange={() => handleRadioChange('equipment', 'condition', 'involved')}/>
                <label>Edelläkävijä</label>
                <input type="radio" value="precursor" name="equipment" onChange={() => handleRadioChange('equipment', 'condition', 'precursor')}/>
                <label>Ei sovellettavissa</label>
                <input type="radio" value="notaApplicable" name="equipment" onChange={() => handleRadioChange('equipment', 'condition', 'notaApplicable')}/>
                <label>Huomiot</label>
                <input type="text" name="equipmentComment" onChange={(e) => handleTextChange('equipment', e.target.value)}/>
                <br/>
                <br/>
              </div>
            </div>
          </div>

        <div>
          <p>VALOKUVAUN LISÄYS TÄHÄN</p>
        </div>

        </div>
        <div>
          <button type="button" onClick={sendResultData}>
            Send Data
          </button>
        </div>
      </Form>
    </div>
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
                <input type="radio" value="inadequate" name="condition"/>
                <label>Sitoutunut</label>
                <input type="radio" value="involved" name="condition"/>
                <label>Edelläkävijä</label>
                <input type="radio" value="precursor" name="condition"/>
                <label>Ei sovellettavissa</label>
                <input type="radio" value="notaApplicable" name="condition"/>
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
                <input type="radio" value="inadequate" name="condition"/>
                <label>Sitoutunut</label>
                <input type="radio" value="involved" name="condition"/>
                <label>Edelläkävijä</label>
                <input type="radio" value="precursor" name="condition"/>
                <label>Ei sovellettavissa</label>
                <input type="radio" value="notaApplicable" name="condition"/>
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
                <input type="radio" value="inadequate" name="condition"/>
                <label>Sitoutunut</label>
                <input type="radio" value="involved" name="condition"/>
                <label>Edelläkävijä</label>
                <input type="radio" value="precursor" name="condition"/>
                <label>Ei sovellettavissa</label>
                <input type="radio" value="notaApplicable" name="condition"/>
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
                <input type="radio" value="inadequate" name="condition"/>
                <label>Sitoutunut</label>
                <input type="radio" value="involved" name="condition"/>
                <label>Edelläkävijä</label>
                <input type="radio" value="precursor" name="condition"/>
                <label>Ei sovellettavissa</label>
                <input type="radio" value="notaApplicable" name="condition"/>
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
                <input type="radio" value="inadequate" name="condition"/>
                <label>Sitoutunut</label>
                <input type="radio" value="involved" name="condition"/>
                <label>Edelläkävijä</label>
                <input type="radio" value="precursor" name="condition"/>
                <label>Ei sovellettavissa</label>
                <input type="radio" value="notaApplicable" name="condition"/>
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
                <input type="radio" value="inadequate" name="condition"/>
                <label>Sitoutunut</label>
                <input type="radio" value="involved" name="condition"/>
                <label>Edelläkävijä</label>
                <input type="radio" value="precursor" name="condition"/>
                <label>Ei sovellettavissa</label>
                <input type="radio" value="notaApplicable" name="condition"/>
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