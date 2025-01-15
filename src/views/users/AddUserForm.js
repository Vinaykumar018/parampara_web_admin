import React, { useEffect, useState } from 'react';
import { fetchUsers, createUser  } from '../Services/userApiService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AddUserForm = () => {
    const navigate=useNavigate()
  
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

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "file" ? files[0] : value, // Handle files for type="file"
        }));
    };
    console.log(formData)

   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // Create a FormData object
        const formDataObj = new FormData();

        // Append all form data to FormData object
        Object.keys(formData).forEach((key) => {
            if (key === "image" && formData[key]) {
                formDataObj.append(key, formData[key]); // Append file
            } else {
                formDataObj.append(key, formData[key]); // Append other fields
            }
        });

        // Pass FormData to the API function
        const result = await createUser(formDataObj);

        if (result.status === 1) {


            toast.success("User created successfully!");
           
               // Delay the navigation for 3000ms (3 seconds)
               setTimeout(() => {
                   navigate("/user");
               }, 1000);
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
                aadhar_no: '',
            });
        } else {
            throw new Error('Failed to create user');
        }
    } catch (error) {
        toast.error(error.message || 'Failed to create user. Please try again.');
    }
};


    return (
        <section>
            <ToastContainer />
            <div className="row justify-content-center">
                <div className="col-12">
                    <div className="card shadow-lg mb-4 border-0">
                        <div className="card-header text-left bg-dark text-white">
                            <h6 className="text-uppercase font-weight-bold">Add User</h6>
                        </div>


                        

                        
                        <div className="card-body bg-light">
                            <form onSubmit={handleSubmit}>
                                {/* Username and Mobile */}
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">User  Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            placeholder="Enter Name of User"
                                            required
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
                                            placeholder="Enter Mobile of User"
                                            required
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
                                            placeholder="Enter Email of User"
                                            required
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
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password and Gender */}
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
                                            required
                                        />
                                    </div>
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
                                            required
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
                                            required
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
                                            required
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
                                            required
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
                                            required
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
                                            required
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
                                            required
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
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Alternate No and Aadhar No */}
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form -label">Alternate No</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="alternate_no"
                                            value={formData.alternate_no}
                                            onChange={handleChange}
                                            placeholder="Enter Alternate No"
                                            required
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
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Image Upload */}
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Image</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            name="image"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="text-end mb-3">
                    <button type="submit" className="me-2 btn btn-dark btn-sm">Add User</button>
                  </div>                        
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AddUserForm;