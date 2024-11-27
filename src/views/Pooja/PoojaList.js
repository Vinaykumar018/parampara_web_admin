import React, { useState, useEffect } from "react";
import PoojaForm from "./AddPoojaForm";
import GetTable from "../dashboard/GetTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchPoojaData, deletePooja } from '../Services/poojaApiService';
import { useNavigate } from "react-router-dom";

const PoojaList = () => {
  const [poojaData, setPoojaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [poojaToDelete, setPoojaToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchPoojaData();
        if (data.status === 1) {
          setPoojaData(data.data);
        } else {
          toast.error('Failed to fetch Pooja data');
        }
      } catch (error) {
        toast.error('Error fetching Pooja data');
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleEdit = (id) => {
    navigate(`/pooja/pooja-update-list/${id}`);
  };

  const handleDelete = (id) => {
    setPoojaToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await deletePooja(poojaToDelete);
      if (response.status === 1) {
        toast.success("Pooja deleted successfully!");
        setPoojaData(poojaData.filter((item) => item._id !== poojaToDelete));
        setShowModal(false);
      } else {
        toast.error("Failed to delete Pooja.");
      }
    } catch (error) {
      toast.error("Error deleting Pooja. Please try again.");
      console.error("Error deleting Pooja:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const columns = [
    { name: "ID", selector: (row) => row._id },
    { name: "Pooja Name", selector: (row) => row.pooja_name },
    { name: "Category", selector: (row) => row.pooja_category },
    { name: "Price (With Samagri)", selector: (row) => row.price_withSamagri },
    { name: "Price (Without Samagri)", selector: (row) => row.price_withoutSamagri },
    {
      name: "Image",
      selector: (row) => row.pooja_image ? (
        <img
          src={`http://192.168.1.38:3000${row.pooja_image}`}
          alt={row.pooja_name}
          className="img-thumbnail"
          width={50}
        />
      ) : "N/A",
    },
    { name: "Short Description", selector: (row) => row.short_discription },
    { name: "Long Description", selector: (row) => row.long_discription },
    { name: "Status", selector: (row) => row.status },
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
    },
  ];

  return (
    <section>
      <div className="container py-5">
        <PoojaForm />
        {loading ? <p>Loading...</p> : <GetTable columns={columns} data={poojaData} />}
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
            <p style={{ fontWeight: "500" }}>Are you sure you want to delete this Pooja?</p>
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

export default PoojaList;
