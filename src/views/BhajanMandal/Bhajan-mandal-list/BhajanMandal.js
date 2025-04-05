import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteBhajanMandal, fetchBhajanMandalData } from '../../Services/BhajanMandalApiService';
import { CSpinner } from '@coreui/react';
import { useContext } from "react";
import { AppContext } from '../../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { UpdateBhajanStatus } from '../../Services/BhajanMandalApiService';
import AddBhajanVideoModal from './AddVideoBhajanModal';
import BhajanMandaliGetTable from "../../dashboard/BhajanMandaliGetTable";

const BhajanMandal = () => {
  const { contextBhajanMandalData, setContextBhajanMandalData, globalContextBhajanMandalCategoryData } = useContext(AppContext);
  const navigate = useNavigate();

  const navigateToAddBhajanMandal = () => {
    navigate('/add-bhajan-mandal');
  };

  const [bhajanMandalData, setBhajanMandalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [bhajanMandalToDelete, setBhajanMandalToDelete] = useState(null);
  const [videoModal, setVideoModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

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
    const newStatus = status == 0 ? 1 : 0;
    try {
      await UpdateBhajanStatus(id, newStatus);
      getData();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update the status. Please try again.');
    }
  };

  const columns = [
    { name: "Bhajan Name", selector: row => row.bhajan_name, sortable: true },
    { name: "Category", selector: row => row.bhajan_category, sortable: true },
    { name: "Price", selector: row => row.bhajan_price, sortable: true },
    { name: "Members", selector: row => row.bhajan_member ?? "N/A" },
    { name: "Experience (Years)", selector: row => row.exp_year ?? "N/A" },
    { name: "Short Description", selector: row => row.short_discription },
    { name: "Owner Name", selector: row => row.bhajan_owner.owner_name },
    { name: "Owner Email", selector: row => row.bhajan_owner.owner_email },
    { name: "Owner Phone", selector: row => row.bhajan_owner.owner_phone },
    { name: "Address", selector: row => row.mandali_address.address || "N/A" },
    { name: "City", selector: row => row.mandali_address.city || "N/A" },
    { name: "State", selector: row => row.mandali_address.state || "N/A" },
    { name: "Country", selector: row => row.mandali_address.country || "N/A" },
    { name: "Pin Code", selector: row => row.mandali_address.pin_code || "N/A" },
    { name: "Status", selector: row => (row.status === "1" ? "Active" : "Inactive") },
    { name: "Profile Status", selector: row => (row.profile_status === "1" ? "Complete" : "Incomplete") },
    { name: "Created At", selector: row => new Date(row.created_at).toLocaleString() },
    { name: "Updated At", selector: row => new Date(row.updated_at).toLocaleString() },
    {
      name: "Status",
      selector: row => (
        <span
          className={`badge ${row.status == 1 ? "bg-success" : "bg-danger"}`}
          style={{ cursor: "pointer" }}
          onClick={() => updateStatus(row._id, row.status)}
        >
          {row.status == 1 ? "Active" : "Inactive"}
        </span>
      ),
      grow: 0.5,
      allowOverflow: true,
      width: "120px",
    },
  ];

  function addVideo(id) {
    setSelectedId(id);
    setVideoModal(true);
  }

  function handlePreview(id) {
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
            <BhajanMandaliGetTable 
              columns={columns} 
              data={bhajanMandalData} 
              title={"Bhajan Mandali"} 
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAddVideo={addVideo}
              onPreview={handlePreview}
            />
          )}
        </div>
      </div>
      <ConfirmDeleteModal
        show={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
      <ToastContainer />
      {videoModal && (
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