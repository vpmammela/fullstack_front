import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LocationSelection from './RoomSelection/LocationSelection';
import EnvironmentSelection from './RoomSelection/EnviromentSelection';
import InspectionsTargetsSelectionByEnvironmentId from './RoomSelection/InspectionsTargetsSelectioByEnviromentId'
import {getEnvironmentReportsData} from '../services/report'
import {getInspectionTargetReportsData} from '../services/report'
import ChartRaport from './ChartRaport'

// TODO: render dropdonw and text so it can be seen --> move lower.

const GrayBackground = styled.div`
 position: absolute;
  width: 100%;
  min-height: 100vh;
  background-color: lightgray;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  @media (max-width: 768px) {
    padding-top: /* Adjust for smaller devices */;
    width: 100%; /* Reset width for smaller devices */
  }
`;
const SelectContainer=styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px;

  @media (max-width: 768px) {
    padding-top: /* Adjust for smaller devices */;
    width: 100%; /* Reset width for smaller devices */
  }
`;
const ReportListContainer = styled.div`
  margin-top: 20px;
  width: 50%; /* Set the width to 50% of the page */
  overflow-y: auto;

  @media (max-width: 768px) {
    padding-top: /* Adjust for smaller devices */;
    width: 100%; /* Reset width for smaller devices */
  }
`;
const ButtonContainer=styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding-top: /* Adjust for smaller devices */;
    width: 100%; /* Reset width for smaller devices */
  }
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

  @media (max-width: 768px) {
    padding-top: /* Adjust for smaller devices */;
    width: 100%; /* Reset width for smaller devices */
  }

`;
const CardContainer =styled.div`
  background-color: #f5f5f5;
  border-radius: 10px;
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  margin: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding-top: /* Adjust for smaller devices */;
    width: 100%; /* Reset width for smaller devices */
  }
  
`;
const QuestionContainer =styled.div`
  display:flex;
  flex-direction:column;
  background-color: #ffffff;
  border-radius: 8px;
  width: 90%;
  margin:10px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding-top: /* Adjust for smaller devices */;
    width: 100%; /* Reset width for smaller devices */
  }
`;
const TitleContainer =styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  @media (max-width: 768px) {
    padding-top: /* Adjust for smaller devices */;
    width: 100%; /* Reset width for smaller devices */
  }
`;
const SelectionContainer= styled.div`
display: flex;
  flex-direction: column; /* Voit muuttaa suunnan tarpeesi mukaan */
  align-items: flex-start; /* Aseta tämä tarpeesi mukaan */

  @media (max-width: 768px) {
    padding-top: /* Adjust for smaller devices */;
    width: 100%; /* Reset width for smaller devices */
  }
