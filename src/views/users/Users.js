import React, { useEffect, useState } from 'react';
import { fetchUsers, createUser } from '../Services/userApiService';
import GetTable from '../dashboard/GetTable';
import AddUserForm from './AddUserForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UsersData = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  const [status, setStatus] = useState('idle');
  const [users, setUsers] = useState([]);
  const { contextUserData, setContextUserData } = useContext(AppContext);

  const loadUsers = async () => {
    try {
      const userData = await fetchUsers();
      setUsers(userData); // Set user data
      setContextUserData(userData); // Set context data
      setStatus('success'); // Set status to success after fetching
    } catch (error) {
      toast.error('Failed to fetch users. Please try again.');
      setStatus('error'); // Set status to error if fetch fails
    }
  };

  // useEffect to trigger fetching users when status is idle
  useEffect(() => {
    loadUsers();
  }, [status]);

  const userColumns = [
    { name: 'S No.', selector: (row, index) => index + 1, grow: 0.3 },
    {
      name: 'Image',
      selector: (row) => <img src={row.image} alt={row.username} width="50" />,
    },
    {
      name: 'Username',
      selector: (row) => <Link to={`/user/${row._id}`}>{row.username}</Link>,
      sortable: true,
    },
    { name: 'Email', selector: (row) => row.email, sortable: true },
    { name: 'Mobile', selector: (row) => row.mobile, sortable: true },
    { name: 'City', selector: (row) => row.city, sortable: true },
    { name: 'Status', selector: (row) => (
      <>
        <button
            onClick={() => handleStatus(row._id, row.status)}
            className={`btn btn-sm ${row.status === 'active' ? 'btn-success' : 'btn-danger'}`}>{row.status}
        </button>
      </>
    ), sortable: true },
    {
      name: 'Action',
      selector: (row) => (
        <div
          style={{
            display: 'flex',
            gap: '8px',
            justifyContent: 'center',
            flexWrap: 'nowrap',
          }}
        >
          <button
            onClick={() => handleEdit(row._id)}
            className="btn btn-primary btn-sm me-2">
            Edit
          </button>
          <Link hres="javascript:void(0)" className="btn btn-success btn-sm text-white">
            Booking
          </Link>
          <Link
            to={`/user/${row._id}`}
            className="btn btn-info btn-sm text-white">
            View
          </Link>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '250px',
      grow: 1,
    },
  ];

  const handleView = (id) => {};

  const handleStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active'; // Toggle status
    console.log(userId, currentStatus);

    try {
      const response = await axios.put(
        'http://34.131.10.8:3000/api/user/update-status',
        {
          userId: userId,
          status: newStatus,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8`,
          },
        },
      );

      // Handle success
      if (response.data.status === 1) {
        toast.success('User status updated successfully!');
        loadUsers();
      } else {
        toast.error('Failed to update status.');
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    }
  };

  const handleEdit = (id) => {
    navigate(`/update-user/${id}`);
  };

  function navigateToAddUser() {
    navigate('/add-user');
  }

  return (
    <div className="container ">
      <div className="card shadow-lg mb-4 border-0">
        <div class="card-header bg-dark text-white">
          <div className="d-flex align-items-center justify-content-between">
            <h6 className="mb-0">Users List</h6>

            <div>
              <a
                href="javascript:void(0)"
                className="btn btn-warning text-dark btn-sm"
                onClick={navigateToAddUser}
              >
                Add user
              </a>
            </div>
          </div>
        </div>

        <GetTable columns={userColumns} data={users} />
      </div>
    </div>
  );
};

export default UsersData;