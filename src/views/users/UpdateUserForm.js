import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Reusable Input Component
const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  required,
}) => (
  <div className="col-md-6 mb-3">
    <label className="form-label">{label}</label>
    <input
      type={type}
      className="form-control"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
    />
  </div>
);

const UpdateUserForm = () => {
  const { id } = useParams();
  const { contextUserData } = useContext(AppContext);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    password: '',
    address: '',
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
  });

  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value, // Handle files for type="file"
    }));
  };

  // Load user data to update form
  useEffect(() => {
    if (contextUserData && id) {
      const userData = contextUserData.find((user) => user._id === id);
      if (userData) {
        setFormData(userData);
      }
    }
  }, [contextUserData, id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataObj = new FormData();
      const fieldsToSend = {
        userId: id,
        username: formData.username,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
        alternate_no: formData.alternate_no,
        fcm_tokken: formData.fcm_tokken,
        social_type: formData.social_type,
        image: formData.image,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        pincode: formData.pincode,
        landmark: formData.landmark,
        latitude: formData.latitude,
        longitude: formData.longitude,
      };

      for (const key in fieldsToSend) {
        formDataObj.append(key, fieldsToSend[key]);
      }

      const response = await fetch(
        `http://34.131.41.101:3000/api/user/update-user/${id}`,
        {
          method: 'PUT',
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8',
          },
          body: formDataObj,
        },
      );

      const result = await response.json();

      if (response.ok) {
        toast.success('User updated successfully!');
        setTimeout(() => {
          navigate('/user');
        }, 1000);
        resetForm();
      } else {
        throw new Error(result.message || 'Failed to update user');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update user. Please try again.');
    }
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      mobile: '',
      password: '',
      address: '',
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
    });
  };

  return (
    <section>
      <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="card shadow-lg mb-4 border-0">
            <div className="card-header text-left bg-dark text-white">
              <h6 className="text-capitalize font-weight-bold">Update User</h6>
            </div>
            <div className="card-body bg-light">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <InputField
                    label="User Name"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter Name of User"
                    required
                  />
                  <InputField
                    label="Mobile"
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter Mobile of User"
                    required
                  />
                </div>
                <div className="row">
                  <InputField
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Email of User"
                    required
                  />
                  <InputField
                    label="Address"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter Address"
                    required
                  />
                </div>
                <div className="row">
                  <InputField
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                    required
                  />
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Gender</label>
                    <select
                      className="form-control"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <InputField
                    label="City"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter City"
                    required
                  />
                  <InputField
                    label="State"
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter State"
                    required
                  />
                </div>
                <div className="row">
                  <InputField
                    label="Country"
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Enter Country"
                    required
                  />
                  <InputField
                    label="Pincode"
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Enter Pincode"
                    required
                  />
                </div>
                <div className="row">
                  <InputField
                    label="Longitude"
                    type="text"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                    placeholder="Enter Longitude"
                    required
                  />
                  <InputField
                    label="Latitude"
                    type="text"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                    placeholder="Enter Latitude"
                    required
                  />
                </div>
                <div className="row">
                  <InputField
                    label="Landmark"
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    placeholder="Enter Landmark"
                    required
                  />
                  <InputField
                    label="Social Type"
                    type="text"
                    name="social_type"
                    value={formData.social_type}
                    onChange={handleChange}
                    placeholder="Enter Social Type"
                    required
                  />
                </div>
                <div className="row">
                  <InputField
                    label="Alternate No"
                    type="text"
                    name="alternate_no"
                    value={formData.alternate_no}
                    onChange={handleChange}
                    placeholder="Enter Alternate No"
                    required
                  />
                  <InputField
                    label="Aadhar No"
                    type="text"
                    name="aadhar_no"
                    value={formData.aadhar_no}
                    onChange={handleChange}
                    placeholder="Enter Aadhar No"
                    required
                  />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Image</label>
                    <input
                      type="file"
                      className="form-control"
                      name="image"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="text-end mb-3">
                  <button type="submit" className="me-2 btn btn-dark btn-sm">
                    Update User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateUserForm;