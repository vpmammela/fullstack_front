import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// TODO: render dropdonw and text so it can be seen --> move lower.

const GrayBackground = styled.div`
  margin-top: 50px; /* Adjust the margin based on your header height */
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
  z-index: 1;
`;

const ReportListContainer = styled.div`
  margin-top: 20px;
  width: 80%;
  overflow-y: auto;
`;

// Enum for inspection types
enum InspectionType {
  CONTINUOUS = 'Jatkuva katselmointi',
  SEMESTER_AND_YEAR = 'Lukukausi- ja vuosikatselmoinni',
  MANAGEMENT = 'Toimintamallin ja johtamisen katselmoinnit',
  SAFETY = 'Turvallisuuskatselmoinnit',
}

interface Report {
  id: number;
  name: string;
}

interface InspectionResult {
  id: number;
  createdAt: string;
  value: number;
  note: string;
  title: string;
}

const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [inspectionResults, setInspectionResults] = useState<InspectionResult[]>([]);
  const [selectedInspectionType, setSelectedInspectionType] = useState<InspectionType | null>(null);

  const fetchInspectionResults = async (inspectionFormId: number) => {
    try {
      const response = await axios.get(`http://localhost:8001/inspectionresults/${inspectionFormId}`);
      setInspectionResults(response.data);
    } catch (error) {
      console.error('Error fetching inspection results:', error);
    }
  };

  useEffect(() => {
    // Fetch reports when the component mounts.
    axios.get('http://localhost:8001/reports')
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

  const handleInspectionTypeSelection = (selectedType: InspectionType) => {
    setSelectedInspectionType(selectedType);
  };

  return (
    <GrayBackground>
      <label>Valitse tarkasteltavat raportit:</label>
      <select onChange={(e) => handleInspectionTypeSelection(e.target.value as InspectionType)}>
        <option value="">Select an inspection type</option>
        {Object.values(InspectionType).map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <ReportListContainer>
        {selectedReport && selectedInspectionType ? (
          <div>
            <p>Report ID: {selectedReport.id}</p>
            <p>Report Name: {selectedReport.name}</p>
            <p>Inspection Results for {selectedInspectionType}:</p>
            <ul>
              {inspectionResults.map((result) => (
                <li key={result.id}>
                  <p>Result ID: {result.id}</p>
                  <p>Created At: {result.createdAt}</p>
                  <p>Value: {result.value}</p>
                  <p>Note: {result.note}</p>
                  <p>Title: {result.title}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>RAPORTS RENDER HERE</p>
        )}
      </ReportListContainer>
    </GrayBackground>
  );
};

export default ReportsPage;