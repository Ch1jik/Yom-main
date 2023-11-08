import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateSubCategory: React.FC = () => {
  const { subcategoryId } = useParams<{ subcategoryId: string }>();
  const [title, setTitle] = useState('');
  const [section, setSection] = useState('');
  const [categoryId, setCategoryId] = useState<number | null>(null);

  useEffect(() => {
    // Fetch the current data of the subcategory using its ID
    const fetchSubCategoryDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7014/api/Admin/SubCategory/ById/${subcategoryId}`);
        setTitle(response.data.title);          // Assuming the response has a "title" field
        setSection(response.data.section);      // Assuming the response has a "section" field
        setCategoryId(response.data.categoryId); // Assuming the response has a "categoryId" field
      } catch (error) {
        console.error('Error fetching subcategory details:', error);
      }
    };

    fetchSubCategoryDetails();
  }, [subcategoryId]);

  const handleSubmit = () => {
    if (categoryId === null) {
      console.error('Category ID is not set.');
      return;
    }
    axios.put('https://localhost:7014/api/Admin/SubCategory/Update', {
      categoryId: categoryId,
      title: title,
      section: section
    })
    .then(() => {
      console.log('Subcategory updated successfully.');
      // Optionally, navigate or show a success message
    })
    .catch(error => {
      console.error('Error updating subcategory:', error);
    });
  };

  return (
    <div>
      <h2>Update SubCategory</h2>
      <input 
        type="number" 
        value={categoryId || ''}  // If categoryId is null, default to an empty string
        onChange={e => setCategoryId(Number(e.target.value))} 
        placeholder="Category ID"
      />
      <input 
        type="text" 
        value={title} 
        onChange={e => setTitle(e.target.value)} 
        placeholder="SubCategory Title"
      />
      <input 
        type="text" 
        value={section} 
        onChange={e => setSection(e.target.value)} 
        placeholder="Section"
      />
      <button onClick={handleSubmit}>Update</button>
    </div>
  );
};

export default UpdateSubCategory;
