import React, { useState, useEffect } from 'react';
import GetTable from '../dashboard/GetTable';
import { CButton } from '@coreui/react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';
import { usePooja } from '../../hooks/poojaHooks';
import useFetchCategories from '../../hooks/useFetchCategories';

const PanditPage = () => {
  const [panditData, setPanditData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [panditToDelete, setPanditToDelete] = useState(null);

  const { contextPanditData, setContextPanditData } = useContext(AppContext);

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedPandit, setSelectedPandit] = useState(null);
  const [panditIds, setPanditIds] = useState([]);

  const navigate = useNavigate();
  const {
    poojaData,
    loading,
fetchPoojaData,
    isEmpty,
  } = usePooja();

  // Fetch categories using custom hook
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetchCategories(panditIds);
const IMGURL = 'http://34.131.41.101:3000/uploads/panditImages/';
const token =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';

    
  useEffect(() => {
    fetchPandits();
  }, []);

  const fetchPandits = async () => {
    try {
      const response = await axios.get(
        'http://34.131.41.101:3000/api/pandit/all-pandit',
        {
          headers: {
            Authorization: token,
          },
        },
      );
      setPanditData(response.data.data);
      setContextPanditData(response.data.data);
      const ids = response.data.data.map((pandit) => pandit._id);
      setPanditIds(ids);
    } catch (error) {
      console.error('Error fetching pandit data:', error);
    }
  };
  const handleDelete = (id) => {
    setPanditToDelete(id);
    setShowModal(true);
  };

  const handleAssignCategory = async (panditId, poojaIds) => {
    try {
     

      const pandit = panditData.find((p) => p._id === panditId);

      // Map over all poojas to send checked as `1` and unchecked as `0`
      const allPoojas = poojaData.map((pooja) => ({
        pandit_id: panditId,
        name: pandit.username,
        pooja_id: pooja._id,
        pooja_name: pooja.pooja_name,
        category_status: poojaIds.includes(pooja._id) ? 1 : 0, // ✅ Send 0 for unticked poojas
      }));

      // Call API for each pooja with its status
      await Promise.all(
        allPoojas.map((pooja) =>
          axios.put(
            'http://34.131.41.101:3000/api/pandit/update-category',
            pooja,
            {
              headers: {
                Authorization: token,
                'Content-Type': 'application/json',
              },
            },
          ),
        ),
      );

      // Update local state with the new status

      fetchPandits();

      setPanditData((prevData) =>
        prevData.map((p) =>
          p._id === panditId
            ? {
                ...p,
                poojas: allPoojas.map((pooja) => ({
                  pooja_id: pooja.pooja_id,
                  pooja_name: pooja.pooja_name,
                  category_status: pooja.category_status,
                })),
              }
            : p,
        ),
      );
    } catch (error) {
      console.error('Error assigning categories:', error);
      throw error;
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const token =
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';
      await axios.delete(
        `http://34.131.41.101:3000/api/pandit/delete-pandit/${panditToDelete}`,
        {
          headers: {
            Authorization: token,
          },
        },
      );

      setPanditData(
        panditData.filter((pandit) => pandit._id !== panditToDelete),
      );
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting pandit:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/pandit/update-pandit/${id}`);
  };

  const navigateToAddPandit = () => {
    navigate('/add-pandit');
  };

  const columns = [
    {
      name: 'S No.',
      selector: (row, index) => index + 1,
      sortable: true,
      width: '80px',
    },

    {
      name: 'Image',
      selector: (row) => (
        <img src={IMGURL + row.image} alt={row.username} width="50" />
      ),
      width: '120px',
    },

    {
      name: 'Name',
      selector: (row) => <Link to={`/pandit/${row._id}`}>{row.username}</Link>,
      sortable: true,
      width: '180px',
    },

    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
      width: '220px',
    },

    {
      name: 'Mobile',
      selector: (row) => row.mobile,
      sortable: true,
      width: '160px',
    },

    {
      name: 'City',
      selector: (row) => row.city,
      sortable: true,
      width: '150px',
    },
    //fetch category using hook
    {
      name: 'Category',
      selector: (row) => {
        const categoryList = categories[row._id] || [];
        console.log(categoryList);

        // Properly map and render pooja names with a comma separator
        return categoryList.length > 0 ? (
          <div>{categoryList.map((item, index) => (
            <span key={item.pooja_id} className='badge bg-dark mx-1 p-3'>
              {item.pooja_name}
              {index < categoryList.length - 1 && ' '} {/* Add comma except for the last item */}
            </span>
          ))}</div>
        ) : (
          <span>No Categories</span>
        );
      },
      sortable: true,
      width: '500px',
    },

    {
      name: 'Experience',
      selector: (row) => `${row.experience} years`,
      sortable: true,
      width: '140px',
    },

    {
      name: 'Action',
      selector: (row) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'nowrap',
          }}
        >
          <Link
            to={`/pandit/${row._id}`}
            className="btn btn-info btn-sm text-white me-2"
          >
            View
          </Link>

          <Link
            to={`/pandit/bookings/${row._id}`}
            className="btn btn-success btn-sm text-white me-2"
          >
            Bookings
          </Link>

          <button
            className="btn btn-warning text-white btn-sm me-2"
            onClick={() => {
              setSelectedPandit(row._id);
              setShowCategoryModal(true);
            }}
          >
            Manage Poojas
          </button>

          <button
            onClick={() => handleEdit(row._id)}
            className="btn btn-primary btn-sm me-2"
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(row._id)}
            className="btn btn-danger btn-sm me-2 text-white"
          >
            Delete
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '500px', // Increased width for action buttons
    },
  ];

 

  // Extract pandit IDs from panditData

  return (
    <div className="row justify-content-center">
      <div className="col-12">
        <div className="card shadow-lg mb-4 border-0">
          <div className="card-header bg-dark text-white py-2">
            <div className="d-flex align-items-center justify-content-between">
              <h6 className="mb-0">Pandit List</h6>
              <CButton
                color="warning"
                className="text-dark"
                size="sm"
                onClick={navigateToAddPandit}
              >
                Add Pandit
              </CButton>
            </div>
          </div>

          <GetTable
            data={panditData}
            columns={columns}
            title="Pandit Information"
          />
        </div>
      </div>
      {showModal && (
        <ConfirmDeleteModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
      {showCategoryModal && (
        <AssignCategoryModal
          show={showCategoryModal}
          onClose={() => setShowCategoryModal(false)}
          panditId={selectedPandit}
          poojaData={poojaData}
          currentPoojas={
            panditData
              .find((p) => p._id === selectedPandit)
              ?.poojas?.map((p) => p.pooja_id) || []
          }
          onAssign={handleAssignCategory}
          categories={categories}
        />
      )}
    </div>
  );
};

const AssignCategoryModal = ({
  show,
  onClose,
  panditId,
  poojaData,
  onAssign,
  currentPoojas = [],
  categories,
}) => {
  const [selectedPoojas, setSelectedPoojas] = useState([]);
  const [loading, setLoading] = useState(false);

  

  // Pre-select poojas with status "1"
  useEffect(() => {
    if (show && categories[panditId]) {
      const preselectedPoojas = categories[panditId]
        .filter((cat) => cat.status === '1')
        .map((cat) => cat.pooja_name);

      // Find pooja IDs matching the preselected names
      const preselectedIds = poojaData
        .filter((pooja) => preselectedPoojas.includes(pooja.pooja_name))
        .map((pooja) => pooja._id);

      setSelectedPoojas(preselectedIds);
    } else {
      setSelectedPoojas(currentPoojas);
    }
  }, [show, categories, panditId, poojaData, currentPoojas]);

  const handleCheckboxChange = (poojaId) => {
    setSelectedPoojas((prev) =>
      prev.includes(poojaId)
        ? prev.filter((id) => id !== poojaId)
        : [...prev, poojaId],
    );
  };

  const handleAssign = async () => {
    if (selectedPoojas.length === 0) return;
    setLoading(true);
    try {
      await onAssign(panditId, selectedPoojas);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal show"
      style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Assign Pooja Categories</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Select Poojas </label>
              <div
                className="pooja-checkboxes"
                style={{ maxHeight: '300px', overflowY: 'auto' }}
              >
                {poojaData.map((pooja) => (
                  <div key={pooja._id} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`pooja-${pooja._id}`}
                      checked={selectedPoojas.includes(pooja._id)}
                      onChange={() => handleCheckboxChange(pooja._id)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`pooja-${pooja._id}`}
                    >
                      {pooja.pooja_name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAssign}
              disabled={selectedPoojas.length === 0 || loading}
            >
              {loading ? 'Assigning...' : `Assign (${selectedPoojas.length})`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ConfirmDeleteModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div
      className="modal show"
      tabIndex="-1"
      style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Deletion</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this Pandit?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={onConfirm}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanditPage;