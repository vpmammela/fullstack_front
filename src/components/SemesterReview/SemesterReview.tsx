import { useState } from "react";
import "../styles.css";
import { Form } from "react-router-dom";


interface FormData {
  [key: string]: {
    condition: string;
    note: string;
  };
}

interface ResultData {
  createdAt: Date;
  value: number; // Assuming a numerical evaluation (1-4)
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
  // Initialize state to store selected values and notes
  const [formData, setFormData] = useState<FormData>({
    general: { condition: 'precursor', note: '' },
    instructions: { condition: '', note: '' },
    safety: { condition: '', note: '' },
    waste: { condition: '', note: '' },
    chemicals: { condition: '', note: '' },
    equipment: { condition: '', note: '' },
  });

  // Function to handle radio button changes
  const handleRadioChange = (category: string, property: 'condition' | 'note', value: string) => {
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
  const handleDataForResult = (category: string): ResultData => {
    const { condition, note } = formData[category];
    const createdAt = new Date().toISOString().slice(0, 19).replace("T", " ");

    // Map the radio button values to numerical evaluations (1-4)
    const evaluationMap: { [key: string]: number } = {
      inadequate: 1,
      involved: 2,
      precursor: 3,
      notaApplicable: 4,
    };

    const value = evaluationMap[condition];

    return {
      createdAt,
      value,
      note,
      title: questionsMap[category] || 'Unknown Question',
      inspectionform_id: 2
    };
  };

  const sendResultData = () => {
    Object.keys(questionsMap).forEach((category) => {
      const resultData = handleDataForResult(category);
      console.log(resultData);
    });
  };


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
                <input type="radio" value="inadequate" name="general" onChange={() => handleRadioChange('general', 'condition', 'inadequate')}/>
                <label>Sitoutunut</label>
                <input type="radio" value="involved" name="general" onChange={() => handleRadioChange('general', 'condition', 'involved')}/>
                <label>Edelläkävijä</label>
                <input type="radio" value="precursor" name="general" onChange={() => handleRadioChange('general', 'condition', 'precursor')}/>
                <label>Ei sovellettavissa</label>
                <input type="radio" value="notaApplicable" name="general" onChange={() => handleRadioChange('general', 'condition', 'notaApplicable')}/>
                <label>Huomiot</label>
                <input type="text" name="generalComment" onChange={(e) => handleTextChange('general', e.target.value)}/>
              </div>
            </div>
          </div>

          <div>
            <label>Ohjeistukset</label>
            <div>
              <label>Onko ohjeistukset saatavilla ja ajantasaiset? Noudatetaanko annettuja ohjeita?</label>
              <div>
              <label>Puutteellinen</label>
                <input type="radio" value="inadequate" name="instructions" onChange={() => handleRadioChange('instructions', 'condition', 'inadequate')}/>
                <label>Sitoutunut</label>
                <input type="radio" value="involved" name="instructions" onChange={() => handleRadioChange('instructions', 'condition', 'involved')}/>
                <label>Edelläkävijä</label>
                <input type="radio" value="precursor" name="instructions" onChange={() => handleRadioChange('instructions', 'condition', 'precursor')}/>
                <label>Ei sovellettavissa</label>
                <input type="radio" value="notaApplicable" name="instructions" onChange={() => handleRadioChange('instructions', 'condition', 'notaApplicable')}/>
                <label>Huomiot</label>
                <input type="text" name="instuctionsComment" onChange={(e) => handleTextChange('instructions', e.target.value)}/>
              </div>
            </div>
          </div>

          <div>
            <label>Turvallisuus</label>
            <div>
              <label>Turvallisuushavaitojen läpikäynti, koneiden ja laitteiden kunto ja turvallisuus, henkilösuojaimet</label>
              <div>
              <label>Puutteellinen</label>
                <input type="radio" value="inadequate" name="safety" onChange={() => handleRadioChange('safety', 'condition', 'inadequate')}/>
                <label>Sitoutunut</label>
                <input type="radio" value="involved" name="safety" onChange={() => handleRadioChange('safety', 'condition', 'involved')}/>
                <label>Edelläkävijä</label>
                <input type="radio" value="precursor" name="safety" onChange={() => handleRadioChange('safety', 'condition', 'precursor')}/>
                <label>Ei sovellettavissa</label>
                <input type="radio" value="notaApplicable" name="safety" onChange={() => handleRadioChange('safety', 'condition', 'notaApplicable')}/>
                <label>Huomiot</label>
                <input type="text" name="safetyComment" onChange={(e) => handleTextChange('safety', e.target.value)}/>
              </div>
            </div>
          </div>

          <div>
            <label>Kiertotalous</label>
            <div>
              <label>Onko syntyvät erityisjätteet tunnistettu? Onko tarpeelliset kierrätysastiat saatavilla? Huolehditaanko tarvittavat tyhjennykset?</label>
              <div>
              <label>Puutteellinen</label>
                <input type="radio" value="inadequate" name="waste" onChange={() => handleRadioChange('waste', 'condition', 'inadequate')}/>
                <label>Sitoutunut</label>
                <input type="radio" value="involved" name="waste" onChange={() => handleRadioChange('waste', 'condition', 'involved')}/>
                <label>Edelläkävijä</label>
                <input type="radio" value="precursor" name="waste" onChange={() => handleRadioChange('waste', 'condition', 'precursor')}/>
                <label>Ei sovellettavissa</label>
                <input type="radio" value="notaApplicable" name="waste" onChange={() => handleRadioChange('waste', 'condition', 'notaApplicable')}/>
                <label>Huomiot</label>
                <input type="text" name="wasteComment" onChange={(e) => handleTextChange('waste', e.target.value)}/>
             </div>
            </div>
          </div>

          <div>
            <label>Kemikaalien hallinta</label>
            <div>
              <label>Onko kemikaaliluettelot ajantasalla? Säilytetäänkö kemikaalit asianmukaisesti? Onko varoitusmerkit ja käyttöturvatiedotteet saatavilla?</label>
              <div>
              <label>Puutteellinen</label>
                <input type="radio" value="inadequate" name="chemicals" onChange={() => handleRadioChange('chemicals', 'condition', 'inadequate')}/>
                <label>Sitoutunut</label>
                <input type="radio" value="involved" name="chemicals" onChange={() => handleRadioChange('chemicals', 'condition', 'involved')}/>
                <label>Edelläkävijä</label>
                <input type="radio" value="precursor" name="chemicals" onChange={() => handleRadioChange('chemicals', 'condition', 'precursor')}/>
                <label>Ei sovellettavissa</label>
                <input type="radio" value="notaApplicable" name="chemicals" onChange={() => handleRadioChange('chemicals', 'condition', 'notaApplicable')}/>
                <label>Huomiot</label>
                <input type="text" name="chemicalsComment" onChange={(e) => handleTextChange('chemicals', e.target.value)}/>
              </div>
            </div>
          </div>

          <div>
            <label>Trail - kalustonhallinta</label>
            <div>
              <label>Onko laitteet ajantasalla kalustonhallintajärjestelmässä? </label>
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
              </div>
            </div>
          </div>

          <div>
            <label>Muita huomioita/ kehitysideat</label>
            <input type="text" name="otherAttentions"/>
          </div>

          <div>
          <label>Mitä positiivista olet huomannut tarkastusjasolla?</label>
          <input type="text" name="positiveThings"></input>
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