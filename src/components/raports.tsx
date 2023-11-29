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
      .get('http://localhost:8001/reports')
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
          <li key={report.id}>
            Report ID: {report.id}
            {/* TODO: Add details based on report structure --> make more visual*/}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportsPage;