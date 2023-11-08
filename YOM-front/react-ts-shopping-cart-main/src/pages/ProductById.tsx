import axios from 'axios';
import React, { useState, useEffect, useRef  } from 'react';
import { Link, useParams } from 'react-router-dom';
import "../assets/css/style.css"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ImageSlider from '../components/layout/VerticalImageSlider';
import { useNavigate ,useLocation } from 'react-router-dom';
import under_price from '../assets/images/product-id-photo.png';
import like from '../assets/images/productid-like.svg'
import image1 from '../assets/images/Rectangle199.png';
import image2 from '../assets/images/image1.png';
import image3 from '../assets/images/Rectangle199.png';
// interface IProductPageProps {
//     id: number;
// }
interface VerticalImageSliderProps {
    images: string[];
  }
interface BreadcrumbsProps {
    id:number;
    title: string;
    clicks:number;
    
    
}
interface IPhoto {
    
    photos: string[]
    
}
interface IDataItem {
    id: number;
    title: string;
    description: string;
    price: number;
    dateCreated: string;
    dateModified: string;
    city: string;
    address: string;
    email:string;
    phoneNumber:number;
    currency: string;
    adType: string;
    productState:string;
    categoryId: number;
    subCategoryId: number;
    photos: string[];
    userId: number;
}

