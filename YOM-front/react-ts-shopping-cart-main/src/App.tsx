import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Navbar } from "./components/layout/Navbar";
import EditAd from "./pages/userPages/EditAd";
import AddDataForm from "./pages/userPages/AddDataForm";
import LoginPage from "./pages/LoginPage";
import Profile from "./pages/Profile";
import Footer from "./components/layout/Footer";
import RequestBanner from "./pages/RequestBanner";
import PayForBanner from "./pages/PayForBanner";
import MyAds from "./pages/userPages/MyAds";
import Favorite from "./pages/userPages/Favorite";
import Purchased from "./pages/userPages/Purchased";
import Rating from "./pages/userPages/Rating";
import Sales from "./pages/userPages/Sales";
import SeeListings from "./pages/userPages/SeeListings";
import Settings from "./pages/userPages/Settings";
import Support from "./pages/userPages/Support";
import OrderPage from './pages/OrderPage'; 
import ProductsByTypes from "./pages/ProductsByTypes";
import ProductPage from "./pages/ProductById";
import Login from "./pages/adminPages/login";
import Dashboard from "./pages/adminPages/Dashboard";
import AddCategorySubcategory from "./pages/adminPages/AddCategorySubcategory";
import AdminHelp from "./pages/adminPages/AdminHelp";
import AdminUpdateHelp from "./pages/adminPages/AdminUpdateHelp";
import AllAds from "./pages/adminPages/AllAds";
import BlockUser from "./pages/adminPages/BlockUser";
import CreateAdmin from "./pages/adminPages/createAdmin";
import DeleteAd from "./pages/adminPages/DeleteAd";
import DeleteCategorySubcategory from "./pages/adminPages/DeleteCategorySubcategory";
import GetCategories from "./pages/adminPages/getCategories";
import Register from "./pages/adminPages/Register";
import RejectAd from "./pages/adminPages/RejectAd";
import UnblockUser from "./pages/adminPages/UnblockUser";
import UpdateAd from "./pages/adminPages/UpdateAd";
import UpdateCategorySubcategory from "./pages/adminPages/UpdateCategorySubcategory";
import UserReview from "./pages/adminPages/UserReview";
import { useLocation } from 'react-router-dom';;
import AdDetail from "./pages/adminPages/AdDetail";
import UpdateCategory from "./pages/adminPages/UpdateCategory";
import UpdateSubCategory from "./pages/adminPages/UpdateSubcategory";
import UserAdsFeedbacksRating from "./pages/userPages/AboutUser/UserAdsFeedbacksRating";
import Promotions from "./pages/Promotions";
import UserCare from "./pages/UserCare";
import ForgotPassword from "./pages/userPages/ForgotPassword";
import ValidatePassword from "./pages/userPages/ValidatePassword";
import BannerDetail from "./pages/adminPages/BannerDetail";
import AdminBanner from "./pages/adminPages/AdminBanner";
import ReportDetail from "./pages/adminPages/ReportDetail";
import CreateBanner from "./pages/adminPages/CreateBanner";
import ProtectedRoutes from "./components/layout/ProtectedRoutes";
import UserProtected from "./components/layout/UserProtected";
import ReportUser from "./pages/userPages/AboutUser/ReportUser";
import AllPayments from "./pages/adminPages/AllPayments";
import Messenger from "./pages/Massenger";
import { Header } from "./pages/adminPages/components/Header";
import { MobileHeader } from "./components/layout/MobileNavbar";


