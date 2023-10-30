import "../styles.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useUser } from '../../UserContext';
import getFormsValues from "../../functions/getFormValues";


export default function ContinuousReview() {
  
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if(user === null) {
      navigate("/")
    }
  }, [navigate, user])

  //
  const handleContinuosReview=(event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();

    const {isEmpty, data}= getFormsValues(event.currentTarget)
    
    //checks whether all fields have been answered
    if (isEmpty) {
      console.log("Form data is empty or there are empty flieds.");
    } 
      
    console.log(data)
    //clear inputs
    event.currentTarget.reset();

  }

  return (
    <div>
      <h2>
        Jatkuva katselmointi
      </h2>
      <p>Hei {user}, täytä katselmointi ja tallenna lopuksi</p>
      <form onSubmit={handleContinuosReview}>
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
      </form>
    </div>
  );
};
  