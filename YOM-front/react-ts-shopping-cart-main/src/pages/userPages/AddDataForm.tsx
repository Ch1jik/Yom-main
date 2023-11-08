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
  address:string;
  email:string;
  adtype:string;
  phone:number;
  categoryId: number;
  subCategoryId: number;
  photos: File[];
  categories: ICategory[];
  subcategories: ISubCategory[];
}

const AddDataForm: React.FC<IAddDataFormProps> =() => {
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
    address:'',
    email:'',
    adtype:'',
    phone:0,
    categoryId: 0,
    subCategoryId: 0,
    photos: [],
    categories: [], // Initialize as an empty array
    subcategories: [], // Initialize as an empty array
  });

  

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
      [name]:value,
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
    if(userId)
    formData.append('userId', userId.toString());
    
    
    // formData.append(`photos`, photos);
    photos.forEach((photo, index) => {
      formData.append(`photos`, photo);
    });
    console.log('====================================');
    console.log(photos);
    console.log('====================================');
    
    axios
      .post('https://localhost:7014/api/Ad/Create', formData, {
        headers: {
          'accept': '*/*',
          'Content-Type': 'multipart/form-data' // This is optional, as Axios will set it for you when using FormData.
        },
      })
      .then((response) => {
        
        alert("Data added successfully!");
        setState({
          title: '',
          description: '',
          condition: '', // Reset the condition field
          price: 0,
          city: '',
          address:'',
          email:'',
          adtype:'',
          phone:0,
          categoryId: 0,
          subCategoryId: 0,
          photos: [], // Reset the array
          categories:[],
          subcategories:[]
        });
      })
      .catch((error) => {
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
                  <option value="">Select a category</option>
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
                  <div>Subcategory:</div>
                  <select
                    name="subCategoryId"
                    className="create-subcategory"
                    value={state.subCategoryId}
                    onChange={handleSubcategoryChange}
                  >
                    <option value="">Select a subcategory</option>
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
                        className='selected-photo'
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
                      ):(
                        <div className='big-photo'>
                          
                          <img src={add}></img>
                          
                        </div>
                      ) }
                      
                      
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
                        <div  className='button-block-add'>
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
                      ):(
                        <div className='add-photo-els'>
                          <img src={add}></img>
                          
                        </div>
                      ) }
                      
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
                      <div  className='button-block-add'>
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
                      ):(
                        <div className='add-photo-els'>
                          <img src={add}></img>
                          
                          </div>
                        ) }
                      
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
                      <div  className='button-block-add'>
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
                      ):(
                        <div className='add-photo-els'>
                          <img src={add}></img>
                          
                        </div>
                      ) }
                      
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
                      <div  className='button-block-add'>
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
                      ):(
                        <div className='add-photo-els'>
                          <img src={add}></img>
                          
                        </div>
                      ) }
                      
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
                      <div  className='button-block-add'>
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
                      ):(
                        <div className='add-photo-els'>
                          <img src={add}></img>
                          
                        </div>
                      ) }
                      
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
                      <div  className='button-block-add'>
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
                      ):(
                        <div className='add-photo-els'>
                          <img src={add}></img>
                          
                        </div>
                      ) }
                      
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
                      <div  className='button-block-add'>
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
                      ):(
                        <div className='add-photo-els'>
                          <img src={add}></img>
                          
                        </div>
                      ) }
                          
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
                      <div  className='button-block-add'>
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
                      ):(
                        <div className='add-photo-els'>
                          <img src={add}></img>
                          
                        </div>
                      ) }
                      
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
                    name="address"
                    value={state.address}
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
              </div>
              <div className='ad-button-block'>
              <button type="submit" className='ad-button'>Опублікувати</button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AddDataForm;
