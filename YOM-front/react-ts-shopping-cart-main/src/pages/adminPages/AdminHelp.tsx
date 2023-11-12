import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSideBar from '../../components/layout/AdminSideBar';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/AdminPages/adminHelp.css';


interface Report {
  id: number
  userId: string;
  description: string;
  dateCreated: string;
  reportStatus: string;
}

const AdminHelp: React.FC = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<'Active' | 'Staged' | 'Solved'>('Active');
  const [page, setPage] = useState<number>();
  const [totalPages, setPages] = useState(1);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`https://localhost:7014/api/Admin/HelpReport/All/ByReportStatus?reportStatus=${selectedStatus}&pageNumber=1`);
        console.log('====================================');
        console.log(response.data.userHelpReports);
        console.log('====================================');
        setReports(response.data.userHelpReports);
        setPage(1);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, [selectedStatus]);

  const getReports = async (page: number) => {
    try {
      const response = await axios.get(`https://localhost:7014/api/Admin/HelpReport/All/ByReportStatus?reportStatus=${selectedStatus}&pageNumber=${page}`);
      setReports(response.data.userHelpReports);
      setPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  }
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
      const response = await axios.put(`https://localhost:7014/api/Admin//HelpReport/ChangeStatus`, { id, reportStatus: "Solved" });
      const updatedReports = reports.filter(report => report.id !== id);
      setReports(updatedReports);
      if (response.status === 200) {
        console.log(` success`);
      } else {
        console.error(`Error `, response.data);
      }
    } catch (error) {
      console.error(`Error while trying `, error);
    }
  };

  const handleStage = async (id: number) => {
    try {
      console.log(id);
      
      const response = await axios.put(`https://localhost:7014/api/Admin/HelpReport/ChangeStatus`, { id, reportStatus: "Staged" });
      const updatedReports = reports.filter(report => report.id !== id);
      setReports(updatedReports);
      if (response.status === 200) {
        console.log(` success`);
      } else {
        console.error(`Error `, response.data);
      }
    } catch (error) {
      console.error(`Error while trying `, error);
    }
  };

  const handleClickPage = async (pg: number) => {
    console.log(pg);
    if (page) {
      setPage(pg);
      getReports(pg);
    }
  }

  return (
    <div className='admin-flex'>
      <AdminSideBar />
      <div className='admin-AllhelpReport'>
        <h2>Welcome to AdminHelp</h2>
        <div className='adminhelp-statusFilters'>
          <label className='adminhelp-statusFilter'>
            <input type="radio" value="Active" checked={selectedStatus === 'Active'} onChange={() => setSelectedStatus('Active')} />
            Активні
          </label>
          <label className='adminhelp-statusFilter'>
            <input type="radio" value="Staged" checked={selectedStatus === 'Staged'} onChange={() => setSelectedStatus('Staged')} />
            В обробці
          </label>
          <label className='adminhelp-statusFilter'>
            <input type="radio" value="Solved" checked={selectedStatus === 'Solved'} onChange={() => setSelectedStatus('Solved')} />
            Вирішені
          </label>
        </div>
        <table className="admin-helpReport-table">
          <colgroup ></colgroup>
          <thead>
            <tr>
              <th>ID користувача</th>
              <th>Опис</th>
              <th>Дата створення</th>
              <th>Статус</th>
              <th>Дії</th>
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
                  <div className='admin-helpReport-buttons'>
                    <button className='info' onClick={() => {
                      // Get User Info
                      navigate(`/admin/helpReportDetail/${report.userId}`);
                    }}>Інформацію користувача</button>
                    <button className="stage" onClick={() => handleStage(report.id)}>В обробку</button>
                    <button className="solve" onClick={() => handleSolve(report.id)}>Вирішено</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='admin-pagination'>
          <button
            onClick={() => handleClickPage(page !== undefined ? page - 1 : 1)}
            disabled={page === 1}
          >
            Попередня
          </button>
          <span>
            Сторінка {page} of {totalPages}
          </span>
          <button
            onClick={() => handleClickPage(page !== undefined ? page + 1 : 1)}
            disabled={page === totalPages}
          >
            Наступна
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminHelp;
