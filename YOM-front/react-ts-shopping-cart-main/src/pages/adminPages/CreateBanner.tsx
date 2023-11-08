import React, { useState } from 'react';
import axios from 'axios';
import AdminSideBar from '../../components/layout/AdminSideBar';
import '../../assets/css/adminStyle.css'
interface BannerForm {
  company: string;
  photo: File | null;  // Changing photo type to File or null
  linkToCompany: string;
  bannerAdvertisementPlan: string;
}

const CreateBanner: React.FC = () => {
  // const initialFormData: BannerForm = {
  //   company: "",
  //   photo: null, // Initial value set to null for File type
  //   linkToCompany: "",
  //   bannerAdvertisementPlan: "Standard"
  // };

  const [formData, setFormData] = useState<BannerForm>({
    company: "",
    photo: null, // Initial value set to null for File type
    linkToCompany: "",
    bannerAdvertisementPlan: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // If there's a file selected
      setFormData({
        ...formData,
        photo: e.target.files[0]
      });
    } else {
      // If there's no file selected or the file is deleted
      setFormData({
        ...formData,
        photo: null
      });
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();  // prevent default form submission
    try {
      const data = new FormData();
      data.append('company', formData.company);
      if (formData.photo) {
        data.append('photo', formData.photo); // append file to FormData
      }
      data.append('linkToCompany', formData.linkToCompany);
      data.append('bannerAdvertisementPlan', formData.bannerAdvertisementPlan);
     
  
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
  
      const response = await axios.post(`https://localhost:7014/api/AdminBanner/Create`, data, config);
      if (response.status === 200) {
        console.log("Banner created successfully");
        
      } else {
        console.error("Error creating the banner:", response.data);
      }
    } catch (error) {
      console.error("Error while trying to create the banner:", error);
    }
  };
  return (
    <div className='admin-flex'>
      <AdminSideBar />
      <div className="banner-form-container">
        <h2>Create New Banner</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Company:</label>
            <input type="text" name="company" value={formData.company} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Photo:</label>
            <input type="file" name="photo" id='photo1' onChange={handleFileChange} required />
          </div>
          <div className="form-group">
            <label>Link to Company:</label>
            <input type="text" name="linkToCompany" value={formData.linkToCompany} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Advertisement Plan:</label>
            <select name="bannerAdvertisementPlan" value={formData.bannerAdvertisementPlan} onChange={handleInputChange}>
              <option value="Standard">Standard</option>
              <option value="Professional">Professional</option>
              <option value="Premium">Premium</option>

              {/* Add other plans if necessary */}
            </select>
          </div>
          <button type="submit" className="submit-btn">Create Banner</button>
        </form>
      </div>
    </div>
  );
};

export default CreateBanner;
