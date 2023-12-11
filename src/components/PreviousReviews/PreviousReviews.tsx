import { useState, useEffect } from "react"
import { getReports } from '../../services/reports';
import { useNotification } from "../../NotificationContext";
import Report from "../Report/Report";

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


const PreviousReviews: React.FC<{ type: string }> = ({ type }) => {
  const { setNotification } = useNotification();
  const [reportsArray, setReportsArray] = useState<ReportData[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      console.log("Fetching reports")
      try {
        const reportData: {items: ReportData[]} = await getReports(type);
        console.log("REPORTS:", reportData)
        setReportsArray(reportData.items)
      } catch (error) {
        setNotification('Error fetching reports:', error);
      }
    };
    fetchReports();
  }, [type]);
  
  return (
    <div>
    {reportsArray.map(report => (
      <Report
        key={`${report.createdAt}-${report.inspectionform_id}`}
        inspectionform_id={report.inspectionform_id}
        user_id={report.inspectionform.user_id}
        createdAt={report.createdAt}
        title={report.title}
        value={report.value}
        note={report.note}
      />
    ))}
  </div>
  );
}

export default PreviousReviews