import React ,{useState,useEffect}from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import small_ellipse from "../assets/images/promotion-small-ellipse.svg"
import apple from '../assets/images/apple.png';
import card from '../assets/images/Completed_Card.svg';
import google from '../assets/images/google.png';
import axios from 'axios';
// Define the expected shape of the formData
interface IFormData {
  companyURL: string;
  companyName: string;
  description: string;
  email: string;
  phoneNumber: number;
  bannerSize: string;
  bannerFile: File | null;
  Header: string;
}

const PayForBanner: React.FC = () => {
  // Use the useLocation hook to access the passed state
  const { t } = useTranslation();
  const location = useLocation();
  const formData_prev = location.state as IFormData; // Assuming that the state is always passed
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  
  // Make sure to handle the case where formData_prev could be undefined
  if (!formData_prev) {
    return <p>No data available. Please submit the form first.</p>;
  }

  // State to track the selected tariff
  const [selectedTariff, setSelectedTariff] = useState<string>(''); // Initially none selected
  const tariffPrices: Record<string, number> = {
    standard: 1100,
    professional: 1850,
    premium: 2590,
  };
  const currentPrice = tariffPrices[selectedTariff];
  // Function to handle tariff selection
  const handleTariffSelection = (tariff: string) => {
    setSelectedTariff(tariff);
  };

  // Function to handle payment method selection
  const handlePaymentMethodSelection = (method: string) => {
    setPaymentMethod(method);
  };
// Function to submit the form data to the API
const handleSubmit = async () => {
    
    // Create an object containing all the data to be submitted
    const formData = new FormData();
    formData.append('CompanyName', formData_prev.companyName);
    formData.append('Description', formData_prev.description);
    formData.append('Email', formData_prev.email);
    
    formData.append('PhoneNumber', formData_prev.phoneNumber.toString());

    formData.append('Header', formData_prev.Header);
    if(formData_prev.bannerFile)
    formData.append('Photo', formData_prev.bannerFile);
    formData.append('LinkToCompany', formData_prev.companyURL);
    formData.append('BannerAdvertisementPlan', selectedTariff);
    formData.append('BannerPage', 'Main');
    
    if(formData_prev.bannerSize=='1480x500'){
        const size='Large';
        formData.append('BannerSize', size);
    }else if(formData_prev.bannerSize=='580x340'){
        const size='Medium';
        formData.append('BannerSize', size);
    }
    else if(formData_prev.bannerSize=='280x340'){
        const size='Small';
        formData.append('BannerSize', size);
    }
    else if(formData_prev.bannerSize=='126x170'){
        const size='Long';
        formData.append('BannerSize', size);
    }
    // const requestData = {
    //   formData_prev,
    //   selectedTariff,
    //   paymentMethod,
    // };

    try {
      // Make a POST request to your API endpoint
      const response = await axios.post('localhost:7014/api/Banner/Create', formData);

      // Handle the response here (e.g., show a success message)
      console.log('API response:', response.data);
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error('API error:', error);
    }
  };

return (
    // <div>
    //   <h2>Payment Information</h2>
    //   {/* Render the passed formData_prev details */}
    //   <p>Company URL: {formData_prev.companyURL}</p>
    //   <p>Company Name: {formData_prev.companyName}</p>
    //   <p>Description: {formData_prev.description}</p>
    //   <p>Email Address: {formData_prev.email}</p>
    //   <p>Phone Number: {formData_prev.phoneNumber}</p>
    //   <p>Banner Size: {formData_prev.bannerSize}</p>
    //   <p>Banner Title: {formData_prev.bannerTitle}</p>
    //   {/* You may also need to handle the display or upload of formData_prev.bannerFile */}
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
            <div className={`tarifs-info-el1-under ${selectedTariff === 'standard' ? 'selected' : ''}`}>

                </div>
                <label>
                    <div className={`tarifs-info-el1 ${selectedTariff === 'standard' ? 'selected' : ''}`}
                onClick={() => handleTariffSelection('standard')}
                    >
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
                    <div className='tarifs-info-under-price'>
                        <p className='tarifs-info-under-price1'>Див.</p>
                        <p className='tarifs-info-under-price2'>Повний опис усіх умов та переваг</p>
                    </div>
                    <input
                  type="radio"
                  name="tariff"
                  value="standard"
                  className='tariff-Radio'
                  checked={selectedTariff === 'standard'}
                  onChange={() => handleTariffSelection('standard')}
                />
                </div>
              </label>
              <div className={`tarifs-info-el2-under ${selectedTariff === 'professional' ? 'selected' : ''}`}>

            </div>
              <label>
                <div className={`tarifs-info-el2 ${selectedTariff === 'professional' ? 'selected' : ''}`}
                onClick={() => handleTariffSelection('professional')}>
              
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
                    <div className='tarifs-info-under-price'>
                        <p className='tarifs-info-under-price1'>Див.</p>
                        <p className='tarifs-info-under-price2'>Повний опис усіх умов та переваг</p>
                    </div>
                    <input
                    type="radio"
                    name="tariff"
                    value="professional"
                    className='tariff-Radio'
                    checked={selectedTariff === 'professional'}
                    onChange={() => handleTariffSelection('professional')}
                    />
                </div>
                </label>
                <div className={`tarifs-info-el3-under ${selectedTariff === 'premium' ? 'selected' : ''}`}>

                </div>
                <label>

                <div className={`tarifs-info-el3 ${selectedTariff === 'premium' ? 'selected' : ''}`}
                onClick={() => handleTariffSelection('premium')}
              >
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
                    <div className='tarifs-info-under-price'>
                        <p className='tarifs-info-under-price1'>Див.</p>
                        <p className='tarifs-info-under-price2'>Повний опис усіх умов та переваг</p>
                    </div>
                    <input
                    type="radio"
                    name="tariff"
                    value="premium"
                    className='tariff-Radio'
                    checked={selectedTariff === 'premium'}
                    onChange={() => handleTariffSelection('premium')}
                    />  
                    </div>
                </label>
            </div>
        </div>
        <div className='Pay-for-banner-cards-section'>
            <div className='Pay-for-banner-cards'>
                <h3>Спосіб оплати:</h3>
                        <div>
                            <label className='radio-container-Pay-for-banner'>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="GooglePay"
                                    checked={paymentMethod === "GooglePay"}
                                    className='Pay-for-banner-radio-payment'
                                    onChange={() => handlePaymentMethodSelection('GooglePay')}
                                />
                                <span><img src={apple} alt="Apple"></img></span>
                            </label>
                            <label className='radio-container-Pay-for-banner'>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="ApplePay"
                                    className='Pay-for-banner-radio-payment'
                                    checked={paymentMethod === "ApplePay"}
                                    onChange={() => handlePaymentMethodSelection('ApplePay')}
                                />
                                <span><img id='google-pay-for-banner' src={google} alt="Google"></img></span>
                            </label>
                        </div>
            </div>
        <div className='Pay-for-banner-complete-card'>
            <img src={card}></img>
        </div>
        
        </div>
        <div className='Pay-for-banner-complete-card-button-section'>
            <Link to={'/requestbanner'}>
                <button className='requestbannner-goback' >Назад</button>
            </Link>
            
            <button className='Pay-for-banner-complete-card-button' onClick={handleSubmit}>Сплатити {currentPrice && `${currentPrice} грн`} </button> {/* Add a submit button */}
        </div>
    </div>
    </div>
  </main>
  );
};

export default PayForBanner;
