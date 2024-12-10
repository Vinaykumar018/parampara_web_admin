// import React, { useState, useEffect } from "react";
// import { fetchCategories } from "../Services/poojaApiService";
// import PoojaCategoryForm from "./AddPoojaCategory";
// import GetTable from "../dashboard/GetTable";
// import { CButton, CSpinner} from '@coreui/react'

// const PoojaCategory = () => {
//   const [categoryData, setCategoryData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const loadCategories = async () => {
//     setLoading(true);
//     try {
//       const result = await fetchCategories();
//       if (result.status === 1) {
//         setCategoryData(result.data);
//       }
//     } catch (error) {
//       console.error("Error loading categories:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadCategories();
//   }, []);
//   const columns = [
//     { name: "S No.",selector: (row,index) => index+1},
//     // { name: "ID", selector: (row) => row._id },
//     { name: "Pooja Category", selector: (row) => row.category },
//     {
//       name: "Pooja Category Image",
//       selector: (row) =>
//         row.pooja_image ? (
//           <img src={row.pooja_image} alt={row.category} width={50} height={30} />
//         ) : (
//           "N/A"
//         ),
//     },
//     { name: "Pooja Category Description", selector: (row) => row.short_discription },
   
//     {
//       name: "Action",
//       selector: (row) => (
//         <div>
//           <CButton color="danger text-light">Delete</CButton>
//           <CButton color="info text-light">Edit</CButton>
//         </div>
//       ),
//       ignoreRowClick: true,
//       allowOverflow: true,
//       button: true,
//     },
//   ];
//   const VerticallyCentered = () => {
//     return (
//       <>
//         <PoojaCategoryForm onCategoryAdded={loadCategories} />        
//       </>
//     )
//   }
//   return (
//     <section>
//       <div className="row justify-content-center">
//       <div classNmae="col-12">
//       <div className="card shadow-lg mb-4 border-0">
//         <div class="card-header bg-dark text-white py-2">
//           <div className="d-flex align-items-center justify-content-between">
//             <h6 className="mb-0">Pooja Category</h6>
//             <div>{VerticallyCentered()}</div>
//           </div> 
//         </div>
//       {loading ? (
//         <div className="justify-content-center d-flex p-5"> 
//             <CSpinner color="primary" />
//         </div>
//       ) : (
//         <GetTable data={categoryData} columns={columns} title="Category List" />
//       )}
//       </div>
//       </div>
//       </div>
//     </section>
//   );
// };

// export default PoojaCategory;

import React, { useState, useEffect } from "react";
import { fetchCategories, createCategory } from "../Services/poojaApiService";
import PoojaCategoryForm from "./AddPoojaCategory";
import GetTable from "../dashboard/GetTable";
import { CButton, CSpinner } from "@coreui/react";

const PoojaCategory = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const result = await fetchCategories();
      if (result.status === 1) {
        setCategoryData(result.data);
      }
    } catch (error) {
      console.error("Error loading categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleFormSubmit = async (formData) => {
    try {
       const data = new FormData();
    data.append("category", formData.category);
    data.append("pooja_image", formData.pooja_image);
    data.append("short_discription", formData.short_discription);
    data.append("long_discription", formData.long_discription);
      const result = await createCategory(data);
      if (result.status === 1) {
        alert("Category created successfully!");
        loadCategories();
      } else {
        alert("Failed to create category.");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      alert("An error occurred while creating the category.");
    }
  };

  const columns = [
    { name: "S No.", selector: (row, index) => index + 1 },
    { name: "Pooja Category", selector: (row) => row.category },
    {
      name: "Pooja Category Image",
      selector: (row) =>
        row.pooja_image ? (
          <img src={`http://192.168.1.36:3000`+row.pooja_image} alt={row.category} width={50} height={30} />
        ) : (
          "N/A"
        ),
    },
    { name: "Pooja Category Description", selector: (row) => row.short_discription },
    {
      name: "Action",
      selector: (row) => (
        <div>
          <CButton color="danger text-light">Delete</CButton>
          <CButton color="info text-light">Edit</CButton>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <section>
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="card shadow-lg mb-4 border-0">
            <div className="card-header bg-dark text-white py-2">
              <div className="d-flex align-items-center justify-content-between">
                <h6 className="mb-0">Pooja Category</h6>
                <PoojaCategoryForm onSubmit={handleFormSubmit} />
              </div>
            </div>
            {loading ? (
              <div className="justify-content-center d-flex p-5">
                <CSpinner color="primary" />
              </div>
            ) : (
              <GetTable data={categoryData} columns={columns} title="Category List" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PoojaCategory;
