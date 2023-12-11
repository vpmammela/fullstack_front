import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import Header from '../header';
import { useReviewContext } from '../../ReviewContext';
import { getInspectionTargetById, getInspectionTargetsByEnviromentsId } from '../../services/inspectiontarget';
import { createInspectionForm } from '../../services/inspectionform';
import { createInspectionResult } from '../../services/inspectionresult';
import { useNotification } from '../../NotificationContext';
import axios from 'axios';
import PreviousReviews from '../PreviousReviews/PreviousReviews';

const SafetyReviewContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-size: cover;
  background-position: center;

  @media (max-width: 768px) {
    top: 0; /* Adjust for smaller devices */;
    min-height: 100%; /* Adjust for smaller devices */;
    border-radius: 0; /* Optionally, remove border-radius for smaller devices */
  }
`;

const GrayBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: lightgray;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  z-index: 1;
`;

const FormContainer = styled.div`
  padding-top: 250px;
  height: 100%;
  align-items: center;
  overflow-y: auto;
  width: 100%;
  padding: 20px; /* Add padding for better spacing */
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding-top: 50px; /* Adjust for mobile */
  }
`;

const TextInput = styled.input`
  width: 80%; 
  padding: 15px;
  padding-left: 5px;
  
  @media (max-width: 768px) {
    left: -15px;
    top: 0; 
    min-height: 100%; 
    border-radius: 0; 
  }
`;

const PhotoInput = styled.input`
  margin-top: 5px;
  width: 80%; /* Adjust width for smaller devices */
  
  @media (max-width: 768px) {
    width: 100%; /* Adjust width for smaller devices */
  }
`;

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

const questionsMap: Record<string, string> = {
  general: "Onko yleisilme siisti? Millä tasolla päivittäiskatselmointien tulokset ovat? Onko havaittuihin poikkeamiin reagoitu?",
  instructions: "Onko ohjeistukset saatavilla ja ajantasaiset? Noudatetaanko annettuja ohjeita?",
  risk: "Onko riskiarviointi ajantasalla ja onko toiminnan riskiä mahdollisuus pienentää?",
  protection: "Onko henkilökohtaiset suojavarusteet tunnistettu ja saatavilla? Käytetäänkö niitä?",
  firstAid: "Onko ensiaputarvikkeet ja palosammuttimet käytettävissä ja ajan tasalla?",
  chemicals: "Onko kemikaaliluettelot ajan tasalla? Säilytetäänkö kemikaalit asianmukaisesti? Onko varoitusmerkit ja käyttöturvatiedotteet saatavilla?",
  explosion: "Käsitelläänkö tilassa kemikaaleja tai pölyjä? Onko räjähdyssuoja-arviointi ajantasalla?",
  radiation: "Onko säteilyturvallisuusohjeet ja luvat ajantasalla?",
  observations: "Onko tilasta tullut turvallisuushavaintoja? Onko korjaavat toimenpiteet tehty?",
};

const evaluationMap: { [key: string]: number } = {
  inadequate: 1,
  involved: 2,
  precursor: 3,
  notaApplicable: 0,
};

