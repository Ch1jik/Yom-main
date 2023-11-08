
import { Link } from 'react-router-dom';
import "../assets/css/style.css"
import React, { useState,useEffect } from 'react'
import banner from "../assets/images/banners/Group 1000004800.png"
import banner2 from "../assets/images/banners/Group 1000004801.png"
import banner3 from "../assets/images/banners/Group 1000003839.png"
import byplan1 from "../assets/images/buy-el1.svg"
import byplan2 from "../assets/images/buy-el2.svg"
import byplan3 from "../assets/images/buy-el3.svg"
import small_ellipse from "../assets/images/promotion-small-ellipse.svg"
import top_button from '../assets/images/top-button.svg';
import ellipse from "../assets/images/Ellipse 417.svg"
import ads1 from "../assets/images/Layer_1.svg"
import ads2 from "../assets/images/Layer_1 (1).svg"

import ads3 from "../assets/images/Group 1000003899.svg"
import ads4 from "../assets/images/Layer_1 (2).svg"
import ads5 from "../assets/images/Group 1000003900.svg"
import { useTranslation } from 'react-i18next';
interface PromotionsState {
    
    activeTab: number;
    
}
const Promotions: React.FC = () => {
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [activeTab, setActiveTab] = useState<number>(0);
    const { t } = useTranslation();
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
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth', // This makes the scrolling smooth
        });
      };   
    return (
        <main>
            <div className='PromotionPage'>
                <div className='PromotionPage-section'>

                
                    <div className='Promotion-banner'>
                        <div className='Promotion-banner-svg'>
                            <div className='Promotion-banner-section'>
                                <div className='Promotion-banner-description'>
                                    <div className='Promotion-banner-description-text1'>
                                    {t('promotion.promotion_banner.svg_section.banner_section.description.text1')}
                                    </div>
                                    <div className='Promotion-banner-description-text2'>
                                    {t('promotion.promotion_banner.svg_section.banner_section.description.text2')}
                                    </div>
                                    <div className='Promotion-banner-buttons'>
                                        
                                        <input className='Promotion-banner-input' placeholder={t('promotion.promotion_banner.svg_section.banner_section.buttons.input_placeholder')}></input>
                                        
                                        <button className='Promotion-banner-button'>{t('promotion.promotion_banner.svg_section.banner_section.buttons.button_text')}</button>
                                    </div>
                                </div>
                                <div className='Promotion-banner-image'>
                                        <img src={banner}></img>
                                </div>
                            </div>
                        </div>
                        
                        
                        
                    </div>
                <div className='promo-section-for-position'>
                    <div className='buy-plans'>
                            <div className='buy-plans-main-section'>
                                <div>
                                <div className='buy-plans-title'>{t('promotion.buy_plans.buy_plans_main_section.title')}</div>
                                <div className='buy-plans-description'>{t('promotion.buy_plans.buy_plans_main_section.description')}</div>
                                <div className='buy-plans-section'>
                                    <div className='buy-plans-el'>
                                        <div className='buy-plans-el-section'>
                                        <img src={byplan1}></img>
                                        <div className='buy-plans-el-description'>
                                            <h2>{t('promotion.buy_plans.buy_plans_main_section.plans.title1')}</h2>
                                            <p>{t('promotion.buy_plans.buy_plans_main_section.plans.features1.text1')}</p>
                                            <p>{t('promotion.buy_plans.buy_plans_main_section.plans.features1.text2')}</p>
                                        </div>
                                        <div className='buy-plans-button'>
                                            <label>
                                                <input
                                                    type="radio"
                                                    id="Express"
                                                    value="Express"
                                                    className='my-ads-popup'
                                                    // checked={selectedPlan === "Express"}
                                                    // onChange={handlePlanChange}
                                                />
                                                <span className="radio-text">{t('promotion.buy_plans.buy_plans_main_section.plans.price1')}</span>
                                            </label>
                                        </div>
                                        </div>
                                    </div>
                                    <div className='buy-plans-el'>
                                        <div className='buy-plans-el-section'>
                                            <img src={byplan2}></img>
                                            <div className='buy-plans-el-description'>
                                                <h2>{t('promotion.buy_plans.buy_plans_main_section.plans.title2')}</h2>
                                                <p>{t('promotion.buy_plans.buy_plans_main_section.plans.features2.text1')}</p>
                                                <p>{t('promotion.buy_plans.buy_plans_main_section.plans.features2.text2')}</p>
                                            </div>
                                            <div className='buy-plans-button'>
                                            <label>
                                                <input
                                                    type="radio"
                                                    id="Blitz"
                                                    value="Blitz"
                                                    className='my-ads-popup'
                                                    // checked={selectedPlan === "Blitz"}
                                                    // onChange={handlePlanChange}
                                                />
                                                <span className="radio-text">{t('promotion.buy_plans.buy_plans_main_section.plans.price2')}</span>
                                            </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='buy-plans-el'>
                                    <div className='buy-plans-el-section'>
                                    <img src={byplan3}></img>
                                    <div className='buy-plans-el-description'>
                                        <h2>{t('promotion.buy_plans.buy_plans_main_section.plans.title2')}</h2>
                                        <p>{t('promotion.buy_plans.buy_plans_main_section.plans.features3.text1')}</p>
                                        <p>{t('promotion.buy_plans.buy_plans_main_section.plans.features3.text2')}</p>
                                        <p>{t('promotion.buy_plans.buy_plans_main_section.plans.features3.text3')}</p>
                                        <p>{t('promotion.buy_plans.buy_plans_main_section.plans.features3.text4')}</p>
                                    </div>
                                    <div className='buy-plans-button3'>
                                        <label>
                                            <input
                                                type="radio"
                                                id="Turbo"
                                                value="Turbo"
                                                className='my-ads-popup'
                                                // checked={selectedPlan === "Turbo"}
                                                // onChange={handlePlanChange}
                                            />
                                            <span className="radio-text">{t('promotion.buy_plans.buy_plans_main_section.plans.price3')}</span>
                                        </label>
                                    </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                    </div>
                    
                    <div className='promotion-main'>
                        <div>
                            <div className='promotion-ads'>
                                    <div className='promotion-ad'>
                                        <div className='promotion-ads-description'>
                                            <p className='promotion-ads-title'>{t('promotion.promotion_main.promotion_ads.description')}</p>
                                            <p className='promotion-ads-text'>Як баннери допомагають залучити увагу вашої аудиторії та збільшити конверсію ваших рекламних кампаній</p>
                                        </div>
                                        <div className='promotion-ads-section'>
                                            <div className='promotion-ads-info'>
                                                
                                                <div className='promotion-ads-image'>
                                                    {/* <img src={ellipse}></img> */}
                                                    <img src={ads1}></img>
                                                </div>
                                                <div className='promotion-ads-info-text'>
                                                {t('promotion.promotion_main.promotion_ads.advantages.text1')}
                                                </div>
                                                
                                            </div>
                                            <div className='promotion-ads-info'>
                                                
                                                    <div className='promotion-ads-image'>
                                                        {/* <img src={ellipse}></img> */}
                                                        <img src={ads2}></img>
                                                    </div>
                                                    <div className='promotion-ads-info-text'>
                                                    {t('promotion.promotion_main.promotion_ads.advantages.text2')}
                                                    </div>
                                                
                                            </div>
                                            <div className='promotion-ads-info'>
                                            
                                                <img src={ads3}></img>
                                                    <div className='promotion-ads-info-text'>
                                                    {t('promotion.promotion_main.promotion_ads.advantages.text3')}
                                                    </div>
                                                </div>
                                            
                                        </div>
                                        <div className='promotion-ads-section'>
                                            <div className='promotion-ads-info'>
                                                
                                                    <div className='promotion-ads-image'>
                                                        {/* <img src={ellipse}></img> */}
                                                        <img src={ads4}></img>
                                                    </div>
                                                    <div className='promotion-ads-info-text'>
                                                    {t('promotion.promotion_main.promotion_ads.advantages.text4')}
                                                    </div>
                                                
                                            </div>
                                            <div className='promotion-ads-info'>
                                                
                                                <img src={ads5}></img>
                                                    <div className='promotion-ads-info-text'>
                                                    {t('promotion.promotion_main.promotion_ads.advantages.text5')}
                                                    </div>
                                                </div>
                                               
                                        </div>
                                    </div>
                                    
                            </div>
                            <div className='promotion-rules-section'>
                                
                                <div className='promotion-rules'>
                                    <div className='promotion-rules-description'>
                                        <div className='promotion-rules-text1'>{t('promotion.promotion_main.promotion_rules.description.text1')}</div>
                                        <div className='promotion-rules-text2'>{t('promotion.promotion_main.promotion_rules.description.text2')}.</div>
                                    </div>
                                    <div>
                                        <button className='promotion-rules-button'>{t('promotion.promotion_main.promotion_rules.button')}</button>
                                    </div>
                                </div>
                            </div>
                            <div className='promotion-tarifs'> 
                                <div className='promotion-tarifs-section'>
                                    <div className='promotion-tarifs-main'>
                                        <div className='promotion-tarifs-title'>
                                        {t('promotion.promotion_tarifs.description')}
                                        </div>
                                        <div className='promotion-tarifs-description'>
                                        Оберіть найкращий план для вашої видимості та успіху продажу
                                        </div>
                                        </div>
                                    <div className='tarifs-info'>
                                        <div className='tarifs-info-el1'>
                                            <div className='tarifs-info-title1'>
                                            Пакет "Стандартний"
                                            </div>
                                            <div className='tarifs-info-description1'>
                                                <div className='tarifs-info-description-info'>
                                                    <img src={small_ellipse}></img><p>{t('promotion.promotion_tarifs.tarifs_info.description1.text1')}</p>
                                                </div>  
                                                <div className='tarifs-info-description-info'>
                                                    <img src={small_ellipse}></img><p>{t('promotion.promotion_tarifs.tarifs_info.description1.text2')}</p>
                                                </div>  
                                                <div className='tarifs-info-description-info'>
                                                    <img src={small_ellipse}></img><p>{t('promotion.promotion_tarifs.tarifs_info.description1.text3')}</p>
                                                </div>  
                                                <div className='tarifs-info-description-info'>
                                                    <img src={small_ellipse}></img><p>{t('promotion.promotion_tarifs.tarifs_info.description1.text4')}</p>
                                                </div> 
                                                <div className='tarifs-info-description-info'>
                                                    <img src={small_ellipse}></img><p>{t('promotion.promotion_tarifs.tarifs_info.description1.text5')}</p>
                                                </div>   
                                            </div>
                                            <div className='tarifs-info-description-text1'>{t('promotion.promotion_tarifs.tarifs_info.price1')}</div>
                                        </div>
                                        <div className='tarifs-info-el2'>
                                            <div className='tarifs-info-title2'>
                                            Пакет "Професійний"
                                            </div>
                                            <div className='tarifs-info-description'>
                                                <div className='tarifs-info-description-info'>
                                                    <img src={small_ellipse}></img><p>{t('promotion.promotion_tarifs.tarifs_info.description2.text1')}</p>
                                                </div>
                                                <div className='tarifs-info-description-info'>
                                                    <img src={small_ellipse}></img><p>{t('promotion.promotion_tarifs.tarifs_info.description2.text2')}</p>
                                                </div>
                                                <div className='tarifs-info-description-info'>
                                                    <img src={small_ellipse}></img><p>{t('promotion.promotion_tarifs.tarifs_info.description2.text3')}</p>
                                                </div>
                                                <div className='tarifs-info-description-info'>
                                                    <img src={small_ellipse}></img><p>{t('promotion.promotion_tarifs.tarifs_info.description2.text4')}</p>
                                                </div>
                                                <div className='tarifs-info-description-info'>
                                                    <img src={small_ellipse}></img><p>{t('promotion.promotion_tarifs.tarifs_info.description2.text5')}</p>
                                                </div>
                                            </div>
                                            <div className='tarifs-info-description-text2'>{t('promotion.promotion_tarifs.tarifs_info.price2')}</div>
                                        </div>
                                        <div className='tarifs-info-el3'>
                                            <div className='tarifs-info-title3'>
                                           Пакет "Преміум"
                                            </div>
                                            <div className='tarifs-info-description'>
                                                <div className='tarifs-info-description-info'>
                                                    <img src={small_ellipse}></img><p>{t('promotion.promotion_tarifs.tarifs_info.description3.text1')}</p>
                                                </div>
                                                <div className='tarifs-info-description-info'>
                                                    <img src={small_ellipse}></img><p>{t('promotion.promotion_tarifs.tarifs_info.description3.text2')}</p>
                                                </div>
                                                <div className='tarifs-info-description-info'>
                                                    <img src={small_ellipse}></img><p>{t('promotion.promotion_tarifs.tarifs_info.description3.text3')}</p>
                                                </div>
                                                <div className='tarifs-info-description-info'>
                                                    <img src={small_ellipse}></img><p>{t('promotion.promotion_tarifs.tarifs_info.description3.text4')}</p>
                                                </div>
                                                <div className='tarifs-info-description-info'>
                                                    <img src={small_ellipse}></img><p>{t('promotion.promotion_tarifs.tarifs_info.description3.text5')}</p>
                                                </div>
                                            </div>
                                            <div className='tarifs-info-description-text3'>{t('promotion.promotion_tarifs.tarifs_info.price3')}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='promotion-sizes'> 
                                <div className='promotion-sizes-section'>
                                    <div className='promotion-sizes-steps'>
                                        <div className='promotion-sizes-steps-block1'>
                                            <div className='promotion-sizes-steps-block1-yellow'></div>
                                            <div>
                                            <h1>{t('promotion.promotion_sizes.section.steps.title1')}</h1>
                                            <p>{t('promotion.promotion_sizes.section.steps.text1')}</p>
                                            </div>
                                        </div>
                                        <div className='promotion-sizes-steps-block'>
                                        <h1>{t('promotion.promotion_sizes.section.steps.title2')}</h1>
                                            <p>{t('promotion.promotion_sizes.section.steps.text2')}</p>
                                        </div>
                                        <div className='promotion-sizes-steps-block'>
                                        <h1>{t('promotion.promotion_sizes.section.steps.title3')}</h1>
                                            <p>{t('promotion.promotion_sizes.section.steps.text3')}</p>
                                        </div>
                                        <div className='promotion-sizes-steps-block'>
                                        <h1>{t('promotion.promotion_sizes.section.steps.title4')}</h1>
                                            <p>{t('promotion.promotion_sizes.section.steps.text4')}</p>
                                        </div>
                                    </div>
                                    <div className='promotion-sizes-steps-banner'>
                                        <img src={banner3}></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    </div>
                    
                    <div className='promotion-request-banner-section'>

                    
                        <div className='promotion-request-banner'>
                            <div className='promotion-request-text'>
                            <h1>{t('promotion.promotion_request_banner.text.title')}</h1>
                            <p>{t('promotion.promotion_request_banner.text.description')}</p>
                            </div>
                            
                            <Link to={'/requestbanner'} className='promotion-request-button'><p>{t('promotion.promotion_request_banner.button.text')}</p> </Link>
                        </div>
                    </div>
                    {showScrollButton && (
                            <button className='to-topbtn' onClick={() => scrollToTop()}>
                                <img src={top_button} alt="Scroll to top"/>
                            </button>
                        )}
                    <div className='promotion-rules-banner'>
                         <img src={banner2}  alt="Description of Image" />
                         <div className="promotion-rules-banner-description">
                            <div className="promotion-rules-banner-text1">
                            {t('promotion.promotion_rules_banner.description.text1')}
                            </div>
                            <div className="promotion-rules-banner-text2">
                            {t('promotion.promotion_rules_banner.description.text2')}
                            </div>
                            <button className="promotion-rules-banner-button"> {t('promotion.promotion_rules_banner.description.button')}</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </main>
    )
  
}

export default Promotions