import React, { useEffect, useState } from 'react';
import AdminSideBar from '../../components/layout/AdminSideBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/AdminPages/adminAllAds.css'

interface Ad {
  id: number;
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
  photos: string[];
  userId: string;
}

const AllAds: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [page, setPage] = useState<number>();
  const [totalPages, setPages] = useState(1);



  useEffect(() => {

    const fetchAds = async () => {
      try {
        console.log(page);
        const response = await axios.get(`https://localhost:7014/api/Admin/Ad/AllAds?pageNumber=${1}&pageSize=3`);
        setAds(response.data.ads);
        setPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching the ads:', error);
      }
    };
    fetchAds();
    setPage(1);
  }, []);

  const handleClickPage = async (pg: number) => {
    console.log(pg);
    if (page) {
      setPage(pg);
      getAds(pg);
    }
  }

  const getAds = async (pg: number) => {
    try {
      const response = await axios.get(`https://localhost:7014/api/Admin/Ad/AllAds?pageNumber=${pg}&pageSize=`);
      setAds(response.data.ads);
      setPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching the ads:', error);
    }
  }
  const navigate = useNavigate();

  const handleReview = (ad: Ad) => {
    console.log('Reviewing ad:', ad);
    navigate(`/admin/dashboard/AdDetail/${ad.id}`); // using id to navigate to the AdDetail page.
  };

  const updateAdStatus = async (ad: Ad, status: string) => {
    try {
      const response = await axios.put(`https://localhost:7014/api/Admin/Ad/UpdateAd/State?adState=${status}&adId=${ad.id}`);

      if (response.status === 200) {
        const updatedAds = ads.map((a) => (a.id === ad.id ? { ...a, adState: status } : a));
        setAds(updatedAds);
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



  const formatDate = (inputDate: string) => {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
    return formattedDate;
  };
  return (
    <div className='admin-flex'>
      <AdminSideBar />
      <div className='admin-AllAds'>
        <h2>Ручна Модерація оголошень</h2>
        <table className="admin-ads-table">
          <thead>
            <tr>
              <th>Номер</th>
              <th>Назва</th>
              <th>Стан</th>
              <th>Дата створення</th>
              <th>Номер створювача</th>
              <th>Дії</th>
            </tr>
          </thead>
          <tbody>
            {ads.map(ad => (
              <tr key={ad.id}>
                <td >
                  <img className='admin-ads-image' src={ad.photos[0]}></img>
                  <div style={{ color: "#1684EA" }} >#{ad.id}</div>
                </td>
                <td >{ad.title}</td>
                <td >{ad.adState}</td>
                <td >{formatDate(ad.dateCreated)}</td>
                <td >{ad.userId}</td>
                <td data-label="Дії">
                  <div className='admin-ads-buttons'>
                    <button className="review" onClick={() => handleReview(ad)}>Детально</button>
                    <button className="reject" onClick={() => handleReject(ad)}>Відклонити</button>
                    <button className="delete" onClick={() => handleDelete(ad)}>Видалити</button>
                    <button className="approve" onClick={() => handleApprove(ad)}>Схвалити</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='pagination-ad'>
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
    </div>
  );
}

export default AllAds;
