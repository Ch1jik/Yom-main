// AdDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AdminSideBar from '../../components/layout/AdminSideBar';
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
        console.log(response.data[0].pathToPhotos);
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
        <h2>Ad Details</h2>
        {ad ? (
          <div className="addetail-main">
            <h3 className="addetail-title">{ad.title}</h3>
            <img className="addetail-image" src={`C:/Users/mark_lord3/Source/Repos/YomMain/YOM-back/ApplicationYOM/DAL/Photos/f6216fb5-d26c-4e1f-8de5-abcf6ff613b1/7afd5bf5-9b31-4a7c-9a2d-f975459f2d36/6a750bed-2994-40ab-8de9-4e30ee13b674.jpg`} alt="Ad" />
            <div className="addetail-info">
              <p>{ad.description}</p>
              <p><strong>Price:</strong> {ad.price} {ad.currency}</p>
              <p><strong>Date Created:</strong> {ad.dateCreated}</p>
              <p><strong>Date Modified:</strong> {ad.dateModified}</p>
              <p><strong>City:</strong> {ad.city}</p>
              <p><strong>Address:</strong> {ad.address}</p>
              <p><strong>Ad Type:</strong> {ad.adType}</p>
              <p><strong>Ad State:</strong> {ad.adState}</p>
              <p><strong>Category ID:</strong> {ad.categoryId}</p>
              <p><strong>SubCategory ID:</strong> {ad.subCategoryId}</p>
              <p><strong>User ID:</strong> {ad.userId}</p>
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
