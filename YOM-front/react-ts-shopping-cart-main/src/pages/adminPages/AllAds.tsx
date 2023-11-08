import React, { useEffect, useState } from 'react';
import AdminSideBar from '../../components/layout/AdminSideBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Ad {
  id:number;
  title: string;
  description: string;
  price: number;
  dateCreated: string;
  dateModified: string;
  city: string;
  address: string;
  currency: string;
  adType: string;
  adState: string;
  categoryId: number;
  subCategoryId: number;
  pathToPhotos: string;
  userId: number;
}

const AllAds: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get('https://localhost:7014/api/Admin/Ad/AllAds');
        setAds(response.data);
      } catch (error) {
        console.error('Error fetching the ads:', error);
      }
    };
    
    fetchAds();
  }, []);

  const navigate = useNavigate();

  const handleReview = (ad: Ad) => {
    console.log('Reviewing ad:', ad);
    navigate(`/admin/dashboard/AdDetail/${ad.id}`); // using id to navigate to the AdDetail page.
  };

  // const handleDelete = async (ad: Ad) => {
  //   console.log('Deleting ad:', ad);
  //   try {
  //     const response = await axios.delete(`https://localhost:7014/api/Admin/Ad/Delete/${ad.id}`);
  //     if (response.status === 200) {
  //       console.log('Ad successfully deleted');
  //       setAds(prevAds => prevAds.filter(a => a.id !== ad.id));
  //     } else {
  //       console.error('Error deleting the ad:', response.data);
  //     }
  //   } catch (error) {
  //     console.error('Error while trying to delete the ad:', error);
  //   }
  // };

  const updateAdStatus = async (ad: Ad, status: string) => {
    try {
      const response = await axios.put(`https://localhost:7014/api/Admin/Ad/UpdateAd/State?adState=${status}&adId=${ad.id}`);

      if (response.status === 200) {
        console.log(`Ad ${status} successfully`);
      } else {
        console.error(`Error ${status} the ad:`, response.data);
      }
    } catch (error) {
      console.error(`Error while trying to ${status} the ad:`, error);
    }
  };

  const handleReject = (ad: Ad) => {
    console.log('Rejecting ad:', ad);
    updateAdStatus(ad, 'Declined');
  };

  const handleApprove = (ad: Ad) => {
    console.log('Approving ad:', ad);
    updateAdStatus(ad, 'Active');
  };
  const handleDelete = async (ad: Ad) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ad with title: ${ad.title}?`);
  
    if (confirmDelete) {
      console.log('Deleting ad:', ad);
      try {
        const response = await axios.delete(`https://localhost:7014/api/Admin/Ad/Delete/${ad.id}`);
        if (response.status === 200) {
          console.log('Ad successfully deleted');
          setAds(prevAds => prevAds.filter(a => a.id !== ad.id));
        } else {
          console.error('Error deleting the ad:', response.data);
        }
      } catch (error) {
        console.error('Error while trying to delete the ad:', error);
      }
    }
  };
  return (
    <div className='admin-flex'>
      <AdminSideBar />
      <div className='adminAllAds'>
        
        {ads.map((ad) => (
          <div key={ad.id} className="AllAds-card">
            {/* <div className='AllAds-card-items'> */}
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Ad State</th>
                  
                </tr>
              </thead>
              <tbody>
                <td className='AllAds-card-tbody'>{ad.title}</td>
                <td className='AllAds-card-tbody'>{ad.description}</td>
                <td className='AllAds-card-tbody'>{ad.adState}</td>
              </tbody>
            </table>
              
              {/* Add other ad details as needed */}
            {/* </div> */}
            <div className="AllAds-buttons">
              <button className="review" onClick={() => handleReview(ad)}>Review</button>
              <button className="reject" onClick={() => handleReject(ad)}>Reject</button>
              <button className="delete" onClick={() => handleDelete(ad)}>Delete</button>
              
              <button className="approve" onClick={() => handleApprove(ad)}>Approve</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllAds;
