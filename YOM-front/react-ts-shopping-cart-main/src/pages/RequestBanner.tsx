import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../assets/images/banners/Group 1000003839.png'
import { Link } from 'react-router-dom';

  interface IAddDataFormState {
    companyURL: string;
    companyName: string;
    description: string;
    email: string;
    phoneNumber: number;
    bannerSize:string;
    bannerFile:File | null;
    bannerTitle:string;

    
  }
const RequestBanner: React.FC = () => {
    const navigate = useNavigate();
    const [companyURL,setcompanyURL]=useState();
    const [companyName,setcompanyName]=useState();

    const [description,setdescription]=useState();
    const [email,setemail]=useState();
    const [phoneNumber,setphoneNumber]=useState();
    const [bannerFile,setbannerFile]=useState();
    const [imageURL, setImageURL] = useState<string | null>(null);


    const [formData, setFormData] = useState<IAddDataFormState>({
        companyURL: '',
        companyName: '',
        description: '',
        email: '',
        phoneNumber: 0,
        bannerSize:'',
        bannerFile: null,
        bannerTitle: '',
    });

    const [file, setFile] = useState<File | null>(null);

    // Create a handler for file input
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            
            // Set the URL for the uploaded image
            setImageURL(URL.createObjectURL(selectedFile));
    
            // Update the formData state as well, if you want to store the file in the formData object
            setFormData(prevState => ({
                ...prevState,
                bannerFile: selectedFile
            }));
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        console.log('Handling change for:', name, 'with value:', value);
        if(name=='bannerSize'){
            document.getElementById('photo_banner')?.click();
        }
        setFormData(prevState => ({
            ...prevState, 
            [name]: value
        }));
    };
    const handleRemoveFile = () => {
        setFile(null);
        setImageURL(null); // Reset the image URL
        setFormData(prevState => ({
            ...prevState,
            bannerFile: null
        }));
    };
    const handleSubmit = () => {
        console.log("Submitting form");        
        console.log(formData);
        navigate('/requestbanner/pay', { state: formData });
    };
    
    

    return (
    <main>
        <div className='RequestBannerPage'>
            <section>
                
            <form className='RequestBannerPage-form'>
                <h1 className='request-banner-title'>Створення рекламного банера</h1>
                <div>
                    
                        
                        <input className='request-banner-url' type="url" name="companyURL" placeholder="Enter the URL-address of your company:"value={formData.companyURL} onChange={handleChange}  />
                    
                </div>
                <div>
                    
                        <p>Company Name:</p>
                        <input className='request-banner-company' type="text" name="companyName" value={formData.companyName} onChange={handleChange}  />
                    
                </div>
                <div>
                    
                       <p>Description:</p> 
                        <textarea className='request-banner-description' name="description" placeholder='Ми одна з роздрібних мереж з продажів електроніки та побутової техніки в Україні.
                                Ми пропонуємо своїм покупцям кілька десятків тисяч найменувань аудіо / відео
                                і цифрової техніки, дрібної і крупної побутової техніки, медіатоваров, аксесуарів.' value={formData.description} onChange={handleChange} ></textarea>
                    
                </div>
                <div className='request-banner-contact-section'>
                    <div>
                        
                            <p>Email-address:</p>
                            <input className='request-banner-email' type="email" name="email" value={formData.email} onChange={handleChange}  />
                        
                    </div>
                    <div>
                        
                            <p>Phone Number:</p>
                            <input className='request-banner-phone' type="number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}  />
                        
                    </div>
                </div>
                <div>
                    <h1 className='request-banner-title2'>Оформлення рекламного банера</h1>
                    <input className='request-banner-title-text' type="text" name="bannerTitle" placeholder="Введіть заголовок банера або ключові  слова, що відповдають тематиці вашої реклами"value={formData.bannerTitle} onChange={handleChange}  />
                </div>
                <div>
                    <div className='request-banner-size-main'>
                        <p className='request-banner-size-main-title'>Доступні розміри*</p>
                        <div className='request-banner-size-setion'>
                            
                            <div className='request-banner-size'>
                                
                                    <div className="request-banner-custom-radio1">
                                        {/* <input type="radio" name="bannerSize" value="1480x500" checked={formData.bannerSize === '1480x500'} onChange={handleChange} /> */}
                                        <input type="radio" name="bannerSize" value="1480x500" checked={formData.bannerSize === '1480x500'} onChange={handleChange} />
                                        <div className="request-banner-custom-radio-tile">
                                            <label>
                                            1480x500
                                            </label>
                                        </div>
                                    </div>
                                
                                    <div className="request-banner-custom-radio2">
                                        {/* <input type="radio" name="bannerSize" value="580x340" checked={formData.bannerSize === '580x340'} onChange={handleChange} /> */}
                                        <input type="radio" name="bannerSize" value="580x340" checked={formData.bannerSize === '580x340'} onChange={handleChange} />
                                        <div className="request-banner-custom-radio-tile">
                                            <label>
                                            580x340
                                            </label>
                                        </div>
                                    </div>
                                    <div className="request-banner-custom-radio3">
                                        <input type="radio" name="bannerSize" value="280x340" checked={formData.bannerSize === '280x340'} onChange={handleChange} />
                                        {/* <input type="radio" name="bannerSize" value="280x340" checked={formData.bannerSize === '280x340'} onChange={handleChange} /> */}
                                        <div className="request-banner-custom-radio-tile">
                                            <label >
                                            280x340
                                            </label>
                                        </div>
                                    </div>
                                    <div className="request-banner-custom-radio4">
                                        <input type="radio" name="bannerSize" value="1260x170" checked={formData.bannerSize === '1260x170'} onChange={handleChange} />
                                        {/* <input type="radio" name="bannerSize" value="1260x170" checked={formData.bannerSize === '1260x170'} onChange={handleChange} /> */}
                                        <div className="request-banner-custom-radio-tile">
                                            <label >
                                            1260x170
                                            </label>
                                        </div>
                                    </div>
                                
                                </div>
                                <div className='request-banner-size-description'>
                                    <div className='request-banner-size-setion-description'>
                                        <p>Перевірте, чи ваш банер має правильну роздільну здатність для вебу ( 72 dpi). Файли приймаютьсят в форматі JPG or PNG. </p>
                                    </div>
                                    <div className='request-banner-size-setion-tutorial'> 
                                        Оберіть розмір баннеру, який ви будете завантажувати. Тапніть на нього та перейдіть до завайнтаження файлу.
                                    </div>
                                </div>
                            </div>
                            
                        
                        
                    </div>
                </div>
                
                {file && (
                <button onClick={handleRemoveFile}>Remove Uploaded Banner</button>
            )}
            <div className='request-banner-file-section'>
                <label htmlFor="photo_banner">
                    <input type="file" id="photo_banner" name="photo_banner" className='request-banner-file' onChange={handleFileChange} />
                    <div className='request-banner-image'>
                        {formData.bannerTitle ?(
                                <div>{formData.bannerTitle}</div>
                        ):(
                            <div></div>
                        )}
                        {imageURL && <img src={imageURL} className='request-banner-selected-photo'alt="Uploaded Banner" ></img>}
                    </div>

                </label>
                <button type="button" className="change-button" onClick={() => document.getElementById('photo_banner')?.click()}></button>
            </div>
            <div className='requestbannner-button-section'>
                <Link to={'/usercare'}>
                    <button className='requestbannner-goback' >Назад</button>
                </Link>
                <button className='requestbannner-submit' type="submit" value="submit" onClick={handleSubmit} >Submit</button>
                
            </div>
                
                
            </form>
            </section>
        </div>
        </main>
    );
};

export default RequestBanner;
