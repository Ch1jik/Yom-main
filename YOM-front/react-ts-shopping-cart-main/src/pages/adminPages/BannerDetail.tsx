// BannerDetail.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface BannerDetail {
  id: number;
  company: string;
  photoPaths: string;
  linkToCompany: string;
  clicksCount: number;
  bannerAdvertisementPlan: string;
}

const BannerDetail: React.FC = () => {
  const [bannerDetail, setBannerDetail] = useState<BannerDetail | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchBannerDetail = async () => {
      try {
        const response = await axios.get(`https://localhost:7014/api/AdminBanner/ById/${id}`);
        setBannerDetail(response.data);
      } catch (error) {
        console.error('Error fetching the banner details:', error);
      }
    };

    fetchBannerDetail();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (bannerDetail) {
      setBannerDetail({
        ...bannerDetail,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`https://localhost:7014/api/AdminBanner/Update`, bannerDetail);
      if (response.status === 200) {
        console.log("Banner details updated successfully");
      } else {
        console.error("Error updating the banner:", response.data);
      }
    } catch (error) {
      console.error("Error while trying to update the banner:", error);
    }
  };

  return (
    <div className='BannerDetail-container'>
      <div className="BannerDetail-card">
        <h2>Banner Details</h2>
        {bannerDetail ? (
          <form onSubmit={e => {
              e.preventDefault();
              handleSubmit();
            }}>
            <div className="BannerDetail-field">
              <label>Company:</label>
              <input type="text" name="company" value={bannerDetail.company} onChange={handleInputChange} />
            </div>
            <div className="BannerDetail-field">
              <label>Photo Paths:</label>
              <input type="text" name="photoPaths" value={bannerDetail.photoPaths} onChange={handleInputChange} />
            </div>
            <div className="BannerDetail-field">
              <label>Link to Company:</label>
              <input type="text" name="linkToCompany" value={bannerDetail.linkToCompany} onChange={handleInputChange} />
            </div>
            <div className="BannerDetail-field">
              <label>Clicks Count:</label>
              <input type="number" name="clicksCount" value={bannerDetail.clicksCount} onChange={handleInputChange} />
            </div>
            <div className="BannerDetail-field">
              <label>Advertisement Plan:</label>
              <select name="bannerAdvertisementPlan" value={bannerDetail.bannerAdvertisementPlan} onChange={e => handleInputChange(e as any)}>
                <option value="Standard">Standard</option>
                {/* Add other plans if necessary */}
              </select>
            </div>
            <button className="BannerDetail-btn" type="submit">Update Banner</button>
          </form>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
  
  
  
  
  
  
};

export default BannerDetail;
