import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSideBar from '../../components/layout/AdminSideBar';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
type Category = {
  id: number;
  title: string;
};

type SubCategory = {
  id: number;
  categoryId: number;
  title: string;
  section: string;
};

const GetCategories: React.FC = () => {
  type ModalContent = {
    type: 'category' | 'subcategory' | '';
    id: number | null;
    data?: Category | SubCategory;
  };
  
  const [modalContent, setModalContent] = useState<ModalContent>({ type: '', id: null });
  
  const [categories, setCategories] = useState<Category[]>([]);
const [subcategories, setSubcategories] = useState<SubCategory[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
// const [modalContent, setModalContent] = useState({type: '', id: null});
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch data from the Category API endpoint
    axios.get('https://localhost:7014/api/Category/AllCategories')
      .then(response => {
        setCategories(response.data);
        console.log('====================================');
        console.log(response.data);
        console.log('====================================');
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });

    // Fetch data from the SubCategory API endpoint
    axios.get('https://localhost:7014/api/SubCategory/AllSubCategories')
      .then(response => {
        setSubcategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching subcategories:', error);
      });
  }, []);

  const handleDeleteCategory = (categoryId: number) => {
    axios.delete(`https://localhost:7014/api/Admin/Category/Delete/${categoryId}`)
      .then(() => {
        console.log('Category deleted successfully.');
        setCategories(prevCategories => prevCategories.filter(cat => cat.id !== categoryId));
      })
      .catch(error => {
        console.error('Error deleting category:', error);
      });
  };
  const handleDeleteSubCategory = (subCategoryId: number) => {
    axios.delete(`https://localhost:7014/api/Admin/SubCategory/Delete`, {
      params: {
        subCategoryId: subCategoryId,
      }
    })
    .then(() => {
      console.log('Subcategory deleted successfully.');
      setSubcategories(prevSubcategories => prevSubcategories.filter(subcat => subcat.id !== subCategoryId));
    })
    .catch(error => {
      console.error('Error deleting subcategory:', error);
    });
  };
  const handlePopUp = (type: 'category' | 'subcategory', id: number, data: Category | SubCategory) => {
    setModalContent({ type, id, data });
    setIsModalOpen(true);
  };
  const handleUpdateForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
  
    if (modalContent.type === 'category') {
      // Update the category
    } else if (modalContent.type === 'subcategory') {
      // Update the subcategory using the provided endpoint
      try {
        const response = await axios.put('/api/Admin/SubCategory/Update', formData);
        if (response.status === 200) {
          // Handle the updated subcategory data e.g., refresh the data
          closeModal();
        } else {
          console.error("Error updating subcategory");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
    
  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent({type: '', id: null});
  };
    
  return (
    <div className='admin-flex'>
      <AdminSideBar />
      <div className='getCategory-adminContent'>
      
      <h1>Welcome to Home Page</h1>
      {
        
      isModalOpen && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000, background: 'white', padding: '20px', border: '1px solid black' }}>
          <h3>Update {modalContent.type}</h3>
          <form onSubmit={handleUpdateForm}>
            <input type="hidden" name="id" value={modalContent.id || ''} />

            <label>Title:</label>
            <input type="text" name="title" defaultValue={modalContent.data?.title || ''} required />

            {modalContent.type === 'subcategory' && (
              <>
                <label>Category ID:</label>
                <input type="number" name="categoryId" defaultValue={modalContent.data && 'categoryId' in modalContent.data ? modalContent.data.categoryId : ''} required />

                <label>Section:</label>
                <input type="text" name="section" defaultValue={(modalContent.data as SubCategory)?.section || ''} required />
              </>
            )}
            
            <button type="submit">Update</button>
            <button onClick={closeModal}>Cancel</button>
          </form>
        </div>
      )
    }

      <h2>Categories</h2>
      <table className="getCategory-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.title}</td>
              <td>
                {/* <Link to={`/admin/updateCategory/${category.id}`}>Update</Link> */}
                <button onClick={() => handlePopUp('category', category.id, category)}>Update</button>

              
                <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <h2>Subcategories</h2>
      <table className="getCategory-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Category ID</th>
            <th>Title</th>
            <th>Section</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {subcategories.map(subcategory => (
            <tr key={subcategory.id}>
              <td>{subcategory.id}</td>
              <td>{subcategory.categoryId}</td>
              <td>{subcategory.title}</td>
              <td>{subcategory.section}</td>
              <td>
                {/* <Link to={`/admin/updateSubCategory/${subcategory.id}`}>Update</Link> */}
                <button onClick={() => handlePopUp('subcategory', subcategory.id, subcategory)}>Update</button>

              
              <button onClick={() => handleDeleteSubCategory(subcategory.id)}>Delete</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
    
  );
  
}

export default GetCategories;