`;
const TextComponent =styled.h3`
color: #14827d ;
`
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

// Oletetaan, että GroupType on objektin tyyppi, jonka group sisältää
type GroupType = 
  {
  id: number;
  note: string;
  inspectionform_id: number;
  createdAt: string;
  value: number;
  title: string;
  inspectionform: {
    createdAt: string;
    user_id: number;
    inspectiontarget_id: number;
    id: number;
    closedAt: string;
    environment_id: number;
    inspectiontype_id: number;
  };
}



const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<ReportData | null>(null);

  const [selectedInspectionType, setSelectedInspectionType] = useState<InspectionType | null>(null);

  const [location_id, setLocation_id] = useState('')
  const [ environment_id, setEnvironment_id ] = useState<number| null>(null)
  const [ inspectiontarget_id, setInspectiontarget_id ] = useState<number| null>(null)
  const [groupedReports, setGroupedReports] = useState(null);


  const sendReportData= async()=>{
      try{
        if (inspectiontarget_id == null){
          if (selectedInspectionType) {
            const ReportData= await getEnvironmentReportsData(environment_id, selectedInspectionType);
            setReports(ReportData);
            
          } else {
            console.error('Selected inspection type is undefined');
          }
        }
        else{
          const ReportData= await getInspectionTargetReportsData(inspectiontarget_id, selectedInspectionType);
            setReports(ReportData);
            
        }
      }catch (error) {
        console.error('Error fetching locations:', error);
      }
    }
  
     // Group data by inspectionform_id
    useEffect(() => {
      if (!reports) {
        // Handle null case or display loading
        console.log("ei katselmointeja");
        setGroupedReports(null);
        return;
      }
  
      // Group data by inspectionform_id
      const groupedData = reports.items.reduce((acc:any, currentItem:any) => {
        const key = currentItem.inspectionform_id;
  
        if (!acc[key]) {
          acc[key] = [];
        }
  
        acc[key].push(currentItem);
  
        return acc;
      }, {});
  
  
      // Set the grouped data to state
      setGroupedReports(groupedData);
    }, [reports]);


  const handleInspectionTypeSelection = (selectedType: InspectionType) => {
    setSelectedInspectionType(selectedType);
    console.log(selectedType)
  };


  const getAnswerText = (value: number, selectedInspectionType: InspectionType | null): string => {
    if (selectedInspectionType === InspectionType.CONTINUOUS) {
      switch (value) {
        case 1:
          return 'Puutteellinen';
        case 2:
          return 'Sitoutunut';
        case 3:
          return 'Edelläkävijä';
        default:
          return ''; // Voit määrittää oletustekstin tarpeidesi mukaan
      }
    }
    else if (selectedInspectionType === InspectionType.SEMESTER || selectedInspectionType === InspectionType.SAFETY) {
      switch (value) {
        case 1:
          return 'Puutteellinen';
        case 2:
          return 'Sitoutunut';
        case 3:
          return 'Edelläkävijä';
        case 4:
          return 'Ei sovellettavissa';
        default:
          return ''; // Voit määrittää oletustekstin tarpeidesi mukaan
      }
    }
    else {
      switch (value) {
        case 1:
          return 'Heikko';
        case 2:
          return 'Puutteellinen';
        case 3:
          return 'Perustaso';
        case 4:
          return 'Sitoutunut';
        case 5:
          return 'Edelläkävijä';
        default:
          return ''; // Voit määrittää oletustekstin tarpeidesi mukaan
      }
    }
  };
  


  return (
    <GrayBackground>
      <TextComponent>Haluatko nähdä raportit ympäristöstä vai tilasta?</TextComponent>
      <SelectionContainer>
      <div className="selectStyle">
        <LocationSelection setLocation_id={setLocation_id}></LocationSelection>
      </div>
      {location_id && (
        <div className="selectStyle">
          <EnvironmentSelection setEnvironment_id={setEnvironment_id} location_id={parseInt(location_id, 10)}></EnvironmentSelection>

          {environment_id && (
            <div>
            <text>Jos haluat nähdä raportit ympäristöstä jätä tila valitsematta</text>
            <InspectionsTargetsSelectionByEnvironmentId setInspectiontarget_id={setInspectiontarget_id} environment_id={environment_id}></InspectionsTargetsSelectionByEnvironmentId>
            <SelectContainer>
            <label>Valitse tarkasteltavat raportit:</label>
            <select onChange={(e) => handleInspectionTypeSelection(e.target.value as InspectionType)}>
              <option value="">Valitse katselmointi tyyppi</option>
              {Object.values(InspectionType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </SelectContainer>
          <ButtonContainer>
            <RedButton type="button" onClick={() => sendReportData()}>
              Hae raportit
            </RedButton>
          </ButtonContainer>
          </div>
          )}
          {selectedInspectionType === InspectionType.CONTINUOUS &&
          // @ts-ignore
            <ChartRaport reports={reports}></ChartRaport>}
          
        </div> 
      )}
      </SelectionContainer>

      <ReportListContainer>
      {groupedReports &&
        Object.entries(groupedReports).map(([key, groups]) => (
          <CardContainer key={key}>
            <TitleContainer>
            <h2>Katselmointi {key}</h2>
            </TitleContainer>
            
            {
            // @ts-ignore
            groups.map((group: GroupType, innerGroupIndex: number) => (
            <QuestionContainer key={innerGroupIndex}>
              <p>{group.title}</p>
              <p>Vastaus: {getAnswerText(group.value, selectedInspectionType)}</p>
              <p>Huomiot: {group.note}</p>
            </QuestionContainer>
            ))}
          </CardContainer>
       ))}
      </ReportListContainer>
      
    </GrayBackground>
  );
};

export default ReportsPage;