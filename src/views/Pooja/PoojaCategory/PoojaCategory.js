import React, { useState, useEffect } from "react";
import { fetchCategories, createCategory, deletePoojaCategory } from "../../Services/poojaApiService";
import PoojaCategoryForm from "./AddPoojaCategory";
import GetTable from "../../dashboard/GetTable";
import { CButton, CSpinner } from "@coreui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdatePoojaCategoryForm from "./UpdatePoojaCategory";
import { useNavigate } from 'react-router-dom';
import ViewPoojaCategoryModal from './ViewPoojaCategoryModal'; // Import the new modal

const PoojaCategory = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [poojaCategoryToDelete, setPoojaCategoryToDelete] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false); // State for view modal visibility
  const [rowToView, setRowToView] = useState(null); // State to store the row data to view

  const navigate = useNavigate();

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

  const [responseMessage, setResponseMessage] = useState(false);

  const handleResponse = (response) => {
    setResponseMessage(response);
    if (responseMessage) {
      console.log(responseMessage);
      loadCategories();
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      const data = new FormData();
      data.append("category", formData.category);
      data.append("pooja_image", formData.pooja_image);
      data.append("short_discription", formData.short_discription);
      data.append("slug_url", formData.slug_url);
      const result = await createCategory(data);
      console.log(result);
      if (result.status === 1) {
        console.log("toast should run");
        toast.success("Category created successfully!");
        loadCategories();
      } else {
        toast.error("Category can not be created!");
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
          <img src={`http://34.131.41.101:3000${row.pooja_image}`} alt={row.category} width={50} height={30} />
        ) : (
          "N/A"
        ),
    },
    { name: "Pooja Category Description", selector: (row) => row.short_discription },
    {
      name: "Action",
      selector: (row) => (
        <div>
          <button
            onClick={() => handleView(row)}
            className="btn btn-info btn-sm me-2 text-white"
          >
            View
          </button>
          <button
            onClick={() => handleEdit(row._id, row.name, row.short_discription, row.category, row.pooja_image)}
            className="btn btn-primary btn-sm me-2"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="btn btn-danger btn-sm text-white"
          >
            Delete
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const handleView = (row) => {
    setRowToView(row); // Set the row data to view
    setViewModalVisible(true); // Show the view modal
  };

  const handleEdit = (id, name, short_discription, category, pooja_image) => {
    setCategoryToEdit({
      id,
      name,
      short_discription,
      category,
      pooja_image
    });
    setEditModalVisible(true);
  };

  const handleDelete = (id) => {
    setPoojaCategoryToDelete(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await deletePoojaCategory(poojaCategoryToDelete);
      if (response.status === 1) {
        toast.success("Pooja deleted successfully!");
        setCategoryData(categoryData.filter((item) => item._id !== poojaCategoryToDelete));
        setShowModal(false);
      } else {
        toast.error("Failed to delete Pooja.");
      }
    } catch (error) {
      toast.error("Error deleting Pooja. Please try again.");
      console.error("Error deleting Pooja:", error);
    }
  };

  return (
    <section>
      <ToastContainer />
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
        {/* Edit Modal */}
        {editModalVisible && (
          <UpdatePoojaCategoryForm
            sendResponse={handleResponse}
            initialData={categoryToEdit}
            onClose={() => setEditModalVisible(false)}
          />
        )}
        {/* Delete Modal */}
        <ConfirmDeleteModal
          show={showModal}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
        />
        {/* View Modal */}
        <ViewPoojaCategoryModal
          show={viewModalVisible}
          onClose={() => setViewModalVisible(false)}
          rowData={rowToView}
        />
      </div>
    </section>
  );
};

export default PoojaCategory;

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
            <p style={{ fontWeight: "500" }}>Are you sure you want to delete this Pooja Category?</p>
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