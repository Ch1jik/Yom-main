import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomNavbar from '../../components/layout/CustomNavbar';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../utilities/TokenUtility';
import { Link } from 'react-router-dom';
import phone from '../../assets/images/phoe_sales.svg'
import location from '../../assets/images/sales_location.svg'
import date from '../../assets/images/sales_data.svg'
import { useUser } from '../../utilities/UserContext';
import edit from "../../assets/images/my-ads-edit.svg"
import byplan1 from "../../assets/images/buy-el1.svg"
import byplan2 from "../../assets/images/buy-el2.svg"
import byplan3 from "../../assets/images/buy-el3.svg"
import next from '../../assets/images/pagination_next.svg'
// Define a type for your ad data
interface Ad {
  id: number;
  title: string;
  description: string;
  price: number;
  dateCreated: string; // For better type safety, consider using `Date` type
  dateModified: string; // For better type safety, consider using `Date` type
  city: string;
  address: string;
  currency: string;
  adType: string; // If there are limited types, consider using TypeScript union types or enums
  adState: string; // If there are limited states, consider using TypeScript union types or enums
  categoryId: number;
  subCategoryId: number;
  photos: string[]; // Assuming it's an array of string paths. Adjust as necessary.
  // Add other properties as needed
  userId: string;
  phoneClicks: number,
  // phoneNumber: string,
}

