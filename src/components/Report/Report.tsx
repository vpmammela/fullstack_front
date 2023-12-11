import { useEffect, useState } from "react";
import { getUserById } from "../../services/user";
import { useNotification } from "../../NotificationContext";

interface FormData {
  createdAt: string;
  user_id: number;
  inspectiontarget_id: number;
  id: number;
  closedAt: string;
  environment_id: number;
  inspectiontype_id: number;
}

interface ReportData {
  id: number;
  note: string;
  inspectionform_id: number;
  createdAt: string;
  value: number;
  title: string;
  inspectionform: FormData;
}

interface UserData {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
}

const reportStyle: React.CSSProperties = {
  border: '1px solid',
  padding: '10px',
  marginBottom: '10px',
};

const Report: React.FC<{ inspectionform_id: number, user_id: number, createdAt: string, title: string, value: number, note: string }> = ({ inspectionform_id, createdAt, user_id, title, value, note }) => {
  const { setNotification } = useNotification();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      console.log("Fetching reports")
      try {
        const userData: UserData = await getUserById(user_id);
        console.log("USERNAME:", userData.username)
        setUsername(userData.username)
      } catch (error) {
        setNotification('Error fetching reports:', error);
      }
    };
    fetchReports();
  }, [user_id]);

  return (
    <div style={reportStyle}>
      <p>Katselmointi: {inspectionform_id}<br></br>
      Luotu: {createdAt}<br></br> 
      Käyttäjä: {username}</p>
      <p>{title}<br></br>
      Arviointi: {value === 0 ? "Ei sovellettavissa": value}<br></br>
      Huomiot: {note}</p>
    </div>
  );
}

export default Report