import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import svg from "../../assets/images/Vector3168.svg"
interface Category {
  id: number;
  title: string;
}

interface SubCategory {
  id: number;
  categoryId: number;
  title: string;
  section: string;
}

interface Props {
  activeCategory: number | null;
  onCategoryHover: (categoryId: number | null) => void;
  onCloseDropdown: () => void;  // Add this line
  
}

const DependentDropdowns: React.FC<Props> = ({ activeCategory, onCategoryHover, onCloseDropdown }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [categorieschoose, setCategorieschoose] = useState<number>();
  const navigate = useNavigate();
  
  const groupBySection = (subCategories: SubCategory[]): Record<string, SubCategory[]> => {
    return subCategories.reduce((acc, subCategory) => {
      if (!acc[subCategory.section]) {
        acc[subCategory.section] = [];
      }
      acc[subCategory.section].push(subCategory);
      return acc;
    }, {} as Record<string, SubCategory[]>);
  };
  
  useEffect(() => {
    axios.get<Category[]>('https://localhost:7014/api/Category/AllCategories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
    

  }, []);
  
  const fetchSubCategories = (categoryId: number | null) => {
      console.log('====================================');
      console.log(categoryId);
      console.log('====================================');
      axios.get<SubCategory[]>(`https://localhost:7014/api/SubCategory/AllSubCategories/${categoryId}`)
        .then(response => setSubCategories(response.data))
        .catch(error => console.error('Error fetching sub-categories:', error));
    
  };
  const handleCategoryClick = (categoryId: number) => {
    navigate(`/ads/bycategoryselect?type=category&categoryId=${categoryId}`);
    onCloseDropdown();
  };
  const handleSubCategoryClick = (subCategoryId: number) => {
    
    navigate(`/ads/bycategoryselect?type=category&categoryId=${activeCategory}&subCategoryId=${subCategoryId}`);
    onCloseDropdown();
  };
  const groupedSubCategories = groupBySection(subCategories);
  return (
    
    <div className='dep-dropdown-item-section'>
      <div className='dep-dropdown-item'>
        {categories.map(category => (
          <div key={category.id} className="align-items-center mb-2 ">
            <div  className='category-dependent-style'>
              <div 
                onMouseEnter={() => {
                  onCategoryHover(category.id);
                  setCategorieschoose(category.id)
                  fetchSubCategories(category.id);  // Fetch subcategories on hover
                }}
                
                onClick={() => handleCategoryClick(category.id)}
                className="nav-category-choose"
              >
                {category.title}
                
              </div>
              <img src={svg} className='dependent-svg'></img>
            </div>
            
            
          </div>
        ))}
      </div>
      <div className='subcategory-dependent-style'>
        {activeCategory === categorieschoose &&
          Object.keys(groupedSubCategories).map(section => (
            <div key={section} className='subcategory-choose-block'>
              <h4>{section}</h4> 
              {groupedSubCategories[section].map(subCategory => (
                <div 
                  key={subCategory.id}
                  onClick={() => handleSubCategoryClick(subCategory.categoryId)}
                  className="nav-subcategory-choose"
                >
                  {subCategory.title}
                </div>
              ))}
            </div>
          ))
        }
      </div>
    
    </div>
  );
};// ... other code ...

// return (
//   <div className="dropdown-container">
//     <div className="categories-container">
//       {categories.map(category => (
//         <div 
//           key={category.id}
//           onMouseEnter={() => {
//             onCategoryHover(category.id);
//             fetchSubCategories(category.id);  // Fetch subcategories on hover
//           }}
//           onClick={() => handleCategoryClick(category.id)}
//           className="nav-category-choose"
//         >
//           {category.title}
//         </div>
//       ))}
//     </div>
    
//     <div className="subcategories-container">
//       {activeCategory !== null && 
//         subCategories.map((subCategory) => (
//           <div 
//             key={subCategory.id}
//             onClick={() => handleSubCategoryClick(subCategory.categoryId)}
//             className="nav-subcategory-choose"
//           >
//             {subCategory.title} - {subCategory.section}
//           </div>
//         ))
//       }
//     </div>
//   </div>
// );


export default DependentDropdowns;