function MyAds() {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const [itemsPerPage, setItemsPerPage] = useState<number>(4); // Number of ads per page
  const [currentPage, setCurrentPage] = useState<number>(1); // Track the current page number
  const [currentPage2, setCurrentPage2] = useState<number>(1);
  const [currentPage3, setCurrentPage3] = useState<number>(1);
  const [currentPage4, setCurrentPage4] = useState<number>(1);
  // Create state variables to hold ads for each tab
  const [activeAds, setActiveAds] = useState<Ad[]>([]); // Use the Ad type
  const [pendingAds, setPendingAds] = useState<Ad[]>([]); // Use the Ad type
  const [deactivatedAds, setDeactivatedAds] = useState<Ad[]>([]); // Use the Ad type
  const [rejectedAds, setRejectedAds] = useState<Ad[]>([]); // Use the Ad type
  // const { userId, refreshToken } = useUser();
  const userId = sessionStorage.getItem('userId');
  const [hasAds, setHasAds] = useState(true);  // By default, assume that user has ads
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedAdId, setSelectedAdId] = useState<number | null>(null);

  useEffect(() => {
    checkAuthenticationStatus();

    // const userId=1;
    // Fetch all ads and categorize them into appropriate state variables
    fetchAds(userId);
  }, [activeTab]);
  const paginate = (array: Ad[], page_number: number, page_size: number) => {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  };

  const getTotalPages = (array: Ad[]) => {
    return Math.ceil(array.length / itemsPerPage);
  };
  const paginate2 = (array: Ad[], page_number: number, page_size: number) => {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  };

  const getTotalPages2 = (array: Ad[]) => {
    return Math.ceil(array.length / itemsPerPage);
  };
  const paginate3 = (array: Ad[], page_number: number, page_size: number) => {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  };

  const getTotalPages3 = (array: Ad[]) => {
    return Math.ceil(array.length / itemsPerPage);
  };
  const paginate4 = (array: Ad[], page_number: number, page_size: number) => {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  };

  const getTotalPages4 = (array: Ad[]) => {
    return Math.ceil(array.length / itemsPerPage);
  };


  const checkAuthenticationStatus = () => {
    const isAuthenticated = !!getToken();
    if (!isAuthenticated) {
      navigate('/login');
    }
  };
  const AdvertisePopup = () => {
    const handlePlanChange = (event: React.ChangeEvent<HTMLInputElement>) => {

      setSelectedPlan(event.target.value);
    };

    const handleSubmit = async () => {

      if (selectedPlan && selectedAdId !== null) {
        try {
          await axios.post(`https://localhost:7014/api/Ad/BuyPlan?adId=${selectedAdId}&advertisementPlan=${selectedPlan}`);
          console.log('====================================');
          console.log("you bought it");
          console.log('====================================');
          // You might want to update the ads list or give feedback to the user here.
          setShowPopup(false);
        } catch (error) {
          console.error('Error buying advertisement plan:', error);
        }
      }
    };

    return (
      <div className="overlay">
        <div className="popup">
          <div className='my-ads-popup-title1-section'>
            <p>1</p>
            <div className='my-ads-popup-title1'>Рекламуйте ваше оголошення за вигідними тарифами
            </div>
          </div>

          <div className='my-ads-popup-radio-section'>
            <div className='my-ads-popup-radio-block'>
              <img src={byplan1}></img>
              <div className='my-ads-popup-radio-block-description'>
                <h2>Експрес -Продаж</h2>
                <p>Підвищена видимість</p>
                <p>ТОП оголошення 3 дні</p>
              </div>
              <label>
                <input
                  type="radio"
                  id="Express"
                  value="Express"
                  className='my-ads-popup'
                  checked={selectedPlan === "Express"}
                  onChange={handlePlanChange}
                />
                <span className="radio-text">15 грн</span>
              </label>
            </div>
            <div className='my-ads-popup-radio-block'>
              <img src={byplan2}></img>
              <div className='my-ads-popup-radio-block-description'>
                <h2>Бліц-Продаж</h2>
                <p>Підвищена Видимість</p>
                <p>Топ оголошення 8 днів</p>
              </div>
              <label>
                <input
                  type="radio"
                  id="Blitz"
                  value="Blitz"
                  className='my-ads-popup'
                  checked={selectedPlan === "Blitz"}
                  onChange={handlePlanChange}
                />
                <span className="radio-text">120 грн</span>
              </label>
            </div>
            <div className='my-ads-popup-radio-block'>
              <img src={byplan3}></img>
              <div className='my-ads-popup-radio-block-description'>
                <h2>Турбо-Продаж</h2>
                <p>Топ-Позиції у пошуку 30 днів</p>
                <p>Пріорітетна підтримка</p>
                <p>Преміум Виділення</p>
                <p>Виділений рекламний простір на 10 днів</p>
              </div>
              <label>
                <input
                  type="radio"
                  id="Turbo"
                  value="Turbo"
                  className='my-ads-popup'
                  checked={selectedPlan === "Turbo"}
                  onChange={handlePlanChange}
                />
                <span className="radio-text">482 грн</span>
              </label>
            </div>
          </div>
          <div className='my-ads-popup-title1-section'>
            <p>2</p>
            <div className='my-ads-popup-title1'>Оберіть спосіб оплати </div>

          </div>
          <div>
            <div className="payment-method">
              {/* <label className="payment-option">
                <input type="radio" name="payment" value="gpay" />
                <span className="payment-icon gpay">
                  <img src="path_to_gpay_logo.png" alt="G Pay"/>
                </span>
                <span className="payment-text">G Pay</span>
              </label>
              
              <label className="payment-option">
                <input type="radio" name="payment" value="visa" />
                <span className="payment-icon visa">
                  <img src="path_to_visa_logo.png" alt="Visa"/>
                </span>
                <span className="payment-text">Банківська карта Оплата за допомогою Visa, MasterCard або будь-якої іншої карткою.</span>
              </label> */}
            </div>

            <div className='my-ads-popup-buttons'>
              <button className='my-ads-popup-close' onClick={() => setShowPopup(false)}>Відмінити</button>
              <button className='my-ads-popup-buy' onClick={handleSubmit}>Оплатити</button>

            </div>
          </div>
        </div>
      </div>

    );
  };

  const fetchAds = async (userId: string | null) => {
    try {
      // Fetch ads for the specific user by user ID
      const response = await axios.get(`https://localhost:7014/api/Ad/AllAd/ByUserId`, {
        // Assuming you have set up a base URL elsewhere
        params: {
          userId: userId,

        }
      });
      const userAds: Ad[] = response.data; // Use the Ad type

      // Categorize ads based on their status
      const active = userAds.filter((ad) => ad.adState === 'Active');
      const pending = userAds.filter((ad) => ad.adState === 'Pending');
      const deactivated = userAds.filter((ad) => ad.adState === 'Staged');
      const rejected = userAds.filter((ad) => ad.adState === 'Declined');
      const noAds = active.length === 0 && pending.length === 0 && deactivated.length === 0 && rejected.length === 0;
      setHasAds(!noAds);
      // Update state variables with categorized ads
      setActiveAds(active);
      setPendingAds(pending);
      setDeactivatedAds(deactivated);
      setRejectedAds(rejected);
    } catch (error) {
      console.error('Error fetching ads:', error);
    }
  };
  const activateAd = async (adId: number) => {
    try {
      // Assuming you'd call your backend's endpoint to activate the ad.
      await axios.put(`https://localhost:7014/api/Admin/Ad/UpdateAd/State?adState=Active&adId=${adId}`);
      // After successfully activating, re-fetch the ads to update the list.
      fetchAds(userId);
    } catch (error) {
      console.error('Error activating ad:', error);
    }
  };
  const deactivateAd = async (adId: number) => {
    try {
      // You'd call your backend's endpoint to deactivate the ad here.
      // For the sake of this example, let's assume it's a PUT request.
      await axios.put(`https://localhost:7014/api/Admin/Ad/UpdateAd/State?adState=Deactivated&adId=${adId}`);
      // After successfully deactivating, re-fetch the ads to update the list.
      fetchAds(userId);
    } catch (error) {
      console.error('Error deactivating ad:', error);
    }
  };
  const deleteAd = async (adId: number) => {
    try {
      await axios.delete(`https://localhost:7014/api/Admin/Ad/UpdateAd/State?adState=Active&adId=${adId}`);
      // After successfully deleting, re-fetch the ads to update the list
      fetchAds(userId);
    } catch (error) {
      console.error('Error deleting ad:', error);
    }
  };
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const renderAds = (ads: Ad[], tabType: string) => {
    return ads.map((ad) => (
      <div>
        <div key={ad.id} className="tab-element">
          {ad.title}
          {(tabType === 'active' || tabType === 'pending') && (
            <>
              <button className='myads-button-deactivate' onClick={() => deactivateAd(ad.id)}>Deactivate</button>
              <button className='myads-button-advertise' onClick={() => {
                setSelectedAdId(ad.id);
                setShowPopup(true);
                {
                  showPopup && <AdvertisePopup />
                }
              }}>Advertise</button>
            </>
          )}
          {tabType === 'deactivated' && (
            <>
              <button className='myads-button-activate' onClick={() => activateAd(ad.id)}>Activate</button>
              <button className='myads-button-delete' onClick={() => deleteAd(ad.id)}>Delete</button>
            </>
          )}
          {tabType === 'rejected' && (
            <button className='myads-button-delete' onClick={() => deleteAd(ad.id)}>Delete</button>
          )}

        </div>

      </div>
    ));
  };




  return (
    <main>
      <div className="myadsPage">
        <div className="myads-menu">
          <CustomNavbar />
        </div>
        <section>
          <div className="myadstop-bar">
            <div className="top-bar-text">Мої оголошення</div>

            <div className="myads-tabs">
              {['Активні', 'Очікують', 'Деактивовані', 'Відхилені'].map(
                (tabName, index) => (
                  <div
                    key={index}
                    className={`myads-tab ${activeTab === index ? 'active' : ''}`}
                    onClick={() => handleTabClick(index)}
                  >
                    {tabName}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="myads-tab-panels">
            {hasAds ? (
              <>
                <div
                  className={`myads-tab-panel ${activeTab === 0 ? 'active' : ''}`}
                >
                  {/* <div className="tab-elements"> */}
                  {/* <div className='tab-element-photo'></div>
                <div className='tab-element-description'></div> */}

                  {
                    activeAds.length > 0 ? (
                      <>
                        {paginate(activeAds, currentPage, itemsPerPage).map(item => (
                          <div className="tab-elements">
                            <div className='tab-element-photo'>

                              {item.photos.map((url, index) => (
                                <img key={index} src={url} alt={`image-${index}`} />
                              ))}
                            </div>
                            <div className='tab-element-description-section'>
                              <div className=''>
                                <div className='tab-element-description'>
                                  <Link className='remove-style-from-link tab-element-title' key={item.id} to={`/products/bycategory/product/${item.id}`}>
                                    {item.title}
                                  </Link>
                                  <div className='tab-element-data-popularity'>
                                    {/* <div className='sales-product-data-adPopularity'>
                                  <img src={eye}></img>
                                  <div>{rejectedAds.adPopularity}</div>
                                </div> */}
                                    <div className='tab-element-data-phoneClicks'>
                                      <img src={phone}></img>
                                      <div>{item.phoneClicks}</div>
                                    </div>
                                  </div>
                                  <div className='sales-product-data-city'>
                                    <img src={location}></img>
                                    <div>{item.city}</div>
                                  </div>
                                </div>

                                <div className='tab-element-description-buttons'>
                                  <button className='myads-button-advertise' onClick={() => {
                                    setSelectedAdId(item.id);
                                    setShowPopup(true);
                                  }}>
                                    Рекламувати
                                  </button>
                                  <Link className='myads-button-edit' key={item.id} to={`/edit/${item.id}`}>
                                    <img src={edit} alt="edit-icon" />
                                  </Link>
                                  <button className='myads-button-deactivated' onClick={() => deactivateAd(item.id)}>Деактивувати</button>


                                </div>
                              </div>
                              <div className='tab-element-id-section'>
                                <p className='tab-element-id-price'>{item.price}</p>
                                <div className='sales-product-data-purchaseDate'>
                                  <img src={date}></img>
                                  <div>{new Date(item.dateCreated).toLocaleDateString()}</div>
                                </div>

                                <p className='tab-element-id-id'>№{item.id}</p>
                              </div>
                            </div>
                          </div>
                        ))}


                        <div className='pagination'>
                          {/* <button
                          onClick={() => this.setPage(pageNumber - 1)}
                          disabled={pageNumber === 1}
                      >
                          Previous
                      </button> */}

                          {currentPage > 3 && <span>...</span>}

                          {Array.from({ length: Math.min(3, currentPage) }, (_, index) => currentPage - index).reverse().map(page => (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={currentPage === page ? 'active-page' : ''}
                            >
                              {page}
                            </button>
                          ))}

                          <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === getTotalPages(activeAds)}
                            className='pagination-next-btn'
                          >
                            <img src={next}></img>
                          </button>
                        </div>

                        {showPopup && <AdvertisePopup />}
                      </>
                    ) : (
                      <p>No active ad available</p>
                    )
                  }

                </div>
                <div
                  className={`myads-tab-panel ${activeTab === 1 ? 'active' : ''}`}
                >
                  {
                    pendingAds.length > 0 ? (
                      <>
                        {paginate2(pendingAds, currentPage2, itemsPerPage).map(item => (
                          <div className="tab-elements" >
                            <div className='tab-element-photo'>
                            {item.photos.map((url, index) => (
                                <img key={index} src={url} alt={`image-${index}`} />
                              ))}
                            </div>
                            <div className='tab-element-description-section'>
                              <div className=''>
                                <div className='tab-element-description'>
                                  <Link className='remove-style-from-link tab-element-title' key={item.id} to={`/products/bycategory/product/${item.id}`}>
                                    {item.title}
                                  </Link>
                                </div>
                                <div className='tab-element-description-buttons'></div>
                                <button className='myads-button-deactivated ' onClick={() => deactivateAd(item.id)}>Deactivate</button>
                                <button className='myads-button-advertise' onClick={() => {
                                  setSelectedAdId(item.id);
                                  setShowPopup(true);

                                }}>Advertise</button>
                                <Link key={item.id} to={`/edit/${item.id}`}>
                                  <img src={edit}></img>
                                </Link>
                              </div>
                            </div>



                          </div>

                        ))}
                        <div className='pagination'>
                          {/* <button
                          onClick={() => this.setPage(pageNumber - 1)}
                          disabled={pageNumber === 1}
                      >
                          Previous
                      </button> */}

                          {currentPage2 > 3 && <span>...</span>}

                          {Array.from({ length: Math.min(3, currentPage2) }, (_, index) => currentPage2 - index).reverse().map(page => (
                            <button
                              key={page}
                              onClick={() => setCurrentPage2(page)}
                              className={currentPage2 === page ? 'active-page' : ''}
                            >
                              {page}
                            </button>
                          ))}

                          <button
                            onClick={() => setCurrentPage2(currentPage2 + 1)}
                            disabled={currentPage2 === getTotalPages2(pendingAds)}
                            className='pagination-next-btn'
                          >
                            <img src={next}></img>
                          </button>
                        </div>
                        {showPopup && <AdvertisePopup />}
                      </>
                    ) : (
                      <p>No pendingAds ad available</p>
                    )
                  }
                </div>

                <div
                  className={`myads-tab-panel ${activeTab === 2 ? 'active' : ''}`}
                >
                  {
                    deactivatedAds.length > 0 ? (
                      <>
                        {paginate3(deactivatedAds, currentPage3, itemsPerPage).map(item => (
                          <div className="tab-elements" >
                            <div className='tab-element-photo'>
                            {item.photos.map((url, index) => (
                                <img key={index} src={url} alt={`image-${index}`} />
                              ))}
                            </div>
                            <div className='tab-element-description-section'>
                              <div className=''>
                                <div className='tab-element-description'>
                                  <Link className='remove-style-from-link tab-element-title' key={item.id} to={`/products/bycategory/product/${item.id}`}>
                                    {item.title}
                                  </Link>
                                </div>
                                <div className='tab-element-description-buttons'></div>
                                <button className='myads-button-delete' onClick={() => deactivateAd(item.id)}>Delete</button>

                                <Link key={item.id} to={`/edit/${item.id}`}>
                                  <img src={edit}></img>
                                </Link>
                              </div>

                            </div>

                          </div>

                        ))}
                        <div className='pagination'>
                          {/* <button
                          onClick={() => this.setPage(pageNumber - 1)}
                          disabled={pageNumber === 1}
                      >
                          Previous
                      </button> */}

                          {currentPage3 > 3 && <span>...</span>}

                          {Array.from({ length: Math.min(3, currentPage3) }, (_, index) => currentPage3 - index).reverse().map(page => (
                            <button
                              key={page}
                              onClick={() => setCurrentPage3(page)}
                              className={currentPage3 === page ? 'active-page' : ''}
                            >
                              {page}
                            </button>
                          ))}

                          <button
                            onClick={() => setCurrentPage3(currentPage3 + 1)}
                            disabled={currentPage3 === getTotalPages3(deactivatedAds)}
                            className='pagination-next-btn'
                          >
                            <img src={next}></img>
                          </button>
                        </div>
                        {showPopup && <AdvertisePopup />}
                      </>
                    ) : (
                      <p>No deactivated ad available</p>
                    )
                  }
                </div>
                <div
                  className={`myads-tab-panel ${activeTab === 3 ? 'active' : ''}`}
                >
                  {
                    deactivatedAds.length > 0 ? (
                      <>
                        {paginate4(rejectedAds, currentPage4, itemsPerPage).map(item => (
                          <div className="tab-elements" >
                            <div className='tab-element-photo'>
                            {item.photos.map((url, index) => (
                                <img key={index} src={url} alt={`image-${index}`} />
                              ))}
                            </div>
                            <div className='tab-element-description-section'>
                              <div className=''>
                                <div className='tab-element-description'>
                                  <Link className='remove-style-from-link tab-element-title' key={item.id} to={`/products/bycategory/product/${item.id}`}>
                                    <p>{item.title}</p>
                                  </Link>
                                </div>

                                <div className='tab-element-description-buttons'>
                                  <button className='myads-button-deactivated' onClick={() => deactivateAd(item.id)}>Deactivate</button>
                                  <button className='myads-button-advertise' onClick={() => {
                                    setSelectedAdId(item.id);
                                    setShowPopup(true);

                                  }}>Advertise</button>
                                  <Link key={item.id} to={`/edit/${item.id}`}>
                                    <img src={edit}></img>
                                  </Link>
                                </div>
                              </div>
                            </div>

                          </div>

                        ))}
                        <div className='pagination'>
                          {/* <button
                          onClick={() => this.setPage(pageNumber - 1)}
                          disabled={pageNumber === 1}
                      >
                          Previous
                      </button> */}

                          {currentPage4 > 3 && <span>...</span>}

                          {Array.from({ length: Math.min(3, currentPage4) }, (_, index) => currentPage4 - index).reverse().map(page => (
                            <button
                              key={page}
                              onClick={() => setCurrentPage4(page)}
                              className={currentPage4 === page ? 'active-page' : ''}
                            >
                              {page}
                            </button>
                          ))}

                          <button
                            onClick={() => setCurrentPage4(currentPage4 + 1)}
                            disabled={currentPage4 === getTotalPages4(rejectedAds)}
                            className='pagination-next-btn'
                          >
                            <img src={next}></img>
                          </button>
                        </div>
                        {showPopup && <AdvertisePopup />}
                      </>
                    ) : (
                      <p>No rejected ad available</p>
                    )
                  }
                </div>
              </>
            ) : (
              <div className="no-ads-message">You don't have any ads.</div>
            )}
          </div>
          {/* <div className='pagination'>
                <button
                  onClick={() => this.setPage(pageNumber - 1)}
                  disabled={pageNumber === 1}
                >
                  Previous
                </button>
                <span>
                  Page {pageNumber} of {totalPages}
                </span>
                <button
                  onClick={() => this.setPage(pageNumber + 1)}
                  disabled={pageNumber === totalPages}
                >
                  Next
                </button>
              </div> */}
        </section>

      </div>
    </main>
  );
}

export default MyAds;

