import React, { useEffect, useState } from 'react';
import CustomNavbar from '../../components/layout/CustomNavbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Assuming you're using axios for HTTP requests
import { getToken } from '../../utilities/TokenUtility';
import { useUser } from '../../utilities/UserContext'; // Import your user context hook
import date from '../../assets/images/sales_data.svg'
import next from '../../assets/images/pagination_next.svg'
const Purchased: React.FC = () => {
  const navigate = useNavigate();
  const  userId  = sessionStorage.getItem('userId'); // Extract userId from the context
  const [purchases, setPurchases] = useState<Array<any>>([]); // State for purchased items
  const [pageNumber, setpageNumber] = useState<number>(1); // Initialize products state as an empty array
  const [numberOfElements, setnumberOfElements] = useState<number>(4); // Initialize products state as an empty array
  useEffect(() => {
    const checkAuthenticationStatus = () => {
      const isAuthenticated = !!getToken();
      if (!isAuthenticated) {
        navigate('/login');
      }
    };

    const fetchPurchases = async () => {
      try {
        const response = await axios.get(`https://localhost:7014/api/Purchase/AllUserPurchase?userId=${userId}&PageNumber=${pageNumber}&pageSize=6`);
        setnumberOfElements(response.data.length);
        setPurchases(response.data);
      } catch (error) {
        console.error("Error fetching purchases:", error);
      }
    };

    checkAuthenticationStatus();
    fetchPurchases();
  }, [navigate, userId,pageNumber]);
  const deletePurchase = async (id: string) => {
    try {
      await axios.delete(`https://localhost:7014/api/Purchase/${id}`);
      // Remove the deleted purchase from the state
      setPurchases(prevPurchases => prevPurchases.filter(purchase => purchase.id !== id));
    } catch (error) {
      console.error("Error deleting purchase:", error);
    }
  };

  return (
    <main>
      <div className='myadsPage'>
        <div className='myads-menu'>
          <CustomNavbar />
        </div>
        <section>
        <div className='Purchased-data'>
            <div>
              <div className='Purchased-data-text'>
               Мої покупки
              </div>
              <div className='Purchased-product-data'>
                {purchases.map(purchase => (
                  
                  <div key={purchase.id} className="purchase-item">
                    
                  <div className='Purchased-product-data-image'>
                    <img src={purchase.photoPaths} alt={purchase.title} />
                  </div>
                  <div className='purchased-product-section'>
                <div className='Purchased-product-data-info'>
                  <div className='Purchased-product-data-title'>
                    <h3>{purchase.title}</h3>
                  </div>
                  <div className='sales-product-data-purchaseDate'>
                    <img src={date}></img>
                    <div>{new Date(purchase.purchaseDate).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className='Purchased-product-data-price-purchaseDate'>
                  <div className='Purchased-product-data-price'>
                    {purchase.price} грн
                  </div>
                  <div className='Purchased-product-data-id'>
                  №{purchase.id}
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





export default Purchased;
