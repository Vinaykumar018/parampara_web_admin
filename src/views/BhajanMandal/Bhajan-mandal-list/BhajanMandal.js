import React, { useState, useEffect } from "react";
import GetTable from "../../dashboard/GetTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteBhajanMandal, fetchBhajanMandalData } from '../../Services/BhajanMandalApiService';
import { CSpinner } from '@coreui/react';
import { useContext } from "react";
import { AppContext } from '../../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import {UpdateBhajanStatus} from '../../Services/BhajanMandalApiService'
import AddBhajanVideoModal from './AddVideoBhajanModal'
import ReadMoreText from "../../../components/ReadMoreText";
const BhajanMandal = () => {

   
  const { contextBhajanMandalData, setContextBhajanMandalData,globalContextBhajanMandalCategoryData } = useContext(AppContext);
  const navigate = useNavigate();

  const navigateToAddBhajanMandal = () => {
    navigate('/add-bhajan-mandal');
  };

  const [bhajanMandalData, setBhajanMandalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [bhajanMandalToDelete, setBhajanMandalToDelete] = useState(null);

  const [videoModal, setVideoModal] = useState(false);



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
     const [categoryData, setCategoryData] = useState([]);
  
    useEffect(() => {
      loadCategories();
    }, []);
console.log(globalContextBhajanMandalCategoryData)

    const getData = async () => {
      try {
        const data = await fetchBhajanMandalData();
        if (data.status === 1) {
          setBhajanMandalData(data.data);
          setContextBhajanMandalData(data.data);
        } else {
          toast.error('Failed to fetch Bhajan Mandal data');
        }
      } catch (error) {
        toast.error('Error fetching Bhajan Mandal data');
      } finally {
        setLoading(false);
      }
    };


    useEffect(() => {
    getData();
  }, []);

  const handleEdit = (id) => {
    navigate(`/update-bhajan-mandal/${id}`);
  };

  const handleDelete = (id) => {
    setBhajanMandalToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await deleteBhajanMandal(bhajanMandalToDelete);
      if (response.status === 1) {
        toast.success("Bhajan Mandal deleted successfully!");
        setBhajanMandalData(bhajanMandalData.filter((item) => item._id !== bhajanMandalToDelete));
        setContextBhajanMandalData(bhajanMandalData.filter((item) => item._id !== bhajanMandalToDelete));
        setShowModal(false);
      } else {
        toast.error("Failed to delete Bhajan Mandal.");
      }
    } catch (error) {
      toast.error("Error deleting Bhajan Mandal. Please try again.");
      console.error("Error deleting Bhajan Mandal:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };



  const updateStatus = async (id, status) => {
    // Determine the new status using a ternary operator
    const newStatus = status == 0 ? 1 : 0;
    console.log('Current Status:', status);
    console.log('New Status:', newStatus);
  
    try {
      // Call the API function to update the status
      await UpdateBhajanStatus(id, newStatus);
  
      console.log(
        `Status successfully updated to ${newStatus == 1 ? 'Active' : 'Inactive'}`,
      );
  
      // Refresh the data to reflect the status change
      getData();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update the status. Please try again.');
    }
  };

  const columns = [
    { name: "S No.", selector: (row, index) => index + 1, width: "80px" },
    { name: "Bhajan Name", selector: (row) => row.bhajan_name, width: "200px" },
    {
      name: "Category",
      selector: (row) => {
        const category = globalContextBhajanMandalCategoryData.find(
          (item) => item._id === row.bhajan_category
        );
        console.log(category ,"from bm")
        return category ? category.category : "-"; // If a match is found, return the category name; else return "-"
      },
      width: "200px",
    }
    ,
    { name: "Price", selector: (row) => row.bhajan_price, width: "100px" },
    { name: "Members", selector: (row) => row.bhajan_member, width: "100px" },
    {
      name: "Image",
      selector: (row) =>
        row.bhajan_image ? (
          <img
            src={`http://34.131.10.8:3000${row.bhajan_image}`}
            alt={row.bhajan_name}
            className="img-thumbnail"
            width={50}
          />
        ) : (
          "N/A"
        ),
      width: "100px",
    },
    { name: "Short Description", selector: (row) => (
    <>
    <ReadMoreText text={row.short_discription}/>
    </>), width: "300px", wrap: true, // Prevents overflow
      grow: 1.5 },
    {
      name: "Status",
      selector: (row) => (
        <span
          className={`badge ${row.status == 1 ? "bg-success" : "bg-danger"}`}
          style={{
            cursor: "pointer",
           
          }}
          onClick={() => updateStatus(row._id, row.status)}
        >
          {row.status == 1 ? "Active" : "Inactive"}
        </span>
      ),
      grow: 0.5,
      allowOverflow: true,
      width: "120px", // Proper width for the status column
    },
    
    {
      name: "Action",
      selector: (row) => (
        <div
          style={{
            display: "flex",
            gap: "8px", // Provides uniform spacing between buttons
            flexWrap: "nowrap",
            justifyContent: "center", // Aligns buttons properly
          }}
        >
         
          <button
            onClick={() => handleEdit(row._id)}
            className="btn btn-primary btn-sm text-white"
           
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
            onClick={() => handlePreview(row._id)}
            className="btn btn-dark btn-sm text-white"
            
          >
            View
          </button>
          <button
            onClick={() => addVideo(row._id)}
            className="btn btn-info btn-sm text-white"
            
          >
            Add Video
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "300px", // Adjusted width for the action buttons column
    },
    
  ];

  const [selectedId, setSelectedId] = useState(null);
  function addVideo(id){
    setSelectedId(id);
    setVideoModal(true);
  }
  function handlePreview(id){
    navigate(`/preview/${id}`);
    

  }

  return (
    <section>
      <div className="container ">
        <div className="card shadow-lg mb-4 border-0">
          <div className="card-header bg-dark text-white">
            <div className="d-flex align-items-center justify-content-between">
              <h6 className="mb-0">Bhajan Mandali</h6>
              <div>
                <a
                  href="javascript:void(0)"
                  className="btn btn-warning text-dark btn-sm"
                  onClick={navigateToAddBhajanMandal}
                >
                  Add Mandali
                </a>
              </div>
            </div>
          </div>
          {loading ? (
            <div className="justify-content-center d-flex p-5">
              <CSpinner color="primary" />
            </div>
          ) : (
            <GetTable columns={columns} data={bhajanMandalData} />
          )}
        </div>
      </div>
      <ConfirmDeleteModal
        show={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
      <ToastContainer />
      { videoModal && (
        <AddBhajanVideoModal id={selectedId} onClose={() => setVideoModal(false)} />
      )}
    </section>
  );
};



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
            <p style={{ fontWeight: "500" }}>Are you sure you want to delete this Bhajan Mandal?</p>
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
              className="btn btn-danger"
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


export default BhajanMandal;