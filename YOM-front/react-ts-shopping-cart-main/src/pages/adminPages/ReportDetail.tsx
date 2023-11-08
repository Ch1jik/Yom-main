import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface ReportDetail {
reportId:number;
  userId: string;
  description: string;
  dateCreated: string;
  reportStatus: string;
}

// interface RouteParams {
//   ReportId: string;
// }

const ReportDetail: React.FC = () => {
  const [report, setReport] = useState<ReportDetail | null>(null);
  const { reportId } = useParams<{ reportId: string }>();
    const ReportId=Number(reportId);
  useEffect(() => {
    const fetchReportDetail = async () => {
      try {
        const response = await axios.get(`https://localhost:7014/api/Admin/HelpReport/ByReportId/${ReportId}`);
        setReport(response.data);
      } catch (error) {
        console.error('Error fetching report details:', error);
      }
    };

    fetchReportDetail();
  }, [ReportId]);

  const handleBlockUser = async () => {
    try {
      if (report) {
        await axios.post(`https://localhost:7014/api/Admin/User/Block/${report.userId}`);
        alert('User blocked successfully');
      }
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  if (!report) return <div>Loading...</div>;

  return (
    <div>
      <h1>Report Details</h1>
      <p>User ID: {report.userId}</p>
      <p>Description: {report.description}</p>
      <p>Date Created: {report.dateCreated}</p>
      <p>Status: {report.reportStatus}</p>
      <button onClick={handleBlockUser}>Block User</button>
    </div>
  );
}

export default ReportDetail;
