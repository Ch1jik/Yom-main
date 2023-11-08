import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useParams ,useNavigate } from 'react-router-dom';

interface ReportUserProps {}

const ReportUser: React.FC<ReportUserProps> = () => {
  const params = new URLSearchParams(window.location.search);
  const navigate=useNavigate();
    const categoryId = params.get('userId');
  const userId  = useParams<{ id: string }>();
  const [description, setDescription] = useState<string>('');
  const [reportStatus] = useState<string>('Active'); // Assuming this is constant and doesn't need to change.
  console.log('====================================');
  console.log(userId);
  console.log('====================================');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const reportData = {
      userId,
      description,
      // dateCreated: new Date().toISOString(),
      reportStatus,
    };

    try {
      const response = await axios.post('https://localhost:7014/api/HelpReport/Create', reportData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Report submitted successfully.');
        navigate('/')
        // Handle any other logic after successful submission, e.g. showing a success message.
      } else {
        console.error('Failed to submit report.');
      }
    } catch (error) {
      console.error('Error submitting report:', error);
    }
  };

  return (
    <main>
    <div className="report-form-container">
      <form onSubmit={handleSubmit} className="report-form">
        <div className="input-container">
          <label htmlFor="description" className="description-label">Description:</label>
          <textarea 
            id="description" 
            className="description-textarea"
            value={description} 
            onChange={e => setDescription(e.target.value)} 
            required 
          />
        </div>
        <button className="submit-button" type="submit">Submit Report</button>
      </form>
    </div>
    </main>
  );
};

export default ReportUser;
