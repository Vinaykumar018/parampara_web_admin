import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, createUser } from '../../slices/userSlice'; // Import the createUser thunk
import GetTable from '../dashboard/GetTable';
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

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
    aadhar_no: '',
    // otp: '',
    // fcm_tokken: ''
  });

  const dispatch = useDispatch();

  const { users, status, error } = useSelector((state) => state.users);

  // Fetch users when component mounts
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);



//   // Define the columns for the table, based on the new user data structure
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
    { name: 'Image', selector: (row) => row.image, sortable: true },
  ];



  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(createUser(formData)).unwrap(); // Unwrap the thunk response
      if (result.status === 1) { // Check if the API response is successful
        toast.success('User created successfully!'); // Display success toast
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
          image: null,
          aadhar_no: '',
          otp: '',
          fcm_tokken: ''
        });
      }
    } catch (error) {
      toast.error(error || 'Failed to create user. Please try again.'); // Display error toast
    }
  };
  

  return (
    <div className="container-fluid">
      <div className="text-end my-4">
        <button className="btn btn-primary btn-sm" onClick={() => setShowForm((prev) => !prev)}>
          {showForm ? 'Cancel' : 'Add User'}
        </button>
      </div>

      {showForm && (
        <section>
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="card shadow-lg mb-4">
                <div className="card-header bg-primary text-white">
                  <h4 className="text-uppercase text-center">Add User</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    {/* User Name and Mobile */}
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">User Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          placeholder="Enter Name Of User"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Mobile</label>
                        <input
                          type="text"
                          className="form-control"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          placeholder="Enter Mobile Of User"
                        />
                      </div>
                    </div>

                    {/* Email and Address */}
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter Email Of User"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Address</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="Enter Address"
                        />
                      </div>
                    </div>

                    {/* Password, Gender, City, State, Country */}
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Enter Password"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Gender</label>
                        <select
                          className="form-control"
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    {/* City, State, Country, Pincode */}
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">City</label>
                        <input
                          type="text"
                          className="form-control"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="Enter City"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">State</label>
                        <input
                          type="text"
                          className="form-control"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          placeholder="Enter State"
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Country</label>
                        <input
                          type="text"
                          className="form-control"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          placeholder="Enter Country"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Pincode</label>
                        <input
                          type="text"
                          className="form-control"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleChange}
                          placeholder="Enter Pincode"
                        />
                      </div>
                    </div>

                    {/* Longitude, Latitude, Landmark, Social Type */}
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Longitude</label>
                        <input
                          type="text"
                          className="form-control"
                          name="longitude"
                          value={formData.longitude}
                          onChange={handleChange}
                          placeholder="Enter Longitude"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Latitude</label>
                        <input
                          type="text"
                          className="form-control"
                          name="latitude"
                          value={formData.latitude}
                          onChange={handleChange}
                          placeholder="Enter Latitude"
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Landmark</label>
                        <input
                          type="text"
                          className="form-control"
                          name="landmark"
                          value={formData.landmark}
                          onChange={handleChange}
                          placeholder="Enter Landmark"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Social Type</label>
                        <input
                          type="text"
                          className="form-control"
                          name="social_type"
                          value={formData.social_type}
                          onChange={handleChange}
                          placeholder="Enter Social Type"
                        />
                      </div>
                    </div>

                    {/* Alternate No, Aadhar No, OTP, FCM Token */}
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Alternate No</label>
                        <input
                          type="text"
                          className="form-control"
                          name="alternate_no"
                          value={formData.alternate_no}
                          onChange={handleChange}
                          placeholder="Enter Alternate No"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Image</label>
                        <input
                          type="file"
                          className="form-control"
                          name="image"
                          value={formData.image}
                          onChange={handleChange}
                          placeholder="Enter Image"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Aadhar No</label>
                        <input
                          type="text"
                          className="form-control"
                          name="aadhar_no"
                          value={formData.aadhar_no}
                          onChange={handleChange}
                          placeholder="Enter Aadhar No"
                        />
                      </div>
                    </div>

                    

                    <button type="submit" className="btn btn-primary">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
        <GetTable data={users} columns={userColumns} title="Users Table" />

      
    </div>
  );
};

export default UsersData;

{/* <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">OTP</label>
                        <input
                          type="text"
                          className="form-control"
                          name="otp"
                          value={formData.otp}
                          onChange={handleChange}
                          placeholder="Enter OTP"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">FCM Token</label>
                        <input
                          type="text"
                          className="form-control"
                          name="fcm_tokken"
                          value={formData.fcm_tokken}
                          onChange={handleChange}
                          placeholder="Enter FCM Token"
                        />
                      </div>
                    </div> */}