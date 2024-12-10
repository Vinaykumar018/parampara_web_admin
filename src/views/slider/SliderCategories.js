
//imports 
import React, { useState, useEffect } from "react";
import { CButton, CSpinner } from "@coreui/react";
import GetTable from "../dashboard/GetTable";
import { getCategories,createCategory } from "../Services/sliderApiCategoryService";
import SliderFormCategory from "./SliderFormCategory";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; 



const SliderCategoryList = () => {

  //same state syntax
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

 //for fetching data nd call from service api
    const fetchCategoryData = async () => {
      setLoading(true);
      try {
        const result = await getCategories();
        if (result.status === 1) {
          setCategoryData(result.data);
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
      fetchCategoryData();
    }, []);


    //form submit pass and receive data
  const handleFormSubmit = async (formData) => {
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("image", formData.image);
      form.append("category", formData.category);

      const result = await createCategory(form);
      if (result.status === 1) {
       
        toast.success("Slider category created successfully!");
        fetchCategoryData()
       
      } else {
        toast.error("Failed to create Slider category."); 
      }
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("An error occurred while creating the Slider category."); 
    }
  };


  //table columns
  const columns = [
    { name: "S No.", selector: (row, index) => index + 1 },
    { name: "Slider Cateogry", selector: (row) => row.name },
    {
      name: "Slider Category Image",
      selector: (row) =>
        row.image ? (
          <img src={`${row.image}`} alt={row.name} width={50} height={30} />
        ) : (
          "N/A"
        ),
    },
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
    <div>
      <div className="card shadow-lg mb-4 border-0">
        <div className="card-header bg-dark text-white py-2">
          <div className="d-flex align-items-center justify-content-between">
            <h6 className="mb-0">Slider Category List</h6>
            <SliderFormCategory onSubmit={handleFormSubmit} />
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
  );
};

export default SliderCategoryList;
