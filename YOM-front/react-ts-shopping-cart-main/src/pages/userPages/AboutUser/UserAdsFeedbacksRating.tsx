
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../../../assets/css/style.css"
import logo from '../../../assets/images/userrating-svg.svg'
import users_logo from '../../../assets/images/userratingimage.svg'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import RatingProgressBar from '../../../components/layout/RatingProgressBar';
import next from '../../../assets/images/pagination_next.svg'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'react-responsive-carousel-nugget/lib/styles/carousel.min.css';
import axios from 'axios'; // Import Axios
interface UserReview {
  id: number;
  rating: number;
  senderUserName: string;
  senderAvatarPath: string;
  reviewText: string;
  receiverId: string;
  senderId: string;
  photos: string[];
  dateCreate: Date;
  adId: number;
  adTitle: string;
}
interface AdData {
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
interface AdSold {
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
  photoPaths: string;
  userId: string;
}

interface UserAdsFeedbacksRatingProps {
  reviews?: UserReview[];
  goodreviews?: UserReview[];
  middlereviews?: UserReview[];
  badreviews?: UserReview[];
}

interface UserReviewParams {
  userId: string;
  pageNumber?: number;  // This makes the parameter optional.
  gridSortDirection?: 'asc' | 'desc';  // TypeScript union type to limit values to 'asc' or 'desc'.
}
interface UserAdsFeedbacksRatingState {
  ads: AdData[];
  soldProducts: AdSold[];
  isLoading: boolean;
  location: string;
  minPrice: number;
  maxPrice: number;
  adType: string;
  condition: string;
  purchaseConditions: string[];
  pageNumber: number;
  totalPages: number;
  prevSearch: string; // Add this line
  activeTab: number;
  nestedActiveTab: number;
  average: number;
  countOfFive: number;
  countOfFour: number;
  countOfThree: number;
  countOfTwo: number;
  countOfOne: number;
  sortField: string;
  userName: string;
  avatarPath: string;
  reviews: UserReview[];
  goodreviews: UserReview[];
  middlereviews: UserReview[];
  badreviews: UserReview[];
  userId: string;
  numberOfElements: number;
}

export class UserAdsFeedbacksRating extends Component<
  UserAdsFeedbacksRatingProps,
  UserAdsFeedbacksRatingState
> {
  constructor(props: UserAdsFeedbacksRatingProps) {
    super(props);
    this.state = {
      ads: [],
      soldProducts: [],
      isLoading: true,
      location: '',
      minPrice: 0,
      maxPrice: 0,
      adType: '',
      condition: '',
      purchaseConditions: [],
      pageNumber: 1,
      totalPages: 1,
      sortField: '',
      prevSearch: '',
      activeTab: 0,
      nestedActiveTab: 0,
      average: 0,
      countOfFive: 0,
      countOfFour: 0,
      countOfThree: 0,
      countOfTwo: 0,
      countOfOne: 0,
      userName: '',
      avatarPath: '',
      reviews: [],
      goodreviews: [],
      middlereviews: [],
      badreviews: [],
      userId: '',
      numberOfElements: 0
    };
  }

  fetchUserReviews = async (params: UserReviewParams) => {
    try {
      const response = await axios.get('https://localhost:7014/api/UserReview/AllUserReview', {
        params: params
      });

      if (response.status === 200) {
        const userReview: UserReview[] = response.data;
        console.log('====================================');
        console.log(response.data);
        console.log('====================================');
        this.setState({ reviews: response.data });
        const goodReviews = userReview.filter(review => review.rating === 5);
        const middleReviews = userReview.filter(review => review.rating === 3);
        const badReviews = userReview.filter(review => review.rating < 3);
        this.setState({ goodreviews: goodReviews });
        this.setState({ middlereviews: middleReviews });
        this.setState({ badreviews: badReviews });
        console.log('====================================');
        console.log(this.state.reviews);
        console.log('====================================');
      } else {
        console.error("Server responded with a non-OK status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user reviews:", error);
    }
  };
  fetchUserRatings = async (userId: string) => {
    try {
      const response = await axios.get(`https://localhost:7014/api/UserReview/AllUserRatings`, {
        params: {
          userId: userId
        }
      });
      console.log('====================================');
      console.log('====================================');
      console.log(response.data.average);
      console.log('====================================');
      this.setState({ average: response.data.average })
      this.setState({ countOfFive: response.data.countOfFive })
      this.setState({ countOfFour: response.data.countOfFour })
      this.setState({ countOfThree: response.data.countOfThree })
      this.setState({ countOfTwo: response.data.countOfTwo })
      this.setState({ countOfOne: response.data.countOfOne })
      console.log(response.data.countOfOne);
      console.log('====================================');
    } catch (error) {
      console.error("Error fetching user ratings:", error);
    }
  };
  fetchUserData = async (userId: string) => {
    try {
      const response = await axios.get(`https://localhost:7014/api/User/ById/${userId}`);
      console.log('====================================');
      this.setState({ userName: response.data.userName });
      this.setState({ avatarPath: response.data.avatarPath });
      console.log('====================================');
      console.log(this.state.userName);
      console.log('====================================');
      console.log('====================================');
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  };
  fetchSoldProducts = async (userId: string) => {
    try {
      const response = await axios.get(`https://localhost:7014/api/Purchase/AllUserSales?userId=${userId}`);
      console.log('====================================');
      console.log(response.data);
      console.log('====================================');
      this.setState({ soldProducts: response.data });
    } catch (error) {
      console.error("Error fetching sold products:", error);
    }
  };
  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
    // const { id } = useParams<{ id: string }>();
    // const userId = Number(id);
    // const userId = sessionStorage.getItem('userId');
    if (userId)
      this.setState({ userId: userId });
    if (!userId) {
      console.error("UserId not found ");
      return;
    }

    this.fetchUserRatings(userId as string);
    this.fetchSoldProducts(userId as string);
    this.fetchUserData(userId as string);
    this.fetchUserReviews({
      userId: userId as string,
      pageNumber: 1,
      gridSortDirection: 'asc'
    }).then(data => {

      console.log("User Reviews:", data);

    });
    this.applyFilters();
  }


  handleNestedTabClick = (index: number) => {
    this.setState({ nestedActiveTab: index });
  };
  handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ minPrice: Number(e.target.value) }, () => {
      console.log(this.state.minPrice);
    });
    console.log('====================================');
    console.log(this.state.minPrice);
    console.log('====================================');
  };

  handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ maxPrice: Number(e.target.value) }, () => {
      console.log(this.state.maxPrice);
    });
    console.log('====================================');
    console.log(this.state.maxPrice);
    console.log('====================================');
  };


  handleConditionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ condition: e.target.value }, () => {
      console.log(this.state.condition);  // This will show the new value
    });
  };

  handlePurchaseConditionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ adType: e.target.value }, () => {
      console.log(this.state.adType);  // This will show the new value
    });
  };

  handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ sortField: e.target.value }, () => {
      console.log(this.state.sortField);  // This will show the new value
    });
  };
  componentDidUpdate(prevProps: any, prevState: UserAdsFeedbacksRatingState) {
    // Check for changes in window.location.search
    if (this.state.prevSearch !== window.location.search) {
      this.applyFilters();
    }

    // Check for changes in specific parts of the state
    if (
      prevState.location !== this.state.location ||
      prevState.sortField !== this.state.sortField ||
      prevState.minPrice !== this.state.minPrice ||
      prevState.maxPrice !== this.state.maxPrice ||
      prevState.condition !== this.state.condition ||
      prevState.adType !== this.state.adType
    ) {
      this.applyFilters();
    }
  }
  applyFilters = async () => {

    const location = this.state.location;
    const minPrice = this.state.minPrice;
    const maxPrice = this.state.maxPrice;
    const condition = this.state.condition;
    const adtype = this.state.adType;
    const userId = this.state.userId;
    const Pagenumber = this.state.pageNumber;
    const params = new URLSearchParams(window.location.search);
    const sortField = this.state.sortField;
    // const categoryId = params.get('categoryId');
    console.log('====================================');
    console.log(sortField);
    console.log('====================================');

    // const subCategoryId = params.get('subCategoryId');
    // const pageNumber = params.get('PageNumber') || '1'; // Default to page 1 if not specified

    let endpoint = `https://localhost:7014/api/Ad/AllAd/ByQuery?`;

    let sortDir = 'asc';
    let i = 0;
    //https://localhost:7014/api/Ad/AllAd/ByQuery?Sort.Dir=asc&Sort.Field=Price&Filter.Filters[0].Field=CategoryId&Filter.Filters[0].Operator=eq&Filter.Filters[0].Value=1


    // if (categoryId) {

    //     endpoint+=`Filter.Filters[${i}].Field=CategoryId&Filter.Filters[${i}].Operator=eq&Filter.Filters[${i}].Value=${categoryId}`;

    //   i++;
    // }
    // if (subCategoryId) {
    //     endpoint+=`&Filter.Filters[${i}].Field=SubCategoryId&Filter.Filters[${i}].Operator=eq&Filter.Filters[${i}].Value=${subCategoryId}`;
    //     i++;
    // }


    console.log('====================================');
    console.log(minPrice);
    console.log('====================================');
    // price range filters
    if (minPrice != 0) {

      endpoint += `&Filter.Filters[${i}].Field=Price&Filter.Filters[${i}].Operator=gte&Filter.Filters[${i}].Value=${minPrice}`;
      i++;
    }
    console.log('====================================');
    console.log(maxPrice);
    console.log('====================================');
    if (maxPrice != 0) {

      endpoint += `&Filter.Filters[${i}].Field=Price&Filter.Filters[${i}].Operator=lte&Filter.Filters[${i}].Value=${maxPrice}`;
      i++;
    }

    // condition filter
    if (condition) {

      endpoint += `&Filter.Filters[${i}].Field=ProductState&Filter.Filters[${i}].Operator=eq&Filter.Filters[${i}].Value=${condition}`;
      i++;
    }

    // purchase conditions filter
    if (adtype) {
      endpoint += `&Filter.Filters[${i}].Field=AdType&Filter.Filters[${i}].Operator=eq&Filter.Filters[${i}].Value=${adtype}`;
      i++;
    }

    // If there are multiple filters, we use "or" logic, else retain the default "and" logic

    if (sortField) {
      if (sortField === "price") {
        endpoint += `&Sort.Dir=${sortDir}&Sort.Field=Price`;
      } else if (sortField === "date") {
        // You need to provide the appropriate field name from your API for date
        endpoint += `&Sort.Dir=${sortDir}&Sort.Field=DateCreated`;
      } else if (sortField === "popularity") {
        // You need to provide the appropriate field name from your API for popularity
        endpoint += `&Sort.Dir=${sortDir}&Sort.Field=AdPopularity`;
      }
    }



    endpoint += `&Filter.Filters[${i}].Field=AdState&Filter.Filters[${i}].Operator=eq&Filter.Filters[${i}].Value=0&Filter.Filters[${i + 1}].Field=userId&Filter.Filters[${i + 1}].Operator=eq&Filter.Filters[${i + 1}].Value=${userId}&pageSize=5&PageNumber=${Pagenumber}`;
    try {
      const response = await axios.get(endpoint);
      i = 0;
      console.log('====================================');
      console.log(endpoint);
      console.log('====================================');

      const data: AdData[] = response.data;

      this.setState({ numberOfElements: data.length });
      console.log('====================================');
      console.log(data);
      console.log('====================================');

      this.setState({ ads: data, isLoading: false });

      console.log('====================================');
      console.log(this.state.ads);
      console.log('====================================');

      this.setState({ prevSearch: window.location.search });

      // After successfully fetching ads, log the popularity of the category
      // if (categoryId) {
      //   await this.logCategoryPopularity(categoryId);
      // }

    } catch (error) {
      console.error('Failed to fetch data:', error);
      this.setState({ isLoading: false });
    }

  };

  setPage = (pageNum: number) => {
    this.setState({ pageNumber: pageNum }, () => {
      this.applyFilters(); // Refetch the data with the new page number
    });
  };

  async logCategoryPopularity(categoryId: string) {
    try {
      const response = await axios.post('https://localhost:7014/api/FavoriteCategory', {
        id: categoryId,
        category: categoryId,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to log category popularity');
      }
    } catch (error) {
      console.error(error);
    }
  }
  handlePurchaseConditionsToggle = (value: string) => {
    const { purchaseConditions } = this.state;
    const index = purchaseConditions.indexOf(value);

    if (index > -1) {
      purchaseConditions.splice(index, 1);
    } else {
      purchaseConditions.push(value);
    }

    this.setState({ purchaseConditions });
  };

  handleTabClick = (index: number) => {
    this.setState({ activeTab: index });
  };

  render() {

    const { ads, isLoading, pageNumber, totalPages, minPrice, maxPrice, adType, condition, purchaseConditions, activeTab } = this.state;
    const responsive = {
      superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 4
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
    const { reviews, goodreviews, middlereviews, badreviews, soldProducts, numberOfElements } = this.state;
    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <main>

        <div className='UserAdsFeedbacksRatingPage'>
          <section>
            <div className='UserAdsFeedbacksRatingPage-content'>
              <div className='UserAdsFeedbacksRatingPage-userdata'>
                <div className='UserAdsFeedbacksRatingPage-userdata1'>
                  <div className='UserAdsFeedbacksRatingPage-userimage'>
                    <img src={this.state.avatarPath} alt="User Avatar" />
                  </div>
                  <div className='UserAdsFeedbacksRatingPage-username'>
                    {this.state.userName}
                  </div>
                  <div className='UserAdsFeedbacksRatingPage-userrate'>
                    {this.state.average}/5
                  </div>
                  <div>
                    <p></p>
                  </div>
                </div>
                <div>
                  <button className='UserAdsFeedbacksRatingPage-follow'>Підписатися</button>
                </div>
              </div>
              {/* Tab Headers */}

              <div className="myadstop-bar">

                <div className='myads-tabs-user'>
                  {['Оголошення', 'Відгуки', 'Про Продавця'].map((tabName, index) => (
                    <div
                      key={index}
                      className={`myads-tab-user ${activeTab === index ? 'active' : ''}`}
                      onClick={() => this.handleTabClick(index)}
                    >
                      {tabName}
                    </div>
                  ))}

                </div>

              </div>
              <div className={`myads-tab-panel-user ${activeTab === 0 ? 'active' : ''}`}>
                <div className='sort-elment-pagination'>


                  <div className='sort-elment'>
                    <select id="sort" onChange={this.handleSortChange}>
                      <option value="">Оберіть Сортування </option>
                      <option value="price">Сортування за : Price</option>
                      <option value="date">Сортування за : Date</option>
                      <option value="popularity">Сортування за : Popularity</option>
                    </select>
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
                        onClick={() => this.setPage(page)}
                        className={pageNumber === page ? 'active-page' : ''}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => this.setPage(pageNumber + 1)}
                      disabled={numberOfElements < 5}
                      className='pagination-next-btn'
                    >
                      <img src={next}></img>
                    </button>
                  </div>

                </div>
                <div className='user-tab-content'>

                  <div className='UserAdsFeedbacksRating-form'>

                    {/* <div className='UserAdsFeedbacksRating-location'>
                          Місцезнаходження:
                        </div>
                        <select value={location} onChange={this.handleLocationChange} className='UserAdsFeedbacksRating-location-selection'>
                            <option value="">Вся Україна</option>
                            
                        </select> */}


                    <div className='category-filter'>
                      <label>Категорії:</label>
                      {/* Assuming you will add category options dynamically */}
                    </div>


                    <div className='UserAdsFeedbacksRating-price'>
                      Ціна, грн:
                    </div>
                    <div className='UserAdsFeedbacksRating-price-inputs'>
                      <input className='UserAdsFeedbacksRating-price-input' type='number' value={minPrice ? minPrice.toString() : ''} placeholder='125' onChange={this.handleMinPriceChange} />

                      <input className='UserAdsFeedbacksRating-price-input' type='number' value={maxPrice} placeholder='20 000' onChange={this.handleMaxPriceChange} />
                    </div>

                    {/* <div className='condition-filter'> */}
                    <div className='UserAdsFeedbacksRating-state'>
                      Стан:
                    </div>
                    <div className='UserAdsFeedbacksRating-state-inputs'>
                      <input className='UserAdsFeedbacksRating-state-input' type="radio" value="Новий" checked={condition === "Новий"} onChange={this.handleConditionChange} /> Новий
                      <input className='UserAdsFeedbacksRating-state-input' type="radio" value="Вживаний" checked={condition === "Вживаний"} onChange={this.handleConditionChange} /> Вживаний
                      <input className='UserAdsFeedbacksRating-state-input' type="radio" value="Відмінний" checked={condition === "Відмінний"} onChange={this.handleConditionChange} /> Відмінний
                    </div>
                    {/* </div> */}

                    {/* <div className='purchase-condition-filter'> */}
                    <div className='UserAdsFeedbacksRating-condition'>
                      Умови покупки:
                    </div>
                    <div className='UserAdsFeedbacksRating-condition-inputs'>
                      <input className='UserAdsFeedbacksRating-condition-input' type="checkbox" value="0" checked={adType === "Free"} onChange={this.handlePurchaseConditionsChange} /> Безкоштовно
                      <input className='UserAdsFeedbacksRating-condition-input' type="checkbox" value="1" checked={adType === "Sale"} onChange={this.handlePurchaseConditionsChange} /> Торг
                      <input className='UserAdsFeedbacksRating-condition-input' type="checkbox" value="2" checked={adType === "Exchange"} onChange={this.handlePurchaseConditionsChange} /> Обмін
                    </div>





                    {/* <button className='UserAdsFeedbacksRating-subscribe'>💙 Підписатися на запит</button> */}
                  </div>

                  <div className='UserAdsFeedbacksRating-ads-section'>
                    {/* Ad listings */}
                    {ads.map((ad) => (

                      <div className='UserAdsFeedbacksRating-ads-blocks'>
                        <div className='UserAdsFeedbacksRating-ads-photo'>
                          {ad?.photos && ad.photos.length > 0 && (
                            <div className='order-image'>
                              <img src={ad.photos[0]} alt="First Image" />
                            </div>
                          )}
                        </div>
                        <div className='UserAdsFeedbacksRating-ads-description'>

                        </div>

                        <Link className='remove-style-from-link' to={`/products/bycategory/product/${ad.id}`}>

                          <h3 className='productsByTypes-ads-description-title'>{ad.title}</h3>
                        </Link>
                        <p className='productsByTypes-ads-description-price'>{ad.price}</p>


                      </div>

                    ))}



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
                      onClick={() => this.setPage(page)}
                      className={pageNumber === page ? 'active-page' : ''}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => this.setPage(pageNumber + 1)}
                    disabled={numberOfElements < 5}
                    className='pagination-next-btn'
                  >
                    <img src={next}></img>
                  </button>
                </div>
              </div>
            </div>
            {/* You can add similar blocks for Tab2, Tab3, Tab4... */}
            <div className={`myads-tab-panel-user-feedback ${activeTab === 1 ? 'active' : ''}`}>
              <div className={`myads-tab-panel-user-feedback ${activeTab === 1 ? 'active' : ''}`}>
                {/* Nested Tab Headers */}
                <div className="myads-tabs-user-feedback">
                  {['Усі (' + reviews.length + ')', 'Позитивні (' + goodreviews.length + ')', 'Нейтральні (' + middlereviews.length + ')', 'Негативні (' + badreviews.length + ')'].map((tabName, index) => (
                    <div
                      key={index}
                      className={`myads-tab-user-feedback ${this.state.nestedActiveTab === index ? 'active' : ''}`}
                      onClick={() => this.handleNestedTabClick(index)}
                    >
                      {tabName}
                    </div>
                  ))}
                </div>

                {/* Nested Tab Content Panels */}
                <div className={`myads-tab-panel-user-feedback ${this.state.nestedActiveTab === 0 ? 'active' : ''}`}>


                  <div className='feedback-section'>
                    {reviews.length === 0 ? (
                      <p>No reviews available.</p>
                    ) : (
                      <>
                        {reviews.map((review, index) => (

                          <div className='feedback-all' key={review.id}>
                            <div className='feedback-all-userphoto'>
                              <img src={users_logo}></img>
                            </div>
                            <div className='feedback-all-info-section'>
                              <div>
                                <div className='feedback-all-username'>
                                  {review.senderUserName}

                                </div>
                                <div className='feedback-all-info'>
                                  <div className='feedback-all-stars'>
                                    <p> {review.rating}/5 </p>
                                  </div>
                                  <div className='feedback-all-date'>
                                    <small>Reviewed on {new Date(review.dateCreate).toLocaleDateString()}</small>
                                  </div>
                                  <div className='feedback-all-title'>
                                    {review.adTitle}
                                  </div>
                                </div>
                                <div className='feedback-all-description'>
                                  <p>{review.reviewText}</p>
                                </div>
                              </div>
                              <div className='feedback-all-photos'>
                                {review.photos.slice(0, 5).map((photo, index) => (
                                  <div key={index} className='feedback-photo-block'>
                                    <img src={photo} alt={`Review Photo ${index + 1}`} />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                        ))}
                      </>
                    )}


                  </div>
                </div>
                <div className={`myads-tab-panel-user ${this.state.nestedActiveTab === 1 ? 'active' : ''}`}>
                  <div className='feedback-section'>
                    {goodreviews.length === 0 ? (
                      <p>No reviews available.</p>
                    ) : (
                      <>
                        {goodreviews.map((review, index) => (

                          <div className='feedback-all' key={review.id}>
                            <div className='feedback-all-userphoto'>
                              <img src={users_logo}></img>
                            </div>
                            <div className='feedback-all-info-section'>
                              <div>
                                <div className='feedback-all-username'>
                                  {review.senderUserName}

                                </div>
                                <div className='feedback-all-info'>
                                  <div className='feedback-all-stars'>
                                    <p> {review.rating}/5 </p>
                                  </div>
                                  <div className='feedback-all-date'>
                                    <small>Reviewed on {new Date(review.dateCreate).toLocaleDateString()}</small>
                                  </div>
                                  <div className='feedback-all-title'>
                                    {review.adTitle}
                                  </div>
                                </div>
                                <div className='feedback-all-description'>
                                  <p>{review.reviewText}</p>
                                </div>
                              </div>
                              <div className='feedback-all-photos'>
                                {review.photos.slice(0, 5).map((photo, index) => (
                                  <div key={index} className='feedback-photo-block'>
                                    <img src={photo} alt={`Review Photo ${index + 1}`} />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                        ))}
                      </>
                    )}
                  </div>
                </div>
                <div className={`myads-tab-panel-user ${this.state.nestedActiveTab === 2 ? 'active' : ''}`}>
                  <div className='feedback-section'>
                    {middlereviews.length === 0 ? (
                      <p>No reviews available.</p>
                    ) : (
                      <>
                        {middlereviews.map((review, index) => (

                          <div className='feedback-all' key={review.id}>
                            <div className='feedback-all-userphoto'>
                              <img src={users_logo}></img>
                            </div>
                            <div className='feedback-all-info-section'>
                              <div>
                                <div className='feedback-all-username'>
                                  {review.senderUserName}

                                </div>
                                <div className='feedback-all-info'>
                                  <div className='feedback-all-stars'>
                                    <p> {review.rating}/5 </p>
                                  </div>
                                  <div className='feedback-all-date'>
                                    <small>Reviewed on {new Date(review.dateCreate).toLocaleDateString()}</small>
                                  </div>
                                  <div className='feedback-all-title'>
                                    {review.adTitle}
                                  </div>
                                </div>
                                <div className='feedback-all-description'>
                                  <p>{review.reviewText}</p>
                                </div>
                              </div>
                              <div className='feedback-all-photos'>
                                {review.photos.slice(0, 5).map((photo, index) => (
                                  <div key={index} className='feedback-photo-block'>
                                    <img src={photo} alt={`Review Photo ${index + 1}`} />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                        ))}
                      </>
                    )}
                  </div>
                </div>
                <div className={`myads-tab-panel-user ${this.state.nestedActiveTab === 3 ? 'active' : ''}`}>
                  <div className='feedback-section'>
                    {badreviews.length === 0 ? (
                      <p>No reviews available.</p>
                    ) : (
                      <>
                        {badreviews.map((review, index) => (

                          <div className='feedback-all' key={review.id}>
                            <div className='feedback-all-userphoto'>
                              <img src={users_logo}></img>
                            </div>
                            <div className='feedback-all-info-section'>
                              <div>
                                <div className='feedback-all-username'>
                                  {review.senderUserName}

                                </div>
                                <div className='feedback-all-info'>
                                  <div className='feedback-all-stars'>
                                    <p> {review.rating}/5 </p>
                                  </div>
                                  <div className='feedback-all-date'>
                                    <small>Reviewed on {new Date(review.dateCreate).toLocaleDateString()}</small>
                                  </div>
                                  <div className='feedback-all-title'>
                                    {review.adTitle}
                                  </div>
                                </div>
                                <div className='feedback-all-description'>
                                  <p>{review.reviewText}</p>
                                </div>
                              </div>
                              <div className='feedback-all-photos'>
                                {review.photos.slice(0, 5).map((photo, index) => (
                                  <div key={index} className='feedback-photo-block'>
                                    <img src={photo} alt={`Review Photo ${index + 1}`} />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className={`myads-tab-panel-user ${activeTab === 2 ? 'active' : ''}`}>
              <div className='feedback-user-about'>
                <div className='feedback-user-fulldescription'>
                  <div className='feedback-user-fulldescription-el1'>
                    <div className='feedback-user-fulldescription-title'>
                      Про нас
                    </div>
                    <div className='feedback-user-fulldescription-text'>
                      Ласкаво запрошуємо до нашого унікального магазину одягу, де стиль поєднується з комфортом. Наш асортимент включає в себе найсучасніші та найтрендовіші моделі для кожної смакової уподобання та обстановки. Ми прагнемо до того, щоб кожна наша колекція вражала своєю якістю та неповторністю.

                      Незалежно від того, чи ви шукаєте стильний одяг на кождий день або елегантний вбір для особливої події - у нас є весь спектр варіантів. Поглибіться в світ трендів та дозвольте собі відкрити новий рівень комфорту та елегантності з нашим асортиментом. Бажаємо вам приємних покупок!
                    </div>
                  </div>
                  <div className='feedback-user-fulldescription-el2'>
                    <div className='feedback-user-fulldescription-rating'>
                      Рейтинг товара
                    </div>

                    <div className='feedback-user-fulldescription-rating-section'>
                      <RatingProgressBar rating={5} count={this.state.countOfFive} maxCount={10} />
                      <RatingProgressBar rating={4} count={this.state.countOfFour} maxCount={500} />
                      <RatingProgressBar rating={3} count={this.state.countOfThree} maxCount={500} />
                      <RatingProgressBar rating={2} count={this.state.countOfTwo} maxCount={500} />
                      <RatingProgressBar rating={1} count={this.state.countOfOne} maxCount={500} />
                    </div>
                  </div>
                </div>
                <div className='feedback-user-soldproducts'>
                  <div className='feedback-user-soldproducts-title'>
                    Проданий товар
                  </div>
                  <Carousel responsive={responsive}>

                    {/*                     
                    {soldProducts.length === 0 ? (
                        <p>No sold products available.</p>
                      ) : (
                        <> */}


                    {soldProducts.map((sold, index) => (
                      <div className='feedback-user-soldproducts-section'>
                        <div className='feedback-user-soldproduct' key={sold.id}>
                          <div className='feedback-user-soldproduct-image'>

                            <img src={sold.photoPaths}></img>
                          </div>
                          <div className='feedback-user-soldproduct-description'>
                            <div className='feedback-user-soldproduct-title'>
                              {sold.title}
                            </div>
                            <div className='feedback-user-soldproduct-price'>
                              {sold.price}
                            </div>
                          </div>

                        </div>
                      </div>
                    ))}


                    {/*                         
                        </>
                        )} */}



                  </Carousel>
                </div>
                <div className='feedback-user-statistic'>

                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }
}

export default UserAdsFeedbacksRating;