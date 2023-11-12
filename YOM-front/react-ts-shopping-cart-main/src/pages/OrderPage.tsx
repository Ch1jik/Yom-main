import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FeedbackPopup from '../components/layout/FeedbackPopup';
import '../assets/css/style.css'
import apple from '../assets/images/apple.png';
import google from '../assets/images/google.png';
import image from '../assets/images/image111.png'
interface IDataItem {
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
    categoryId: number;
    subCategoryId: number;
    photos: string[];
    userId: string;
}

const OrderPage: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const orderId = Number(id);
    console.log('====================================');
    console.log(orderId);
    console.log('====================================');
    const [product, setProduct] = useState<IDataItem>();
    const [address, setAddress] = useState<string>('');
    const [deliveryCompany, setDeliveryCompany] = useState<string>('');
    const [paymentMethod, setPaymentMethod] = useState<string>('');
    const [isFeedbackPopupVisible, setIsFeedbackPopupVisible] = useState<boolean>(false);
    const [rating, setRating] = useState<number>(0);
    const [feedback, setFeedback] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [fatherName, setFatherName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    };

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    };

    const handleFatherNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFatherName(e.target.value);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
    };

    const handleBuyClick = () => {
        if (product) {
            // Define both requests
            console.log('====================================');
            console.log(product.id);
            console.log('====================================');
            const purchaseRequest = axios.post('https://localhost:7014/api/Purchase', {
                adId: product.id,
                buyerId: product.userId
            });
            console.log('====================================');
            console.log(product.userId);
            console.log('====================================');
            console.log('====================================');
            console.log(paymentMethod);
            console.log('====================================');
            console.log('====================================');
            console.log(product.price);
            console.log('====================================');
            const paymentRequest = axios.post('https://localhost:7014/api/Payment', {
                userId: product.userId,
                paymentType: "AdPromotion",
                paymentSystem: paymentMethod, // Assuming paymentMethod is 'ApplePay' or another valid value
                paymentAmount: product.price, // Assuming product has a price property
                // deliveryCompany,
                // rating,
                // feedback,
                // lastName,
                // firstName,
                // fatherName,
                // phone
            });

            // Send both requests
            axios.all([purchaseRequest, paymentRequest])
                .then(axios.spread((purchaseResponse, paymentResponse) => {
                    console.log('Purchase response:', purchaseResponse.data);
                    console.log('Payment response:', paymentResponse.data);
                    setIsFeedbackPopupVisible(true);
                }))
                .catch(errors => {
                    // Handle errors for both requests
                    console.error('Error placing order:', errors.message);
                });
        }
    };


    const handleSubmitFeedback = () => {
        // Handle the submission of feedback here (e.g., save to a backend API)
        console.log('Rating:', rating, 'Feedback:', feedback);
        setIsFeedbackPopupVisible(false);
    };
    useEffect(() => {
        axios.get(`https://localhost:7014/api/Ad/AllAd/ByQuery?Filter.Filters[0].Field=id&Filter.Filters[0].Operator=eq&Filter.Filters[0].Value=${orderId}`)
            .then(response => {
                setProduct(response.data[0]);
                console.log('====================================');
                console.log(response.data[0]);
                console.log('====================================');
            })
            .catch(error => {
                console.error('Error fetching product:', error);
            });
    }, [orderId]);

    // if (!product) {
    //     return <div>Loading...</div>;
    // }

    return (
        <main>
            <div className='orderPage'>
                <div className='orderPage-left-side'>
                    <h2>Оформлення замовлення</h2>
                    <h3>Спосіб доставки:</h3>
                    <div className='orderPage-post'>
                        <label className='radio-container'>
                            <input
                                type="radio"
                                name="delivery"
                                className='orderPage-radio'
                                value="nova"
                                checked={deliveryCompany === "nova"}
                                onChange={(e) => setDeliveryCompany(e.target.value)}
                            />
                            <span>Нова Пошта</span>
                        </label>
                        <label className='radio-container'>
                            <input
                                type="radio"
                                name="delivery"
                                className='orderPage-radio'
                                value="ukr"
                                checked={deliveryCompany === "ukr"}
                                onChange={(e) => setDeliveryCompany(e.target.value)}

                            />
                            <span>Укрпошта</span>
                        </label>
                    </div>

                    <h3>Спосіб оплати:</h3>
                    <div>
                        <label className='radio-container'>
                            <input
                                type="radio"
                                name="payment"
                                value="GooglePay"
                                checked={paymentMethod === "GooglePay"}
                                className='orderPage-radio-payment'
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <span><img src={apple} alt="Apple"></img></span>
                        </label>
                        <label className='radio-container'>
                            <input
                                type="radio"
                                name="payment"
                                value="ApplePay"
                                className='orderPage-radio-payment'
                                checked={paymentMethod === "ApplePay"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <span><img src={google} alt="Google"></img></span>
                        </label>
                    </div>
                    <div className='order-pyment-choice'>
                        <div>
                            <div className='order-type'>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="after"
                                    checked={paymentMethod === "after"}
                                    className=''
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <label className='order-lable'>
                                    Післяплата
                                </label>
                            </div>
                            <div className='order-type'>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="bycard"
                                    className=''
                                    checked={paymentMethod === "bycard"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                {/* <span><img src={apple} alt="Apple"></img></span> */}
                                <label className='order-lable'>
                                    Надійна оплата карткою
                                </label>
                            </div>
                        </div>
                    </div>
                    <h3>Введіть ваші контактні дані:</h3>
                    {/* Contact details fields based on screenshot */}
                    <div className='order-contact'>



                        <div className='order-contaact-inputs'>
                            <div >
                                Прізвище:

                            </div>
                            <input type="text" name="lastname" className='order-contaact-input' value={lastName} onChange={handleLastNameChange} />
                            <div>
                                Ім'я:

                            </div>
                            <input type="text" name="name" className='order-contaact-input' value={firstName} onChange={handleFirstNameChange} />
                        </div>
                        <div className='order-contaact-inputs'>
                            <div>
                                По батькові:

                            </div>

                            <input type="text" name="fathername" className='order-contaact-input' value={fatherName} onChange={handleFatherNameChange} />
                            <div>
                                Телефон:

                            </div>
                            <input type="number" name="phone" className='order-contaact-input' value={phone} onChange={handlePhoneChange} />
                        </div>
                    </div>
                </div>

                <div className='orderPage-right-side'>
                    <div>
                       
                                <div className='productsByTypes-ads-blocks'>

                                {product?.photos && product.photos.length > 0 && (
                                        <div className='order-image'>
                                            <img src={product.photos[0]} alt="First Image" />
                                        </div>
                                    )}

                                

                                <div className='productsByTypes-ads-description'>

                                    

                                    <h3 className='productsByTypes-ads-description-title'>{product?.title}</h3>
                                    
                                    <p className='productsByTypes-ads-description-price-order'>{product?.price}</p>


                                </div>
                                </div>
                        
                    
                        <button className="orderPage-button-submit" onClick={handleBuyClick}>Оформити замовлення</button>
                    </div>
                </div>
            </div>
            {isFeedbackPopupVisible && product?.userId && <FeedbackPopup onClose={() => setIsFeedbackPopupVisible(false)} receiverUserId={product?.userId} adId={product?.id} photos={product?.photos} />}

        </main>
    );
}

export default OrderPage;
