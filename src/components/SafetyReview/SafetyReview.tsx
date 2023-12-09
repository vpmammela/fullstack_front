import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import Header from '../header';
import { useReviewContext } from '../../ReviewContext';
import { getInspectionTargetById, getInspectionTargetsByEnviromentsId } from '../../services/inspectiontarget';
import { createInspectionForm } from '../../services/inspectionform';
import { createInspectionResult } from '../../services/inspectionresult';
import { useNotification } from '../../NotificationContext';

const SafetyReviewContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-size: cover;
  background-position: center;
`;

const GrayBackground = styled.div`
  position: fixed;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vh;
  height: 100vh;
  background-color: lightgray;
  border-top-left-radius: 0% 50px;
  border-top-right-radius: 0% 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const FormContainer = styled.div`
  position: absolute;
  top: 100px; /* Adjust alue based on header height */
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  min-height: calc(100vh - 100px); /* Adjust value based on header height */
  background-color: lightgray;
  border-top-left-radius: 0% 50px;
  border-top-right-radius: 0% 50px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const TextInput = styled.input`
  width: 80%; 
  padding: 35px; 
`;

const PhotoInput = styled.input`
  margin-top: 5px;
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
    general: { condition: '', note: '' },
    instructions: { condition: '', note: '' },
    risk: { condition: '', note: '' },
    protection: { condition: '', note: '' },
    firstAid: { condition: '', note: '' },
    chemicals: { condition: '', note: '' },
    explosion: { condition: '', note: '' },
    radiation: { condition: '', note: '' },
    observations: { condition: '', note: '' },
    otherComments: { condition: '', note: '' },
    positiveObservations: { condition: '', note: '' },
  });

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
  const sendResultData = async (inspectiontype: string) => {
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
    Object.keys(questionsMap).forEach(async (category) => {
      const resultData = handleDataForResult(category, inspectionform.id);
      try {
        await createInspectionResult(resultData)
      } catch (e) {
        setNotification(`Virhe vastauksen tallentamisessa. Valitse jokaisesta kysymyksestä vaihtoehto: ${e}`)
      }
    });
  };
  
  return (
    <SafetyReviewContainer>
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
                <input type="radio" value="inadequate" name="general" onChange={() => handleRadioChange('general', 'condition', 'inadequate')} />
                <label>Sitoutunut</label>
                <input type="radio" value="involved" name="general" onChange={() => handleRadioChange('general', 'condition', 'inadequate')} />
                <label>Edelläkävijä</label>
                <input type="radio" value="precursor" name="general" onChange={() => handleRadioChange('general', 'condition', 'inadequate')} />
                <label>Ei sovellettavissa</label>
                <input type="radio" value="notaApplicable" name="general" onChange={() => handleRadioChange('general', 'condition', 'inadequate')} />
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
                <input type="radio" value="inadequate" name="instructions" onChange={() => handleRadioChange('instructions', 'condition', 'inadequate')} />
                <label>Sitoutunut</label>
                <input type="radio" value="involved" name="instructions" onChange={() => handleRadioChange('instructions', 'condition', 'inadequate')} />
                <label>Edelläkävijä</label>
                <input type="radio" value="precursor" name="instructions" onChange={() => handleRadioChange('instructions', 'condition', 'inadequate')} />
                <label>Ei sovellettavissa</label>
                <input type="radio" value="notaApplicable" name="instructions" onChange={() => handleRadioChange('instructions', 'condition', 'inadequate')} />
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
                <input type="radio" value="inadequate" name="risk" onChange={() => handleRadioChange('risk', 'condition', 'inadequate')} />
                <label>Sitoutunut</label>
                <input type="radio" value="involved" name="risk" onChange={() => handleRadioChange('risk', 'condition', 'inadequate')} />
                <label>Edelläkävijä</label>
                <input type="radio" value="precursor" name="risk" onChange={() => handleRadioChange('risk', 'condition', 'inadequate')} />
                <label>Ei sovellettavissa</label>
                <input type="radio" value="notaApplicable" name="risk" onChange={() => handleRadioChange('risk', 'condition', 'inadequate')} />
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
                <input type="radio" value="inadequate" name="protection" onChange={() => handleRadioChange('protection', 'condition', 'inadequate')} />
                <label>Sitoutunut</label>
                <input type="radio" value="involved" name="protection" onChange={() => handleRadioChange('protection', 'condition', 'inadequate')} />
                <label>Edelläkävijä</label>
                <input type="radio" value="precursor" name="protection" onChange={() => handleRadioChange('protection', 'condition', 'inadequate')} />
                <label>Ei sovellettavissa</label>
                <input type="radio" value="notaApplicable" name="protection" onChange={() => handleRadioChange('protection', 'condition', 'inadequate')} />
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
                <input type="radio" value="inadequate" name="firstAid" onChange={() => handleRadioChange('firstAid', 'condition', 'inadequate')} />
                <label>Sitoutunut</label>
                <input type="radio" value="involved" name="firstAid" onChange={() => handleRadioChange('firstAid', 'condition', 'inadequate')} />
                <label>Edelläkävijä</label>
                <input type="radio" value="precursor" name="firstAid" onChange={() => handleRadioChange('firstAid', 'condition', 'inadequate')} />
                <label>Ei sovellettavissa</label>
                <input type="radio" value="notaApplicable" name="firstAid" onChange={() => handleRadioChange('firstAid', 'condition', 'inadequate')} />
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
                <input type="radio" value="inadequate" name="chemicals" onChange={() => handleRadioChange('chemicals', 'condition', 'inadequate')} />
                <label>Sitoutunut</label>
                <input type="radio" value="involved" name="chemicals" onChange={() => handleRadioChange('chemicals', 'condition', 'inadequate')} />
                <label>Edelläkävijä</label>
                <input type="radio" value="precursor" name="chemicals" onChange={() => handleRadioChange('chemicals', 'condition', 'inadequate')} />
                <label>Ei sovellettavissa</label>
                <input type="radio" value="notaApplicable" name="chemicals" onChange={() => handleRadioChange('chemicals', 'condition', 'inadequate')} />
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
                <input type="radio" value="inadequate" name="explosion" onChange={() => handleRadioChange('explosion', 'condition', 'inadequate')} />
                <label>Sitoutunut</label>
                <input type="radio" value="involved" name="explosion" onChange={() => handleRadioChange('explosion', 'condition', 'inadequate')} />
                <label>Edelläkävijä</label>
                <input type="radio" value="precursor" name="explosion" onChange={() => handleRadioChange('explosion', 'condition', 'inadequate')} />
                <label>Ei sovellettavissa</label>
                <input type="radio" value="notaApplicable" name="explosion" onChange={() => handleRadioChange('explosion', 'condition', 'inadequate')} />
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
                <input type="radio" value="inadequate" name="radiation" onChange={() => handleRadioChange('radiation', 'condition', 'inadequate')} />
                <label>Sitoutunut</label>
                <input type="radio" value="involved" name="radiation" onChange={() => handleRadioChange('radiation', 'condition', 'inadequate')} />
                <label>Edelläkävijä</label>
                <input type="radio" value="precursor" name="radiation" onChange={() => handleRadioChange('radiation', 'condition', 'inadequate')} />
                <label>Ei sovellettavissa</label>
                <input type="radio" value="notaApplicable" name="radiation" onChange={() => handleRadioChange('radiation', 'condition', 'inadequate')} />
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
                <input type="radio" value="inadequate" name="observations" onChange={() => handleRadioChange('observations', 'condition', 'inadequate')} />
                <label>Sitoutunut</label>
                <input type="radio" value="involved" name="observations" onChange={() => handleRadioChange('observations', 'condition', 'inadequate')} />
                <label>Edelläkävijä</label>
                <input type="radio" value="precursor" name="observations" onChange={() => handleRadioChange('observations', 'condition', 'inadequate')} />
                <label>Ei sovellettavissa</label>
                <input type="radio" value="notaApplicable" name="observations" onChange={() => handleRadioChange('observations', 'condition', 'inadequate')} />
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
      </GrayBackground>
      </FormContainer>
    </SafetyReviewContainer>

/*
    <SafetyReviewContainer>
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
              <label>Onko yleisilme siisi? Millä tasolla päivittäiskatselmointien tulokset ovat? Onko havaittuihin poikkeamiin reagoitu?</label>
              <div>
                <br></br>
              <label>Puutteellinen</label>
                <input type="radio" value="inadequate" name="condition"/>
                <label>Sitoutunut</label>
                <input type="radio" value="involved" name="condition"/>
                <label>Edelläkävijä</label>
                <input type="radio" value="precursor" name="condition"/>
                <label>Ei sovellettavissa</label>
                <input type="radio" value="notaApplicable" name="condition"/>
                <br></br>
                <br></br>
                <label>Huomiot</label>
                <br></br>
                <TextInput type="text" name="attentions" />
              </div>
            </div>
          </div>

          <div>
            <h4>Turvallisuusohjeistukset</h4>
            <div>
              <label>Onko ohjeistukset saatavilla ja ajantasaiset? Noudatetaanko annettuja ohjeita?</label>
              <div>
                <br></br>
              <label>Puutteellinen</label>
                <input type="radio" value="inadequate" name="condition"/>
                <label>Sitoutunut</label>
                <input type="radio" value="involved" name="condition"/>
                <label>Edelläkävijä</label>
                <input type="radio" value="precursor" name="condition"/>
                <label>Ei sovellettavissa</label>
                <input type="radio" value="notaApplicable" name="condition"/>
                <br></br>
                <br></br>
                <label>Huomiot</label>
                <br></br>
                <TextInput type="text" name="attentions" />
              </div>
            </div>
          </div>

          <div>
            <h4>Toiminnan riskiarviointi</h4>
            <div>
              <label>Onko riskiarviointi ajantasalla ja onko toiminnan riskiä mahdollisuus pienentää?</label>
              <div>
                <br></br>
              <label>Puutteellinen</label>
                <input type="radio" value="inadequate" name="condition"/>
                <label>Sitoutunut</label>
                <input type="radio" value="involved" name="condition"/>
                <label>Edelläkävijä</label>
                <input type="radio" value="precursor" name="condition"/>
                <label>Ei sovellettavissa</label>
                <input type="radio" value="notaApplicable" name="condition"/>
                <br></br>
                <br></br>
                <label>Huomiot</label>
                <br></br>
                <TextInput type="text" name="attentions" />
              </div>
            </div>
          </div>

          <div>
            <h4>Suojavarusteet</h4>
            <div>
              <label>Onko henkilökohtaiset suojavarusteet tunnistettu ja saatavilla? Käytetäänkö niitä?</label>
              <div>
                <br></br>
              <label>Puutteellinen</label>
                <input type="radio" value="inadequate" name="condition"/>
                <label>Sitoutunut</label>
                <input type="radio" value="involved" name="condition"/>
                <label>Edelläkävijä</label>
                <input type="radio" value="precursor" name="condition"/>
                <label>Ei sovellettavissa</label>
                <input type="radio" value="notaApplicable" name="condition"/>
                <br></br>
                <br></br>
                <label>Huomiot</label>
                <br></br>
                <TextInput type="text" name="attentions" />
             </div>
            </div>
          </div>

          <div>
            <h4>Ensiapu- ja palosammuttimet</h4>
            <div>
              <label>Onko ensiaputarvikkeet ja palosammuttimet käytettävissä ja ajan tasalla?</label>
              <div>
                <br></br>
              <label>Puutteellinen</label>
                <input type="radio" value="inadequate" name="condition"/>
                <label>Sitoutunut</label>
                <input type="radio" value="involved" name="condition"/>
                <label>Edelläkävijä</label>
                <input type="radio" value="precursor" name="condition"/>
                <label>Ei sovellettavissa</label>
                <input type="radio" value="notaApplicable" name="condition"/>
                <br></br>
                <br></br>
                <label>Huomiot</label>
                <br></br>
                <TextInput type="text" name="attentions" />
              </div>
            </div>
          </div>

          <div>
            <h4>Kemikaalien hallinta</h4>
            <div>
              <label>Onko kemikaaliluettelot ajan tasalla? Säilytetäänkö kemikaalit asianmukaisesti? Onko varoitusmerkit ja käyttöturvatiedotteet saatavilla?</label>
              <div>
                <br></br>
              <label>Puutteellinen</label>
                <input type="radio" value="inadequate" name="condition"/>
                <label>Sitoutunut</label>
                <input type="radio" value="involved" name="condition"/>
                <label>Edelläkävijä</label>
                <input type="radio" value="precursor" name="condition"/>
                <label>Ei sovellettavissa</label>
                <input type="radio" value="notaApplicable" name="condition"/>
                <br></br>
                <br></br>
                <label>Huomiot</label>
                <br></br>
                <TextInput type="text" name="attentions" />
              </div>
            </div>
          </div>

          <div>
            <h4>Räjähdyssuoja-arviointi</h4>
            <div>
              <label>Käsitelläänkö tilassa kemikaaleja tai pölyjä? Onko räjähdyssuoja-arviointi ajantasalla?</label>
              <div>
                <br></br>
              <label>Puutteellinen</label>
                <input type="radio" value="inadequate" name="condition"/>
                <label>Sitoutunut</label>
                <input type="radio" value="involved" name="condition"/>
                <label>Edelläkävijä</label>
                <input type="radio" value="precursor" name="condition"/>
                <label>Ei sovellettavissa</label>
                <input type="radio" value="notaApplicable" name="condition"/>
                <br></br>
                <br></br>
                <label>Huomiot</label>
                <br></br>
                <TextInput type="text" name="attentions" />
              </div>
            </div>
          </div>

          <div>
            <h4>Säteilyturvallisuusdokumentit</h4>
            <div>
              <label>Onko säteilyturvallisuusohjeet ja luvat ajantasalla?</label>
              <div>
                <br></br>
              <label>Puutteellinen</label>
                <input type="radio" value="inadequate" name="condition"/>
                <label>Sitoutunut</label>
                <input type="radio" value="involved" name="condition"/>
                <label>Edelläkävijä</label>
                <input type="radio" value="precursor" name="condition"/>
                <label>Ei sovellettavissa</label>
                <input type="radio" value="notaApplicable" name="condition"/>
                <br></br>
                <br></br>
                <label>Huomiot</label>
                <br></br>
                <TextInput type="text" name="attentions" />
              </div>
            </div>
          </div>

          <div>
            <h4>Turvallisuushavainnot</h4>
            <div>
              <label>Onko tilasta tullut turvallisuushavaintoja? Onko korjaavat toimenpiteet tehty?</label>
              <div>
                <br></br>
              <label>Puutteellinen</label>
                <input type="radio" value="inadequate" name="condition"/>
                <label>Sitoutunut</label>
                <input type="radio" value="involved" name="condition"/>
                <label>Edelläkävijä</label>
                <input type="radio" value="precursor" name="condition"/>
                <label>Ei sovellettavissa</label>
                <input type="radio" value="notaApplicable" name="condition"/>
                <br></br>
                <br></br>
                <label>Huomiot</label>
                <br></br>
                <TextInput type="text" name="attentions" />
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
          <SaveButton type="submit">Tallenna</SaveButton>
        </div>
        <br></br>
        <br></br>
        </form>
      </GrayBackground>
      </FormContainer>
    </SafetyReviewContainer>
*/
  );
};
  
export default SafetyReview;