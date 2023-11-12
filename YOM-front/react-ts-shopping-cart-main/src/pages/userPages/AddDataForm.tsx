import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import CustomNavbar from '../../components/layout/CustomNavbar';
import '../../assets/css/style.css';
import data from '../../utilities/UkrainianCity.json'
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../utilities/TokenUtility';
import add from '../../assets/images/Frame 68.svg';
import bg_for_buttons from '../../assets/images/Ellipse 992.svg';
import add_small from '../../assets/images/Frame 68-small.svg';
import change from '../../assets/images/Group 1000004416.svg';
import del from '../../assets/images/Frame 116.svg';
interface HouseAd {
  title: string;
  description: string;
  condition: string;
  price: number;
  city: string;
  address: string;
  email: string;
  adtype: string;
  phone: number;
  categoryId: number;
  subCategoryId: number;
  
  categories: ICategory[];
  subcategories: ISubCategory[];
 
    BuildingsType: string;
    Furniture: string;
    Renovation: string;
    Heating: string;
    FloorSize: number;
    RoomCount: number;
    Floor: number;
    Square: number;
    HouseSquare: number;
    KitchenSquare: number;
    Realtor: string;
    
    
  
  photos: File[];
}

interface AutoAd {
  title: string;
  description: string;
  condition: string;
  price: number;
  city: string;
  address: string;
  email: string;
  adtype: string;
  phone: number;
  categoryId: number;
  subCategoryId: number;
  
  categories: ICategory[];
  subcategories: ISubCategory[];
  
    Model: string;
    Type: string;
    SaleCondition: string;
    Brand: string;
    Color: string;
    ReleaseDate: number;
    Mileage: number;
    FuelType: number;
    Gearbox: string;
    SeatCount: number;
    BodyType: string;
    IsCleared: boolean;
    CarFrom: string;
    TechnicalState: string;
    
  
  photos: File[];
}

interface ICategory {
  id: number;
  title: string;
}

interface ISubCategory {
  id: number;
  categoryId: number;
  title: string;
}

interface IAddDataFormProps {

}

interface IAddDataFormState {
  title: string;
  description: string;
  condition: string;
  price: number;
  city: string;
  address: string;
  email: string;
  adtype: string;
  phone: number;
  categoryId: number;
  subCategoryId: number;
  photos: File[];
  categories: ICategory[];
  subcategories: ISubCategory[];
}

const AddDataForm: React.FC<IAddDataFormProps> = () => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');
  const cities = data[0].regions[0].cities.map(city => city.name);
  // const [title, setTitle] = useState<string>('');
  // const [title, setTitle] = useState<string>('');

  // const [title, setTitle] = useState<string>('');
  // const [title, setTitle] = useState<string>('');
  // const [title, setTitle] = useState<string>('');
  // const [title, setTitle] = useState<string>('');
  // const [title, setTitle] = useState<string>('');
  // const [title, setTitle] = useState<string>('');
  const [state, setState] = useState<IAddDataFormState>({
    title: '',
    description: '',
    price: 0,
    condition: '',
    city: '',
    address: '',
    email: '',
    adtype: '',
    phone: 0,
    categoryId: 0,
    subCategoryId: 0,
    photos: [],
    categories: [], // Initialize as an empty array
    subcategories: [], // Initialize as an empty array
    
  });
  const [houseAd, setHouseAd] = useState<HouseAd>({
    title: '',
    description: '',
    price: 0,
    condition: '',
    city: '',
    address: '',
    email: '',
    adtype: '',
    phone: 0,
    categoryId: 0,
    subCategoryId: 0,
    photos: [],
    categories: [], // Initialize as an empty array
    subcategories: [], // Initialize as an empty array
    BuildingsType: '',
    Furniture: '',
    Renovation: '',
    Heating: '',
    FloorSize: 0,
    RoomCount: 0,
    Floor: 0,
    Square: 0,
    HouseSquare: 0,
    KitchenSquare: 0,
    Realtor: '',
     
     
    
    
  });

  const [autoAd, setAutoAd] = useState<AutoAd>({
    title: '',
    description: '',
    price: 0,
    condition: '',
    city: '',
    address: '',
    email: '',
    adtype: '',
    phone: 0,
    categoryId: 0,
    subCategoryId: 0,
    photos: [],
    categories: [], // Initialize as an empty array
    subcategories: [], // Initialize as an empty array    
    Model: '',
    Type: '',
    SaleCondition: '',
    Brand: '',
    Color: '',
    ReleaseDate: 0,
    Mileage: 0,
    FuelType: 0,
    Gearbox: '',
    SeatCount: 0,
    BodyType: '',
    IsCleared: false,
    CarFrom: '',
    TechnicalState: '',
    
    
    
  });

  const handleHouseInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setHouseAd((prevHouseAd) => ({
      ...prevHouseAd,
      [name]: value,
    }));
  };

  const handleAutoInputChange = (
    event: ChangeEvent<HTMLInputElement  | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setAutoAd((prevAutoAd) => ({
      ...prevAutoAd,
      [name]: value,
    }));
  };
  const checkAuthenticationStatus = () => {
    const isAuthenticated = !!getToken();
    if (!isAuthenticated) {
      navigate('/login');
    }
  };
  useEffect(() => {
    // Check if the user is authenticated or registered when the component mounts
    checkAuthenticationStatus();

    // Fetch categories when the component mounts
    fetchCategories();
  }, []);



  const fetchCategories = () => {
    // Fetch categories from the API
    axios.get('https://localhost:7014/api/Category/AllCategories')
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          categories: response.data,
        }));

      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  };

  const fetchSubcategories = (categoryId: number) => {
    // Fetch subcategories based on the selected category

    axios.get(`https://localhost:7014/api/SubCategory/AllSubCategories/${categoryId}`)
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          subcategories: response.data,
        }));
      })
      .catch((error) => {
        console.error('Error fetching subcategories:', error);
      });
  };


  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const categoryId = parseInt(event.target.value);
    setState((prevState) => ({
      ...prevState,
      categoryId,
      // subCategoryId: 0, // Reset the selected subcategory when the category changes
    }));
    if (categoryId) {
      fetchSubcategories(categoryId);
    }
  };

  const handleSubcategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const subCategoryId = parseInt(event.target.value);
    setState((prevState) => ({
      ...prevState,
      subCategoryId,
    }));
  };
  const handleCityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;

    if (files && files.length > 0) {
      // Create a copy of the current photos array
      const updatedphotos = [...state.photos];
      const file = files[0]; // Only consider the first selected file

      // Check if the name matches the expected name (photo1, photo2, etc.)
      const match = name.match(/^photo(\d+)$/);
      if (match) {
        const index = parseInt(match[1], 10) - 1; // Get the index (0-based)

        if (index === 0) {
          // Replace the first photo with the new one
          updatedphotos[0] = file;
        } else {
          // For other photos, add or replace them as needed
          if (updatedphotos.length <= index) {
            // Add a new photo if the index is out of bounds
            updatedphotos.push(file);
          } else {
            // Replace the existing photo at the specified index
            updatedphotos[index] = file;
          }
        }

        // Update the state with the modified photos array
        setState((prevState) => ({
          ...prevState,
          photos: updatedphotos,
        }));
      }
    }
  };

  // Remove a selected file
  const removeFile = (index: number) => {
    setState((prevState) => {
      const updatedphotos = [...prevState.photos];
      updatedphotos.splice(index, 1);
      return {
        ...prevState,
        photos: updatedphotos,
      };
    });
  };
  const createHouseAd = () => {
    const {
      title,
      description,
      condition,
      price,
      city,
      address,
      email,
      adtype,
      phone,
      categoryId,
      subCategoryId,
      photos,
      
    } = state;
    const {
      
      BuildingsType,
      Furniture,
      Renovation,
      Heating,
      FloorSize,
      RoomCount,
      Floor,
      Square,
      HouseSquare,
      KitchenSquare,
      Realtor,
    } = houseAd;
    
      const formData_House = new FormData();
      formData_House.append('Title', title);
    formData_House.append('Description', description);
    // formData_House.append('Price', price);
    
    formData_House.append('Address', address);
    formData_House.append('Email', email);
    formData_House.append('PhoneNumber', phone.toString());
    formData_House.append('Currency', 'UAH');
    formData_House.append('AdType', adtype);
    formData_House.append('ProductState', condition); // Correctly append condition


    formData_House.append('CategoryId', categoryId.toString());
    // formData_House.append('CategoryId', categoryId);
    formData_House.append('SubCategoryId', subCategoryId.toString());
    
    if (userId)
      formData_House.append('userId', userId.toString());


    
      formData_House.append('House.BuildingsType', houseAd.BuildingsType);
      formData_House.append('House.Furniture', houseAd.Furniture);
      formData_House.append('House.Renovation', houseAd.Renovation);
      formData_House.append('House.Heating', houseAd.Heating);
      formData_House.append('House.FloorSize', houseAd.FloorSize.toString());
      formData_House.append('House.RoomCount', houseAd.RoomCount.toString());
      formData_House.append('House.Floor', houseAd.Floor.toString());
      formData_House.append('House.Square', houseAd.Square.toString());
      formData_House.append('House.HouseSquare', houseAd.HouseSquare.toString());
      formData_House.append('House.KitchenSquare', houseAd.KitchenSquare.toString());
      formData_House.append('House.Realtor', houseAd.Realtor);
      formData_House.append('House.Price', price.toString());
      formData_House.append('House.City', city);
      photos.forEach((photo, index) => {
        formData_House.append(`photos[${index}]`, photo);
      });
      for (let [key, value] of formData_House.entries()) {
        console.log(key, value);
    }
      axios
      .post('https://localhost:7014/api/Ad/Create/House', formData_House,{
        headers: {
          'accept': '*/*',
          'Content-Type': 'multipart/form-data' // This is optional, as Axios will set it for you when using FormData.
        },
      })
      .then((response) => {

        alert("Все було створенно успішно!");
        setState({
          title: '',
          description: '',
          condition: '', // Reset the condition field
          price: 0,
          city: '',
          address: '',
          email: '',
          adtype: '',
          phone: 0,
          categoryId: 0,
          subCategoryId: 0,
          photos: [], // Reset the array
          categories: [],
          subcategories: []
        });
        setHouseAd({
          title: '',
          description: '',
          price: 0,
          condition: '',
          city: '',
          address: '',
          email: '',
          adtype: '',
          phone: 0,
          categoryId: 0,
          subCategoryId: 0,
          photos: [],
          categories: [], // Initialize as an empty array
          subcategories: [], // Initialize as an empty array
          BuildingsType: '',
          Furniture: '',
          Renovation: '',
          Heating: '',
          FloorSize: 0,
          RoomCount: 0,
          Floor: 0,
          Square: 0,
          HouseSquare: 0,
          KitchenSquare: 0,
          Realtor: '',
        })
        navigate('/');
      })
      .catch((error) => {
        alert("Ви допустили помилку!");
        console.error('Error adding data:', error);
      });
      
    
  };
  
  // Define a function to send an Auto ad
  const createAutoAd = () => {
    const {
      title,
      description,
      condition,
      price,
      city,
      address,
      email,
      adtype,
      phone,
      categoryId,
      subCategoryId,
      photos,
    } = state;
    const {
      
      Model,
      Type,
      SaleCondition,
      Brand,
      Color,
      ReleaseDate,
      Mileage,
      FuelType,
      Gearbox,
      SeatCount,
      BodyType,
      IsCleared,
      CarFrom,
      TechnicalState,
    } = autoAd;
    
      const formData = new FormData();
      formData.append('Title', title);
    formData.append('Description', description);
    // formData.append('Price', price);
    formData.append('Auto.Price', price.toString());
    formData.append('City', city);
    formData.append('Address', address);
    formData.append('Email', email);
    formData.append('PhoneNumber', phone.toString());
    formData.append('Currency', 'UAH');
    formData.append('AdType', adtype);
    formData.append('ProductState', condition); // Correctly append condition


    formData.append('CategoryId', categoryId.toString());
    // formData.append('CategoryId', categoryId);
    formData.append('SubCategoryId', subCategoryId.toString());
    
    if (userId)
      formData.append('userId', userId.toString());


    // formData.append(`photos`, photos);
    photos.forEach((photo, index) => {
      formData.append(`photos`, photo);
    });
      
      formData.append('Auto.Model', autoAd.Model);
      formData.append('Auto.Type', autoAd.Type);
      formData.append('Auto.SaleCondition', autoAd.SaleCondition);
      formData.append('Auto.Brand', autoAd.Brand);
      formData.append('Auto.Brand', autoAd.Color);
      formData.append('Auto.ReleaseDate', autoAd.ReleaseDate.toString());
      formData.append('Auto.Mileage', autoAd.Mileage.toString());
      formData.append('Auto.FuelType', autoAd.FuelType.toString());
      formData.append('Auto.Gearbox', autoAd.Gearbox);
      formData.append('Auto.SeatCount', autoAd.SeatCount.toString());
      formData.append('Auto.BodyType', autoAd.BodyType);
      formData.append('Auto.IsCleared', autoAd.IsCleared.toString());
      formData.append('Auto.CarFrom', autoAd.CarFrom);
      formData.append('Auto.TechnicalState', autoAd.TechnicalState);
      
      
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }
      axios
      .post('https://localhost:7014/api/Ad/Create/Auto', formData,{
        headers: {
          'accept': '*/*',
          'Content-Type': 'multipart/form-data' // This is optional, as Axios will set it for you when using FormData.
        },
      })
      .then((response) => {

        alert("Все було створенно успішно!");
        setState({
          title: '',
          description: '',
          condition: '', // Reset the condition field
          price: 0,
          city: '',
          address: '',
          email: '',
          adtype: '',
          phone: 0,
          categoryId: 0,
          subCategoryId: 0,
          photos: [], // Reset the array
          categories: [],
          subcategories: []
        });
        setAutoAd({
        title: '',
        description: '',
        price: 0,
        condition: '',
        city: '',
        address: '',
        email: '',
        adtype: '',
        phone: 0,
        categoryId: 0,
        subCategoryId: 0,
        photos: [],
        categories: [], // Initialize as an empty array
        subcategories: [], // Initialize as an empty array    
        Model: '',
        Type: '',
        SaleCondition: '',
        Brand: '',
        Color: '',
        ReleaseDate: 0,
        Mileage: 0,
        FuelType: 0,
        Gearbox: '',
        SeatCount: 0,
        BodyType: '',
        IsCleared: false,
        CarFrom: '',
        TechnicalState: ''
        });
        navigate('/');
      })
      .catch((error) => {
        alert("Ви допустили помилку!");
        console.error('Error adding data:', error);
      });
     
     
  };

  const handleSubmit = (event: FormEvent) => {

    event.preventDefault();
    const {
      title,
      description,
      condition,
      price,
      city,
      address,
      email,
      adtype,
      phone,
      categoryId,
      subCategoryId,
      photos,
    } = state;

    // Create FormData to send files
    const formData = new FormData();

    formData.append('Title', title);
    formData.append('Description', description);
    // formData.append('Price', price);
    formData.append('Price', price.toString());
    formData.append('City', city);
    formData.append('Address', address);
    formData.append('Email', email);
    formData.append('PhoneNumber', phone.toString());
    formData.append('Currency', 'UAH');
    formData.append('Adtype', adtype);
    formData.append('ProductState', condition); // Correctly append condition


    formData.append('CategoryId', categoryId.toString());
    // formData.append('CategoryId', categoryId);
    formData.append('SubCategoryId', subCategoryId.toString());
    if (userId)
      formData.append('userId', userId.toString());


    // formData.append(`photos`, photos);
    photos.forEach((photo, index) => {
      formData.append(`photos`, photo);
    });
    console.log('====================================');
    console.log(photos);
    console.log('====================================');
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
  }
    axios
      .post('https://localhost:7014/api/Ad/Create', formData, {
        headers: {
          'accept': '*/*',
          'Content-Type': 'multipart/form-data' // This is optional, as Axios will set it for you when using FormData.
        },
      })
      .then((response) => {

        alert("Все було створенно успішно!");
        setState({
          title: '',
          description: '',
          condition: '', // Reset the condition field
          price: 0,
          city: '',
          address: '',
          email: '',
          adtype: '',
          phone: 0,
          categoryId: 0,
          subCategoryId: 0,
          photos: [], // Reset the array
          categories: [],
          subcategories: []
        });
        navigate('/');
      })
      .catch((error) => {
        alert("Ви допустили помилку!");
        console.error('Error adding data:', error);
      });
  };


  return (
    <main>
      <div className='createAdPage'>
        {/* <div className='myads-menu'>
          <CustomNavbar />
        </div> */}

        <section>
          <div>
            <div className='ad-title'>Почніть створювати оголошення</div>
            <form onSubmit={handleSubmit} className='create-ad-form'>
              <div>
                <input
                  type="text"
                  className='create-ad-title'
                  placeholder='Придумайте короткий заголовок для потенційних покупців'
                  name="title"
                  value={state.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className='create-ad-info'>
                <div className='create-ad-info-el'>
                  <div className='info-el-text'>
                    Введіть ключові фрази, такі як, бренд, модель або інші відомості про товар (Nike, Apple, Asus) у полі пошуку вище
                  </div>
                </div>
                <div className='create-ad-info-el'>
                  <div className='info-el-text'>
                    Поле для пошуку допоможе уникнути помилок при введенні назви вашого товару або бренду
                  </div>
                </div>
                <div className='create-ad-info-el'>
                  <div className='info-el-text'>
                    Після повного заповнення об’яви застосуйте попередній перегляд, а потім розмістіть ваш товар
                  </div>
                </div>
              </div>
              {/* Category dropdown */}
              <div>
                <div className='create-fields-title'>Категорія*</div>
                <select
                  name="categoryId"
                  className="create-catgory"
                  value={state.categoryId}
                  onChange={handleCategoryChange}
                >
                  <option value="">Виберіть категорію</option>
                  {state.categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subcategory dropdown */}
              {state.categoryId > 0 && (
                <div>
                  <div>Підкатегорія:</div>
                  <select
                    name="subCategoryId"
                    className="create-subcategory"
                    value={state.subCategoryId}
                    onChange={handleSubcategoryChange}
                  >
                    <option value="">Виберіть підкатегорію</option>
                    {state.subcategories.map((subcategory) => (
                      <option key={subcategory.id} value={subcategory.id}>
                        {subcategory.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <div>Фотографії*</div>
                <div className='create-photo-field'>
                  <div className='create-photo-fields'>

                    <div className='big-photo-create'>
                      <label htmlFor="photo1">
                        <input
                          type="file"
                          id="photo1"
                          name="photo1"
                          className='big-photo'

                          onChange={handleFileChange} // Use the file input change handler
                        />

                        {state.photos[0] ? (
                          <>
                            <img
                              src={state.photos[0] ? URL.createObjectURL(state.photos[0]) : 'placeholder.jpg'}
                              alt="Selected Photo 1"
                              className='selected-photo-big'
                            />
                            <div className='button-block-add-big'>
                              <button
                                type="button"
                                className="change-button"
                                onClick={() => document.getElementById('photo1')?.click()} // Trigger the file input
                              >

                                {/* <img src={change}></img> */}

                              </button>
                              <button
                                type="button"
                                className="delete-button"
                                onClick={() => removeFile(0)}
                              >
                                <img src={del}></img>

                              </button>
                            </div>
                          </>
                        ) : (
                          <div className='big-photo'>

                            <img src={add}></img>

                          </div>
                        )}


                      </label>
                    </div>
                    <div className='photo-rows'>


                      <div className='row'>
                        <div className="col">
                          <label htmlFor="photo2">
                            <input
                              type="file"
                              id="photo2"
                              name="photo2"
                              className='add-photo-els'
                              onChange={handleFileChange} // Use the file input change handler
                            />
                            {state.photos[1] ? (
                              <>
                                <img
                                  src={state.photos[1] ? URL.createObjectURL(state.photos[1]) : 'placeholder.jpg'}
                                  alt="Selected Photo 2"
                                  className='selected-photo'
                                />
                                <div className='button-block-add'>
                                  <button
                                    type="button"
                                    className="change-button"
                                    onClick={() => document.getElementById('photo2')?.click()} // Trigger the file input
                                  >
                                    {/* <img src={change}></img> */}
                                  </button>
                                  <button
                                    type="button"
                                    className="delete-button"
                                    onClick={() => removeFile(1)}
                                  >
                                    <img src={del}></img>
                                  </button>
                                </div>
                              </>
                            ) : (
                              <div className='add-photo-els'>
                                <img src={add}></img>

                              </div>
                            )}

                          </label>
                        </div>
                        <div className="col">
                          <label htmlFor="photo3">
                            <input
                              type="file"
                              id="photo3"
                              name="photo3"
                              className='add-photo-els'
                              onChange={handleFileChange} // Use the file input change handler
                            />
                            {state.photos[2] ? (
                              <>
                                <img
                                  src={state.photos[2] ? URL.createObjectURL(state.photos[2]) : 'placeholder.jpg'}
                                  alt="Selected Photo 3"
                                  className='selected-photo'
                                />
                                <div className='button-block-add'>
                                  <button
                                    type="button"
                                    className="change-button"
                                    onClick={() => document.getElementById('photo3')?.click()} // Trigger the file input
                                  >
                                    {/* <img src={change}></img> */}
                                  </button>
                                  <button
                                    type="button"
                                    className="delete-button"
                                    onClick={() => removeFile(2)}
                                  >
                                    <img src={del}></img>
                                  </button>
                                </div>
                              </>
                            ) : (
                              <div className='add-photo-els'>
                                <img src={add}></img>

                              </div>
                            )}

                          </label>
                        </div>
                        <div className="col">
                          <label htmlFor="photo4">
                            <input
                              type="file"
                              id="photo4"
                              name="photo4"
                              className='add-photo-els'
                              onChange={handleFileChange} // Use the file input change handler
                            />
                            {state.photos[3] ? (
                              <>
                                <img
                                  src={state.photos[3] ? URL.createObjectURL(state.photos[3]) : 'placeholder.jpg'}
                                  alt="Selected Photo 4"
                                  className='selected-photo'
                                />
                                <div className='button-block-add'>
                                  <button
                                    type="button"
                                    className="change-button"
                                    onClick={() => document.getElementById('photo4')?.click()} // Trigger the file input
                                  >
                                    {/* <img src={change}></img> */}
                                  </button>
                                  <button
                                    type="button"
                                    className="delete-button"
                                    onClick={() => removeFile(3)}
                                  >
                                    <img src={del}></img>
                                  </button>
                                </div>
                              </>
                            ) : (
                              <div className='add-photo-els'>
                                <img src={add}></img>

                              </div>
                            )}

                          </label>
                        </div>

                        <div className="col">
                          <label htmlFor="photo5">
                            <input
                              type="file"
                              id="photo5"
                              name="photo5"
                              className='add-photo-els'
                              onChange={handleFileChange} // Use the file input change handler
                            />
                            {state.photos[4] ? (
                              <>
                                <img
                                  src={state.photos[4] ? URL.createObjectURL(state.photos[4]) : 'placeholder.jpg'}
                                  alt="Selected Photo 5"
                                  className='selected-photo'
                                />
                                <div className='button-block-add'>
                                  <button
                                    type="button"
                                    className="change-button"
                                    onClick={() => document.getElementById('photo5')?.click()} // Trigger the file input
                                  >
                                    {/* <img src={change}></img> */}
                                  </button>
                                  <button
                                    type="button"
                                    className="delete-button"
                                    onClick={() => removeFile(4)}
                                  >
                                    <img src={del}></img>
                                  </button>
                                </div>
                              </>
                            ) : (
                              <div className='add-photo-els'>
                                <img src={add}></img>

                              </div>
                            )}

                          </label>
                        </div>
                      </div>
                      <div className='row'>
                        <div className="col">
                          <label htmlFor="photo6">
                            <input
                              type="file"
                              id="photo6"
                              name="photo6"
                              className='add-photo-els'
                              onChange={handleFileChange} // Use the file input change handler
                            />
                            {state.photos[5] ? (
                              <>
                                <img
                                  src={state.photos[5] ? URL.createObjectURL(state.photos[5]) : 'placeholder.jpg'}
                                  alt="Selected Photo 6"
                                  className='selected-photo'
                                />
                                <div className='button-block-add'>
                                  <button
                                    type="button"
                                    className="change-button"
                                    onClick={() => document.getElementById('photo6')?.click()} // Trigger the file input
                                  >
                                    {/* <img src={change}></img> */}
                                  </button>
                                  <button
                                    type="button"
                                    className="delete-button"
                                    onClick={() => removeFile(5)}
                                  >
                                    <img src={del}></img>
                                  </button>
                                </div>
                              </>
                            ) : (
                              <div className='add-photo-els'>
                                <img src={add}></img>

                              </div>
                            )}

                          </label>
                        </div>
                        <div className="col">

                          <label htmlFor="photo7">
                            <input
                              type="file"
                              id="photo7"
                              name="photo7"
                              className='add-photo-els'
                              onChange={handleFileChange} // Use the file input change handler
                            />
                            {state.photos[6] ? (
                              <>
                                <img
                                  src={state.photos[6] ? URL.createObjectURL(state.photos[6]) : 'placeholder.jpg'}
                                  alt="Selected Photo 7"
                                  className='selected-photo'
                                />
                                <div className='button-block-add'>
                                  <button
                                    type="button"
                                    className="change-button"
                                    onClick={() => document.getElementById('photo7')?.click()} // Trigger the file input
                                  >
                                    {/* <img src={change}></img> */}
                                  </button>
                                  <button
                                    type="button"
                                    className="delete-button"
                                    onClick={() => removeFile(6)}
                                  >
                                    <img src={del}></img>
                                  </button>
                                </div>
                              </>
                            ) : (
                              <div className='add-photo-els'>
                                <img src={add}></img>

                              </div>
                            )}

                          </label>
                        </div>
                        <div className="col">
                          <label htmlFor="photo8">
                            <input
                              type="file"
                              id="photo8"
                              name="photo8"
                              className='add-photo-els'
                              onChange={handleFileChange} // Use the file input change handler
                            />
                            {state.photos[7] ? (
                              <>
                                <img
                                  src={state.photos[7] ? URL.createObjectURL(state.photos[7]) : 'placeholder.jpg'}
                                  alt="Selected Photo 8"
                                  className='selected-photo'
                                />
                                <div className='button-block-add'>
                                  <button
                                    type="button"
                                    className="change-button"
                                    onClick={() => document.getElementById('photo8')?.click()} // Trigger the file input
                                  >
                                    {/* <img src={change}></img> */}
                                  </button>
                                  <button
                                    type="button"
                                    className="delete-button"
                                    onClick={() => removeFile(7)}
                                  >
                                    <img src={del}></img>
                                  </button>
                                </div>
                              </>
                            ) : (
                              <div className='add-photo-els'>
                                <img src={add}></img>

                              </div>
                            )}

                          </label>
                        </div>

                        <div className="col">
                          <label htmlFor="photo9">
                            <input
                              type="file"
                              id="photo9"
                              name="photo9"
                              className='add-photo-els'
                              onChange={handleFileChange} // Use the file input change handler
                            />
                            {state.photos[8] ? (
                              <>
                                <img
                                  src={state.photos[8] ? URL.createObjectURL(state.photos[8]) : 'placeholder.jpg'}
                                  alt="Selected Photo 9"
                                  className='selected-photo'
                                />
                                <div className='button-block-add'>
                                  <button
                                    type="button"
                                    className="change-button"
                                    onClick={() => document.getElementById('photo9')?.click()} // Trigger the file input
                                  >
                                    {/* <img src={change}></img> */}
                                  </button>
                                  <button
                                    type="button"
                                    className="delete-button"
                                    onClick={() => removeFile(8)}
                                  >
                                    <img src={del}></img>
                                  </button>
                                </div>
                              </>
                            ) : (
                              <div className='add-photo-els'>
                                <img src={add}></img>

                              </div>
                            )}

                          </label>

                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='photo-text'>
                    Зробіть до 20 простих фото
                    на телефон з різних ракурсів
                    у звичайній обстановці.Для
                    покупців важливіше не краса
                    фото, а реальний стан речей.</div>
                </div>
              </div>


              <div className='create-description'>
                <div className='create-description-block'>
                  <div>Опис*</div>
                  <input
                    type="text"
                    name="description"
                    className='create-ad-description'
                    value={state.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='description-text'>
                  Опишіть товар детально. Будьте
                  чесні та точні. Виділіть особливості
                  та переваги товару.Укажіть причину продажу,як і скільки ним користувались.


                </div>
              </div>
              
              {(state.categoryId)==4 ?(
                <div className='house-cols-section'>

                <div className='house-left-cols'>

                
                  <div>
                  <label htmlFor="buildingsType">Building Type:</label>
                  <input
                    type="text"
                    id="buildingsType"
                    name="BuildingsType"
                    className='house-inputs'
                    value={houseAd.BuildingsType}
                    onChange={handleHouseInputChange}
                  />
                  </div>
          
                {/* Furniture */}
                <div>
                  <label htmlFor="furniture">Furniture:</label>
                  <input
                    type="text"
                    id="furniture"
                    name="Furniture"
                    className='house-inputs'
                    value={houseAd.Furniture}
                    onChange={handleHouseInputChange}
                  />
                </div>
          
                {/* Renovation */}
                <div>
                  <label htmlFor="renovation">Renovation:</label>
                  <input
                    type="text"
                    id="renovation"
                    name="Renovation"
                    className='house-inputs'
                    value={houseAd.Renovation}
                    onChange={handleHouseInputChange}
                  />
                </div>
              </div>
              {/* Heating */}
              <div className='house-middle-cols'>
              <div>
                <label htmlFor="heating">Heating:</label>
                <input
                  type="text"
                  id="heating"
                  name="Heating"
                  className='house-inputs'
                  value={houseAd.Heating}
                  onChange={handleHouseInputChange}
                />
              </div>
        
              {/* Floor Size */}
              <div>
                <label htmlFor="floorSize">Floor Size:</label>
                <input
                  type="number"
                  id="floorSize"
                  name="FloorSize"
                  className='house-inputs'
                  value={houseAd.FloorSize}
                  onChange={handleHouseInputChange}
                />
              </div>
        
              {/* Room Count */}
              <div>
                <label htmlFor="roomCount">Room Count:</label>
                <input
                  type="number"
                  id="roomCount"
                  name="RoomCount"
                  className='house-inputs'
                  value={houseAd.RoomCount}
                  onChange={handleHouseInputChange}
                />
              </div>
              
              
              {/* Floor */}
              <div>
                <label htmlFor="floor">Floor:</label>
                <input
                  type="number"
                  id="floor"
                  name="Floor"
                  className='house-inputs'
                  value={houseAd.Floor}
                  onChange={handleHouseInputChange}
                />
              </div>
              </div>
              <div className='house-right-cols'>
              {/* Square */}
              <div>
                <label htmlFor="square">Square:</label>
                <input
                  type="number"
                  id="square"
                  name="Square"
                  className='house-inputs'
                  value={houseAd.Square}
                  onChange={handleHouseInputChange}
                />
              </div>
        
              {/* House Square */}
              <div>
                <label htmlFor="houseSquare">House Square:</label>
                <input
                  type="number"
                  id="houseSquare"
                  name="HouseSquare"
                  className='house-inputs'
                  value={houseAd.HouseSquare}
                  onChange={handleHouseInputChange}
                />
              </div>
        
              {/* Kitchen Square */}
              <div>
                <label htmlFor="kitchenSquare">Kitchen Square:</label>
                <input
                  type="number"
                  id="kitchenSquare"
                  name="KitchenSquare"
                  className='house-inputs'
                  value={houseAd.KitchenSquare}
                  onChange={handleHouseInputChange}
                />
              </div>
        
              {/* Realtor */}
              <div>
                <label htmlFor="realtor">Realtor:</label>
                <input
                  type="text"
                  id="realtor"
                  name="Realtor"
                  className='house-inputs'
                  value={houseAd.Realtor}
                  onChange={handleHouseInputChange}
                />
              </div>
              </div>
              
              </div>
              ):(
                <></>
              )}
              {(state.categoryId)=== 5 ?(
                <div className='auto-cols-section'>
                  <div className='auto-left-cols'>

                    
                    <div>
                    <label htmlFor="model">Model:</label>
                    <input
                      type="text"
                      id="model"
                      name="Model"
                      className='auto-inputs'
                      value={autoAd.Model}
                      onChange={handleAutoInputChange}
                    />
                  </div>
            
                  {/* ... Repeat for other properties ... */}
                  {/* Example for Type */}
                  <div>
                    <label htmlFor="type">Type:</label>
                    <input
                      type="text"
                      id="type"
                      name="Type"
                      className='auto-inputs'
                      value={autoAd.Type}
                      onChange={handleAutoInputChange}
                    />
                  </div>
            
                  {/* Continue for each property */}
                  {/* Release Date - using number input */}
                  <div>
                    <label htmlFor="releaseDate">Release Date:</label>
                    <input
                      type="number"
                      id="releaseDate"
                      name="ReleaseDate"
                      className='auto-inputs'
                      value={autoAd.ReleaseDate}
                      onChange={handleAutoInputChange}
                    />
                  </div>
            
                  {/* Mileage - using number input */}
                  <div>
                    <label htmlFor="mileage">Mileage:</label>
                    <input
                      type="number"
                      id="mileage"
                      name="Mileage"
                      className='auto-inputs'
                      value={autoAd.Mileage}
                      onChange={handleAutoInputChange}
                    />
                  </div>
                </div>
                <div className='auto-middle-cols'>
                {/* Fuel Type - using number input */}
                <div>
                  <label htmlFor="fuelType">Fuel Type:</label>
                  <input
                    type="number"
                    id="fuelType"
                    name="FuelType"
                    className='auto-inputs'
                    value={autoAd.FuelType}
                    onChange={handleAutoInputChange}
                  />
                </div>
          
                {/* Is Cleared - using checkbox */}
                <div>
                  <label htmlFor="isCleared">Is Cleared:</label>
                  <select
                    id="isCleared"
                    name="IsCleared"
                    className='auto-inputs'
                    value={autoAd.IsCleared ? 'true' : 'false'}
                    onChange={handleAutoInputChange}
                  >
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </div>
                <div>
                <label htmlFor="gearbox">Gearbox:</label>
                <input
                  type="text"
                  id="gearbox"
                  name="Gearbox"
                  className='auto-inputs'
                  value={autoAd.Gearbox}
                  onChange={handleAutoInputChange}
                />
              </div>

              {/* Seat Count */}
              <div>
                <label htmlFor="seatCount">Seat Count:</label>
                <input
                  type="number"
                  id="seatCount"
                  name="SeatCount"
                  className='auto-inputs'
                  value={autoAd.SeatCount}
                  onChange={handleAutoInputChange}
                />
              </div>
              </div>
              <div className='auto-left-cols'>
              {/* Body Type */}
              <div>
                <label htmlFor="bodyType">Body Type:</label>
                <input
                  type="text"
                  id="bodyType"
                  name="BodyType"
                  className='auto-inputs'
                  value={autoAd.BodyType}
                  onChange={handleAutoInputChange}
                />
              </div>

              {/* Car From */}
              <div>
                <label htmlFor="carFrom">Car From:</label>
                <input
                  type="text"
                  id="carFrom"
                  name="CarFrom"
                  className='auto-inputs'
                  value={autoAd.CarFrom}
                  onChange={handleAutoInputChange}
                />
              </div>

              {/* Technical State */}
              <div>
                <label htmlFor="technicalState">Technical State:</label>
                <input
                  type="text"
                  id="technicalState"
                  name="TechnicalState"
                  className='auto-inputs'
                  value={autoAd.TechnicalState}
                  onChange={handleAutoInputChange}
                />
              </div>
              </div>
            </div>
              ):(
                <></>
              )}
              {(state.categoryId)==6?(
              <></>
              ):(
                <></>
              )}
              <div className='create-condition'>
                <label>Стан*</label>
                <div className='create-condition-block'>

                  <div className='create-condition-radio'>

                    <input
                      type="radio"
                      id="condition2"
                      name="condition"
                      value="New"
                      className='create-condition-radio-els'
                      checked={state.condition === "New"}
                      onChange={handleInputChange}
                    />
                    <div className="radio-tile">
                      <label>
                        Новий

                      </label>
                      <div className='radio-taxt-add'>
                        Ніколи не
                        розпаковувався
                        не використовувався
                      </div>
                    </div>
                  </div>
                  <div className='create-condition-radio'>

                    <input
                      type="radio"
                      id="condition1"
                      name="condition"
                      value="Used"
                      className='create-condition-radio-els'
                      checked={state.condition === "Used"}
                      onChange={handleInputChange}
                    />
                    <div className="radio-tile">
                      <label>
                        Вживаний
                      </label>
                      <div className='radio-taxt-add'>
                        Був розпакований або
                        має будь-які сліди використання
                      </div>
                    </div>
                  </div>
                  <div className='create-condition-radio'>

                    <input
                      type="radio"
                      id="condition3"
                      name="condition"
                      value="AlmostNew"
                      className='create-condition-radio-els'
                      checked={state.condition === "AlmostNew"}
                      onChange={handleInputChange}
                    />
                    <div className="radio-tile">
                      <label>
                        Відновлений
                      </label>
                      <div className='radio-taxt-add'>
                        Був розпакований або
                        має будь-які сліди використання
                      </div>
                    </div>
                  </div>
                  <div className='create-condition-radio'>


                    <input
                      type="radio"
                      id="condition4"
                      name="condition"
                      value="warranty"
                      // className='create-condition-radio-els'
                      checked={state.condition === "warranty"}
                      onChange={handleInputChange}
                    />
                    <div className="radio-tile">
                      <label>

                        З гарантією
                      </label>
                      <div className='radio-taxt-add'>
                        Був розпакований або
                        має будь-які сліди використання
                        має будь-які сліди використання
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='create-price'>
                <div>


                  <label>Ціна*</label>
                </div>
                <div className='create-price-section'>
                  <div className='create-price-el'>
                    <input
                      type="number"
                      name="price"
                      className='create-ad-price'
                      value={state.price}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='create-price-radio'>
                    <div>
                      <input
                        type="radio"
                        id="adtype1"
                        name="adtype"
                        value="Exchange"
                        className='create-condition-radio-els'
                        checked={state.adtype === "Exchange"}
                        onChange={handleInputChange}
                      />
                      <label>Обмін</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="adtype1"
                        name="adtype"
                        value="Sale"
                        className='create-condition-radio-els'
                        checked={state.adtype === "Sale"}
                        onChange={handleInputChange}
                      />
                      <label>Торг</label>
                    </div>
                    <div>

                      <input
                        type="radio"
                        id="adtype1"
                        name="adtype"
                        value="Free"
                        className='create-condition-radio-els'
                        checked={state.adtype === "Free"}
                        onChange={handleInputChange}
                      />
                      <label>Безкоштовно</label>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div>
                <label>City:</label>
                <input
                  type="text"
                  name="city"
                  value={state.city}
                  onChange={handleInputChange}
                />
              </div> */}
              <div className='create-ad-phone'>
                <label>Номер телефону</label>
                <div>
                  <input
                    type="number"
                    name="phone"
                    value={state.phone}
                    onChange={handleInputChange}
                    className='create-ad-phone-input'
                  />
                </div>
              </div>
              <div className='crete-ad-email'>


                <label>Email-адреса</label>
                <div>
                  <input
                    type="text"
                    name="email"
                    value={state.email}
                    onChange={handleInputChange}
                    className='crete-ad-email-input'
                  />
                </div>

                <div className='create-ad-city'>
                  <label htmlFor="citySelect">Місцезнаходження*</label>
                  <div>
                    <select
                      name="city"
                      id="citySelect"
                      value={state.city}
                      onChange={handleCityChange}
                      className='create-ad-city-select'
                    >
                      <option value="">Select a city</option>
                      {cities.map((city, index) => (
                        <option key={index} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                </div>
                <label>Адреса</label>
                <div>
                  <input
                    type="text"
                    name="address"
                    value={state.address}
                    onChange={handleInputChange}
                    className='crete-ad-addres-input'
                  />
                </div>
              </div>
              {(state.categoryId)==4?(
                <></>
              ):(state.categoryId)==5?(
                <></>
              ):(
                <div className='ad-button-block'>
                <button type='submit' onClick={createAutoAd} className='ad-button'>Опублікувати</button>
              </div>
              )}
              
            </form>
            {(state.categoryId)==4?(
                <div className='ad-button-block'>
                  <button onClick={createHouseAd} className='ad-button'>Опублікувати дім</button>
                </div>
              ):(state.categoryId)==5?(
                <div className='ad-button-block'>
                  <button  onClick={createAutoAd} className='ad-button'>Опублікувати авто</button>
                </div>
              ):(
                <><div className='ad-button-block'>
                <button type='submit' onClick={createAutoAd} className='ad-button'>Опублікувати</button>
              </div></>
              )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default AddDataForm;
