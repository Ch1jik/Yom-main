import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminSideBar from '../../components/layout/AdminSideBar';
import '../../assets/css/adminStyle.css'
interface Banner {
  id: number;
  monthProfit: number;
  allTimeProfit: number;
  photo: string;
  company: string;
  photoPaths: string;
  linkToCompany: string;
  clicksCount: number;
  bannerAdvertisementPlan: "Standard" | "Premium"; // Include other plans if there are any
}

type ModalContent = {
  id: number;
  data: Banner;
};

const AdminBanner: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get('https://localhost:7014/api/AdminBanner/All');
        setBanners(response.data);
        console.log('====================================');
        console.log(response.data);
        console.log('====================================');
      } catch (error) {
        console.error('Error fetching the banners:', error);
      }
    };

    fetchBanners();
  }, []);

  const deleteBanner = async (bannerId: number) => {
    try {
      await axios.delete(`https://localhost:7014/api/AdminBanner/ById/${bannerId}`);
      // Remove the deleted banner from the UI
      setBanners((prevBanners) => prevBanners.filter((banner) => banner.id !== bannerId));
    } catch (error) {
      console.error('Error deleting the banner:', error);
    }
  };
  const handleBannerClick = (bannerId: number) => {
    navigate(`/admin/bannerDetail/${bannerId}`);
  };

  const handleUpdateForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updateData = {
      id: Number(formData.get("id")),
      company: formData.get("company") as string,
      photoPaths: formData.get("photoPaths") as string,
      linkToCompany: formData.get("linkToCompany") as string,
      clicksCount: Number(formData.get("clicksCount")),
      bannerAdvertisementPlan: formData.get("bannerAdvertisementPlan") as "Standard" | "Premium",
      // Add other fields if required
    };
  
    try {
      const response = await axios.post('https://localhost:7014/api/AdminBanner/Update', updateData);
      if (response.status === 200) {
        // Handle the updated banner data e.g., refresh the banners or update the UI accordingly
        closeModal();
      } else {
        console.error("Error updating banner");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdatePopUp = (id: number, data: Banner) => {
    setModalContent({ id, data });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <div className='admin-flex'>
      <AdminSideBar />
      <h2>Admin Banners</h2>
      
      <div className="banner-container">
        {banners.map((banner) => (
          <div key={banner.id}>
            <img src={banner.photoPaths} alt="Banner" className="banner-image" />
            <div className="banner-info">
              <p>Company Link: {banner.linkToCompany}</p>
              <p>bannerAdvertisementPlan: {banner.bannerAdvertisementPlan}</p>
              <p>Month Profit: {banner.monthProfit}</p>
              <p>All Time Profit: {banner.allTimeProfit}</p>
            </div>
            <button className="banner-button banner-details-button" onClick={() => handleBannerClick(banner.id)}>View Details</button>
            <button className="banner-button banner-delete-button" onClick={() => deleteBanner(banner.id)}>Delete</button>
            <button className="banner-button banner-update-button" onClick={() => handleUpdatePopUp(banner.id, banner)}>Update</button>
          </div>
        ))}
      </div>
    {isModalOpen && modalContent && (
      <div style={{
          position: 'fixed', 
          top: 0, 
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000, 
          background: 'rgba(0,0,0,0.8)', // This gives a semi-transparent dark background
          display: 'flex',
          alignItems: 'center', // These two properties center the content vertically and horizontally
          justifyContent: 'center',
      }}>
          <div style={{
              background: 'white', 
              padding: '20px', 
              border: '1px solid black',
              width: '80%', // Or you can set a specific width like '500px'
              maxHeight: '90%',
              overflowY: 'auto' // To allow scrolling if the content exceeds the maximum height
          }}>
          <form onSubmit={handleUpdateForm}>
          <input type="text" name="company" defaultValue={modalContent.data.company} required />
          <input type="text" name="photoPaths" defaultValue={modalContent.data.photoPaths} required />
          <input type="text" name="linkToCompany" defaultValue={modalContent.data.linkToCompany} required />
          <input type="number" name="clicksCount" defaultValue={modalContent.data.clicksCount} required />
          <select name="bannerAdvertisementPlan" defaultValue={modalContent.data.bannerAdvertisementPlan}>
            <option value="Standard">Standard</option>
            <option value="Premium">Premium</option>
            {/* Add other plans if there are any */}
          </select>
            
            <button type="submit">Update</button>
            <button onClick={closeModal}>Cancel</button>
          </form>
        </div>
    </div>
      )}
    </div>
  );
};


export default AdminBanner;
