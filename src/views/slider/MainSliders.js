import React, { useState, useEffect } from "react";
import { CButton, CSpinner } from "@coreui/react";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import GetTable from "../dashboard/GetTable";
import SliderForm from "./MainSliderForm"; // Import the new SliderForm component
import { getAllSliders, createSlider, getCategories } from "../Services/sliderApiService";

const Slider = () => {
  const [sliderData, setSliderData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch slider data
  const fetchSliderData = async () => {
    try {
      const result = await getAllSliders();
      if (result.status === 1) {
        setSliderData(result.data);
      }
    } catch (error) {
      console.error("Error fetching slider data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSliderData();
  }, []);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const result = await getCategories();
        if (result.status === 1) {
          setCategories(result.data);
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchCategoryData();
  }, []);

  // Handle form submission to add a new slider
  const handleFormSubmit = async (formData) => {
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("image", formData.image);
      form.append("category", formData.category);
      form.append("images", formData.images);

      const result = await createSlider(form);
      if (result.status === 1) {
        toast.success("Slider created successfully!"); // Success toast
        fetchSliderData(); // Re-fetch slider data
      } else {
        toast.error("Failed to create slider."); // Error toast
      }
    } catch (error) {
      console.error("Error creating slider:", error);
      toast.error("An error occurred while creating the slider."); // Error toast
    }
  };

  // Table columns for Sliders
  const columns = [
    { name: "S No.", selector: (row, index) => index + 1 },
    { name: "Slider Name", selector: (row) => row.name },
    { name: "Slider Category Name", selector: (row) => row.category },
    {
      name: "Slider Image",
      selector: (row) =>
        row.image ? (
          <img
            src={`${row.image}`}
            alt={row.name}
            width={50}
            height={30}
          />
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
      <ToastContainer /> {/* Toastify container */}
      <div className="card shadow-lg mb-4 border-0">
        <div className="card-header bg-dark text-white py-2">
          <div className="d-flex align-items-center justify-content-between">
            <h6 className="mb-0">Slider List</h6>
            <SliderForm categories={categories} onSubmit={handleFormSubmit} />
          </div>
        </div>
        {/* Loading Indicator or Table */}
        {loading ? (
          <div className="justify-content-center d-flex p-5">
            <CSpinner color="primary" />
          </div>
        ) : (
          <GetTable
            data={sliderData}
            columns={columns}
            title="Slider List"
          />
        )}
      </div>
    </div>
  );
};

export default Slider;
