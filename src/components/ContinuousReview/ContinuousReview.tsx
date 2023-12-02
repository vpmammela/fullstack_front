import React, { useState, ChangeEvent } from 'react';
import { Form } from 'react-router-dom';
import { useUser } from '../../UserContext';

// ACTION
export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const response = await fetch('', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  console.log(result);
}

// ContinuousReview Component
const ContinuousReview = () => {
  const { user } = useUser();
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setPhoto(file || null);

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      console.log("image url:", imageUrl)
      setPhotoUrl(imageUrl);
    } else {
      setPhotoUrl(null);
    }
  };

  return (
    <div>
      <h2>Jatkuva katselmointi</h2>
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
        <br/>
        <label>
          Valitse kuva
          {/*Add picture*/}
          <input type="file" accept="image/*" capture="environment" onChange={handleFileChange} />
        </label>
        <p>
          Image preview:
          {photoUrl && <img src={photoUrl} alt="Selected" style={{ maxWidth: '100%' }} />}
        </p>
        <div>
      </div>
        <div>
          <button type="submit">Tallenna</button>
        </div>
      </Form>
    </div>
  );
};

export default ContinuousReview;
  