import React, { useState } from 'react';
import axios from 'axios';
import AdminSideBar from '../../components/layout/AdminSideBar';

const AddCategorySubcategory: React.FC = () => {
  // State variables for form input fields
  const [categoryName, setCategoryName] = useState('');
  const [categoryId, setCategoryId] = useState(0); // New field for category
  const [subcategoryName, setSubcategoryName] = useState('');
  const [section, setSection] = useState(''); // New field for subcategory

  // Function to handle category form submission
  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send a POST request to the category API endpoint
      await axios.post('https://localhost:7014/api/Admin/Category/Add', {
        // categoryId: categoryId,
        title: categoryName,
      });

      // Clear the input fields after successful submission
      setCategoryId(0);
      setCategoryName('');
    } catch (error) {
      console.error('Error adding category:', error);
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
      setCategoryId(0);
      setSubcategoryName('');
      setSection('');
    } catch (error) {
      console.error('Error adding subcategory:', error);
    }
  };

  return (
    <div className='admin-flex'>
      <AdminSideBar/>
      <div className='AddCategorySubcategoryPage'>
      <h1>Welcome to AddCategorySubcategory</h1>
      
      {/* Form for adding a category */}
      <form onSubmit={handleCategorySubmit}>
        <h2>Add Category</h2>
        {/* <div>
          <label htmlFor="categoryId">Category ID:</label>
          <input
            type="number"
            id="categoryId"
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            required
          />
        </div> */}
        <div className='form-container'>
        <div>
          <label htmlFor="categoryName">Category Name:</label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Category</button>
        </div>
        
      </form>

      {/* Form for adding a subcategory */}
      <form onSubmit={handleSubcategorySubmit}>
      <div className='form-container'>
        <h2>Add Subcategory</h2>
        <div>
          <label htmlFor="categoryId">Category ID:</label>
          <input
            type="number"
            id="categoryId"
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            required
          />
        </div>
        </div>
        <div className='form-container'>
        <div>
          <label htmlFor="subcategoryName">Subcategory Name:</label>
          <input
            type="text"
            id="subcategoryName"
            value={subcategoryName}
            onChange={(e) => setSubcategoryName(e.target.value)}
            required
          />
        </div>
        </div>
        <div className='form-container'>
        <div>
          <label htmlFor="section">Section:</label>
          <input
            type="text"
            id="section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Subcategory</button>
        </div>
        
      </form>
      </div>
    </div>
  );
}

export default AddCategorySubcategory;
