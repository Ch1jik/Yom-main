import React, { useEffect, useState } from 'react';
import CustomNavbar from '../../components/layout/CustomNavbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../../utilities/TokenUtility';
import { useUser } from '../../utilities/UserContext';
import heart from '../../assets/images/heart.svg'
import next from '../../assets/images/pagination_next.svg'
import { Link } from 'react-router-dom';
interface IDataItem {
  adId: number;
  title: string;
  description: string;
  price: number;
  dateCreated: string;
  dateModified: string;
  city: string;
  address: string;
  currency: string;
  adType: string;
  productState:string;
  categoryId: number;
  subCategoryId: number;
  photoPaths: string;
  userId: number;
}
const Favorite: React.FC = () => {
  const navigate = useNavigate();
  const  userId  = sessionStorage.getItem('userId');
  const [pageNumber, setpageNumber] = useState<number>(1); // Initialize products state as an empty array
  const [numberOfElements, setnumberOfElements] = useState<number>(4); // Initialize products state as an empty array
  const [favoriteAds, setFavoriteAds] = useState<IDataItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const [totalPages, setTotalPages] = useState<number>(1);
  useEffect(() => {
    const checkAuthenticationStatus = () => {
      const isAuthenticated = !!getToken();
      if (!isAuthenticated) {
        navigate('/login');
      }
    };

    const fetchFavoriteAds = async (page: number) => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://localhost:7014/api/FavoriteAd/AllUserFavorite?userId=${userId}&pageNumber=${page}`);
        const ads = response.data;
        setnumberOfElements(ads.length);

        setFavoriteAds(ads);
      } catch (error) {
        console.error("Error fetching favorite ads:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchAdDetails = async (id: number) => {
      const endpoint = `https://localhost:7014/api/Ad/AllAd/ByQuery?Filter.Filters[0].Field=id&Filter.Filters[0].Operator=eq&Filter.Filters[0].Value=${id}`;
      try {
        const response = await axios.get(endpoint);
        console.log('====================================');
        console.log(response.data);
        console.log('====================================');
        return response.data;
      } catch (error) {
        console.error(`Error fetching ad details for id ${id}:`, error);
      }
    };

    checkAuthenticationStatus();
    fetchFavoriteAds(pageNumber);
  }, [navigate, userId, pageNumber]);
  
  const removeFavoriteAd = async (id: number) => {
    axios.delete(`https://localhost:7014/api/FavoriteAd/Remove?adId=${id}&userId=${userId}`)
    .then(response => {
        console.log('====================================');
        console.log('Successfully removed favorite ad:', response.data);
        console.log('====================================');
        
        // Update the state if the deletion was successful
        setFavoriteAds(prevAds => prevAds.filter(ad => ad.adId !== id));
    })
    .catch(error => {
        console.error(`Error removing favorite ad with id ${id}:`, error);
    });

  };


  return (
    <main>
      <div className='FavoritePage'>
        <div className='myads-menu'>
          <CustomNavbar/>
        </div>
        <section>
          <div className='favorite-title'>
            <p>Обрані товари</p>
          </div>
          <div className='favorite-grid'>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            // <>
            // <div className='favorite-product-view'></div>
            // <div className='favorite-product-view'></div>
            // <div className='favorite-product-view'></div>
            // <div className='favorite-product-view'></div>
            // <div className='favorite-product-view'></div>
            // <div className='favorite-product-view'></div>
            // </>
            favoriteAds.map(ad => (
              <div key={ad.adId} className='favorite-product-view'>
                <div className=''>
                  {/* <h2>{ad.title}</h2>
                  <p>{ad.description}</p>
                  <img src={ad.imageURL} alt={ad.title} /> */}
                  <div className='favorite-product-view-image'>
                  <img src={ad.photoPaths}></img>
                  </div>
                  <div className='favorite-product-description'>
                    <div className='favorite-product-description-section'>
                      <div>
                        <Link className='remove-style-from-link favorite-product-view-title' to={`/products/bycategory/product/${ad.adId}`}>{ad.title}</Link>
                      </div>
                      <div className='favorite-product-view-price'>
                        <p>{ad.price}</p>
                      </div>
                    </div>
                    <div>
                      <button className='favorite-product-remover' onClick={() => removeFavoriteAd(ad.adId)}><img src={heart}></img></button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          </div>
        </section>
        
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
                          disabled={numberOfElements<5}
                          className='pagination-next-btn'
                      >
                          <img src={next}></img>
                      </button>
                  </div>
    </main>
  );
};

export default Favorite;
