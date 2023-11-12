import React, { useState } from 'react';
import axios from 'axios';
import AdminSideBar from '../../components/layout/AdminSideBar';
import '../../assets/css/AdminPages/adminBanner.css'

interface BannerForm {
  company: string;
  photo: File | null;  // Changing photo type to File or null
  linkToCompany: string;
  bannerAdvertisementPlan: string;
  bannerPage: string;
  bannerSize: string;
  description: string;
  header: string;
  email: string;
  phoneNumber: string;
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
    bannerAdvertisementPlan: "",
    bannerPage: "",
    bannerSize: "",
    description: "",
    header: "",
    email: "",
    phoneNumber: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

  };
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log('Handling change for:', name, 'with value:', value);
    if (name == 'bannerSize') {
      document.getElementById('photo_banner')?.click();
      const [newWidth, newHeight] = value.split("x").map(Number);

      if (!isNaN(newWidth) && !isNaN(newHeight)) {
        setWidth(newWidth);
        setHeight(newHeight);
      } else {
        console.error('error with heightXweight');
      }
    }
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
      <div className='admin-banners'>
        <div className="banner-form-container">

          <form onSubmit={handleSubmit}>
            <h2>Створити новий банер</h2>
            <div className="adminBanner-form-group">
              <label>Посилання на компанію:</label>
              <input className='adminBanner-link' type="text" placeholder='Введіть URL-адресу вашої компанії'
                name="linkToCompany" value={formData.linkToCompany} onChange={handleInputChange} required />
            </div>
            <div className="adminBanner-form-group">
              <label>Компанія:</label>
              <input className='adminBanner-input' type="text" name="company" placeholder='Введіть вашу компанію'
                value={formData.company} onChange={handleInputChange} required />
            </div>

            <div className="adminBanner-form-group">
              <label>Опис</label>
              <input className='adminBanner-description' type="text" name="description" placeholder='Щось про вашу компанію'
                value={formData.description} onChange={handleInputChange} required />
            </div>

            <div className="adminBanner-form-group-personal">
              <div className='personal-part'>
                <label>Електронна адреса</label>
                <input className='adminBanner-input' type="text" name="email" placeholder='Адреса електронної пошти'
                  value={formData.email} onChange={handleInputChange} required />
              </div>

              <div className='personal-part'>
                <label>Номер телефону</label>
                <input className='adminBanner-input' type="text" name="phoneNumber" placeholder='+380 (XX) XXX XXXX'
                  value={formData.phoneNumber} onChange={handleInputChange} required />
              </div>
            </div>
            <div className="adminBanner-form-group">
              <label>Заголовок</label>
              <input className='adminBanner-input' type="text" name="header" placeholder='Введіть заголовок або ключові слова банера'
                value={formData.header} onChange={handleInputChange} required />
            </div>
            <div className='adminBanner-form-group-personal'>
              <div className="adminBanner-form-group">
                <label>План рекламного банера:</label>
                <select className='admin-select' name="bannerAdvertisementPlan" value={formData.bannerAdvertisementPlan} onChange={handleInputChange}>
                  <option value="Standard">Стандартний</option>
                  <option value="Professional">Професійний</option>
                  <option value="Premium">Преміум</option>

                  {/* Додайте інші плани за необхідності */}
                </select>
              </div>
              <div className="adminBanner-form-group">
                <label>Сторінка розміщення банера:</label>
                <select className='admin-select' name="bannerPage" value={formData.bannerPage} onChange={handleInputChange}>
                  <option value="Main">Головна</option>
                  <option value="Usercare">Користувачі</option>
                  <option value="Promotion">Промоції</option>

                  {/* Додайте інші сторінки за необхідності */}
                </select>
              </div>
            </div>
            <div className='admin-banner-size-main'>
              <p className='admin-banner-size-main-title'>Доступні розміри*</p>
              <div className='admin-banner-size-setion'>

                <div className='admin-banner-size'>

                  <div className="admin-banner-custom-radio1">
                    <input type="radio" name="bannerSize" value="1480x500" checked={formData.bannerSize === 'Large'} onChange={handleChange} />
                    <div className="admin-banner-custom-radio-tile">
                      <label>
                        1480x500
                      </label>
                    </div>
                  </div>
                  <div className='adminBanner-form-group-personal'>
                    <div className="admin-banner-custom-radio2">
                      <input type="radio" name="bannerSize" value="580x340" checked={formData.bannerSize === 'Medium'} onChange={handleChange} />
                      <div className="admin-banner-custom-radio-tile">
                        <label>
                          580x340
                        </label>
                      </div>
                    </div>
                    <div className="admin-banner-custom-radio3">
                      <input type="radio" name="bannerSize" value="280x340" checked={formData.bannerSize === 'Small'} onChange={handleChange} />
                      <div className="admin-banner-custom-radio-tile">
                        <label >
                          280x340
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="admin-banner-custom-radio4">
                    <input type="radio" name="bannerSize" value="1260x170" checked={formData.bannerSize === 'Long'} onChange={handleChange} />
                    <div className="admin-banner-custom-radio-tile">
                      <label >
                        1260x170
                      </label>
                    </div>
                  </div>

                </div>
                <div className='admin-banner-size-description'>
                  <div className='admin-banner-size-setion-description'>
                    <p>Перевірте, чи ваш банер має правильну роздільну здатність для вебу (72 dpi). Файли приймаються в форматі JPG або PNG. </p>
                  </div>
                  <div className='admin-banner-size-setion-tutorial'>
                    Оберіть розмір банера, який ви будете завантажувати. Торкніться його та перейдіть до завантаження файлу.
                  </div>
                </div>
              </div>


              <input type="file" id="photo_banner" name="photo_banner" className='admin-banner-file' onChange={handleFileChange} />
            </div>
            <div className='adminBanner-photo-preview'>
              <label>Попередній перегляд</label>
              {formData.photo && (
                <img
                  src={URL.createObjectURL(formData.photo)}
                  alt="Попередній перегляд"
                  style={{ maxWidth: width, maxHeight: height, border: '1px solid #ccc' }}
                />
              )}
            </div>
            <button type="submit" className="create-button">Створити банер</button>
          </form>
        </div>
      </div>
    </div>

  );
};

export default CreateBanner;
