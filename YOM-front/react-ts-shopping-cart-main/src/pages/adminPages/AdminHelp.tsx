import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSideBar from '../../components/layout/AdminSideBar';
import { useNavigate } from 'react-router-dom';
interface Report {
  id:number
  userId: string;
  description: string;
  dateCreated: string;
  reportStatus: string;
}

const AdminHelp: React.FC = () => {
  const navigate=useNavigate();
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<'Active' | 'Staged' | 'Solved'>('Active');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`https://localhost:7014/api/Admin/HelpReport/All/ByReportStatus?reportStatus=${selectedStatus}`);
        console.log('====================================');
        console.log(response.data);
        console.log('====================================');
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, [selectedStatus]);
  const handleBlock = async (userId: string) => {
    try {
      const response = await axios.put(`https://localhost:7014/api/Admin/User/Block/${userId}`);

      if (response.status === 200) {
        console.log(` success`);
      } else {
        console.error(`Error `, response.data);
      }
    } catch (error) {
      console.error(`Error while trying `, error);
    }
  };
  const handleSolve = async (id: number) => {
    try {
      const response = await axios.put(`https://localhost:7014/api/Admin/Ad/UpdateAd/State`,{id,reportStatus:"Solved"});

      if (response.status === 200) {
        console.log(` success`);
      } else {
        console.error(`Error `, response.data);
      }
    } catch (error) {
      console.error(`Error while trying `, error);
    }
  };
  return (
    <div className='admin-flex'>
      <AdminSideBar />
        <div className='adminhelp-container'>
          <h1 className='adminhelp-title'>Welcome to AdminHelp</h1>
          <div className='adminhelp-statusFilters'>
            <label className='adminhelp-statusFilter'>
              <input type="radio" value="Active" checked={selectedStatus === 'Active'} onChange={() => setSelectedStatus('Active')} />
              Active
            </label>
            <label className='adminhelp-statusFilter'>
              <input type="radio" value="Staged" checked={selectedStatus === 'Staged'} onChange={() => setSelectedStatus('Staged')} />
              Staged
            </label>
            <label className='adminhelp-statusFilter'>
              <input type="radio" value="Solved" checked={selectedStatus === 'Solved'} onChange={() => setSelectedStatus('Solved')} />
              Solved
            </label>
          </div>
          <div className='adminhelp-tableWrapper'>
            <table className='adminhelp-table'>
            <thead>
              <tr>
                <th>UserID</th>
                <th>Description</th>
                <th>Date Created</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td>{report.userId}</td>
                  <td>{report.description}</td>
                  <td>{report.dateCreated}</td>
                  <td>{report.reportStatus}</td>
                  <td>
                    <button onClick={() => {
                    // Navigate to report details page
                    // Assuming you'll create a component for this
                    
                    navigate(`/admin/helpReportDetail/${report.userId}`);
                  }}>View Report</button>
                  {/* <button className="report-block" onClick={() => handleBlock(report.userId)}>Block</button> */}
                  <button className="report-block" onClick={() => handleSolve(report.id)}>Solved</button>



                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminHelp;
