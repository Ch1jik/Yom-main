import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminSideBar from '../../components/layout/AdminSideBar';
import '../../assets/css/AdminPages/adminBanners.css'

interface Banner {
  id: number;
  companyName: string;
  description: string;
  email: string;
  phoneNumber: string;
  header: string;
  photoPaths: string;
  bannerState: string;
  linkToCompany: string;
  clicksCount: number;
  bannerPage: "Main" | "Userсare" | "Promotion";
  bannerSize: "Large" | "Medium" | "Small" | "Long";
  bannerAdvertisementPlan: "Standard" | "Premium" | "Professional";
}
interface Banners {
  banners: Banner[];
  totalPages: number;
}

type ModalContent = {
  id: number;
  data: Banner;
};

const AdminBanner: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent | null>(null);
  const [page, setPage] = useState<number>();
  const [totalPages, setPages] = useState(1);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get('https://localhost:7014/api/AdminBanner/All?pageNumber=1');
        setBanners(response.data.banners);
        setPages(response.data.totalPages);
        console.log('====================================');
        console.log(response.data);
        console.log('====================================');
      } catch (error) {
        console.error('Error fetching the banners:', error);
      }
    };
    fetchBanners();
    setPage(1);
  }, []);

  const getBanners = async (page: number) => {
    try {
      const response = await axios.get(`https://localhost:7014/api/AdminBanner/All?pageNumber=${page}`);
      setBanners(response.data.banners);
      setPages(response.data.totalPages);
      console.log('====================================');
      console.log(response.data);
      console.log('====================================');
    } catch (error) {
      console.error('Error fetching the banners:', error);
    }
  };

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

  const handleClickPage = async (pg: number) => {
    console.log(pg);
    if (page) {
      setPage(pg);
      getBanners(pg);
    }
  }

  return (
    <div className='admin-flex'>
      <AdminSideBar />
      <div className='admin-banners'>
        <h2>Модерація Банерів</h2>
        <table className="admin-banners-table">
          <thead>
            <tr>
              <th>Фото</th>
              <th>Номер</th>
              <th>Посилання</th>
              <th>План</th>
              <th>Стан</th>
              <th>Сторінка</th>
              <th>Розмiр</th>
              <th>Кількість переходів</th>
              <th>Пошта</th>
              <th>Дії</th>
            </tr>
          </thead>
          <tbody>
            {banners.map(banner => (
              <tr key={banner.id}>
                <td data-label="Фото"><img src={banner.photoPaths} alt="Banner" className="admin-banner-image" /></td>
                <td style={{ color: "#1684EA" }} data-label="Номер">#{banner.id}</td>
                <td data-label="Посилання"><a href={banner.linkToCompany}>Посилання</a></td>
                <td data-label="План">{banner.bannerAdvertisementPlan}</td>
                <td data-label="Стан">{banner.bannerState}</td>
                <td data-label="Сторінка">{banner.bannerPage}</td>
                <td data-label="Розмiр">{banner.bannerSize}</td>
                <td data-label="Кількість переходів">{banner.clicksCount}</td>
                <td data-label="Пошта">{banner.email}</td>
                <td data-label="Дії">
                  <div className='admin-banners-buttons'>
                    <button className="review" onClick={() => handleBannerClick(banner.id)}>Деталі</button>
                    <button className="delete" onClick={() => deleteBanner(banner.id)}>Видалити</button>
                    <button className="approve" onClick={() => handleUpdatePopUp(banner.id, banner)}>Оновити</button>
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
            Сторінка {page} з {totalPages}
          </span>
          <button
            onClick={() => handleClickPage(page !== undefined ? page + 1 : 1)}
            disabled={page === totalPages}
          >
            Наступна
          </button>
        </div>
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
              <input type="text" name="companyName" defaultValue={modalContent.data.companyName} required />
              <input type="text" name="photoPaths" defaultValue={modalContent.data.photoPaths} required />
              <input type="text" name="linkToCompany" defaultValue={modalContent.data.linkToCompany} required />
              <input type="number" name="clicksCount" defaultValue={modalContent.data.clicksCount} required />
              <select name="bannerAdvertisementPlan" defaultValue={modalContent.data.bannerAdvertisementPlan}>
                <option value="Standard">Стандарт</option>
                <option value="Premium">Преміум</option>
                <option value="Professional">Професійний</option>
                {/* Add other plans if there are any */}
              </select>

              <button className="approve" type="submit">Оновити</button>
              <button onClick={closeModal}>Відмінити</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


export default AdminBanner;