const SafetyReview = () => {
  const { setNotification } = useNotification();
  const [photo, setPhoto] = useState<File | null>(null);

  const { environment_id } = useReviewContext();
  const { inspectiontarget_id } = useReviewContext();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setPhoto(file || null);
  };

  const [formData, setFormData] = useState<FormData>({
    general: { condition: '0', note: '' },
    instructions: { condition: '0', note: '' },
    risk: { condition: '0', note: '' },
    protection: { condition: '0', note: '' },
    firstAid: { condition: '0', note: '' },
    chemicals: { condition: '0', note: '' },
    explosion: { condition: '0', note: '' },
    radiation: { condition: '0', note: '' },
    observations: { condition: '0', note: '' },
    otherComments: { condition: '0', note: '' },
    positiveObservations: { condition: '0', note: '' },
  });

  // Function to handle radio button changes
  const handleRadioChange = (category: string, property: 'condition', value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [category]: { ...prevData[category], [property]: value},
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

      // TODO: Replace with the actual API endpoint.
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
    <div>
      <Header/>
      <FormContainer>
      <GrayBackground>
    <h2>6S Turvallisuuskatselmointi</h2>
        <form>
            <div>
              <br></br>
              <h4>Yleisilme</h4>
              <div>
                <br></br>
              <label>{questionsMap['general']}</label>
              <div>
                <br></br>
              <label>Puutteellinen</label>
                <input type="radio" value="1" name="general" onChange={() => handleRadioChange('general', 'condition', '1')} />
                <label>Sitoutunut</label>
                <input type="radio" value="2" name="general" onChange={() => handleRadioChange('general', 'condition', '2')} />
                <label>Edelläkävijä</label>
                <input type="radio" value="3" name="general" onChange={() => handleRadioChange('general', 'condition', '3')} />
                <label>Ei sovellettavissa</label>
                <input type="radio" value="0" name="general" onChange={() => handleRadioChange('general', 'condition', '0')} />
                <br></br>
                <br></br>
                <label>Huomiot</label>
                <br></br>
                <TextInput type="text" name="generalComment" onChange={(e) => handleTextChange('general', e.target.value)} />
              </div>
            </div>
          </div>

          <div>
            <h4>Turvallisuusohjeistukset</h4>
            <div>
              <label>{questionsMap['instructions']}</label>
              <div>
                <br></br>
              <label>Puutteellinen</label>
                <input type="radio" value="1" name="instructions" onChange={() => handleRadioChange('instructions', 'condition', '1')} />
                <label>Sitoutunut</label>
                <input type="radio" value="2" name="instructions" onChange={() => handleRadioChange('instructions', 'condition', '2')} />
                <label>Edelläkävijä</label>
                <input type="radio" value="3" name="instructions" onChange={() => handleRadioChange('instructions', 'condition', '3')} />
                <label>Ei sovellettavissa</label>
                <input type="radio" value="0" name="instructions" onChange={() => handleRadioChange('instructions', 'condition', '0')} />
                <br></br>
                <br></br>
                <label>Huomiot</label>
                <br></br>
                <TextInput type="text" name="instructionsComment" onChange={(e) => handleTextChange('instructions', e.target.value)} />
              </div>
            </div>
          </div>

          <div>
            <h4>Toiminnan riskiarviointi</h4>
            <div>
              <label>{questionsMap['risk']}</label>
              <div>
                <br></br>
              <label>Puutteellinen</label>
                <input type="radio" value="1" name="risk" onChange={() => handleRadioChange('risk', 'condition', '1')} />
                <label>Sitoutunut</label>
                <input type="radio" value="2" name="risk" onChange={() => handleRadioChange('risk', 'condition', '2')} />
                <label>Edelläkävijä</label>
                <input type="radio" value="3" name="risk" onChange={() => handleRadioChange('risk', 'condition', '3')} />
                <label>Ei sovellettavissa</label>
                <input type="radio" value="0" name="risk" onChange={() => handleRadioChange('risk', 'condition', '0')} />
                <br></br>
                <br></br>
                <label>Huomiot</label>
                <br></br>
                <TextInput type="text" name="riskComment" onChange={(e) => handleTextChange('risk', e.target.value)} />
              </div>
            </div>
          </div>

          <div>
            <h4>Suojavarusteet</h4>
            <div>
              <label>{questionsMap['protection']}</label>
              <div>
                <br></br>
              <label>Puutteellinen</label>
                <input type="radio" value="1" name="protection" onChange={() => handleRadioChange('protection', 'condition', '1')} />
                <label>Sitoutunut</label>
                <input type="radio" value="2" name="protection" onChange={() => handleRadioChange('protection', 'condition', '2')} />
                <label>Edelläkävijä</label>
                <input type="radio" value="3" name="protection" onChange={() => handleRadioChange('protection', 'condition', '3')} />
                <label>Ei sovellettavissa</label>
                <input type="radio" value="0" name="protection" onChange={() => handleRadioChange('protection', 'condition', '0')} />
                <br></br>
                <br></br>
                <label>Huomiot</label>
                <br></br>
                <TextInput type="text" name="protectionComment" onChange={(e) => handleTextChange('protection', e.target.value)} />
             </div>
            </div>
          </div>

          <div>
            <h4>Ensiapu- ja palosammuttimet</h4>
            <div>
              <label>{questionsMap['firstAid']}</label>
              <div>
                <br></br>
              <label>Puutteellinen</label>
                <input type="radio" value="1" name="firstAid" onChange={() => handleRadioChange('firstAid', 'condition', '1')} />
                <label>Sitoutunut</label>
                <input type="radio" value="2" name="firstAid" onChange={() => handleRadioChange('firstAid', 'condition', '2')} />
                <label>Edelläkävijä</label>
                <input type="radio" value="3" name="firstAid" onChange={() => handleRadioChange('firstAid', 'condition', '3')} />
                <label>Ei sovellettavissa</label>
                <input type="radio" value="0" name="firstAid" onChange={() => handleRadioChange('firstAid', 'condition', '0')} />
                <br></br>
                <br></br>
                <label>Huomiot</label>
                <br></br>
                <TextInput type="text" name="firstAidComment" onChange={(e) => handleTextChange('firstAid', e.target.value)} />
              </div>
            </div>
          </div>

          <div>
            <h4>Kemikaalien hallinta</h4>
            <div>
              <label>{questionsMap['chemicals']}</label>
              <div>
                <br></br>
              <label>Puutteellinen</label>
                <input type="radio" value="1" name="chemicals" onChange={() => handleRadioChange('chemicals', 'condition', '1')} />
                <label>Sitoutunut</label>
                <input type="radio" value="2" name="chemicals" onChange={() => handleRadioChange('chemicals', 'condition', '2')} />
                <label>Edelläkävijä</label>
                <input type="radio" value="3" name="chemicals" onChange={() => handleRadioChange('chemicals', 'condition', '3')} />
                <label>Ei sovellettavissa</label>
                <input type="radio" value="0" name="chemicals" onChange={() => handleRadioChange('chemicals', 'condition', '0')} />
                <br></br>
                <br></br>
                <label>Huomiot</label>
                <br></br>
                <TextInput type="text" name="chemicalsComment" onChange={(e) => handleTextChange('chemicals', e.target.value)} />
              </div>
            </div>
          </div>

          <div>
            <h4>Räjähdyssuoja-arviointi</h4>
            <div>
              <label>{questionsMap['explosion']}</label>
              <div>
                <br></br>
              <label>Puutteellinen</label>
                <input type="radio" value="1" name="explosion" onChange={() => handleRadioChange('explosion', 'condition', '1')} />
                <label>Sitoutunut</label>
                <input type="radio" value="2" name="explosion" onChange={() => handleRadioChange('explosion', 'condition', '2')} />
                <label>Edelläkävijä</label>
                <input type="radio" value="3" name="explosion" onChange={() => handleRadioChange('explosion', 'condition', '3')} />
                <label>Ei sovellettavissa</label>
                <input type="radio" value="0" name="explosion" onChange={() => handleRadioChange('explosion', 'condition', '0')} />
                <br></br>
                <br></br>
                <label>Huomiot</label>
                <br></br>
                <TextInput type="text" name="explosionComment" onChange={(e) => handleTextChange('explosion', e.target.value)} />
              </div>
            </div>
          </div>

          <div>
            <h4>Säteilyturvallisuusdokumentit</h4>
            <div>
              <label>{questionsMap['radiation']}</label>
              <div>
                <br></br>
              <label>Puutteellinen</label>
                <input type="radio" value="1" name="radiation" onChange={() => handleRadioChange('radiation', 'condition', '1')} />
                <label>Sitoutunut</label>
                <input type="radio" value="2" name="radiation" onChange={() => handleRadioChange('radiation', 'condition', '2')} />
                <label>Edelläkävijä</label>
                <input type="radio" value="3" name="radiation" onChange={() => handleRadioChange('radiation', 'condition', '3')} />
                <label>Ei sovellettavissa</label>
                <input type="radio" value="0" name="radiation" onChange={() => handleRadioChange('radiation', 'condition', '0')} />
                <br></br>
                <br></br>
                <label>Huomiot</label>
                <br></br>
                <TextInput type="text" name="radiationComment" onChange={(e) => handleTextChange('radiation', e.target.value)} />
              </div>
            </div>
          </div>

          <div>
            <h4>Turvallisuushavainnot</h4>
            <div>
              <label>{questionsMap['observations']}</label>
              <div>
                <br></br>
              <label>Puutteellinen</label>
                <input type="radio" value="1" name="observations" onChange={() => handleRadioChange('observations', 'condition', '1')} />
                <label>Sitoutunut</label>
                <input type="radio" value="2" name="observations" onChange={() => handleRadioChange('observations', 'condition', '2')} />
                <label>Edelläkävijä</label>
                <input type="radio" value="3" name="observations" onChange={() => handleRadioChange('observations', 'condition', '3')} />
                <label>Ei sovellettavissa</label>
                <input type="radio" value="0" name="observations" onChange={() => handleRadioChange('observations', 'condition', '0')} />
                <br></br>
                <br></br>
                <label>Huomiot</label>
                <br></br>
                <TextInput type="text" name="observationsComment" onChange={(e) => handleTextChange('observations', e.target.value)}  />
              </div>
              <br></br>
            </div>
          </div>

          <div>
            <label>Muita huomioita/ kehitysideat</label>
            <TextInput type="text" name="attentions" />
          </div>
          <br></br>
          <div>
          <label>Mitä positiivista olet huomannut tarkastusjasolla?</label>
          <TextInput type="text" name="attentions" />
        </div>
        <div>
          <br></br>
          <p>Lisää kuva</p>
          <PhotoInput
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
          />
        </div>
        <br></br>
        <br></br>
        <div>
          <button type="button" onClick={() => sendResultData("safety")}>
            Tallenna
          </button>
        </div>
        <br></br>
        <br></br>
        </form>
        <h3>Aiemmat Turvallisuuskatselmoinnit</h3>
        <PreviousReviews type={"safety"}></PreviousReviews>
        <br/>
        <br/>
      </GrayBackground>
      </FormContainer>
      <br/>
      <br/>
      </div>


  );
};
  
export default SafetyReview;