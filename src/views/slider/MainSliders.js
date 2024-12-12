import React, { useState, useEffect } from "react";
import { CButton, CSpinner } from "@coreui/react";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import GetTable from "../dashboard/GetTable";
import SliderForm from "./MainSliderForm"; // Import the new SliderForm component
import { getAllSliders, createSlider, getCategories,deleteSlider } from "../Services/sliderApiService";

const Slider = () => {
  const [sliderData, setSliderData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

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

const [sliderToDelete,setSliderToDelete]=useState()
   const handleDelete = (id) => {
    
      
       setSliderToDelete(id);
      setShowModal(true);
    };
    const handleCloseModal = () => {
      setShowModal(false);
    };
    const handleConfirmDelete = async () => {
      try {
        
        const response = await deleteSlider(sliderToDelete);
        if (response.status === 1) {
          toast.success("Slider deleted successfully!");
          setSliderData(sliderData.filter((item) => item._id !== sliderToDelete));
          setShowModal(false);
        } else {
          toast.error("Failed to delete Pooja.");
        }
      } catch (error) {
        toast.error("Error deleting Pooja. Please try again.");
        console.error("Error deleting Pooja:", error);
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
          <CButton color="btn btn-danger btn-sm text-white"  onClick={() => handleDelete(row._id)}>Delete</CButton>
          <CButton color="btn btn-primary btn-sm me-2">Edit</CButton>
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
      <ConfirmDeleteModal
        show={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
    
  );
};

export default Slider;


const ConfirmDeleteModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div
      className="modal show"
      tabIndex="-1"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "400px" }}>
        <div className="modal-content" style={{ fontFamily: "'Roboto', sans-serif", borderRadius: "12px" }}>
          <div className="modal-header">
            <h5 className="modal-title fw-bold" style={{ fontSize: "1.25rem" }}>Confirm Deletion</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body text-center" style={{ fontSize: "1rem" }}>
            <p style={{ fontWeight: "500" }}>Are you sure you want to delete this Slider ?</p>
          </div>
          <div className="modal-footer d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              style={{ fontWeight: "600" }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger text-white"
              onClick={onConfirm}
              style={{ fontWeight: "600" }}
            >
              Delete
            </button>
          </div>
         
        </div>
      </div>
    </div>
  );
};