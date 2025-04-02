import React, { useState, useEffect } from 'react';
import { deleteBhajanCategory } from '../../Services/BhajanMandalApiService';
import { createCategory, fetchCategories,UpdateBhajanMandalStatus } from '../../Services/BhajanMandalApiService';
import BhajanCategoryForm from './AddBhajanMandalCateogry';
import GetTable from '../../dashboard/GetTable';
import { CButton, CSpinner } from '@coreui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { AppContext } from '../../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import UpdateBhajanCategoryForm from './UpdateBhajanCategoryForm';
import ViewBhajanMandalCategoryModal from './ViewBhajanMandalCategoryModal';
import ReadMoreText from '../../../components/ReadMoreText';

const BhajanMandalCategory = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [bhajanCategoryToDelete, setBhajanCategoryToDelete] = useState(null);

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
      data.append('category', formData.category);
      data.append('bhajan_image', formData.bhajan_image);
      data.append('short_discription', formData.short_discription);
      data.append('long_discription', formData.long_discription);
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
      name: 'Mandali Category', 
      selector: (row) => 
      (
        <>
        <img
            src={`http://34.131.41.101:3000/` + row.bhajan_image}
            alt={row.category}
            // width={100}
            height={100}
          />
          <p style={{textAlign:"center",fontWeight:"700",fontSize:"15px"}}>{row.category}</p>
        </>
      ), 
      wrap: true, // Ensures text wraps properly
      grow: 1 
    },
    {
      name: 'Short Description',
      selector: (row) => (
        <>
          <ReadMoreText text={ row.short_discription}/>
        </>
      ),
      wrap: true, // Prevents overflow
      grow: 1.5, // Adjusts dynamically
    },
    {
      name: 'Long Description',
      selector: (row) =>(
        <>
        <ReadMoreText text={ row.long_discription}/>
        </>
      ),
      wrap: true,
      grow: 2,
    },
    {
      name: 'Status',
      selector: (row) => (
        <span 
          className={`badge ${row.status === 'active' ? 'bg-success' : 'bg-danger'}`} 
          style={{ cursor: 'pointer' }} 
          onClick={() => updateStatus(row._id, row.status)}
        >
          {row.status}
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
                row.short_discription,
                row.category,
                row.bhajan_image,
                row.long_discription
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
      UpdateBhajanMandalStatus(id,'inactive')
      loadCategories()
    }else{
      UpdateBhajanMandalStatus(id,'active')
      loadCategories()

    }
}
  const handleEdit = (id,  short_discription, category, bhajan_image,long_discription) => {
    setCategoryToEdit({
      id,
      
      short_discription,
      category,
      bhajan_image,
      long_discription
    });
    setEditModalVisible(true);
  };

  const handleDelete = (id) => {
    setBhajanCategoryToDelete(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await deleteBhajanCategory(bhajanCategoryToDelete);
      if (response.status === 1) {
        toast.success('Bhajan mandal Category deleted successfully!');
        setCategoryData(
          categoryData.filter((item) => item._id !== bhajanCategoryToDelete),
        );
        setShowModal(false);
      } else {
        toast.error('Failed to delete Bhajan.');
      }
    } catch (error) {
      toast.error('Error deleting Bhajan. Please try again.');
      console.error('Error deleting Bhajan:', error);
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
                <h6 className="mb-0">Bhajan Mandal Category</h6>
                <BhajanCategoryForm onSubmit={handleFormSubmit} />
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
          <UpdateBhajanCategoryForm
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
          <ViewBhajanMandalCategoryModal
            show={viewModalVisible}
            onClose={() => setViewModalVisible(false)}
            rowData={rowToView}
          />
        )}
      </div>
    </section>
  );
};

export default BhajanMandalCategory;

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
              Are you sure you want to delete this Bhajan Category?
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