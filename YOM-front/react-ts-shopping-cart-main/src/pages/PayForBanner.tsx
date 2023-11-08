import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import small_ellipse from "../assets/images/promotion-small-ellipse.svg"
// Define the expected shape of the formData
interface IFormData {
  companyURL: string;
  companyName: string;
  description: string;
  email: string;
  phoneNumber: number;
  bannerSize: string;
  bannerFile: File | null;
  bannerTitle: string;
}

const PayForBanner: React.FC = () => {
  // Use the useLocation hook to access the passed state
  const { t } = useTranslation();
  const location = useLocation();
  const formData = location.state as IFormData; // Assuming that the state is always passed

  // Make sure to handle the case where formData could be undefined
  if (!formData) {
    return <p>No data available. Please submit the form first.</p>;
  }

return (
    // <div>
    //   <h2>Payment Information</h2>
    //   {/* Render the passed formData details */}
    //   <p>Company URL: {formData.companyURL}</p>
    //   <p>Company Name: {formData.companyName}</p>
    //   <p>Description: {formData.description}</p>
    //   <p>Email Address: {formData.email}</p>
    //   <p>Phone Number: {formData.phoneNumber}</p>
    //   <p>Banner Size: {formData.bannerSize}</p>
    //   <p>Banner Title: {formData.bannerTitle}</p>
    //   {/* You may also need to handle the display or upload of formData.bannerFile */}
    // </div>
    <main>
      <div className='Pay-for-bannerPage'>
      <div className='Pay-for-banner'> 
        <div className='promotion-tarifs-section'>
            <div className='promotion-tarifs-main'>
                <div className='promotion-tarifs-title'>
                Вибір тарифу та оплата
                </div>
                
                </div>
            <div className='tarifs-info'>
                <div className='tarifs-info-el1'>
                    <div className='tarifs-info-title1'>
                    Пакет "Стандартний"
                    </div>
                    <div className='tarifs-info-description1'>
                        <div className='tarifs-info-description-info'>
                            <img src={small_ellipse}></img><p>{t('promotion.promotion_tarifs.tarifs_info.description1.text1')}</p>
                        </div>  
                        <div className='tarifs-info-description-info'>
                            <img src={small_ellipse}></img><p>{t('promotion.promotion_tarifs.tarifs_info.description1.text2')}</p>
                        </div>  
                        <div className='tarifs-info-description-info'>
                            <img src={small_ellipse}></img><p>{t('promotion.promotion_tarifs.tarifs_info.description1.text3')}</p>
                        </div>  
                        <div className='tarifs-info-description-info'>
                            <img src={small_ellipse}></img><p>{t('promotion.promotion_tarifs.tarifs_info.description1.text4')}</p>
                        </div> 
                        <div className='tarifs-info-description-info'>
                            <img src={small_ellipse}></img><p>{t('promotion.promotion_tarifs.tarifs_info.description1.text5')}</p>
                        </div>   
                    </div>
                    <div className='tarifs-info-description-text1'>{t('promotion.promotion_tarifs.tarifs_info.price1')}</div>
                    <div>Див.Повний опис усіх умов та переваг</div>
                </div>
                <div className='tarifs-info-el2'>
                    <div className='tarifs-info-title2'>
                    Пакет "Професійний"
                    </div>
                    <div className='tarifs-info-description'>
                        <div className='tarifs-info-description-info'>
                            <img src={small_ellipse}></img><p>{t('promotion.promotion_tarifs.tarifs_info.description2.text1')}</p>
                        </div>
                        <div className='tarifs-info-description-info'>
                            <img src={small_ellipse}></img><p>{t('promotion.promotion_tarifs.tarifs_info.description2.text2')}</p>
                        </div>
                        <div className='tarifs-info-description-info'>
                            <img src={small_ellipse}></img><p>{t('promotion.promotion_tarifs.tarifs_info.description2.text3')}</p>
                        </div>
                        <div className='tarifs-info-description-info'>
                            <img src={small_ellipse}></img><p>{t('promotion.promotion_tarifs.tarifs_info.description2.text4')}</p>
                        </div>
                        <div className='tarifs-info-description-info'>
                            <img src={small_ellipse}></img><p>{t('promotion.promotion_tarifs.tarifs_info.description2.text5')}</p>
                        </div>

                    </div>
                    <div className='tarifs-info-description-text2'>{t('promotion.promotion_tarifs.tarifs_info.price2')}</div>
                    <div>Див.Повний опис усіх умов та переваг</div>
                </div>
                <div className='tarifs-info-el3'>
                    <div className='tarifs-info-title3'>
                  Пакет "Преміум"
                    </div>
                    <div className='tarifs-info-description'>
                        <div className='tarifs-info-description-info'>
                            <img src={small_ellipse}></img><p>{t('promotion.promotion_tarifs.tarifs_info.description3.text1')}</p>
                        </div>
                        <div className='tarifs-info-description-info'>
                            <img src={small_ellipse}></img><p>{t('promotion.promotion_tarifs.tarifs_info.description3.text2')}</p>
                        </div>
                        <div className='tarifs-info-description-info'>
                            <img src={small_ellipse}></img><p>{t('promotion.promotion_tarifs.tarifs_info.description3.text3')}</p>
                        </div>
                        <div className='tarifs-info-description-info'>
                            <img src={small_ellipse}></img><p>{t('promotion.promotion_tarifs.tarifs_info.description3.text4')}</p>
                        </div>
                        <div className='tarifs-info-description-info'>
                            <img src={small_ellipse}></img><p>{t('promotion.promotion_tarifs.tarifs_info.description3.text5')}</p>
                        </div>
                    </div>
                    <div className='tarifs-info-description-text3'>{t('promotion.promotion_tarifs.tarifs_info.price3')}</div>
                    <div>Див.Повний опис усіх умов та переваг</div>
                </div>
            </div>
        </div>
    </div>
    </div>
  </main>
  );
};

export default PayForBanner;
