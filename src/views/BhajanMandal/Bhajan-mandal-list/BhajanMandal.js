import React, { useState, useEffect } from "react";
import GetTable from "../../dashboard/GetTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteBhajanMandal, fetchBhajanMandalData } from '../../Services/BhajanMandalApiService';
import { CSpinner } from '@coreui/react';
import { useContext } from "react";
import { AppContext } from '../../../context/AppContext';
import { useNavigate } from 'react-router-dom';

const BhajanMandal = () => {
  const { contextBhajanMandalData, setContextBhajanMandalData } = useContext(AppContext);
  const navigate = useNavigate();

  const navigateToAddBhajanMandal = () => {
    navigate('/add-bhajan-mandal');
  };

  const [bhajanMandalData, setBhajanMandalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [bhajanMandalToDelete, setBhajanMandalToDelete] = useState(null);

  useEffect(() => {
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

  const columns = [
    { name: "S No.", selector: (row, index) => index + 1, width: "80px" },
    { name: "Bhajan Name", selector: (row) => row.bhajan_name, width: "150px" },
    { name: "Category", selector: (row) => row.bhajan_category, width: "100px" },
    { name: "Price", selector: (row) => row.bhajan_price, width: "100px" },
    { name: "Members", selector: (row) => row.bhajan_member, width: "100px" },
    {
      name: "Image",
      selector: (row) =>
        row.bhajan_image ? (
          <img
            src={`http://34.131.70.24:3000${row.bhajan_image}`}
            alt={row.bhajan_name}
            className="img-thumbnail"
            width={50}
          />
        ) : (
          "N/A"
        ),
      width: "100px",
    },
    { name: "Short Description", selector: (row) => row.short_discription, width: "200px" },
    { name: "Long Description", selector: (row) => row.long_discription, width: "400px" },
    {
      name: "Status",
      selector: (row) => (
        <span
          className={`badge ${row.status === "active" ? "bg-success" : "bg-danger"}`}
          style={{ cursor: "pointer" }}
          onClick={() => updateStatus(row._id, row.status)}
        >
          {row.status === "1" ? "Active" : "Inactive"}
        </span>
      ),
      grow: 0.5,
      allowOverflow: true,
      width: "100px",
    },
    {
      name: "Action",
      selector: (row) => (
        <div>
          <button
            onClick={() => handleEdit(row._id)}
            className="btn btn-primary btn-sm me-2"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "150px",
    },
  ];

  return (
    <section>
      <div className="container ">
        <div className="card shadow-lg mb-4 border-0">
          <div className="card-header bg-dark text-white">
            <div className="d-flex align-items-center justify-content-between">
              <h6 className="mb-0">Bhajan List</h6>
              <div>
                <a
                  href="javascript:void(0)"
                  className="btn btn-warning text-dark btn-sm"
                  onClick={navigateToAddBhajanMandal}
                >
                  Add Bhajan Mandal
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