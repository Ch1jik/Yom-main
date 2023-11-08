
import { Link } from 'react-router-dom';
import "../assets/css/style.css"
import React, { useState ,useEffect} from 'react'
import axios from 'axios';
import banner from "../assets/images/banners/Group 1000004799.png"
import top_banner from "../assets/images/usercare-top-banner.svg"
import top_button from '../assets/images/top-button.svg';
import photo_info from "../assets/images/i10.png"
import photo_info1 from "../assets/images/usercare/i 10 (1).png"
import photo_info2 from "../assets/images/usercare/need.png"
import photo_info3 from "../assets/images/usercare/i 10 (3).png"
import photo_info4 from "../assets/images/usercare/i 10 (4).png"
import photo_info5 from "../assets/images/usercare/i 10 (5).png"
import photo_info6 from "../assets/images/usercare/i 10 (6).png"
import stroke from "../assets/images/usercare-stroke.svg"

import play from "../assets/images/play.svg"
import photo1 from "../assets/images/usercareFrame.svg"
import photo2 from "../assets/images/usercareFrame2.svg"
import photo3 from "../assets/images/usercareFrame3.svg"
import { NavLink } from "react-router-dom"
interface UserCareState {
    
    activeTab: number;
    activeTab2: number;
    
}
const UserCare: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [activeTab2, setActiveTab2] = useState<number>(0);
    const [showScrollButton, setShowScrollButton] = useState(false);
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
    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };   
    const handleTabClick2 = (index: number) => {
        setActiveTab2(index);
    };    
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth', // This makes the scrolling smooth
        });
      };     
    const [name, setName]= useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const reportData = {
        name,
        email,
        description,
      };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = axios.post('https://localhost:7014/api/HelpReport/Create', reportData, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
      
           
              console.log('Report submitted successfully.',response);
              // Handle any other logic after successful submission, e.g. showing a success message.
            
          } catch (error) {
            console.error('Error submitting report:', error);
          }
    };
    return (
        <main>
            <div className='UserCare-banner'>
                <div className='UserCare-banner-svg'>
                
                
                
                    <div className='UserCare-banner-section'>
                        <div className='UserCare-banner-description'>
                            <div>
                                <div className='UserCare-banner-description-text'>
                                Як правильно розмістити 
                                        оголошення?
                                </div>
                                <div className='UserCare-banner-buttons'>
                                    <button className='UserCare-banner-button1'>Подати оголошення</button>
                                    <button className='UserCare-banner-button2'><img src={play}></img></button>
                                    <p className='UserCare-banner-button2-text'>Дивитись відео іструкцію</p>
                                </div>
                            </div>
                        </div>
                        {/* <div className='UserCare-banner-logo'>
                        <img className='UserCare-banner-logo1' src={photo1}></img>
                        <img className='UserCare-banner-logo2' src={photo2}></img>
                        <img className='UserCare-banner-logo3' src={photo3}></img>

                        </div> */}
                        <div className='UserCare-banner-image'>
                            <img src={banner}></img>
                        </div>
                        <div className='UserCare-banner-sale'>
                            <img src='src/assets/images/Group10000038931.png'></img>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            <div className='UserCarePage'>
            <div>
                <div className='UserCarePage-section'>
                    <section>
                        <div className='UserCare-tabs-section'>
                            <div className='UserCare-Tabs'>
                                {/* Tab Headers */}
                                <div className="myadstop-bar-UserCare">
                                    <div className='myads-tabs-UserCare'>
                                        {['Все', 'Нерухомість', 'Бізнес','Новини','Здоров’я','Підприємцям','Робота в Yom','Акції'].map((tabName, index) => (
                                        <div
                                            key={index}
                                            className={`myads-tab-UserCare ${activeTab === index ? 'active' : ''}`}
                                            onClick={() => handleTabClick(index)}
                                        >
                                            {tabName}
                                        </div>
                                        ))}
                                    </div>
                                </div>
                                <div className={`myads-tab-panel-UserCare ${activeTab === 0 ? 'active' : ''}`}>
                                    <div className='UserCare-section'>
                                        <div className='UserCare-section-grid'>

                                        
                                        <div className='UserCare-blocks'>
                                            <div className='UserCare-photo'>
                                            <img src={photo_info}></img>
                                            </div>
                                            <div className='UserCare-description'>
                                                <p className='UserCare-description-text1'>Як вберегтися від шахраїв: надійна охорона вашого майна</p>
                                                <p className='UserCare-description-text2'>Єдина озброєна служба охорони в Україні, яка має дозвіл на носіння та застосування зброї. Охорона квартир, і об'єктів, фізична охорона...</p>
                                            </div>
                                        </div>
                                        <div className='UserCare-blocks'>
                                            <div className='UserCare-photo'>
                                            <img src={photo_info1}></img>
                                            </div>
                                            <div className='UserCare-description'>
                                            <p className='UserCare-description-text1'>Поради для активного продажу: ТОП 7порад від еспертів</p>
                                                <p className='UserCare-description-text2'>Кар'єра - це постійний рух уперед, який може бути захоплюючим і водночас викликати питання. Як розблокувати потенціал.</p>
                                            </div>
                                        </div>
                                        <div className='UserCare-blocks'>
                                            <div className='UserCare-photo'>
                                            <img src={photo_info3}></img>
                                            </div>
                                            <div className='UserCare-description'>
                                            <p className='UserCare-description-text1'>Настільні ігри для компанії: розваги та розвиток разом!</p>
                                                <p className='UserCare-description-text2'>Любите проводити час у компанії друзів або рідних? Настільні ігри — ідеальний спосіб розважитися разом, особливо якщо...</p>
                                            </div>
                                        </div>
                                        <div className='UserCare-blocks'>
                                            <div className='UserCare-photo'>
                                            <img src={photo_info2}></img>
                                            </div>
                                            <div className='UserCare-description'>
                                            <p className='UserCare-description-text1'>Поради для креативного мислення:як розвинути уяву</p>
                                                <p className='UserCare-description-text2'>У статті розглядаються загальні підходи до вивчення місця уяви у творчій діяльності: творча уява, інтервал трансу, а також..</p>
                                            </div>
                                        </div>
                                        <div className='UserCare-blocks'>
                                            <div className='UserCare-photo'>
                                            <img src={photo_info4}></img>
                                            </div>
                                            <div className='UserCare-description'>
                                            <p className='UserCare-description-text1'>Масаж гуаша: користь, схеми й техніки, різновиди скребка</p>
                                                <p className='UserCare-description-text2'>Гуаша — це різновид масажу, який виконується спеціальним гладеньким скребком. Інструмент цей прийшов...</p>
                                            </div>
                                        </div>
                                        <div className='UserCare-blocks'>
                                            <div className='UserCare-photo-last'>
                                            
                                            </div>
                                            <div className='UserCare-description'>
                                            <p className='UserCare-description-text1'>Поради для активного продажу: ТОП 7порад від еспертів</p>
                                                <p className='UserCare-description-text2'>Кар'єра - це постійний рух уперед, який може бути захоплюючим і водночас викликати питання. Як розблокувати потенціал.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='faq-input-email'>
                                        <div>
                                            <div className='faq-input-email-text1'>
                                            Будь в курсі корисних порад та новинок
                                            </div>
                                            <div className='faq-input-email-text2'>
                                            Підпишіться  розсилку корисних ресурсів
                                            </div>
                                        </div>
                                        <input type="email" className='form-control' placeholder='E-mail' ></input>
                                        <button> Підписатись</button>
                                    </div>
                                    <div className='UserCare-section-grid'>
                                        <div className='UserCare-blocks'>
                                            <div className='UserCare-photo'>
                                            <img src={photo_info6}></img>
                                            </div>
                                            <div className='UserCare-description'>
                                            <p className='UserCare-description-text1'>No waste життя: як розпочати сортувати сміття та зменшити... </p>
                                                <p className='UserCare-description-text2'>У світі, де споживча культура та опаковання із пластику здаються нескінченними, на сцену виходить no waste, пропонуючи нам ...</p>
                                            
                                            </div>
                                        </div>
                                        <div className='UserCare-blocks'>
                                            <div className='UserCare-photo'>
                                            <img src={photo_info5}></img>
                                            </div>
                                            <div className='UserCare-description'>
                                            <p className='UserCare-description-text1'>Як продати мобільний телефон та підготувати його до продажу</p>
                                            <p className='UserCare-description-text2'>Смартфон — це не така річ, якою ми користуємося протягом довгого часу, адже рік-два і вже кортить придбати нову модель. </p>
                                            </div>
                                        </div>
                                        <div className='UserCare-blocks'>
                                            <div className='UserCare-photo'>
                                            <img src={photo_info}></img>
                                            </div>
                                            <div className='UserCare-description'>
                                            <p className='UserCare-description-text1'>Поради для активного продажу: ТОП 7порад від еспертів</p>
                                            <p className='UserCare-description-text2'>Кар'єра - це постійний рух уперед, який може бути захоплюючим і водночас викликати питання. Як розблокувати потенціал. </p>
                                            
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                </div>
                                <div className={`myads-tab-panel-UserCare ${activeTab === 1 ? 'active' : ''}`}>
                                   
                                </div>
                                <div className={`myads-tab-panel-UserCare ${activeTab === 2 ? 'active' : ''}`}>
                                    3
                                </div>
                                <div className={`myads-tab-panel-UserCare ${activeTab === 3 ? 'active' : ''}`}>
                                    4
                                </div>
                                <div className={`myads-tab-panel-UserCare ${activeTab === 4 ? 'active' : ''}`}>
                                    5
                                </div>
                                <div className={`myads-tab-panel-UserCare ${activeTab === 5 ? 'active' : ''}`}>
                                    6
                                </div>
                                <div className={`myads-tab-panel-UserCare ${activeTab === 6 ? 'active' : ''}`}>
                                    7
                                </div>
                                <div className={`myads-tab-panel-UserCare ${activeTab === 7 ? 'active' : ''}`}>
                                    8
                                </div>

                            </div>
                        </div>
                        </section>
                    </div>
                    <div className='UserCare-faq-section'>
                        <div>
                            <div className='UserCare-faq'>
                                <h1></h1>
                                <input type="text" className='form-control' placeholder='Я маю питання...' ></input>          
                            </div>
                            <img className='UserCare-faq-stroke' src={stroke}></img>
                            {/* <section> */}
                                <div className='UserCare-rules-section'>
                                    <div className='UserCare-rules'>
                                    <div className='serCare-rules-blocks'>
                                        <div className='serCare-rules-block'>
                                            <div>
                                                <div className='serCare-rules-block-title'>Неполадки з обліковим записом та даними</div>
                                                <img src={photo1}></img>
                                            </div>
                                        </div>
                                        <div className='serCare-rules-block'>
                                            <div>
                                                <div className='serCare-rules-block-title'>Проблеми з оплатою</div>
                                                <img src={photo2}></img>
                                            </div>
                                        </div>
                                        <div className='serCare-rules-block'>
                                            <div>
                                                <div className='serCare-rules-block-title'>Як працює доставкана Yom</div>
                                                <img src={photo3}></img>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='UserCare-bottom-tab-bar-section'>
                                    <div className="UserCare-bottom-tab-bar">
                                        <div className='UserCare-bottom-tabs'>
                                            {['ПРАВИЛА ДЛЯ ПРОДАВЦІВ', 'ОГОЛОШЕННЯ', 'ПОСІБНИК ПОКУПОК НА YOM','ПРАВИЛА КОРИСТУВАННЯ САЙТОМ','АКЦІЇ','ПОЛІТИКА КОНФІДЕНЦІЙНОСТІ'].map((tabName, index) => (
                                            <div
                                                key={index}
                                                className={`myads-tab-UserCare-bottom ${activeTab2 === index ? 'active' : ''}`}
                                                onClick={() => handleTabClick2(index)}
                                            >
                                                {tabName}
                                            </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className={`UserCare-bottom-tab-panel ${activeTab2 === 0 ? 'active' : ''}`}>
                                        <div>
                                            <p className='UserCare-bottom-tab-panel-title'>Розміщення оголошення</p>
                                            <p className='UserCare-bottom-tab-panel-description'>2.1. Оголошення розміщуються у відповідних категоріях і розділах Сайту. Не допускається розміщення оголошення в категорії, що не відповідає змісту і суті оголошення.
                                                2.2. Оголошення, що розміщується на Сайті, обов'язково має містити:
                                                2.2.1. Назву Оголошення, в якій відображається короткий зміст і суть Оголошення, інформація повинна бути повною і достовірною. Забороняється відображати контактну інформацію в назві оголошення, в описі товару в Оголошенні та на фото, яке демонструє товар в Оголошенні.
                                                2.2.2. Опис товару (послуги, роботи), його характеристики. При цьому деталі замовлення товару з Оголошення можуть повідомлятися і узгоджуватися між Користувачем і Покупцем самостійно в окремому комунікаційному чаті.
                                                2.2.3. Ціну товару/послуги. При цьому ціна вказується в національній валюті України - гривні.
                                                2.2.4. При розміщенні оголошення з пропозицією товару, Користувач зобов'язаний завантажити не менше ніж 1 (одну) реальну фотографію із зображеннями цього товару. Фото, яке демонструє товар або послугу, пропоновані Користувачем для продажу, повинні відповідати назві і тексту Оголошення. Оголошення повинно містити реальні фотографії предмета Оголошення, що відповідає конкретному екземпляру товару, що продається.
                                                2.2.5. Достовірну інформацію про Користувача - автора Оголошення, в тому числі контактну інформацію (назву, адресу, e-mail, телефон). Контактні дані вказуються в формі подачі оголошення в спеціальному полі, вони не відображаються в Оголошенні (крім номера телефону та імені/найменування), але використовуються для зв'язку з Користувачем через спеціальну контактну форму.</p>
                                            <p className=''></p>
                                        </div>
                                    </div>
                                    <div className={`UserCare-bottom-tab-panel ${activeTab2 === 1 ? 'active' : ''}`}>
                                        2
                                    </div>
                                    <div className={`UserCare-bottom-tab-panel ${activeTab2 === 2 ? 'active' : ''}`}>
                                        3
                                    </div>
                                    <div className={`UserCare-bottom-tab-panel ${activeTab2 === 3 ? 'active' : ''}`}>
                                        4
                                    </div>
                                    <div className={`UserCare-bottom-tab-panel ${activeTab2 === 4 ? 'active' : ''}`}>
                                        5
                                    </div>
                                    <div className={`UserCare-bottom-tab-panel ${activeTab2 === 5 ? 'active' : ''}`}>
                                        6
                                    </div>
                                    <div className={`UserCare-bottom-tab-panel ${activeTab2 === 6 ? 'active' : ''}`}>
                                        7
                                    </div>
                                </div>
                                   </div>
                                </div>
                                {showScrollButton && (
                                    <button className='to-topbtn' onClick={() => scrollToTop()}>
                                        <img src={top_button} alt="Scroll to top"/>
                                    </button>
                                )}
                                
                            {/* </section> */}
                            <div className='UserCare-rules-banner'>
                                <div className="userCare-ask-us-container">
                                    <h2 className="userCare-ask-us-title">ЗВ'ЯЗАТИСЯ З НАМИ</h2>
                                    <form onSubmit={handleSubmit} className="userCare-ask-us-form">
                                        <input
                                            type="text"
                                            placeholder="Ваше Ім'я"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="userCare-ask-us-input userCare-ask-us-input-name"
                                        />
                                        <input
                                            type="email"
                                            placeholder="E-mail"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="userCare-ask-us-input userCare-ask-us-input-email"
                                        />
                                        <textarea
                                            // placeholder="Your message..."
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            className="userCare-ask-us-input userCare-ask-us-input-textarea"
                                        />
                                        <button type="submit" className="userCare-ask-us-button">Відправити</button>
                                    </form>
                                </div>
                                <div className='UserCare-rules-banner-image'>
                                        
                                </div>
                            
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    )
  
}

export default UserCare