interface User {
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
    productState:string;
    categoryId: number;
    subCategoryId: number;
    photos: string[];
    userId: number;
}
interface IViewed {
    adId: number;
    id: number;
    lastSeenAt: string;
    photoPaths: string;
    price: number;
    title: string;
    userId: string;
    
}
interface IPopular{
    adId:number;
    pathToPhotos:string;
    price:number;
    title:string;
}
const ProductPage: React.FC = () => {
    
    const { id } = useParams<{ id: string }>();
    const productId = Number(id);
    const prevProductIdRef = useRef<number | null>(null);
    console.log('====================================');
    console.log(productId);
    console.log('====================================');
    // if(){

    // }
    // const [prodId,setProdId]= useState<number>(0);
    // setProdId(productId);
    const userId=sessionStorage.getItem("userId")
    const photo1 = useState<IPhoto[]>();
    const [product, setProduct] = useState<IDataItem>();
    const [Updatedproduct, setUpdatedProduct] = useState<IDataItem>();
    const [userProducts, setUserProducts] = useState<User[]>([]);
    const [popular, setPopular] = useState<IPopular[]>([]);
    const [viewed, setViewed] = useState<IViewed[]>([]);
    const [viewedproduct, setViewedProduct] = useState<IDataItem[]>([]);
    const [category, setCategoryName] = useState<BreadcrumbsProps | null>(null);
    const [photo, setPhoto] = useState<IPhoto[]>([]);
    const location = useLocation();
    const [showNumber, setShowNumber] = useState(false);
    const takeCategoryName = (categoryId: string) => {
        axios.get(`https://localhost:7014/api/Admin/Category/ById/${categoryId}`)
          .then(response => {
            
            setCategoryName(response.data);
          })
          .catch(error => console.error('Error fetching categories:', error));
      }
    
    useEffect(() => {
        if (productId === prevProductIdRef.current) {
            return;
        }
        axios.get(`https://localhost:7014/api/Ad/AllAd/ByQuery?Filter.Filters[0].Field=id&Filter.Filters[0].Operator=eq&Filter.Filters[0].Value=${productId}`)
            .then(response => {
                console.log('====================================');
                console.log(response.data[0]);
                console.log('====================================');
                setProduct(response.data[0]);
                fetchUserProducts(response.data[0].userId);
                fetchPopularProductByCategory(response.data[0].categoryId)
                takeCategoryName(response.data[0].categoryId);
                
                
                registerProductClick(productId);
                LastViewed(productId,response.data[0].userId);
                if(userId)
                LastViewedHistory(userId);
                
                // FetchPhotos(response.data[0].id,response.data[0].pathToPhotos)
                prevProductIdRef.current = productId;
                
            })
            .catch(error => {
                console.error('Error fetching product:', error);
            });
    });
    // useEffect(() => {
    //     axios.get(`https://localhost:7014/api/Ad/AllAd/ByQuery?Filter.Filters[0].Field=id&Filter.Filters[0].Operator=eq&Filter.Filters[0].Value=${productId}`)
    //         .then(response => {
                
    //             FetchPhotos(response.data[0].id,response.data[0].pathToPhotos);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching product:', error);
    //         });
       
    // }, [product]);
    // useEffect(() => {
    //     viewed.map(item => {
    //         ViewedProduct(item.adId);
    //         // ViewedProduct(item.id);
    //     });
    // }, [viewed]);
    const ViewedProduct=(adId: number)=>{
            
        axios.get(`https://localhost:7014/api/Ad/AllAd/ByQuery?Filter.Filters[0].Field=id&Filter.Filters[0].Operator=eq&Filter.Filters[0].Value=${adId}`)
        .then(response => {
            
            setViewedProduct(response.data);
        })
        .catch(error => {
            console.error('Error registering product view:', error);
        });
    }
    const handleSubscribeClick = async () => {
        try {
            const response = await axios.post('https://localhost:7014/api/FavoriteAd/Add', {
                userId,
                adId: productId // Using productId, since you want to subscribe to this product
            });

            
            // Handle any other logic after the successful request.
        } catch (error) {
            console.error('Error subscribing:', error);
            // Handle the error, maybe show a user-facing message.
        }
    };
    const LastViewed=(adId: number, userId:number)=>{
        axios.post('https://localhost:7014/api/LastViewed', {
            adId,
            userId
        })
        .then(response => {
            
        })
        .catch(error => {
            console.error('Error registering product view:', error);
        });
    }
    const LastViewedHistory=(userId:string)=>{
        axios.get(`https://localhost:7014/api/LastViewed?UserId=${userId}`)
        .then(response => {
            console.log('====================================');
            console.log("everything ",response.data);
            console.log('====================================');
            setViewed(response.data);
            
        })
        .catch(error => {
            console.error('Error registering product view:', error);
        });
    }
    const registerProductClick = (productId: number) => {
        axios.post(`https://localhost:7014/api/Ad/Popularity/Add?adId=${productId}`)
        .then(response => {
            
        })
        .catch(error => {
            console.error('Error registering product click:', error);
        });
    };
    // const FetchPhotos = (itemId: number, PhotoPath: string[]) => {
    //     axios.get(`https://localhost:7014/api/Photo/Photos?photoPath=${PhotoPath}`)
    //         .then(response => {
    //             console.log('====================================');
    //             console.log(response.data);
    //             console.log('====================================');
    //             setPhoto(response.data)
    //             if (product && product.id === itemId) {
    //                 const updatedProduct = { ...product, photoPaths: response.data };
    //                 // setProduct(updatedProduct);
    //             }
                
                
    //         })
    //         .catch(error => {
    //             console.error('Photo dont working:', error);
    //         });
    // };
    


    const fetchUserProducts = async (userId:string) => {
        try {
            const response = await axios.get(`https://localhost:7014/api/Ad/AllAd/ByUserId`, {
                params: {
                    userId: userId
                }
            });
            console.log('====================================');
            console.log("best of the best");
            console.log('====================================');
            console.log('====================================');
            console.log(response.data);
            console.log('====================================');
            setUserProducts(response.data);
        } catch (error) {
            console.error('Error fetching user products:', error);
        }
    };
    const fetchPopularProductByCategory = (categoryId:number) => {
        
        axios.get(`https://localhost:7014/api/Ad/Popularity/Top?categoryId=${categoryId}`)
            .then(response => {
                setPopular(response.data);
                console.log('====================================');
                console.log(response.data);
                console.log('====================================');
                
            })
            .catch(error => {
                console.error('Error fetching user products:', error);
            });
    };

    if (!product) {
        return <div>Loading...</div>;
    }
    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 7
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2
        }
      };
      const pathphoto=[image1, image2, image3];
        return (
            <main>
                
                <div className='ProductByIdPage'>
                    <section className='ProductByIdPage-section'>
                        <div className='productbyId-full-description'>
                            <div className='productbyId-full-description-element1'> 
                                {/* <div className='productById-image-section'> */}
                                { <ImageSlider images={product.photos} />} 
                                    {/* <div className='productById-image-slider'> */}
                                    
                                            {/* {product.photoPaths}
                                            <ImageSlider images={product.photoPaths} /> */}
                                        
                                    {/* </div> */}
                                    {/* <div className='productById-big-image'>

                                    </div> */}
                                    {/* {UsePhoto(product.photoPaths)} */}
                                    {/* {product.photoPaths && product.photoPaths.map((photoPath, index) => (
                                        <img key={index} src={photoPath} alt={`product-image-${index}`} />
                                    ))}
                                     */}
                                {/* </div> */}
                                <div className='productbyId-main-description'> 
                                <div className='productbyId-dop-info-section'>
                                <p className='productbyId-dop-info-title'>Опис товару</p>
                                {/* <p>{product.description}</p> */}
                                <p className='productbyId-dop-info-state'>{product.productState}</p>
                                {/* <p>{product.description}</p> */}
                                </div>
                                {/* Куртка зимова, двостороння, натуральна шкіра. Ця куртка поєднує в собі класичний стиль та вишуканість, створюючи неперевершений образ для будь-якого випадку. Виготовлена з високоякісної шкіри, вона буде вас радувати довгі роки.
    У нас є розміри для кожного: від XS до XXXL, щоб кожен клієнт міг знайти свій ідеальний фіт. Ця куртка - втілення стилю та комфорту, і вона чекає саме на вас. Підкресліть свій неповторний стиль та відчуйте якість, яка залишить вас захопленими. Оберіть вінтажну елегантність з нашим магазином, і ваш гардероб отримає по-справжньому унікальну річ!" */}
                                 {product.description}
                                </div>
                                <hr></hr>
                                <div className='product-id-help'>
                                    <Link className='remove-style-from-link product-id-help-text' to={`/userreport/${product.userId}`}>Допомога або скарга</Link>
                                </div>
                            </div>
                            <div className='productbyId-full-description-element2'>
                                <div className='productById-top-description'>
                                    <div className='productById-title'>
                                        {product.title}

                                    </div>
                                    <div className='productById-price'>
                                        
                                        <div className='productById-price-date'>
                                            <div className='productById-old-price'>
                                            {product.price}
                                            </div>
                                            <div className='productById-new-price'>

                                            </div>
                                            <div>
                                            {new Date(product.dateCreated).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div className='productById-new-checked'>
                                        
                                           <img src={like}></img> <p className='productById-new-checked1'>ви купуєте у </p><p><Link className='remove-style-from-link productById-new-checked2' to={`/userpage?type=user&userId=${product.userId}`}>перевіреного  продавця!</Link></p>
                                        </div>
                                    </div>
                                </div>
                                <div className='productbyId-form'> 
                                    <button onClick={() => setShowNumber(true)} className='productById-number'> {showNumber ? product.phoneNumber : "+00 00 00 00 00"} </button>
                                    
                                    <Link to={`/messenger/${product.userId}`}>
                                        <button className='productById-message'>
                                            Send Message
                                        </button>
                                    </Link>
                                    <Link to={`/products/bycategory/product/order/${product.id}`}>
                                        <button className='productById-buy'> 
                                    
                            
                                        Buy</button>
                                    </Link>
                                    <div className='under-price-banner'>
                                        {/* <img src={under_price}></img> */}
                                        <div>Робіть покупки з певненістю</div>
                                        <div>Гарантія повернення грошей Yom</div>
                                        <div>Дізнатись більше</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='productbyId-user-section'>
                            <div className='productbyId-user-buttons'>
                                <div className='productbyId-user-section-buttons'>
                                    <div className='productbyId-user-title'>
                                        Товари цього продавця
                                    </div>
                                    <button className='productbyId-user-follow' onClick={handleSubscribeClick}>
                                        Підписатись 
                                    </button>
                                </div>
                                <div className='seemore-button'>
                                
                                <Link className='remove-style-from-link seemore-button-text' to={`/userpage?type=user&userId=${product.userId}`}>Дивитись все</Link>
                                </div>
                            </div>
                            <Carousel responsive={responsive}>
                            {userProducts.map(item => (
                                    
                                        
                                        <div className='productbyId-user-products-section'key={item.id}>
                                        <div className='productbyId-user-products'>
                                                <div className='productbyId-user-product-photo'>
                                                {item.photos.map((url, index) => (
                                                        <img key={index} src={url} alt={`image-${index}`} />
                                                    ))}
                                                   {/* <img src={item.photos}> </img> */}
                                                </div>
                                                <div className='productbyId-user-product-descriptiom'>
                                                    
                                                    <Link className='remove-style-from-link' key={item.id} to={`/products/bycategory/product/${item.id}`}onClick={(e) =>{e.preventDefault(); window.location.href = `/products/bycategory/product/${item.id}`;}}>
                                                    
                                                     <p className='productbyId-title-for-all'>{item.title}</p>
                                                    </Link>
                                                </div>
                                            </div>
                                            </div>
                                    
                                ))}
                            </Carousel>
                            {/* <div className='productbyId-user-products-section'>
                                <div className='productbyId-user-products'>
                                    <div className='productbyId-user-product-photo'>

                                    </div>
                                    <div className='productbyId-user-product-descriptiom'>

                                    </div>
                                </div>
                            </div>
                            <div className='productbyId-user-products-section'>
                                <div className='productbyId-user-products'>
                                    <div className='productbyId-user-product-photo'>

                                    </div>
                                    <div className='productbyId-user-product-descriptiom'>

                                    </div>
                                </div>
                            </div> */}
                            
                        </div>
                        {viewed && viewed.length > 0 && (
                            <div className='productbyId-lastseen-section'>
                                <div className='productbyId-lastseen-title'>
                                    Ви переглядали
                                </div>
                                <Carousel responsive={responsive}>
                                    {viewed.map(product => (
                                        <div className='productbyId-lastseen-products-section' key={product.adId}>
                                            <div className='productbyId-lastseen-products'>
                                                <div className='productbyId-lastseen-product-photo'>
                                                    <img src={product.photoPaths} alt={product.title} />
                                                </div>
                                                <div className='productbyId-lastseen-product-descriptiom'>
                                                    <Link className='remove-style-from-link' key={product.adId} to={`/products/bycategory/product/${product.adId}`}>
                                                        <p className='productbyId-title-for-all'>{product.title}</p>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                        )}
                                                
                        <div className='productbyId-favorite-section'>
                            <div className='productbyId-favorite-title'>
                            Топ-оголошення в категорії “{category?.title}”
                            </div>
                            <Carousel responsive={responsive}>
                                {popular.map(item => (
                                        
                                            
                                        // <div className='productbyId-user-products-section'>
                                        // <div className='productbyId-user-products'>
                                        //         <div className='productbyId-user-product-photo'>

                                        //         </div>
                                        //         <div className='productbyId-user-product-descriptiom'>
                                                    
                                        //             <Link key={item.id} to={`/products/bycategory/product/${item.id}`}>
                                        //             {item.title}
                                        //             </Link>
                                        //         </div>
                                        //     </div>
                                        //     </div>
                                        <div className='productbyId-favorite-products-section' key={item.adId}>
                                            <div className='productbyId-favorite-products'>
                                                <div className='productbyId-favorite-product-photo'>
                                                    <img src={item.pathToPhotos}></img>
                                                </div>
                                                <div className='productbyId-favorite-product-descriptiom'>
                                                    <Link className='remove-style-from-link' key={item.adId} to={`/products/bycategory/product/${item.adId}`}>
                                                    <p className='productbyId-title-for-all'>{item.title}</p>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    
                                ))}
                            </Carousel>
                            {/* <div className='productbyId-favorite-products-section'>
                                <div className='productbyId-favorite-products'>
                                    <div className='productbyId-favorite-product-photo'>

                                    </div>
                                    <div className='productbyId-favorite-product-descriptiom'>

                                    </div>
                                </div>
                            </div>
                            <div className='productbyId-favorite-products-section'>
                                <div className='productbyId-favorite-products'>
                                    <div className='productbyId-favorite-product-photo'>

                                    </div>
                                    <div className='productbyId-favorite-product-descriptiom'>

                                    </div>
                                </div>
                            </div>
                            <div className='productbyId-favorite-products-section'>
                                <div className='productbyId-favorite-products'>
                                    <div className='productbyId-favorite-product-photo'>

                                    </div>
                                    <div className='productbyId-favorite-product-descriptiom'>

                                    </div>
                                </div>
                            </div>
                            <div className='productbyId-favorite-products-section'>
                                <div className='productbyId-favorite-products'>
                                    <div className='productbyId-favorite-product-photo'>

                                    </div>
                                    <div className='productbyId-favorite-product-descriptiom'>

                                    </div>
                                </div>
                            </div> */}
                            
                        </div>
                    </section>
                </div>
            </main>
            );
        }
        
export default ProductPage;
