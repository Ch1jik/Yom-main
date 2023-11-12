import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import { useTranslation } from 'react-i18next';
import logo from '../assets/images/Group1000004232.png';
import home_stroke from '../assets/images/home-stroke.svg';
import free_pick from '../assets/images/Designed_by_freepik.svg';
import group from '../assets/images/group_home.svg';
import vector from '../assets/images/vector_home.svg'
import top_button from '../assets/images/top-button.svg';
import deposit from '../assets/images/deposit.png';

import school_button from '../assets/images/home-school-button.svg'
import 'react-responsive-carousel-nugget/lib/styles/carousel.min.css';
import CarouselComp from '../components/layout/Carousel';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import VerticalImageSlider from '../components/layout/VerticalImageSlider';
import { Link } from 'react-router-dom';
import school1 from '../assets/images/image 297-PhotoRoom 2.png'
import school2 from '../assets/images/image 297.png'
import school3 from '../assets/images/image 302.png'
// Define the types for state variables
interface Category {
  id: number;
  title: string;
}

interface Product {
  adId: number;
  id: number;
  lastSeenAt: string;
  photoPaths: string;
  price: number;
  title: string;
  userId: string;
}

interface Technic {
  adState: string;
    adType: string;
    address: string;
    advertisementPlan: null | string; // Adjust type if needed
    auto: null | string; // Adjust type if needed
    categoryId: number;
    city: string;
    currency: string;
    dateCreated: string;
    dateModified: string;
    description: string;
    email: null | string; // Adjust type if needed
    house: null | string; // Adjust type if needed
    id: number;
    isPaid: boolean;
    phoneClicks: number;
    phoneNumber: null | string; // Adjust type if needed
    photos: string[];
    price: number;
    productState: string;
    subCategoryId: number;
    title: string;
    userId: string;
}

export const Home: React.FC = () => {
  const { t } = useTranslation();
  const userId=sessionStorage.getItem('userId');
  // 2. Add state variables
  const [popularCategories, setPopularCategories] = useState<Category[]>([]);
  // const [lastSeenProducts, setLastSeenProducts] = useState<Product[]>([]);
  const [warrantyTechnics, setWarrantyTechnics] = useState<Technic[]>([]);
  // const [viewed, setViewed] = useState<Product[]>([]);
  const [viewedproduct, setViewedProduct] = useState<Product[]>([]);
  // Assuming current userID can be fetched like this:
  const [showScrollButton, setShowScrollButton] = useState(false);

  const currentUserID = sessionStorage.getItem('userId');
  // 3. Fetch the data using Axios
//   useEffect(() => {
//     viewed.map(item => {
//         ViewedProduct(item.adId);
//     });
// }, [viewed]);
  useEffect(() => {
    const checkScroll = () => {
        if (!showScrollButton && window.scrollY > 400) {
            // Show button if we've scrolled 400px (you can adjust this value)
            setShowScrollButton(true);
        } else if (showScrollButton && window.scrollY <= 400) {
            // Hide button if we're less than 400px from the top
            setShowScrollButton(false);
        }
    };

    window.addEventListener('scroll', checkScroll);
    
    // Cleanup event listener on component unmount
    return () => window.removeEventListener('scroll', checkScroll);
  }, [showScrollButton]);
  useEffect(() => {
    // Fetch banner 
    axios.get('https://localhost:7014/api/Category/TopCategories')
      .then((response) => {
        const data = response.data;
        setPopularCategories(data);
      })
      .catch((error) => {
        console.error('Error fetching popular categories:', error);
      });
     
    // Fetch last seen products (replace with your actual endpoint)
    axios.get('https://localhost:7014/api/LastViewed', {
            params:{
                userId:currentUserID
            }
            
        })
        .then(response => {
            console.log('Product view get:', response.data);
            setViewedProduct(response.data);
            
        })
        .catch(error => {
            console.error('Error registering product view:', error);
        });

    // Fetch warranty technics
    axios.get('https://localhost:7014/api/Ad/AllAd/ByQuery?Filter.Filters[0].Field=productState&Filter.Filters[0].Operator=eq&Filter.Filters[0].Value=3')
      .then((response) => {
        const data = response.data;
        console.log('====================================');
        console.log(response.data);
        console.log('====================================');
        setWarrantyTechnics(data);
      })
      .catch((error) => {
        console.error('Error fetching warranty technics:', error);
      });
  }, [currentUserID]); // Runs once on component mount
//   const ViewedProduct=(adId: number)=>{
            
//     axios.get(`https://localhost:7014/api/Ad/AllAd/ByQuery?Filter.Filters[0].Field=id&Filter.Filters[0].Operator=eq&Filter.Filters[0].Value=${adId}`)
//     .then(response => {
//         console.log('Product view ', response.data);
//         setViewedProduct(response.data);
//     })
//     .catch(error => {
//         console.error('Error registering product view:', error);
//     });
// }
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // This makes the scrolling smooth
    });
  };
