import { useEffect, useState } from "react";
import { getUserById } from "../../services/user";
import { useNotification } from "../../NotificationContext";
import { getEnvironmentById } from "../../services/environment";
import { getInspectionTargetById } from "../../services/inspectiontarget";


interface UserData {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface EnvironmentData {
  id: number;
  name: string;
}

interface TargetData {
  id: number;
  name: string;
}

const reportStyle: React.CSSProperties = {
  border: '1px solid',
  padding: '10px',
  marginBottom: '10px',
};

const Report: React.FC<{ inspectionform_id: number, user_id: number, environment_id: number, inspectiontarget_id: number, createdAt: string, title: string, value: number, note: string }> = ({ inspectionform_id, user_id, environment_id, inspectiontarget_id, createdAt, title, value, note }) => {
  const { setNotification } = useNotification();
  const [username, setUsername] = useState('');
  const [environment, setEnvironment] = useState('');
  const [target, setTarget] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      console.log("Fetching reports")
      try {
        console.log("env id: ", environment_id)
        const environmentData: EnvironmentData = await getEnvironmentById(environment_id);
        setEnvironment(environmentData.name);
        const targetData: TargetData = await getInspectionTargetById(inspectiontarget_id);
        setTarget(targetData.name);
        const userData: UserData = await getUserById(user_id);
        setUsername(userData.username);
      } catch (error) {
        setNotification(`Error fetching user: ${error}`);
      }
    };
    fetchReports();
  }, [user_id, environment_id, inspectiontarget_id]);

  return (
    <div style={reportStyle}>
      <p>Katselmointi #{inspectionform_id}<br></br>
      {environment} huone {target}<br></br>
      Luotu: {createdAt}<br></br> 
      Käyttäjä: {username}</p>
      <p>{title}<br></br>
      Arviointi: {value === 0 ? "Ei sovellettavissa": value}<br></br>
      Huomiot: {note}</p>
    </div>
  );
}

export default Report