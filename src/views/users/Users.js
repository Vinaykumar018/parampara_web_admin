import React, { useEffect, useState } from 'react';
import { fetchUsers, createUser } from '../Services/userApiService';
import GetTable from '../dashboard/GetTable';
import AddUserForm from './AddUserForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UsersData = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    password: '',
    address: '',
    gender: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    longitude: '',
    latitude: '',
    landmark: '',
    social_type: '',
    alternate_no: '',
    image: '',
    aadhar_no: ''
  });

  const [status, setStatus] = useState('idle');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      if (status === 'idle') {
        try {
          const userData = await fetchUsers();
          setUsers(userData);
          setStatus('success');
        } catch (error) {
          toast.error('Failed to fetch users. Please try again.');
          setStatus('error');
        }
      }
    };
    loadUsers();
  }, [status]);

  const userColumns = [
    { name: 'Username', selector: (row) => row.username, sortable: true },
    { name: 'Email', selector: (row) => row.email, sortable: true },
    { name: 'Mobile', selector: (row) => row.mobile, sortable: true },
    { name: 'City', selector: (row) => row.city, sortable: true },
    { name: 'State', selector: (row) => row.state, sortable: true },
    { name: 'Country', selector: (row) => row.country, sortable: true },
    { name: 'Address', selector: (row) => row.address, sortable: true },
    { name: 'Pincode', selector: (row) => row.pincode, sortable: true },
    { name: 'Status', selector: (row) => row.status, sortable: true },
    { name: 'Image', selector: (row) => <img src={row.image} alt={row.username} width="50" /> }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createUser(formData);
      if (result.status === 1) {
        toast.success('User created successfully!');
        setFormData({
          username: '',
          email: '',
          mobile: '',
          password: '',
          address: '',
          gender: '',
          city: '',
          state: '',
          country: '',
          pincode: '',
          longitude: '',
          latitude: '',
          landmark: '',
          social_type: '',
          alternate_no: '',
          image: '',
          aadhar_no: ''
        });
        setStatus('idle');
      } else {
        throw new Error('Failed to create user');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to create user. Please try again.');
    }
  };

  return (
    <div className="container-fluid">
      <ToastContainer />
      <div className="text-end my-4">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setShowForm((prev) => !prev)}
        >
          {showForm ? 'Cancel' : 'Add User'}
        </button>
      </div>

      {showForm && (
        <AddUserForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}

      {/* User Table */}
      <GetTable columns={userColumns} data={users} />
    </div>
  );
};

export default UsersData;
