import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSideBar: React.FC = () => {
  return (
    <nav className="admin-sidebar">
      <ul className='nav-items'>
        <li className='li-items'>
          <NavLink to="/admin/dashboard">
          Активнісь та Активність
          </NavLink>
        </li>
        <li className='li-items'>
          <NavLink to="/admin/banners">
            Баннери
          </NavLink>
        </li>
        <li className='li-items'>
          <NavLink to="/admin/dashboard/AllPayments">
            Усі транзакції
          </NavLink>
        </li>
        <li className='li-items'>
          <NavLink to="/admin/createbanner">
            Створити Банери
          </NavLink>
        </li>
        <li className='li-items'>
          <NavLink to="/admin/dashboard/AddCategorySubcategory">
            Створити Категорію/Сабкатегорію
          </NavLink>
        </li>
        <li className='li-items'>
          <NavLink to="/admin/dashboard/AllAds">
            Усі товари
          </NavLink>
        </li>
        <li className='li-items'>
          <NavLink to="/admin/dashboard/BlockUser">
            Усі юзери
          </NavLink>
        </li>
        
        {/* <li className='li-items'>
          <NavLink to="/admin/dashboard/DeleteAd">
            Delete Ad
          </NavLink>
        </li> */}
        {/* <li className='li-items'>
          <NavLink to="/admin/dashboard/DeleteCategorySubcategory">
            Delete Category/Subcategory
          </NavLink>
        </li> */}
        <li className='li-items'>
          <NavLink to="/admin/dashboard/GetCategories">
            Усі категоріі та сабкатегоріі
          </NavLink>
        </li>
        {/* <li className='li-items'>
          <NavLink to="/admin/dashboard/Register">
            Register
          </NavLink>
        </li> */}
        {/* <li className='li-items'>
          <NavLink to="/admin/dashboard/RejectAd">
            Reject Ad
          </NavLink>
        </li> */}
        {/* <li className='li-items'>
          <NavLink to="/admin/dashboard/UnblockUser">
            Unblock User
          </NavLink>
        </li> */}
        {/* <li className='li-items'>
          <NavLink to="/admin/dashboard/UpdateAd">
            Update Ad
          </NavLink>
        </li> */}
        {/* <li className='li-items'>
          <NavLink to="/admin/dashboard/UpdateCategorySubcategory">
            Update Category/Subcategory
          </NavLink>
        </li> */}
        {/* <li className='li-items'>
          <NavLink to="/admin/dashboard/UserReview">
            User Review
          </NavLink>
        </li> */}
        <li className='li-items'>
          <NavLink to="/admin/dashboard/AdminHelp">
            Admin Help
          </NavLink>
        </li>
        <li className='li-items'>
          <NavLink to="/admin/dashboard/AdminUpdateHelp">
            Admin Update Help
          </NavLink>
        </li>
        {/* <li className='li-items'>
          <NavLink to="/admin/dashboard/RejectAd">
          Активнісь
          </NavLink>
        </li>
        <li className='li-items'>
          <NavLink to="/admin/dashboard/UnblockUser">
          Аналітика
          </NavLink>
        </li>
        <li className='li-items'>
          <NavLink to="/admin/dashboard/UpdateAd">
          Модерація
          </NavLink>
        </li>
        <li className='li-items'>
          <NavLink to="/admin/dashboard/UpdateCategorySubcategory">
          Реклама/ банери
          </NavLink>
        </li>
        <li className='li-items'>
          <NavLink to="/admin/dashboard/UserReview">
          Блог
          </NavLink>
        </li>
        <li className='li-items'>
          <NavLink to="/admin/dashboard/AdminHelp">
          Повідомлення
          </NavLink>
        </li>
        <li className='li-items'>
          <NavLink to="/admin/dashboard/AdminUpdateHelp">
          Рекламні пакети
          </NavLink>
        </li>
        <li className='li-items'>
          <NavLink to="/admin/dashboard/AdminUpdateHelp">
          SEO  та маркетинг
          </NavLink>
        </li>
        <li className='li-items'>
          <NavLink to="/admin/dashboard/AdminUpdateHelp">
          Звіти
          </NavLink>
        </li>
        <li className='li-items'>
          <NavLink to="/admin/dashboard/AdminUpdateHelp">
          Режим розробника
          </NavLink>
        </li>

        <li className='li-items'>
          <NavLink to="/admin/dashboard/AdminUpdateHelp">
          Персональні завдання 
          </NavLink>
        </li>
        <li className='li-items'>
          <NavLink to="/admin/dashboard/AdminUpdateHelp">
           Налаштування 
          </NavLink>
        </li>
        <li className='li-items'>
          <NavLink to="/admin/dashboard/AdminUpdateHelp">
           Сервіс
          </NavLink>
        </li> */}
        {/* Add more NavLink elements for additional routes */}
      </ul>
    </nav>
  );
};

export default AdminSideBar;
