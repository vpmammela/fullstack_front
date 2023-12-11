import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import LocationSelection from './RoomSelection/LocationSelection';
import EnvironmentSelection from './RoomSelection/EnviromentSelection';
import InspectionsTargetsSelectionByEnvironmentId from './RoomSelection/InspectionsTargetsSelectioByEnviromentId'
import {getEnvironmentReportsData} from '../services/report'
import {getInspectionTargetReportsData} from '../services/report'

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
const ViewingContainer=styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ReportListContainer = styled.div`
  margin-top: 20px;
  width: 80%;
  overflow-y: auto;
`;
const ButtonContainer=styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const RedButton = styled.button`
  background-color: #c9431b;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  font-size: 18px;
  border-radius: 5px;
  margin-top: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`;
// Enum for inspection types
enum InspectionType {
  CONTINUOUS = 'Jatkuva katselmointi',
  SEMESTER = 'Lukukausi- ja vuosikatselmoinni',
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

interface ReportData {
  items: [
    {
      id: number,
      note: string,
      inspectionform_id: number,
      createdAt: string,
      value: number,
      title: string,
      inspectionform: {
        createdAt: string,
        user_id: number,
        inspectiontarget_id: number,
        id: number,
        closedAt: string,
        environment_id: number,
        inspectiontype_id: number
      }
    }
  ]
}


const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<ReportData | null>(null);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [inspectionResults, setInspectionResults] = useState<InspectionResult[]>([]);
  const [selectedInspectionType, setSelectedInspectionType] = useState<InspectionType | null>(null);

  const [location_id, setLocation_id] = useState('')
  const [ environment_id, setEnvironment_id ] = useState<number| null>(null)
  const [ inspectiontarget_id, setInspectiontarget_id ] = useState<number| null>(null)


  const sendReportData= async()=>{
      try{
        if (inspectiontarget_id == null){
          if (selectedInspectionType) {
            const ReportData= await getEnvironmentReportsData(environment_id, selectedInspectionType);
            setReports(ReportData);
            console.log("names", ReportData);
          } else {
            console.error('Selected inspection type is undefined');
          }
        }
        else{
          const ReportData= await getInspectionTargetReportsData(inspectiontarget_id, selectedInspectionType);
            setReports(ReportData);
            console.log("names", ReportData);
        }
      }catch (error) {
        console.error('Error fetching locations:', error);
      }
    }
  


  const handleInspectionTypeSelection = (selectedType: InspectionType) => {
    setSelectedInspectionType(selectedType);
    console.log(selectedType)
  };


  return (
    <GrayBackground>
      <h3>Haluatko nähdä raportit ympäristöstä vai tilasta?</h3>
      <LocationSelection setLocation_id={setLocation_id}></LocationSelection>

      {location_id && (
              <div className="selectStyle">
                <EnvironmentSelection setEnvironment_id={setEnvironment_id} location_id={parseInt(location_id, 10)}></EnvironmentSelection>

                {environment_id && (
                  <div>
                  <text>Jos haluat nähdä raportit ympäristöstä jätä tila valitsematta</text>
                  <InspectionsTargetsSelectionByEnvironmentId setInspectiontarget_id={setInspectiontarget_id} environment_id={environment_id}></InspectionsTargetsSelectionByEnvironmentId>
                  <ViewingContainer>
                  <label>Valitse tarkasteltavat raportit:</label>
                  <select onChange={(e) => handleInspectionTypeSelection(e.target.value as InspectionType)}>
                    <option value="">Valitse katselmointi tyyppi</option>
                    {Object.values(InspectionType).map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </ViewingContainer>
                <ButtonContainer>
                  <RedButton type="button" onClick={() => sendReportData()}>
                    Hae raportit
                  </RedButton>
                </ButtonContainer>
                </div>
                )}
              </div> 
            )}
      

      <ReportListContainer>
        
        {reports && reports.items.map((item: any, index: number) => (
          <div key={index}>
            <p>Report ID: {item.id}</p>
          </div>
          
        ))}

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