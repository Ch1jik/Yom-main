import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateCategory: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [title, setTitle] = useState('');

  useEffect(() => {
    // Fetch the current data of the category using its ID
    const fetchCategoryDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7014/api/Admin/Category/ById/${categoryId}`);
        setTitle(response.data.title); // Assuming the response has a "title" field
      } catch (error) {
        console.error('Error fetching category details:', error);
      }
    };

    fetchCategoryDetails();
  }, [categoryId]);

  const handleSubmit = () => {
    axios.put('/api/Admin/Category/Update', {
      id: Number(categoryId),
      title: title
    })
    .then(() => {
      console.log('Category updated successfully.');
      // Optionally, navigate or show a success message
    })
    .catch(error => {
      console.error('Error updating category:', error);
    });
  };

  return (
    <div className="updateCategory-container">
      <h2 className="updateCategory-title">Update Category</h2>
      <div className="updateCategory-inputWrapper">
        <input 
          className="updateCategory-input"
          type="text" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          placeholder="Category Title"
        />
      </div>
      <div className="updateCategory-buttonWrapper">
        <button className="updateCategory-button" onClick={handleSubmit}>Update</button>
      </div>
    </div>
  );
};

export default UpdateCategory;
