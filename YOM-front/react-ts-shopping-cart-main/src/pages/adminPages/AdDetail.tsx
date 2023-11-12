
// AdDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AdminSideBar from '../../components/layout/AdminSideBar';
import ImageSlider from '../../components/layout/VerticalImageSlider';
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
  userId: number;
}



const AdDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const adId = Number(id);
  const [ad, setAd] = useState<Ad | null>(null);

  useEffect(() => {
    const fetchAdDetail = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7014/api/Ad/AllAd/ByQuery?Filter.Filters[0].Field=Id&Filter.Filters[0].Operator=eq&Filter.Filters[0].Value=${adId}`
        );
        console.log('====================================');
        console.log(response.data[0]);
        console.log('====================================');
        console.log('====================================');
        console.log(response.data[0].photos);
        console.log('====================================');
        setAd(response.data[0]);
      } catch (error) {
        console.error('Error fetching the ad details:', error);
      }
    };

    fetchAdDetail();
  }, [adId]);

  return (
    <div className='admin-flex'>
      <AdminSideBar />
      <div className="addetail-content">
        <h2>Подробний вид оголошення</h2>
        {ad ? (
          <div className="addetail-main">
            <h3 className="addetail-title">{ad.title}</h3>
            { <ImageSlider images={ad.photos} />} 
            <div className="addetail-info">
              <p>{ad.description}</p>
              <p><strong>Ціна:</strong> {ad.price} {ad.currency}</p>
              <p><strong>Дата створення:</strong> {ad.dateCreated}</p>
              <p><strong>Дата зміни:</strong> {ad.dateModified}</p>
              <p><strong>Місто:</strong> {ad.city}</p> 
              <p><strong>Адреса:</strong> {ad.address ? ad.address : 'Немає'}</p>
              <p><strong>Тип оголошення:</strong> {ad.adType}</p>
              <p><strong>Стан оголошення:</strong> {ad.adState}</p>
              <p><strong>ID категорії:</strong> {ad.categoryId}</p>
              <p><strong>ID підкатегорії:</strong> {ad.subCategoryId}</p>
              <p><strong>ID користувача:</strong> {ad.userId}</p>
            </div>
          </div>
        ) : (
          <p className="addetail-loading">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default AdDetail;
