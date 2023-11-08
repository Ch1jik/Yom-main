import React, { useState, useEffect } from 'react';
import '../../assets/css/style.css'; // Create a CSS file for styling if needed
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/images/Group1000004232.png';
import { useTranslation } from 'react-i18next';
import arrow from '../../assets/images/footer_arrow.svg';

const Footer: React.FC = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const { t } = useTranslation();

  return (
    <footer id='footer-none'>
        <div className="footer">
            <div className='footer-leftside'>
                <div className='logoblock'>
                    <div className="centered-link" >
                        {/* <NavLink to="/">
                            <img src="/path_to_your_logo.png" alt="Your Brand Logo" style={{ height: '40px', marginRight: '10px' }} />
                        </NavLink> */}
                        <NavLink to="/">
                            {/* <img src="/path_to_your_logo.png" alt="Your Brand Logo" style={{ height: '40px', marginRight: '10px' }} /> */}
                            <div className="centered-link-logo">
                            <div className="navbar-profile-logo-link1">
                                
                            </div>
                            <img src={logo} className="navbar-profile-logo-link2"></img>
                            </div>
                        </NavLink>
                    </div>
                    <div className='logo-title-section'>
                        <NavLink className={'logo-title'} to={'/'}>Yom.ua</NavLink>
                    </div>
                </div>
                <div className='footer-description'>
                <p>{t('footer.description.text')}</p>
                </div>
                <div className="footer-social">
                    {/* Add your social links here */}
                    <a href="#" className='linkedin'><svg xmlns="http://www.w3.org/2000/svg" width="61" height="61" viewBox="0 0 61 61" fill="none">
                        <g filter="url(#filter0_d_366_1884)">
                        <path d="M25.5 2C13.0734 2 3 12.0734 3 24.5C3 36.9266 13.0734 47 25.5 47C37.9266 47 48 36.9266 48 24.5C48 12.0734 37.9266 2 25.5 2ZM19.9922 33.8258H15.4359V19.1633H19.9922V33.8258ZM17.6859 17.3633C16.2469 17.3633 15.3164 16.3437 15.3164 15.0828C15.3164 13.7961 16.275 12.807 17.7445 12.807C19.2141 12.807 20.1141 13.7961 20.1422 15.0828C20.1422 16.3437 19.2141 17.3633 17.6859 17.3633ZM36.6328 33.8258H32.0766V25.7C32.0766 23.8086 31.4156 22.5242 29.768 22.5242C28.5094 22.5242 27.7617 23.3938 27.4313 24.2305C27.3094 24.5281 27.2789 24.95 27.2789 25.3695V33.8234H22.7203V23.8391C22.7203 22.0086 22.6617 20.4781 22.6008 19.1609H26.5594L26.768 21.1977H26.8594C27.4594 20.2414 28.9289 18.8305 31.3875 18.8305C34.3852 18.8305 36.6328 20.8391 36.6328 25.1562V33.8258Z" fill="white"/>
                        </g>
                        <defs>
                        <filter id="filter0_d_366_1884" x="0" y="0" width="61" height="61" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dx="5" dy="6"/>
                        <feGaussianBlur stdDeviation="4"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_366_1884"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_366_1884" result="shape"/>
                        </filter>
                        </defs>
                        </svg>
                    </a>
                    <a href="#" className='youtube'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="61" height="61" viewBox="0 0 61 61" fill="none">
                        <g filter="url(#filter0_d_366_1883)">
                            <path d="M29.257 24.1086L23.993 21.6523C23.5336 21.4391 23.1562 21.6781 23.1562 22.1867V26.8133C23.1562 27.3219 23.5336 27.5609 23.993 27.3477L29.2547 24.8914C29.7164 24.6758 29.7164 24.3242 29.257 24.1086ZM25.5 2C13.0734 2 3 12.0734 3 24.5C3 36.9266 13.0734 47 25.5 47C37.9266 47 48 36.9266 48 24.5C48 12.0734 37.9266 2 25.5 2ZM25.5 33.6406C13.9828 33.6406 13.7812 32.6023 13.7812 24.5C13.7812 16.3977 13.9828 15.3594 25.5 15.3594C37.0172 15.3594 37.2187 16.3977 37.2187 24.5C37.2187 32.6023 37.0172 33.6406 25.5 33.6406Z" fill="white"/>
                        </g>
                        <defs>
                            <filter id="filter0_d_366_1883" x="0" y="0" width="61" height="61" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dx="5" dy="6"/>
                            <feGaussianBlur stdDeviation="4"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_366_1883"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_366_1883" result="shape"/>
                            </filter>
                        </defs>
                        </svg>
                    </a>
                    <a href="#" className='facebook'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="61" height="61" viewBox="0 0 61 61" fill="none">
                        <g filter="url(#filter0_d_366_1885)">
                            <path fillRule="evenodd" clipRule="evenodd" d="M3 24.6256C3 35.8119 11.1244 45.1138 21.75 47V30.7494H16.125V24.5H21.75V19.4994C21.75 13.8744 25.3744 10.7506 30.5006 10.7506C32.1244 10.7506 33.8756 11 35.4994 11.2494V17H32.625C29.8744 17 29.25 18.3744 29.25 20.1256V24.5H35.25L34.2506 30.7494H29.25V47C39.8756 45.1138 48 35.8137 48 24.6256C48 12.1813 37.875 2 25.5 2C13.125 2 3 12.1813 3 24.6256Z" fill="white"/>
                        </g>
                        <defs>
                            <filter id="filter0_d_366_1885" x="0" y="0" width="61" height="61" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dx="5" dy="6"/>
                            <feGaussianBlur stdDeviation="4"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_366_1885"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_366_1885" result="shape"/>
                            </filter>
                        </defs>
                        </svg>
                    </a>
                    <a href="#" className='twitter'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="61" height="61" viewBox="0 0 61 61" fill="none">
                        <g filter="url(#filter0_d_366_1857)">
                            <path d="M25.5 2C13.0748 2 3 12.0748 3 24.5C3 36.9252 13.0748 47 25.5 47C37.9252 47 48 36.9252 48 24.5C48 12.0748 37.9252 2 25.5 2ZM36.3131 18.9604C36.3281 19.1964 36.3281 19.4425 36.3281 19.6836C36.3281 27.0564 30.7132 35.5491 20.4526 35.5491C17.2885 35.5491 14.3555 34.63 11.8845 33.048C12.3365 33.0982 12.7684 33.1183 13.2305 33.1183C15.8421 33.1183 18.2427 32.2344 20.1562 30.7377C17.7054 30.6875 15.6462 29.0804 14.9431 26.8705C15.8019 26.9961 16.5753 26.9961 17.4593 26.7701C16.1973 26.5137 15.063 25.8283 14.2491 24.8304C13.4352 23.8324 12.9918 22.5835 12.9944 21.2958V21.2254C13.7327 21.6423 14.6016 21.8984 15.5106 21.9336C14.7464 21.4243 14.1197 20.7343 13.686 19.9248C13.2524 19.1153 13.0252 18.2113 13.0246 17.293C13.0246 16.2533 13.2958 15.3041 13.7829 14.4805C15.1837 16.2048 16.9316 17.6151 18.913 18.6197C20.8945 19.6243 23.0652 20.2007 25.284 20.3114C24.4955 16.5195 27.3281 13.4509 30.7333 13.4509C32.3404 13.4509 33.7868 14.1239 34.8064 15.2087C36.067 14.9727 37.2723 14.5006 38.3471 13.8677C37.9302 15.1585 37.0564 16.2483 35.8962 16.9364C37.0212 16.8158 38.106 16.5045 39.1105 16.0675C38.3521 17.1825 37.4029 18.1719 36.3131 18.9604Z" fill="white"/>
                        </g>
                        <defs>
                            <filter id="filter0_d_366_1857" x="0" y="0" width="61" height="61" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dx="5" dy="6"/>
                            <feGaussianBlur stdDeviation="4"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_366_1857"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_366_1857" result="shape"/>
                            </filter>
                        </defs>
                        </svg>
                    </a>
                    
                </div>
            </div>
            <div className="footer-columns">
                {/* Custom Footer Columns */}
                <div className="footer-column">
                {/* <h3><img className='footer-adaptivity-arrow' src={arrow}></img>{t('footer.links.title1')}</h3> */}
                <Link className='remove-style-from-link'to={'/about'}><h3><img className='footer-adaptivity-arrow' src={arrow}></img>{t('footer.links.title1')}</h3></Link>
                <ul id='footer-column1'>
                    <NavLink to={'/about'} className={"nav-li-footer"}>{t('footer.links.link1_t1')}</NavLink>
                    <NavLink to={'/'} className={"nav-li-footer"} >{t('footer.links.link2_t1')}</NavLink>
                    <NavLink to={'/'} className={"nav-li-footer"}>{t('footer.links.link3_t1')}</NavLink>
                    <NavLink to={'/'} className={"nav-li-footer"}>{t('footer.links.link4_t1')}</NavLink>
                </ul>
                </div>
                <div className="footer-column">
                {/* <h3><img className='footer-adaptivity-arrow' src={arrow}></img>{t('footer.links.title2')}</h3> */}
                <Link className='remove-style-from-link' to={'/userCare'}><h3><img className='footer-adaptivity-arrow' src={arrow}></img>{t('footer.links.title2')}</h3></Link>
                <ul id='footer-column2'>
                    <NavLink to={'/'} className={"nav-li-footer"}>{t('footer.links.link1_t2')}</NavLink>
                    <NavLink to={'/'} className={"nav-li-footer"}>{t('footer.links.link2_t2')}</NavLink>
                    <NavLink to={'/userCare'} className={"nav-li-footer"}>{t('footer.links.link3_t2')}</NavLink>
                    <NavLink to={'/'} className={"nav-li-footer"}>{t('footer.links.link4_t2')}</NavLink>
                </ul>
                </div>
                <div className="footer-column">
                {/* <h3><img className='footer-adaptivity-arrow' src={arrow}></img>{t('footer.links.title3')}</h3> */}
                <Link className='remove-style-from-link' to={'/promotions'}><h3><img className='footer-adaptivity-arrow' src={arrow}></img>{t('footer.links.title3')}</h3></Link>
                <ul id='footer-column3'>
                    <NavLink to={'/promotions'} className={"nav-li-footer"}>{t('footer.links.link1_t3')}</NavLink>
                    <NavLink to={'/'} className={"nav-li-footer"}>{t('footer.links.link2_t3')}</NavLink>
                    <NavLink to={'/'} className={"nav-li-footer"}>{t('footer.links.link3_t3')}</NavLink>
                    <NavLink to={'/'} className={"nav-li-footer"}>{t('footer.links.link4_t3')}</NavLink>
                </ul>
                </div>
                <div className="footer-column" id='footer-column4'>
                {/* <h3><img className='footer-adaptivity-arrow' src={arrow}></img>{t('footer.links.title4')}</h3> */}
                <Link className='remove-style-from-link' to={''}><h3><img className='footer-adaptivity-arrow' src={arrow}></img>{t('footer.links.title4')}</h3></Link>
                <ul >
                    <NavLink to={'/'} className={"nav-li-footer"}>{t('footer.links.link1_t4')}</NavLink>
                    <NavLink to={'/'} className={"nav-li-footer"}>{t('footer.links.link2_t4')}</NavLink>
                    <NavLink to={'/'} className={"nav-li-footer"}>{t('footer.links.link3_t4')}</NavLink>
                    <NavLink to={'/'} className={"nav-li-footer"}>{t('footer.links.link4_t4')}</NavLink>
                </ul>
                </div>
            </div>
      </div>
    </footer>
  );

};

export default Footer;
