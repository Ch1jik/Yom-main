import { useState ,useEffect} from 'react';
import photo_inst1 from '../assets/images/aboutus/Instagram post - 8 1.png';
import photo_inst2 from '../assets/images/aboutus/Rectangle 152565840.png';
import photo_inst3 from '../assets/images/aboutus/Rectangle 152565838.png';
import photo_inst4 from '../assets/images/aboutus/Rectangle 152565839.png';
import photo_inst5 from '../assets/images/aboutus/Rectangle 152565841.png';
import photo_inst6 from '../assets/images/aboutus/Instagram post - 9 1.png';
import photo_inst7 from '../assets/images/aboutus/Instagram post - 8 1.png';
import photo_inst8 from '../assets/images/aboutus/Instagram post - 8 1.png';
import arrow from '../assets/images/arrow.svg'
import middle1 from '../assets/images/about-page-image-banner-middle1.svg'
import middle2 from '../assets/images/about-page-image-banner-middle2.svg'
import middle3 from '../assets/images/about-page-image-banner-middle3.svg'
import feedback from '../assets/images/about-feedback.png'
import top_button from '../assets/images/top-button.svg';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
export function About() {
  const { t } = useTranslation();
  const [showScrollButton, setShowScrollButton] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // This makes the scrolling smooth
    });
  };  
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
  return (
  <main>
    <div className="aboutPage">
      <div className="aboutPage-section">
        <div className='aboutPage-section-size'>
          <div className="aboutPage-banner">

          </div>
          <div className="aboutPage-banner-text">
            <div className="aboutPage-banner-text-el1">
              <h1>{t('about.banner.title')}</h1>
              <div className='aboutPage-banner-button-section'>
                <Link className=' remove-style-from-link' to={'/usercare'}>
                  <button className='aboutPage-banner-button'>Читати більше<img src={arrow}></img></button>
                </Link>
              </div>
            </div>
            <div className="aboutPage-banner-text-el2">
            {t('about.banner.description')}
           </div>
          </div>
        </div>
        <div className="aboutPage-main">
          <div className="main-section-photo">

          
          <div className="aboutPage-main-photo1">
            <div>
              <div className='aboutPage-main-middle-image'>
                <img src={middle1}></img>
              </div>
              <div className='aboutPage-main-text'>
                <p className='aboutPage-main-title'>3000 працівників</p>
                <p className='aboutPage-main-description'>Наш колектив - це команда компетентних фахівців, яка об'єднує зусилля для досягнення успіху в усіх наших проектах і завданнях."</p>
              </div>
            </div>
          </div>
          <div className="aboutPage-main-photo2">
            <div>
              <div className='aboutPage-main-middle-image'>
              <img src={middle2}></img>
              </div>
              <div className='aboutPage-main-text'>
                <p className='aboutPage-main-title'>З нами понад 10 країн світу </p>
                <p className='aboutPage-main-description'>Ми працюємо в різних  куточках світу, щоб принести нашим клієнтам найкращі рішення та послуги</p>
              </div>
            </div>
          </div>
          <div className="aboutPage-main-photo3">
            <div>
              <div className='aboutPage-main-middle-image'>
              <img src={middle3}></img>
              </div>
              <div className='aboutPage-main-text'>
                <p className='aboutPage-main-title'> 320 млн користувачів</p>
                <p className='aboutPage-main-description'>Наша  спільнота налічує понад 320 мільйонів активних користувачів, і це число продовжує зростати.</p>
              </div>
            </div>
          </div>
          </div>
        </div>
        <div className="aboutPage-bottom">
          <div>
          <div className="bottom-text">
          {t('about.bottom.text')}
          </div>
          <div className="bottom-description">
          {t('about.bottom.description')}
          </div>
          <div className="bottom-sponsors">
            <div className="sponsors-el">

            </div>
            <div className="sponsors-el">
              
            </div>
            <div className="sponsors-el">
              
            </div>
            <div className="sponsors-el">
              
            </div>
          </div>
          <div className="bottom-photo-section">
            <div className="bottom-photo-section1">
              <div className="bottom-photo-section1-el1">

              </div>
              <div className="bottom-photo-section1-el2">

              </div>
              <div className="bottom-photo-section1-el3">

              </div>
            </div>
            <div className="bottom-photo-section2">
                <div className="bottom-photo-section2-el1">

                </div>
                <div className="bottom-photo-section2-el2">

                </div>
                <div className="bottom-photo-section2-el3">
                  
                </div>
            </div>
          </div>
          
          </div>
        </div>
        <div className="aboutPage-bottom-inst">
          <div>
          <div className="about-social">
            
            <div className="about-social-text">
            {t('about.bottom.followUs')}
            </div>
            <div className="about-social-photo">
              <div className="about-social-photo-el">
                <img className="" src={photo_inst1}></img>
              </div>
              <div className="about-social-photo-el">
                <div className='about-social-photo-el-grid'>
                  <img className="about-social-photo-el-grid-el" src={photo_inst2}></img>
                  <img className="about-social-photo-el-grid-el" src={photo_inst3}></img>
                  <img className="about-social-photo-el-grid-el" src={photo_inst4}></img>
                  <img className="about-social-photo-el-grid-el" src={photo_inst5}></img>
                </div>
                
              </div>
              <div className="about-social-photo-el">
              <img className="" src={photo_inst6}></img>
              </div>
              <div className="about-social-photo-el">
                <img className=""></img>
              </div>
              
            </div>
          </div>
          </div>
        </div>
        <div className="aboutPage-bottom-feedback">
          
            <div className='aboutPage-bottom-feedback-left'>
              <img src={feedback}></img>
            </div>
            <div className='aboutPage-bottom-feedback-right'>
              <div>
                <p className='aboutPage-bottom-feedback-right-title'>Не зволікайте, поділіться з нами чимось корисним!)</p>
                <p className='aboutPage-bottom-feedback-right-description'>Якщо у вас є питання або пропозиції. Ми завжди на зв’язку.</p>
              </div>
              <div>
                <Link to={''}>
                  <button className='aboutPage-bottom-feedback-right-button'>Поділитись</button>
                </Link>
              </div>
            </div>
         
        </div>
        {showScrollButton && (
          <button className='to-topbtn' onClick={() => scrollToTop()}>
              <img src={top_button} alt="Scroll to top"/>
          </button>
      )}
        <section>
          <div>
            
          </div>
        </section>
      </div>
    </div>
  </main>
  )
}
