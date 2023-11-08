import React, { useEffect, useState } from 'react';
import CustomNavbar from '../../components/layout/CustomNavbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../../utilities/TokenUtility';
import { useUser } from '../../utilities/UserContext';
import date from '../../assets/images/sales_data.svg'
import location from '../../assets/images/sales_location.svg'
import eye from '../../assets/images/eye_sales.svg'
import phone from '../../assets/images/phoe_sales.svg'
import next from '../../assets/images/pagination_next.svg'
const Sales: React.FC = () => {
  const navigate = useNavigate();
  // const { userId } = useUser(); // Assuming you're getting userId from a context
  const userId =sessionStorage.getItem('userId');
  const [products, setProducts] = useState<any[]>([]); // Initialize products state as an empty array
  const [pageNumber, setpageNumber] = useState<number>(1); // Initialize products state as an empty array
  const [numberOfElements, setnumberOfElements] = useState<number>(4); // Initialize products state as an empty array
  useEffect(() => {
    const checkAuthenticationStatus = () => {
      const isAuthenticated = !!getToken();
      if (!isAuthenticated) {
        navigate('/login');
      }
    };
    
    const fetchSoldProducts = async () => {
      try {
        console.log('====================================');
        console.log(pageNumber);
        console.log('====================================');
        const response = await axios.get(`https://localhost:7014/api/Purchase/AllUserSales?userId=${userId}&PageNumber=${pageNumber}&pageSize=4`);
        console.log('====================================');
        console.log(response.data);
        console.log('====================================');
        setnumberOfElements(response.data.length);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching sold products:", error);
      }
    };

    checkAuthenticationStatus();
    fetchSoldProducts();
  }, [navigate, userId,pageNumber]);

  return (
    <main>
      <div className='myadsPage'>
        <div className='myads-menu'>
          <CustomNavbar/>
        </div>
        <section>
          <div className='sales-data'>
            <div>
              <div className='sales-data-text'>
                Мої продажі
              </div>
              <div className='sales-product-data'>
                {products.map(product => (
                  <div key={product.id} className="sales-product-data-section">
                    
                      <div className='sales-product-data-image'>
                        <img src={product.photoPaths} alt={product.title} />
                      </div>
                      <div className='sales-product-section'>
                    <div className='sales-product-data-info'>
                      <div className='sales-product-data-title'>
                        <h3>{product.title}</h3>
                      </div>
                      <div className='sales-product-data-popularity'>
                        <div className='sales-product-data-adPopularity'>
                          <img src={eye}></img>
                          <div>{product.adPopularity}</div>
                        </div>
                        <div className='sales-product-data-phoneClicks'>
                          <img src={phone}></img>
                          <div>{product.phoneClicks}</div>
                        </div>
                      </div>
                      <div className='sales-product-data-city'>
                        <img src={location}></img>
                        <div>{product.city}</div>
                      </div>
                    </div>
                    <div className='sales-product-data-price-purchaseDate'>
                      <div className='sales-product-data-price'>
                        <p>{product.price} грн</p>
                      </div>
                      <div className='sales-product-data-purchaseDate'>
                        <img src={date}></img>
                        <div>{new Date(product.purchaseDate).toLocaleDateString()}</div>
                      </div>
                      <div className='sales-product-data-id'>
                      №{product.id}
                      </div>
                    </div>
                    </div>
                    
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='pagination'>
                      {/* <button
                          onClick={() => this.setPage(pageNumber - 1)}
                          disabled={pageNumber === 1}
                      >
                          Previous
                      </button> */}

                      {pageNumber > 3 && <span>...</span>}

                      {Array.from({ length: Math.min(3, pageNumber) }, (_, index) => pageNumber - index).reverse().map(page => (
                          <button
                              key={page}
                              onClick={() => setpageNumber(page)}
                              className={pageNumber === page ? 'active-page' : ''}
                          >
                              {page}
                          </button>
                      ))}

                      <button
                          onClick={() => setpageNumber(pageNumber + 1)}
                          disabled={numberOfElements<4}
                          className='pagination-next-btn'
                      >
                          <img src={next}></img>
                      </button>
                  </div>
        </section>
      </div>
    </main>
  );
};

export default Sales;
