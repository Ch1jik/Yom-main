
import { Link } from 'react-router-dom';
import "../assets/css/style.css"
import React, { useState, useEffect } from 'react'
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
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();
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
    const [name, setName] = useState<string>('');
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


            console.log('Report submitted successfully.', response);
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
                                {t('userCare_banner.text.title')}
                                </div>
                                <div className='UserCare-banner-buttons'>
                                    <button className='UserCare-banner-button1'>{t('userCare_banner.button.button_text')}</button>
                                    <button className='UserCare-banner-button2'><img src={play}></img></button>
                                    <p className='UserCare-banner-button2-text'>{t('userCare_banner.button1.button_text1')}</p>
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
                                            {[t('bar_UserCare.tabs_UserCare.tab1'), t('bar_UserCare.tabs_UserCare.tab2'), t('bar_UserCare.tabs_UserCare.tab3'), t('bar_UserCare.tabs_UserCare.tab4'), t('bar_UserCare.tabs_UserCare.tab5'), t('bar_UserCare.tabs_UserCare.tab6'), t('bar_UserCare.tabs_UserCare.tab7'), t('bar_UserCare.tabs_UserCare.tab8')].map((tabName, index) => (
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
                                                        <p className='UserCare-description-text1'>{t('userCare_blocks.block1.description1')}</p>
                                                        <p className='UserCare-description-text2'>{t('userCare_blocks.block1.text1')}</p>
                                                    </div>
                                                </div>
                                                <div className='UserCare-blocks'>
                                                    <div className='UserCare-photo'>
                                                        <img src={photo_info1}></img>
                                                    </div>
                                                    <div className='UserCare-description'>
                                                        <p className='UserCare-description-text1'>{t('userCare_blocks.block2.description2')}</p>
                                                        <p className='UserCare-description-text2'>{t('userCare_blocks.block2.text2')}</p>
                                                    </div>
                                                </div>
                                                <div className='UserCare-blocks'>
                                                    <div className='UserCare-photo'>
                                                        <img src={photo_info3}></img>
                                                    </div>
                                                    <div className='UserCare-description'>
                                                    <p className='UserCare-description-text1'>{t('userCare_blocks.block3.description3')}</p>
                                                        <p className='UserCare-description-text2'>{t('userCare_blocks.block3.text4')}</p>
                                                    </div>
                                                </div>
                                                <div className='UserCare-blocks'>
                                                    <div className='UserCare-photo'>
                                                        <img src={photo_info2}></img>
                                                    </div>
                                                    <div className='UserCare-description'>
                                                    <p className='UserCare-description-text1'>{t('userCare_blocks.block4.description4')}</p>
                                                        <p className='UserCare-description-text2'>{t('userCare_blocks.block4.text4')}</p>
                                                    </div>
                                                </div>
                                                <div className='UserCare-blocks'>
                                                    <div className='UserCare-photo'>
                                                        <img src={photo_info4}></img>
                                                    </div>
                                                    <div className='UserCare-description'>
                                                    <p className='UserCare-description-text1'>{t('userCare_blocks.block5.description5')}</p>
                                                        <p className='UserCare-description-text2'>{t('userCare_blocks.block5.text5')}</p>
                                                    </div>
                                                </div>
                                                <div className='UserCare-blocks'>
                                                    <div className='UserCare-photo-last'>

                                                    </div>
                                                    <div className='UserCare-description'>
                                                    <p className='UserCare-description-text1'>{t('userCare_blocks.block6.description6')}</p>
                                                        <p className='UserCare-description-text2'>{t('userCare_blocks.block6.text6')}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='faq-input-email'>
                                                <div>
                                                    <div className='faq-input-email-text1'>
                                                        {t('pfaq_input_email.text.title')}
                                                    </div>
                                                    <div className='faq-input-email-text2'>
                                                    {t('pfaq_input_email.text.description')}
                                                    </div>
                                                </div>
                                                <input type="email" className='form-control' placeholder={t('pfaq_input_email.button.input_placeholder')} ></input>
                                                <button> {t('pfaq_input_email.button.button_text')}</button>
                                            </div>
                                            <div className='UserCare-section-grid'>
                                                <div className='UserCare-blocks'>
                                                    <div className='UserCare-photo'>
                                                        <img src={photo_info6}></img>
                                                    </div>
                                                    <div className='UserCare-description'>
                                                    <p className='UserCare-description-text1'>{t('userCare_blocks2.block1.description1')}</p>
                                                        <p className='UserCare-description-text2'>{t('userCare_blocks2.block1.text1')}</p>

                                                    </div>
                                                </div>
                                                <div className='UserCare-blocks'>
                                                    <div className='UserCare-photo'>
                                                        <img src={photo_info5}></img>
                                                    </div>
                                                    <div className='UserCare-description'>
                                                    <p className='UserCare-description-text1'>{t('userCare_blocks2.block2.description2')}</p>
                                                        <p className='UserCare-description-text2'>{t('userCare_blocks2.block2.text2')}</p>
                                                    </div>
                                                </div>
                                                <div className='UserCare-blocks'>
                                                    <div className='UserCare-photo'>
                                                        <img src={photo_info}></img>
                                                    </div>
                                                    <div className='UserCare-description'>
                                                    <p className='UserCare-description-text1'>{t('userCare_blocks2.block3.description3')}</p>
                                                        <p className='UserCare-description-text2'>{t('userCare_blocks2.block3.text3')}</p>

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
                                <input type="text" className='form-control' placeholder={t('UserCare_faq.button.input_placeholder')} ></input>
                            </div>
                            <img className='UserCare-faq-stroke' src={stroke}></img>
                            {/* <section> */}
                            <div className='UserCare-rules-section'>
                                <div className='UserCare-rules'>
                                    <div className='serCare-rules-blocks'>
                                        <div className='serCare-rules-block'>
                                            <div>
                                                <div className='serCare-rules-block-title'>{t('serCare_rules_blocks.text.description')}</div>
                                                <img src={photo1}></img>
                                            </div>
                                        </div>
                                        <div className='serCare-rules-block'>
                                            <div>
                                                <div className='serCare-rules-block-title'>{t('serCare_rules_blocks.text.description2')}</div>
                                                <img src={photo2}></img>
                                            </div>
                                        </div>
                                        <div className='serCare-rules-block'>
                                            <div>
                                                <div className='serCare-rules-block-title'>{t('serCare_rules_blocks.text.description3')}</div>
                                                <img src={photo3}></img>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='UserCare-bottom-tab-bar-section'>
                                        <div className="UserCare-bottom-tab-bar">
                                            <div className='UserCare-bottom-tabs'>
                                                {[t('UserCare_bottom_tab_bar.UserCare_bottom_tabs.tab1'), t('UserCare_bottom_tab_bar.UserCare_bottom_tabs.tab2'), t('UserCare_bottom_tab_bar.UserCare_bottom_tabs.tab3'), t('UserCare_bottom_tab_bar.UserCare_bottom_tabs.tab4'),t('UserCare_bottom_tab_bar.UserCare_bottom_tabs.tab5'), t('UserCare_bottom_tab_bar.UserCare_bottom_tabs.tab6')].map((tabName, index) => (
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
                                                <p className='UserCare-bottom-tab-panel-title'>{t('UserCare_bottom_tab_bar.text.title1')}</p>
                                                <p className='UserCare-bottom-tab-panel-description'>{t('UserCare_bottom_tab_bar.text.description1.text1')}</p>
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
                                    <img src={top_button} alt="Scroll to top" />
                                </button>
                            )}

                            {/* </section> */}
                            <div className='UserCare-rules-banner'>
                                <div className="userCare-ask-us-container">
                                    <h2 className="userCare-ask-us-title">{t('UserCare_rules_banner.text.title')}</h2>
                                    <form onSubmit={handleSubmit} className="userCare-ask-us-form">
                                        <input
                                            type="text"
                                            placeholder={t('UserCare_rules_banner.button.input_placeholder1')}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="userCare-ask-us-input userCare-ask-us-input-name"
                                        />
                                        <input
                                            type="email"
                                            placeholder={t('UserCare_rules_banner.button.input_placeholder2')}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="userCare-ask-us-input userCare-ask-us-input-email"
                                        />
                                        <textarea
                                            placeholder={t('UserCare_rules_banner.button.input_placeholder3')}
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            className="userCare-ask-us-input userCare-ask-us-input-textarea"
                                        />
                                        <button type="submit" className="userCare-ask-us-button">{t('UserCare_rules_banner.button.button_text')}</button>
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