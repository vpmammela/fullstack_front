import "../styles.css";
import { useNavigate, Form} from "react-router-dom";
import { useEffect } from "react";
import useAuthStore from "../../stores/auth";

const SafetyReview = () => {
  const navigate = useNavigate();
  const authStore = useAuthStore();

  useEffect(() => {
    if(!authStore.isAuth) {
      navigate("/login")
    }
  }, [navigate, authStore])

  return (
    <div>
      <h2>
        6S Turvallisuuskatselmointi
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
            <label>Turvallisuusohjeistukset</label>
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
            <label>Toiminnan riskiarviointi</label>
            <div>
              <label>Onko riskiarviointi ajantasalla ja onko toiminnan riskiä mahdollisuus pienentää?</label>
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
            <label>Suojavarusteet</label>
            <div>
              <label>Onko henkilökohtaiset suojavarusteet tunnistettu ja saatavilla? Käytetäänkö niitä?</label>
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
            <label>Ensiapu- ja palosammuttimet</label>
            <div>
              <label>Onko ensiaputarvikkeet ja palosammuttimet käytettävissä ja ajan tasalla?</label>
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
              <label>Onko kemikaaliluettelot ajan tasalla? Säilytetäänkö kemikaalit asianmukaisesti? Onko varoitusmerkit ja käyttöturvatiedotteet saatavilla?</label>
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
            <label>Räjähdyssuoja-arviointi</label>
            <div>
              <label>Käsitelläänkö tilassa kemikaaleja tai pölyjä? Onko räjähdyssuoja-arviointi ajantasalla?</label>
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
            <label>Säteilyturvallisuusdokumentit</label>
            <div>
              <label>Onko säteilyturvallisuusohjeet ja luvat ajantasalla?</label>
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
            <label>Turvallisuushavainnot</label>
            <div>
              <label>Onko tilasta tullut turvallisuushavaintoja? Onko korjaavat toimenpiteet tehty?</label>
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
};
  
export default SafetyReview;