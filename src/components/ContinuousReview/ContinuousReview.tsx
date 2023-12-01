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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setPhoto(file || null);
  };

  return (
    <div>
      <h2>Jatkuva katselmointi</h2>
      <p>Hei {user}, täytä katselmointi ja tallenna lopuksi</p>
      <Form method="post">
        <label>
          Valitse kuva
          {/*Add picture*/}
          <input type="file" accept="image/*" capture="environment" onChange={handleFileChange} />
        </label>
        <div>
          <button type="submit">Tallenna</button>
        </div>
      </Form>
    </div>
  );
};

export default ContinuousReview;
  