import React, { useState } from 'react';
import axios from 'axios';
import AdminSideBar from '../../components/layout/AdminSideBar';
import '../../assets/css/AdminPages/adminCategoryAdd.css';

interface CategoryForm {
  title: string,
  photo: File | null,
}

const AddCategorySubcategory: React.FC = () => {
  // State variables for form input fields
  const [categoryName, setCategoryName] = useState('');
  const [categoryId, setCategoryId] = useState<number>(); // New field for category
  const [subcategoryName, setSubcategoryName] = useState('');
  const [section, setSection] = useState(''); // New field for subcategory
  const [formData, setFormData] = useState<CategoryForm>({
    title: "",
    photo: null,
  });
  // Function to handle category form submission
  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      e.preventDefault();  // prevent default form submission
      const data = new FormData();
      data.append('title', categoryName);
      if (formData.photo) {
        data.append('photo', formData.photo); // append file to FormData
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      console.log(formData.photo);
      console.log(formData.title);

      const response = await axios.post('https://localhost:7014/api/Admin/Category/Add', data, config);
      if (response.status === 200) {
        console.log("Category created successfully");

      } else {
        console.error("Error creating the category:", response.data);
      }
    } catch (error) {
      console.error("Error while trying to create the category:", error);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // If there's a file selected
      setFormData({
        ...formData,
        photo: e.target.files[0]
      });
    } else {
      // If there's no file selected or the file is deleted
      setFormData({
        ...formData,
        photo: null
      });
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Ensure the input is a positive number
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      setCategoryId(value);
    }
  };

  // Function to handle subcategory form submission
  const handleSubcategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('====================================');
    console.log(categoryId);
    console.log('====================================');
    try {
      // Send a POST request to the subcategory API endpoint
      await axios.post('https://localhost:7014/api/Admin/SubCategory/Add', {
        categoryId: categoryId,
        title: subcategoryName,
        section: section,
      });

      // Clear the input fields after successful submission
      setSubcategoryName('');
      setSection('');
    } catch (error) {
      console.error('Error adding subcategory:', error);
    }
  };

  return (
    <div className='admin-flex'>
      <AdminSideBar />
      <div className='admin-Createcategory'>
        <h2>Ласкаво просимо до додавання категорії/підкатегорії</h2>

        {/* Форма для додавання категорії */}
        <form onSubmit={handleCategorySubmit}>
          <div className='category-form-container'>
            <h2>Додати Категорію</h2>
            <div className='admin-category-input-data'>
              <label htmlFor="categoryName">Назва категорії:</label>
              <input
                type="text"
                id="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </div>
            <div className='admin-category-input-data'>
              <label htmlFor="photo">Фото:</label>
              <input
                type="file" id="photo" className='admin-input-photo' style={{ visibility: "visible" }}
                onChange={handlePhotoChange} required
              />
            </div>
            <div className='admin-category-input-button'>
              <button className='submit-category-btn' type="submit">Додати Категорію</button>
            </div>
          </div>
        </form>

        <form onSubmit={handleSubcategorySubmit}>
          <div className='category-form-container'>
            <h2>Додати Підкатегорію</h2>
            <div className='admin-category-input-data' >
              <label htmlFor="categoryId">Номер категорії:</label>
              <input
                type="number"
                id="categoryId"
                value={categoryId}
                min="0"
                onChange={handleCategoryChange}
                required
              />
            </div>
            <div className='admin-category-input-data'>
              <label htmlFor="subcategoryName">Назва підкатегорії:</label>
              <input
                type="text"
                id="subcategoryName"
                value={subcategoryName}
                onChange={(e) => setSubcategoryName(e.target.value)}
                required
              />
            </div>
            <div className='admin-category-input-data'>
              <label htmlFor="section">Розділ:</label>
              <input
                type="text"
                id="section"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                required
              />
            </div>
            <div className='admin-category-input-button'>
              <button style={{ float: "right" }} className='submit-category-btn' type="submit">Додати Підкатегорію</button>
            </div>

          </div>

        </form>
      </div>

    </div>
  );
}

export default AddCategorySubcategory;
