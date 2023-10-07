/* import axios from 'axios';
import { useState } from 'react'; */

/* interface Item {
  test: string;
}

const BackendTestConnection = () => {
  const [data, setData] = useState<Item[]>([]);
  const backendUrl = "http://localhost:8001";

  // Define a function to fetch data
  const fetchData = async () => {
    try {
      const response = await axios.get<Item[]>(`${backendUrl}/api/v1/test`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Attach the fetchData function to a button click event
  const handleButtonClick = () => {
    fetchData();
  };

  return (
    <div>
    <button onClick={handleButtonClick}>Test Backend</button>
    {data ? (
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.test}</li>
        ))}
      </ul>
    ) : (
      <p>Loading data...</p>
    )}
  </div>
  );
};

export default BackendTestConnection; */

import React, { useState, useEffect } from 'react';
import { exampleFetch } from '../../datahandler/datahandler';
import './TestBackendConnection.css';


const TestBackendConnection: React.FC = () => {
  const [data, setData] = useState<any | null>(null);

  // Define the fetchData function in the component's scope
  const fetchData = async () => {
    try {
      const result = await exampleFetch();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Call the fetchData function when the component mounts
    fetchData();

    // The useEffect function runs once after the initial render, so it behaves like componentDidMount
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div className="testDataContainer">
      {data ? (
        <pre>{data.test}</pre>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default TestBackendConnection;
