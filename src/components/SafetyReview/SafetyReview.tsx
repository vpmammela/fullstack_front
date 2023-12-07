import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import Header from '../header';

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

const SafetyReview = () => {
  const [photo, setPhoto] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setPhoto(file || null);
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
  );
};
  
export default SafetyReview;