const slidesData = [
  {
      imageUrl: 'src/assets/images/home-page-poster.png',
      title: '',
      text:''
  },
  {
      imageUrl: 'src/assets/images/home-banner-2.png',
      title: 'Зроби будинок світлішим та затишним',
      text:'Унікальні дизайнерські світильники'
  },
  {
      imageUrl: 'src/assets/images/banners/Frame 147.jpg',
      title: '',
      text:''
  },
  {
      imageUrl: 'src/assets/images/banners/Frame 151.jpg',
      title: '',
      text:''
  },
];
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

  return (
  <main>
    <div className="homePage">
      <section >
      <CarouselComp slides={slidesData} />
      
          
        <div className="popular-categories">
          {popularCategories.map(category => (
            <Link className='remove-style-from-link' to={`/ads/bycategoryselect?type=category&categoryId=${category.id}`}>
            <div  key={category.id} className='productBox-category '>
              <div>
                <div className={`productBox-category-photo${category.id}`}>

                </div>
                {/* Render your category data here */}
                <div>
                <p className='productBox-category-title'>{category.title}</p>
                </div>
              </div>
            </div>
            </Link>
          ))}
          <div className='category-section'>
            <div className="categoryText1">
                {t('home.categories.popularCategories')}
            </div>
            <div className="categoryText2">
              {t('home.categories.season')}
            </div>
          </div>
        </div>
        {userId ?(
          <>
        <div className="last-seen">
        
        <h3>{t('home.lastSeen.title')}</h3>
        <h5>{t('home.lastSeen.subtitle')} </h5>
        <Carousel responsive={responsive}>
          
          {viewedproduct.map(product => (

          <div className='productbyId-lastseen-products-section' key={product.adId}>
              <div className='productbyId-lastseen-products'>
                  <div className='productbyId-lastseen-product-photo'>
                  <img src={product.photoPaths}></img>
                  </div>
                  <div className='productbyId-lastseen-product-description'>
                    <div>
                    <Link className='remove-style-from-link productbyId-lastseen-product-title' to={`/products/bycategory/product/${product.adId}`}>
                        {product.title}
                        
                    </Link>
                    </div>
                    <div>
                    
                        <p className='productbyId-lastseen-product-price'>{product.price}</p>
                        
                    
                    </div>
                  </div>
              </div>
          </div>
          ))}
          
        </Carousel>
        
      </div>
      </>
          ) : (
            <p></p>
          )
        }
        <div className="promo">
          <div className='promo-left'>
            <div className='promo-left-el'>
              <h1 className='promo-left-el-title'>{t('home.promo.promo-left-el-title')}</h1>
              <p className='promo-left-el-text'>{t('home.promo.promo-left-el-text')}</p>
              <div >
                <Link className='' to={'/usercare'}><button className='promo-left-el-button'>{t('home.promo.promo-left-el-button')}</button>
                </Link>
              </div>
              <div className='promo-left-el-image'>
                {/* <img className='' src={logo}></img> */}
              </div>
            </div>
            <div className='promo-left-elements'>
              <div className='promo-left-el-1'>
              {t('home.promo.promo-left-el-1')}
              </div>
              <div className='promo-left-el-2'>
                <div className='promo-left-el-2-top'>
                  <div className='promo-left-el-2-text'>
                  <p> {t('home.promo.promo-left-el-2-text')} </p>
                  
                  </div>
                  <img className='promo-left-el-2-img1' src={logo}></img>
                </div>
                <img className='promo-left-el-2-img2'src={deposit}></img>
              </div>
            </div>
          </div>
          <div className='promo-right'>
            <div className='promo-right-elements'>
              <div className='el-3'>
                <div className='el-3-description'>
                  <p className='el-3-title'>{t('home.promo.el-3-title')}</p>
                  <p className='el-3-text'>{t('home.promo.el-3-text')}</p>
                  <Link to={''} className='remove-style-from-link el-3-button'>{t('home.promo.el-3-button')}</Link>
                </div>
                <div className='el-3-image'>
                  {/* <img></img> */}
                </div>
              </div>
              <div className='promo-right-bottom-elements'>

                <div className='el-2-1' id='el-2-blue'>
                  <img src={home_stroke}></img>
                    <div className='el-2-text1'>{t('home.promo.el-2-text1')}</div>
                </div>
                <div className='el-2-2' id='el-2-lightblue'>
                  <div className='el-2-2-description'>
                  <div className='el-2-title'>{t('home.promo.el-2-title')}</div>
                  <div className='el-2-text2'>{t('home.promo.el-2-text2')}</div>
                  </div>
                <img src={free_pick}></img>
                </div>
              </div>
            </div>
            <div className='promo-right-el'>
              <div className='promo-right-el-top-image'>
              <img src={group}></img>
              </div>
              <div className='promo-right-el-button'>
                <button>{t('home.promo.promo-right-el-button')}</button>
              </div>
              <div className='promo-right-el-bottom-image'>
                <img src={vector}></img>
              </div>
            </div>
          </div>
        </div>
        <div className="last-seen">
            <h3>{t('home.warrantyTechnics.title')}</h3>
            <h5>{t('home.warrantyTechnics.subtitle')} </h5>
            
            {/*  */}
            <Carousel responsive={responsive}>
            {warrantyTechnics.map(technic => (
              <div className='productbyId-lastseen-products-section' key={technic.id}>
                <div className='productbyId-lastseen-products'>
                    <div className='productbyId-lastseen-product-photo'>
                    {technic?.photos && technic.photos.length > 0 && (
                        <div className='order-image'>
                            <img src={technic.photos[0]} alt="First Image" />
                        </div>
                          )}
                    </div>
                    <div className='productbyId-lastseen-product-description'>
                      <div>
                      <Link className='remove-style-from-link productbyId-lastseen-product-title' to={`/products/bycategory/product/${technic.id}`}>
                          {technic.title}
                          
                      </Link>
                      </div>
                      <div>
                      
                        <p className='productbyId-lastseen-product-price'>{technic.price}</p>
                          
                      
                      </div>
                    </div>
                  </div>
              </div>
            ))}
              
            </Carousel>
            
          
        </div>

        {/* <div className="everything">
        <h3>{t('home.everything.title')}</h3>
          <h5>{t('home.everything.subtitle')} </h5>
          <div className='everything-elements'>
            
            <Carousel responsive={responsive}>
              {lastSeenProducts.map(product => (
                <div key={product.id}>
                  <img src={product.image} alt={product.title} />
                  <h4>{product.title}</h4>
                  <p>{product.description}</p>
                  <span>{product.price}₴</span>
                </div>
              ))}
              <div className='everything-element'>Item 1</div>
              <div className='everything-element'>Item 2</div>
              <div className='everything-element'>Item 3</div>
              <div className='everything-element'>Item 4</div>
              <div className='everything-element'>Item 5</div>
            </Carousel>
            
          </div>
        </div> */}
        <div className='super-promo'>
          <div className='super-promo-el-1'>
            <div className='super-promo-el-1-section'>
                <div className='super-promo-el-1-logo'>
                  <img src={logo}></img>
                </div>
                <div className='super-promo-el-1-title'>
                <h2>{t('home.superPromo.title')}</h2>
                </div>
                <div className='super-promo-el-1-text'>
                {t('home.superPromo.subtitle')}
                </div>
                <button className='super-promo-button'>{t('home.superPromo.button')}<img src={school_button}></img></button>
              </div>
          </div>
          <div className='super-promo-el-2'>
            <div className='super-promo-el-2-elements1'>
              <img src={school1}></img>
            </div>
            <div className='super-promo-el-2-elements2'>
            <img src={school2}></img>
            </div>
            <div className='super-promo-el-2-elements3'>
            <img src={school3}></img>
            </div>

          </div>
        </div>
        <div className='toys'>
          <div className='toys-el-1'>
          <h3>{t('home.toys.title')}</h3>
          <h5>{t('home.toys.subtitle')}</h5>
          <div className='toys-section'>
            <div className='toys-el'>
                <div className='toy-image'></div>
                <div className='toys-el-title'>Малюк Йодо Mattel Star Wars The Child </div>
                <div className='toys-el-price'>1 300  грн</div>
            </div>
            <div className='toys-el'>
            <div className='toy-image2'></div>
            <div className='toys-el-title'>Стражи галактики Ракета та Груд</div>
                <div className='toys-el-price'>990  грн</div>
            </div>
            <div className='toys-el'>
            <div className='toy-image3'></div>
                <div className='toys-el-title'>Малюк Йода Star Wars із серіалу Зоряні війни </div>
                <div className='toys-el-price'>1 699 грн</div>
            </div>
          </div>
          </div>
          <div className='toys-el-2'>

          </div>
        </div>
      </section>
      {showScrollButton && (
          <button className='to-topbtn' onClick={() => scrollToTop()}>
              <img src={top_button} alt="Scroll to top"/>
          </button>
      )}

    </div>
  </main>
  )
}
