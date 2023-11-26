import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Report {
  id: number;
}

const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    // Fetch reports when the component mounts.
    axios
      .get('/api/reports') // TODO: Replace with API endpoint.
      .then((response) => {
        setReports(response.data);
      })
      .catch((error) => {
        console.error('Error fetching reports:', error);
      });
  }, []);

  return (
    <div>
      <h1>Reports Page</h1>
      <ul>
        {reports.map((report) => (
          <li key={report.id}>{/* TODO: Show report details here */}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReportsPage;