import React, { useState, useEffect } from 'react';
import GetTable from '../dashboard/GetTable';
import { CButton } from '@coreui/react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';

const PanditPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [panditToDelete, setPanditToDelete] = useState(null);
  const [panditData, setPanditData] = useState([]);
  const navigate = useNavigate();
  const { contextPanditData, setContextPanditData } = useContext(AppContext);
  const IMGURL = 'http://34.131.10.8:3000/uploads/panditImages/';
  useEffect(() => {
    const token =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';

    const fetchPandits = async () => {
      try {
        const response = await axios.get(
          'http://34.131.10.8:3000/api/pandit/all-pandit',
          {
            headers: {
              Authorization: token,
            },
          },
        );
        setPanditData(response.data.data);
        setContextPanditData(response.data.data);
      } catch (error) {
        console.error('Error fetching pandit data:', error);
      }
    };

    fetchPandits();
  }, []);

  const handleDelete = (id) => {
    setPanditToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const token =
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';
      await axios.delete(
        `http://34.131.10.8:3000/api/pandit/delete-pandit/${panditToDelete}`,
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
    { name: 'S No.', selector: (row, index) => index + 1, grow: 0.3 },
    { name: 'Image' ,
      selector: (row) => <img src={IMGURL+row.image} alt={row.username} width="50" />,
    },
    { name: 'Name', selector: (row) => <Link to={`/pandit/${row._id}`}>{row.username}</Link>, sortable: true },
    { name: 'Email', selector: (row) => row.email, sortable: true },
    { name: 'Mobile', selector: (row) => row.mobile, sortable: true },
    { name: 'City', selector: (row) => row.city, sortable: true },
    { name : 'Category', selector: (row)=>(
      <>
      </>
    ),sortable:true},
    {
      name: 'Experience',
      selector: (row) => `${row.experience} years`,
      sortable: true,
    },
    {
      name: 'Action',
      selector: (row) => (
        <div  style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'nowrap',
        }}>
           <Link
              to={`/pandit/${row._id}`}
              className="btn btn-info btn-sm text-white me-2">View
            </Link>
            <Link to={'/'} className='btn btn-success btn-sm text-white me-2'>Bookings</Link>  
            <button className='btn btn-warning  btn-sm me-2'>
              Assign Category
            </button>
            
          <button
            onClick={() => handleEdit(row._id)}
            className="btn btn-primary btn-sm me-2"
          >
            Edit
          </button>
            <button
            onClick={() => handleDelete(row._id)}
            className="btn btn-danger btn-sm me-2"
          >
            Delete
          </button>      
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '400px',
    },
  ];

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