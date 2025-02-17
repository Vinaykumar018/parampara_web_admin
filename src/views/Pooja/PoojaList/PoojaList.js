import React, { useState, useEffect } from "react";
import PoojaForm from "./AddPoojaForm";
import GetTable from "../../dashboard/GetTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchPoojaData, deletePooja } from '../../Services/poojaApiService';
import { CSpinner } from '@coreui/react';
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from 'react-router-dom';
import ViewPoojaModal from './ViewPoojaModal'; // Import the new modal

const PoojaList = () => {
  const { contextPoojaData, setContextPoojaData,globalContextPoojaCategoryData } = useContext(AppContext);
  const navigate = useNavigate();

  const navigateToAddPooja = () => {
    navigate('/pooja/add-pooja');
  };

  const [poojaData, setPoojaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [poojaToDelete, setPoojaToDelete] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false); // State for view modal visibility
  const [rowToView, setRowToView] = useState(null); // State to store the row data to view

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchPoojaData();
        if (data.status === 1) {
          setPoojaData(data.data);
          setContextPoojaData(data.data);
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

  const handleView = (row) => {
    setRowToView(row); // Set the row data to view
    setViewModalVisible(true); // Show the view modal
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
        setContextPoojaData(poojaData.filter((item) => item._id !== poojaToDelete));
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
    { name: "S No.", selector: (row, index) => index + 1, width: "80px" },
    { name: "Pooja Name", selector: (row) => row.pooja_name, width: "150px" },
    {
      name: "Category",
      selector: (row) => {
        const category = globalContextPoojaCategoryData.find(
          (item) => item._id === row.pooja_category // Assuming the field for pooja category is 'pooja_category'
        );
        console.log(category, "from pooja");
        return category ? category.category : "-"; // If a match is found, return the category name; else return "-"
      },
      width: "200px",
    }
    ,
    { name: "Price (With Samagri)", selector: (row) => row.price_withSamagri, width: "120px" },
    { name: "Price (Without Samagri)", selector: (row) => row.price_withoutSamagri, width: "120px" },
    {
      name: "Image",
      selector: (row) =>
        row.pooja_image ? (
          <img
            src={`http://34.131.70.24:3000${row.pooja_image}`}
            alt={row.pooja_name}
            className="img-thumbnail"
            width={50}
          />
        ) : (
          "N/A"
        ),
      width: "100px",
    },
    {
      name: "Short Description",
      selector: (row) => (
        <div
          dangerouslySetInnerHTML={{ __html: row.short_discription }}
          style={{
            maxHeight: "200px",
            overflow: "hidden", // Hides overflow bar
            textOverflow: "ellipsis",
            overflowWrap: "break-word",
          }}
        ></div>
      ),
      width: "250px",
      wrap: true,
    },
    {
      name: "Long Description",
      selector: (row) => (
        <div
          dangerouslySetInnerHTML={{ __html: row.long_discription }}
          style={{
            maxHeight: "300px",
            overflow: "auto", // Enables scrolling
            scrollbarWidth: "none", // Hides scrollbar for Firefox
            msOverflowStyle: "none", // Hides scrollbar for IE/Edge
          }}
          className="no-scrollbar"
        ></div>
      ),
      width: "400px",
      wrap: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <span
          className={`badge ${row.status == "active" ? "bg-success" : "bg-danger"}`}
          style={{
            cursor: "pointer",
           
          }}
         
        >
          {row.status == "active" ? "Active" : "Inactive"}
        </span>
      ),
      grow: 0.5,
      allowOverflow: true,
      width: "120px", // Proper width for the status column
    },,
    {
      name: "Action",
      selector: (row) => (
        <div>
          <button
            onClick={() => handleView(row)}
            className="btn btn-info btn-sm text-white me-2"
          >
            View
          </button>
          <button
            onClick={() => handleEdit(row._id)}
            className="btn btn-primary btn-sm text-white me-2"
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
      width: "200px",
    },
  ];
  
  

  return (
    <section>
      <div className="container ">
        <div className="card shadow-lg mb-4 border-0">
          <div className="card-header bg-dark text-white">
            <div className="d-flex align-items-center justify-content-between">
              <h6 className="mb-0">Pooja List</h6>
              <div>
                <a
                  href="javascript:void(0)"
                  className="btn btn-warning text-dark btn-sm"
                  onClick={navigateToAddPooja}
                >
                  Add Pooja
                </a>
              </div>
            </div>
          </div>
          {loading ? (
            <div className="justify-content-center d-flex p-5">
              <CSpinner color="primary" />
            </div>
          ) : (
            <GetTable columns={columns} data={poojaData} />
          )}
        </div>
      </div>
      {/* Delete Modal */}
      <ConfirmDeleteModal
        show={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
      {/* View Modal */}
      <ViewPoojaModal
        show={viewModalVisible}
        onClose={() => setViewModalVisible(false)}
        rowData={rowToView}
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