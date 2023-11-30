import "../styles.css";
import { useNavigate, Form} from "react-router-dom";
import { useEffect } from "react";
import { useUser } from '../../UserContext';
import useAuthStore from "../../stores/auth";


//ACTION
export async function action({request}: { request: Request }){
    const formData = await request.formData()
    //data variable is an object containing the key-value pairs from the form that were previously collected into the formData object.
    const data = Object.fromEntries(formData)
    const response = await fetch("",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    })
    //Onko hyvä nimi result
    //mihin result pitäisi laittaa?
    const result =await response.json()
    console.log(result)
}

export default function ContinuousReview() {
  
  const navigate = useNavigate();
  const { user } = useUser();
  const authStore = useAuthStore();

  useEffect(() => {
    if(!authStore.isAuth) {
      navigate("/login")
    }
  }, [navigate, authStore])



  return (
    <div>
      <h2>
        Jatkuva katselmointi
      </h2>
      <p>Hei {user}, täytä katselmointi ja tallenna lopuksi</p>
      <Form method="post">
        <label> Tilan yleisilme</label>
        <div>
          <span className="material-symbols-outlined">
            sentiment_dissatisfied
          </span>
          <input type="radio" value="bad" name="condition"/>
        </div>
        <div>
          <span className="material-symbols-outlined">
            sentiment_satisfied
          </span>
          <input type="radio" value="good" name="condition"/>
        </div>
        <div>
          <span className="material-symbols-outlined">
            sentiment_very_satisfied
          </span>
          <input type="radio" value="excellent" name="condition"/>
        </div>
        <div>
          <label>Huomiot
          <input type="text" name="attentions"></input>
          </label>
        </div>
        <div>
          <label>Muita huomioita/ kehitysideoita
          <input type="text" name="developmentIdeas"></input>
          </label>
        </div>
        <div>
          <label>Mitä positiivista olet huomannut tarkastusjasolla?
          <input type="text" name="positiveThings"></input>
          </label>
        </div>
        <label>**Tähän vielä valokuvan lisäys**</label>
        <div>
          <button type="submit">Tallenna</button>
        </div>
      </Form>
    </div>
  );
};
  