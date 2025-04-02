import React, { useState, useEffect } from 'react';
// import { deleteProduct CategoryCategory } from '../../views/Services/Product CategoryMandalApiService.js';
import { UpdateBhajanMandalStatus } from '../../Services/BhajanMandalApiService';
import { createCategory,fetchCategories,deleteProductCategory,UpdateProductCategoryStatus } from '../../Services/productApiService';
import GetTable from '../../dashboard/GetTable';
import { CButton, CSpinner } from '@coreui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import ReadMoreText from '../../../components/ReadMoreText';
import ProductCategoryForm from './ProductCategoryForm';
import UpdateProductCategory from './UpdateProductCategory';
import ViewProductCategory from './ViewProductCategory';

const ProductCategory = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [productCategoryToDelete, setProductCategoryToDelete] = useState(null);

  const navigate = useNavigate();
  const loadCategories = async () => {
    setLoading(true);
    try {
      const result = await fetchCategories();
      if (result.status === 1) {
        setCategoryData(result.data);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadCategories();
  }, []);
  console.log(categoryData);
  const [responseMessage, setResponseMessage] = useState(false);
  // Function to handle response from the child
  const handleResponse = (response) => {
    setResponseMessage(response);
    if (responseMessage) {
      console.log(responseMessage);
      loadCategories();
    } // Store the response in state
  };

  const handleFormSubmit = async (formData) => {
    try {
      const data = new FormData();
      data.append('category_name', formData.category_name);
      data.append('category_image', formData.category_image);
      data.append('discription', formData.discription);
      data.append('slug_url', formData.slug_url);
      const result = await createCategory(data);
      console.log(result);
      if (result.status === 1) {
        console.log('toast should run');
        toast.success('Category created successfully!');
        loadCategories();
      } else {
        toast.error('Category cannot be created!');
      }
    } catch (error) {
      console.error('Error creating category:', error);
      alert('An error occurred while creating the category.');
    }
  };

  const columns = [
    { 
      name: 'S No.', 
      selector: (row, index) => index + 1, 
      grow: 0.3 // Adjusts space dynamically
    },
    { 
      name: 'Product Category', 
      selector: (row) => 
      (
        <>
        <img
            src={`http://34.131.41.101:3000/` + row.category_image}
            alt={row.category_name}
            // width={100}
            height={100}
          />
          <p style={{textAlign:"center",fontWeight:"700",fontSize:"15px"}}>{row.category_name}</p>
        </>
      ), 
      wrap: true, // Ensures text wraps properly
      grow: 1 
    },
    {
      name: 'Description',
      selector: (row) => (
        <>
          <ReadMoreText text={ row.discription}/>
        </>
      ),
      wrap: true, // Prevents overflow
      grow: 1.5, // Adjusts dynamically
    },
    {
      name: 'Status',
      selector: (row) => (
        <span
          className={`badge ${row.status === '1' ? 'bg-success' : 'bg-danger'}`}
          style={{ cursor: 'pointer' }}
          onClick={() => updateStatus(row._id, row.status)}>
          {row.status === '1' ? 'Active' : 'Inactive'}
        </span>
      ),
      grow: 0.5,
      allowOverflow: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div
          style={{
            display: "flex",
            gap: "8px", // Uniform spacing between buttons
            justifyContent: "center", // Align buttons in the center
            flexWrap: "nowrap", // Prevent overflow and wrap buttons when necessary
          }}
        >
          <button
            onClick={() =>
              handleEdit(
                row._id,
                row.discription,
                row.category_name,
                row.discription,
                row.slug_url
              )
            }
            className="btn btn-primary btn-sm"
            
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="btn btn-danger btn-sm text-white"
           
          >
            Delete
          </button>
          <button
            onClick={() => handleView(row)}
            className="btn btn-info btn-sm text-white"
          
          >
            View
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "250px", // Fixed width for consistent layout
    },
    
  ];
  
  const updateStatus=async(id,status)=>{
    console.log(status=='active')
    if(status=='active'){
      UpdateProductCategoryStatus(id,'inactive')
      loadCategories()
    }else{
      UpdateProductCategoryStatus(id,'active')
      loadCategories()

    }
}
  const handleEdit = (id,  discription, category_name, category_image,slug_url) => {
    setCategoryToEdit({
      id,
      discription,
      category_name,
      category_image,
      slug_url
    });
    setEditModalVisible(true);
  };

  const handleDelete = (id) => {
    setProductCategoryToDelete(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await deleteProductCategory(productCategoryToDelete);
      if (response.status === 1) {
        toast.success('Product Category deleted successfully!');
        setCategoryData(
          categoryData.filter((item) => item._id !== productCategoryToDelete),
        );
        setShowModal(false);
      } else {
        toast.error('Failed to delete Product Category.');
      }
    } catch (error) {
      toast.error('Error deleting Product Category. Please try again.');
      console.error('Error deleting Product Category:', error);
    }
  };

  const [viewModalVisible, setViewModalVisible] = useState(false);
const [rowToView, setRowToView] = useState(null);

  const handleView = (row) => {
    setRowToView(row);
    setViewModalVisible(true);
  };

  return (
    <section>
      <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="card shadow-lg mb-4 border-0">
            <div className="card-header bg-dark text-white py-2">
              <div className="d-flex align-items-center justify-content-between">
                <h6 className="mb-0">Product Category</h6>
                <ProductCategoryForm onSubmit={handleFormSubmit} />

              </div>
            </div>
            {loading ? (
              <div className="justify-content-center d-flex p-5">
                <CSpinner color="primary" />
              </div>
            ) : (
              <GetTable
                data={categoryData}
                columns={columns}
                title="Category List"
              />
            )}
          </div>
        </div>
        {/* Edit Modal */}
        {editModalVisible && (
          <UpdateProductCategory CategoryCategoryForm
            sendResponse={handleResponse}
            initialData={categoryToEdit}
            onClose={() => setEditModalVisible(false)}
          />
        )}
        <ConfirmDeleteModal
          show={showModal}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
        />
        {viewModalVisible && (
          <ViewProductCategory CategoryMandalCategoryModal
            show={viewModalVisible}
            onClose={() => setViewModalVisible(false)}
            rowData={rowToView}
          />
        )}
      </div>
    </section>
  );
};

export default ProductCategory;

const ConfirmDeleteModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div
      className="modal show"
      tabIndex="-1"
      style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{ maxWidth: '400px' }}
      >
        <div
          className="modal-content"
          style={{ fontFamily: "'Roboto', sans-serif", borderRadius: '12px' }}
        >
          <div className="modal-header">
            <h5 className="modal-title fw-bold" style={{ fontSize: '1.25rem' }}>
              Confirm Deletion
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body text-center" style={{ fontSize: '1rem' }}>
            <p style={{ fontWeight: '500' }}>
              Are you sure you want to delete this Product Category Category?
            </p>
          </div>
          <div className="modal-footer d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              style={{ fontWeight: '600' }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger text-white"
              onClick={onConfirm}
              style={{ fontWeight: '600' }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};