function App() {
  const location = useLocation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showMobileHeader, setShowMobileHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  useEffect(() => {
    // ... other useEffect for handleResize

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // Scrolling up
        setShowMobileHeader(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling down
        setShowMobileHeader(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener("resize", handleResize);
    
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const showFooter = () => {
    console.log(windowWidth);
    var v = location.pathname === "/login" && windowWidth <= 768;
    console.log(v);
    
    if (v) {
      return false;
    }
    return !location.pathname.startsWith("/admin");
  };
  // const showMobileHeader = () => {
  //   console.log(windowWidth);
  //   var v = location.pathname.startsWith("/login") && windowWidth >= 768;
  //   console.log(v);
    
  //   if (v) {
  //     return false;
  //   }
  //   return !location.pathname.startsWith("/login");
  // };
  return (
    
    <>
      {!location.pathname.startsWith("/admin") && <Navbar />}
      {location.pathname.startsWith("/admin") && <Header/>}
        <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/about" element={<About />} />
        
        <Route path="/login" element={<LoginPage />} />
          {/* <Route element={<UserProtected/>}> */}
            
            <Route path="/messenger/:createConversationRecipient" element={<Messenger/>} />
            <Route path="/messenger/" element={<Messenger/>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/myads"element={<MyAds/>}/>
            <Route path="/favorite"element={<Favorite/>}/>
            <Route path="/purchased"element={<Purchased/>}/>
            <Route path="/rating"element={<Rating/>}/>
            <Route path="/sales"element={<Sales/>}/>
            <Route path="/about"element={<About/>}/>
            <Route path="/promotions"element={<Promotions/>}/>
            <Route path="/usercare"element={<UserCare/>}/>
            <Route path="/seelistings"element={<SeeListings/>}/>
            <Route path="/settings"element={<Settings/>}/>
            <Route path="/support"element={<Support/>}/>
            <Route path="/products/bycategory/product/:id" element={<ProductPage />} />
            <Route path="/products/bycategory/product/order/:id" element={<OrderPage />} />
            <Route path="/products/byUser/:id" element={<OrderPage />} />
            <Route path="/userpage" element={<UserAdsFeedbacksRating/>}/>
            <Route path="/userreport/:userId" element={<ReportUser/>}/>
            <Route path="/forgot-password"element={<ForgotPassword/>} />
            <Route path="/reset-password"element={<ValidatePassword/>} />
            <Route path="/ads/bycategoryselect" element={<ProductsByTypes/>} />
            <Route path="/edit/:id" element={<EditAd/>} />
            <Route path="/add" element={<AddDataForm />} />
            
            <Route path="/requestbanner" element={<RequestBanner />} />
            <Route path="/requestbanner/pay" element={<PayForBanner />} />
          {/* </Route> */}
          <Route path="/admin/login" element={<Login/>}/>
          <Route element={<ProtectedRoutes />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            
            <Route path="/admin/dashboard/AddCategorySubcategory" element={<AddCategorySubcategory />} />
            <Route path="/admin/dashboard/AllAds" element={<AllAds />} />
            <Route path="/admin/dashboard/AdDetail/:id" element={<AdDetail />} />
            <Route path="/admin/dashboard/BlockUser" element={<BlockUser />} />
            <Route path="/admin/dashboard/CreateAdmin" element={<CreateAdmin />} />
            <Route path="/admin/dashboard/DeleteAd" element={<DeleteAd />} />
            <Route path="/admin/dashboard/DeleteCategorySubcategory" element={<DeleteCategorySubcategory />} />
            <Route path="/admin/dashboard/GetCategories" element={<GetCategories />} />
            <Route path="/admin/dashboard/Register" element={<Register />} />
            <Route path="/admin/dashboard/RejectAd" element={<RejectAd />} />
            <Route path="/admin/dashboard/UnblockUser" element={<UnblockUser />} />
            <Route path="/admin/dashboard/UpdateAd" element={<UpdateAd />} />
            <Route path="/admin/dashboard/AllPayments" element={<AllPayments />} />
            <Route path="/admin/dashboard/UpdateCategorySubcategory" element={<UpdateCategorySubcategory />} />
            <Route path="/admin/dashboard/UpdateCategory" element={<UpdateCategory />} />
            <Route path="/admin/dashboard/UpdateSubcategory" element={<UpdateSubCategory />} />
            <Route path="/admin/dashboard/UserReview" element={<UserReview />} />
            <Route path="/admin/dashboard/AdminHelp" element={<AdminHelp />} />
            <Route path="/admin/dashboard/AdminUpdateHelp" element={<AdminUpdateHelp />} />
            <Route path="/admin/createbanner" element={<CreateBanner />} />
            <Route path="/admin/bannerDetail/:id" element={<BannerDetail />} />
            <Route path="/admin/banners" element={<AdminBanner />} />
            <Route path="/admin/helpReportDetail/:id" element={<ReportDetail />} />
          </Route>
          
          

          
          
        </Routes>
        {showMobileHeader || location.pathname !== "/login" && <MobileHeader />}
        {showFooter() && <Footer />}
    </>
  )
}

export default App
