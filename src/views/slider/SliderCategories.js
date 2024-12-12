import React, { useState, useEffect } from "react";
import { CButton, CSpinner } from "@coreui/react";
import GetTable from "../dashboard/GetTable";
import { getCategories, createCategory } from "../Services/sliderApiCategoryService";
import SliderFormCategory from "./SliderFormCategory";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; 
import { deleteSliderCategory } from "../Services/sliderApiService";
import UpdateSliderCategoryForm from "./UpdateSliderCategoryForm";

const SliderCategoryList = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [sliderToDelete, setSliderToDelete] = useState(null);
  const [categoryToEdit, setCategoryToEdit] = useState(null); // For editing category

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

  const handleFormSubmit = async (formData) => {
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("image", formData.image);
      form.append("category", formData.category);

      const result = await createCategory(form);
      if (result.status === 1) {
        toast.success("Slider category created successfully!");
        fetchCategoryData();
      } else {
        toast.error("Failed to create Slider category.");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("An error occurred while creating the Slider category.");
    }
  };

  const handleDelete = (id) => {
    setSliderToDelete(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await deleteSliderCategory(sliderToDelete);
      if (response.status === 1) {
        toast.success("Slider Category deleted successfully!");
        setCategoryData(categoryData.filter((item) => item._id !== sliderToDelete));
        setShowModal(false);
      } else {
        toast.error("Failed to delete category.");
      }
    } catch (error) {
      toast.error("Error deleting category. Please try again.");
      console.error("Error deleting category:", error);
    }
  };

  const handleEdit = (id, name, image) => {
    setCategoryToEdit({ id, name, image });
    setEditModalVisible(true); // Show the edit modal
  };

  const columns = [
    { name: "S No.", selector: (row, index) => index + 1 },
    { name: "Slider Category", selector: (row) => row.name },
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
          <CButton color="danger" onClick={() => handleDelete(row._id)}>Delete</CButton>
          <CButton color="primary" onClick={() => handleEdit(row._id, row.name, row.image)}>Edit</CButton>
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

      {categoryToEdit && (
        <UpdateSliderCategoryForm
          initialData={categoryToEdit}
          onClose={() => setCategoryToEdit(null)} // Close edit modal
        />
      )}

      <ConfirmDeleteModal
        show={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

const ConfirmDeleteModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="modal show" tabIndex="-1" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "400px" }}>
        <div className="modal-content" style={{ fontFamily: "'Roboto', sans-serif", borderRadius: "12px" }}>
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Confirm Deletion</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body text-center">
            <p style={{ fontWeight: "500" }}>Are you sure you want to delete this Slider?</p>
          </div>
          <div className="modal-footer d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={onConfirm}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderCategoryList;

