import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const GrayBackground = styled.div`
  position: absolute;
  top: 66%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100vh;
  background-color: lightgray;
  border-top-left-radius: 0% 50px;
  border-top-right-radius: 0% 50px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const ReportListContainer = styled.div`
  margin-top: 20px;
  width: 80%;
  overflow-y: auto;
`;

const DropdownContainer = styled.div`
  position: absolute;
  margin-top: 120px;
  width: 80%;
`;

interface Report {
  id: number;
  name: string;
  // Add other properties based on your report structure
}

const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

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

  const handleReportSelection = (selectedId: number) => {
    const selected = reports.find((report) => report.id === selectedId);
    setSelectedReport(selected || null);
  };

  return (
    <GrayBackground>
      <DropdownContainer/>
      <div>
        <h1>Reports Page</h1>
        <label>Valitse kategoria jonka raportteja haluat tutkia: </label>
        <select
          onChange={(e) => handleReportSelection(Number(e.target.value))}
        >
          <option value={0}>Select a report</option>
          {reports.map((report) => (
            <option key={report.id} value={report.id}>
              {report.name}
            </option>
          ))}
        </select>
        <ReportListContainer>
          {selectedReport ? (
            <div>
              <p>Report ID: {selectedReport.id}</p>
              <p>Report Name: {selectedReport.name}</p>
              {/* TODO: Add other details based on your report structure */}
            </div>
          ) : (
            <p>RAPORTS RENDER HERE</p>
          )}
        </ReportListContainer>
      </div>
    </GrayBackground>
  );
};

export default ReportsPage;