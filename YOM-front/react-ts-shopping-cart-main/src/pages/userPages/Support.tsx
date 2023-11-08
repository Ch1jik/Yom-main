import React, { useEffect, useState } from 'react';
import CustomNavbar from '../../components/layout/CustomNavbar';
import { getToken } from '../../utilities/TokenUtility';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Support: React.FC = () => {
  const navigate = useNavigate();

  // State for the form
  const [description, setDescription] = useState<string>('');
  
  useEffect(() => {
    const checkAuthenticationStatus = () => {
      const isAuthenticated = !!getToken();
      if (!isAuthenticated) {
        navigate('/login'); // Redirect to the login page
      }
    };

    checkAuthenticationStatus();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7014/api/HelpReport/Create', {
        userId: 0,  // This should probably be fetched dynamically based on the logged-in user
        description,
        dateCreated: new Date().toISOString(),
        reportStatus: "Active"
      });

      if (response.status === 200) {
        alert("Help report submitted successfully!");
        // Optionally, navigate or reset form after successful submission
      }
    } catch (error) {
      console.error("Error submitting help report:", error);
    }
  };

  return (
    <main>
      <div className='myadsPage'>
        <div className='myads-menu'>
          <CustomNavbar/>
        </div>
        <section className="center-container">
            <form onSubmit={handleSubmit} className="report-form">
                <textarea 
                    placeholder="Describe your issue here..." 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <button type="submit">Submit Report</button>
            </form>
        </section>
      </div>
    </main>
  );
};

export default Support;
