import { useState, useEffect } from "react"
import { getReports } from '../../services/reports';
import { useNotification } from "../../NotificationContext";
import Report from "../Report/Report";
import { useReviewContext } from "../../ReviewContext";

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
  const { inspectiontarget_id } = useReviewContext();

  useEffect(() => {
    const fetchReports = async () => {
      console.log("Fetching reports")
      try {
        const reportData: {items: ReportData[]} = await getReports(type);
        console.log("REPORTS:", reportData)
        setReportsArray(reportData.items)
      } catch (error) {
        setNotification(`Error fetching reports: ${error}`);
      }
    };
    fetchReports();
  }, [type]);

  
  return (
    <div>
      {reportsArray.map(report => (
        inspectiontarget_id !== report.inspectionform.inspectiontarget_id ? null :
        <Report
          key={`${report.createdAt}-${report.inspectionform_id}`}
          inspectionform_id={report.inspectionform_id}
          user_id={report.inspectionform.user_id}
          environment_id={report.inspectionform.environment_id}
          inspectiontarget_id={report.inspectionform.inspectiontarget_id}
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