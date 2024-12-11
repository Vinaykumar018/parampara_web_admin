// userApiService.js

// const BASE_URL = 'https://parampara-admin.vercel.app/api/user';

const BASE_URL = 'http://localhost:3000/api/slider/user';


const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';

export const fetchUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/all-user`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    if (data.status !== 1) {
      throw new Error(data.message || 'Failed to fetch users');
    }
    return data.data; // Return user list if successful
  } catch (error) {
    throw new Error(error.message || 'Something went wrong');
  }
};

export const createUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/create-user`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (data.status !== 1) {
      throw new Error(data.message || 'Failed to create user');
    }
    return data; // Return created user data if successful
  } catch (error) {
    throw new Error(error.message || 'Something went wrong');
  }
};


// import React, { useEffect, useState } from 'react';
// import { fetchUsers, createUser } from '../Services/userApiService';
// import GetTable from '../dashboard/GetTable';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const UsersData = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     mobile: '',
//     password: '',
//     address: '',
//     gender: '',
//     city: '',
//     state: '',
//     country: '',
//     pincode: '',
//     longitude: '',
//     latitude: '',
//     landmark: '',
//     social_type: '',
//     alternate_no: '',
//     image: '',
//     aadhar_no: ''
//   });

//   const [status, setStatus] = useState('idle');
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const loadUsers = async () => {
//       if (status === 'idle') {
//         try {
//           const userData = await fetchUsers();
//           setUsers(userData);
//           setStatus('success');
//         } catch (error) {
//           toast.error('Failed to fetch users. Please try again.');
//           setStatus('error');
//         }
//       }
//     };
//     loadUsers();
//   }, [status]);

//   const userColumns = [
//     { name: 'Username', selector: (row) => row.username, sortable: true },
//     { name: 'Email', selector: (row) => row.email, sortable: true },
//     { name: 'Mobile', selector: (row) => row.mobile, sortable: true },
//     { name: 'City', selector: (row) => row.city, sortable: true },
//     { name: 'State', selector: (row) => row.state, sortable: true },
//     { name: 'Country', selector: (row) => row.country, sortable: true },
//     { name: 'Address', selector: (row) => row.address, sortable: true },
//     { name: 'Pincode', selector: (row) => row.pincode, sortable: true },
//     { name: 'Status', selector: (row) => row.status, sortable: true },
//     { name: 'Image', selector: (row) => <img src={row.image} alt={row.username} width="50" /> }
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const result = await createUser(formData);
//       if (result.status === 1) {
//         toast.success('User created successfully!');
//         setFormData({
//           username: '',
//           email: '',
//           mobile: '',
//           password: '',
//           address: '',
//           gender: '',
//           city: '',
//           state: '',
//           country: '',
//           pincode: '',
//           longitude: '',
//           latitude: '',
//           landmark: '',
//           social_type: '',
//           alternate_no: '',
//           image: '',
//           aadhar_no: ''
//         });
//         setStatus('idle');
//       } else {
//         throw new Error('Failed to create user');
//       }
//     } catch (error) {
//       toast.error(error.message || 'Failed to create user. Please try again.');
//     }
//   };

//   return (
//     <div className="container-fluid">
//       <ToastContainer />
//       <div className="text-end my-4">
//         <button
//           className="btn btn-primary btn-sm"
//           onClick={() => setShowForm((prev) => !prev)}
//         >
//           {showForm ? 'Cancel' : 'Add User'}
//         </button>
//       </div>

//       {showForm && (
//         <section>
//           <div className="row justify-content-center">
//             <div className="col-md-12">
//               <div className="card shadow-lg mb-4">
//                 <div className="card-header bg-primary text-white">
//                   <h4 className="text-uppercase text-center">Add User</h4>
//                 </div>
//                 <div className="card-body">
//                   <form onSubmit={handleSubmit}>
//                     {/* Username and Mobile */}
//                     <div className="row">
//                       <div className="col-md-6 mb-3">
//                         <label className="form-label">User Name</label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           name="username"
//                           value={formData.username}
//                           onChange={handleChange}
//                           placeholder="Enter Name Of User"
//                         />
//                       </div>
//                       <div className="col-md-6 mb-3">
//                         <label className="form-label">Mobile</label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           name="mobile"
//                           value={formData.mobile}
//                           onChange={handleChange}
//                           placeholder="Enter Mobile Of User"
//                         />
//                       </div>
//                     </div>
//                     {/* Email and Address */}
//                     <div className="row">
//                       <div className="col-md-6 mb-3">
//                         <label className="form-label">Email</label>
//                         <input
//                           type="email"
//                           className="form-control"
//                           name="email"
//                           value={formData.email}
//                           onChange={handleChange}
//                           placeholder="Enter Email Of User"
//                         />
//                       </div>
//                       <div className="col-md-6 mb-3">
//                         <label className="form-label">Address</label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           name="address"
//                           value={formData.address}
//                           onChange={handleChange}
//                           placeholder="Enter Address"
//                         />
//                       </div>
//                     </div>
//                     {/* Password and Gender */}
//                     <div className="row">
//                       <div className="col-md-6 mb-3">
//                         <label className="form-label">Password</label>
//                         <input
//                           type="password"
//                           className="form-control"
//                           name="password"
//                           value={formData.password}
//                           onChange={handleChange}
//                           placeholder="Enter Password"
//                         />
//                       </div>
//                       <div className="col-md-6 mb-3">
//                         <label className="form-label">Gender</label>
//                         <select
//                           className="form-control"
//                           name="gender"
//                           value={formData.gender}
//                           onChange={handleChange}
//                         >
//                           <option value="">Select Gender</option>
//                           <option value="male">Male</option>
//                           <option value="female">Female</option>
//                           <option value="other">Other</option>
//                         </select>
//                       </div>
//                     </div>
//                     <button type="submit" className="btn btn-success">
//                       Submit
//                     </button>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* User Table */}
//       <GetTable columns={userColumns} data={users} />
//     </div>
//   );
// };

// export default UsersData;


// <form onSubmit={handleSubmit}>
// {/* User Name and Mobile */}
// <div className="row">
//   <div className="col-md-6 mb-3">
//     <label className="form-label">User Name</label>
//     <input
//       type="text"
//       className="form-control"
//       name="username"
//       value={formData.username}
//       onChange={handleChange}
//       placeholder="Enter Name Of User"
//     />
//   </div>
//   <div className="col-md-6 mb-3">
//     <label className="form-label">Mobile</label>
//     <input
//       type="text"
//       className="form-control"
//       name="mobile"
//       value={formData.mobile}
//       onChange={handleChange}
//       placeholder="Enter Mobile Of User"
//     />
//   </div>
// </div>

// {/* Email and Address */}
// <div className="row">
//   <div className="col-md-6 mb-3">
//     <label className="form-label">Email</label>
//     <input
//       type="email"
//       className="form-control"
//       name="email"
//       value={formData.email}
//       onChange={handleChange}
//       placeholder="Enter Email Of User"
//     />
//   </div>
//   <div className="col-md-6 mb-3">
//     <label className="form-label">Address</label>
//     <input
//       type="text"
//       className="form-control"
//       name="address"
//       value={formData.address}
//       onChange={handleChange}
//       placeholder="Enter Address"
//     />
//   </div>
// </div>

// {/* Password, Gender, City, State, Country */}
// <div className="row">
//   <div className="col-md-6 mb-3">
//     <label className="form-label">Password</label>
//     <input
//       type="password"
//       className="form-control"
//       name="password"
//       value={formData.password}
//       onChange={handleChange}
//       placeholder="Enter Password"
//     />
//   </div>
//   <div className="col-md-6 mb-3">
//     <label className="form-label">Gender</label>
//     <select
//       className="form-control"
//       name="gender"
//       value={formData.gender}
//       onChange={handleChange}
//     >
//       <option value="">Select Gender</option>
//       <option value="male">Male</option>
//       <option value="female">Female</option>
//       <option value="other">Other</option>
//     </select>
//   </div>
// </div>

// {/* City, State, Country, Pincode */}
// <div className="row">
//   <div className="col-md-6 mb-3">
//     <label className="form-label">City</label>
//     <input
//       type="text"
//       className="form-control"
//       name="city"
//       value={formData.city}
//       onChange={handleChange}
//       placeholder="Enter City"
//     />
//   </div>
//   <div className="col-md-6 mb-3">
//     <label className="form-label">State</label>
//     <input
//       type="text"
//       className="form-control"
//       name="state"
//       value={formData.state}
//       onChange={handleChange}
//       placeholder="Enter State"
//     />
//   </div>
// </div>

// <div className="row">
//   <div className="col-md-6 mb-3">
//     <label className="form-label">Country</label>
//     <input
//       type="text"
//       className="form-control"
//       name="country"
//       value={formData.country}
//       onChange={handleChange}
//       placeholder="Enter Country"
//     />
//   </div>
//   <div className="col-md-6 mb-3">
//     <label className="form-label">Pincode</label>
//     <input
//       type="text"
//       className="form-control"
//       name="pincode"
//       value={formData.pincode}
//       onChange={handleChange}
//       placeholder="Enter Pincode"
//     />
//   </div>
// </div>

// {/* Longitude, Latitude, Landmark, Social Type */}
// <div className="row">
//   <div className="col-md-6 mb-3">
//     <label className="form-label">Longitude</label>
//     <input
//       type="text"
//       className="form-control"
//       name="longitude"
//       value={formData.longitude}
//       onChange={handleChange}
//       placeholder="Enter Longitude"
//     />
//   </div>
//   <div className="col-md-6 mb-3">
//     <label className="form-label">Latitude</label>
//     <input
//       type="text"
//       className="form-control"
//       name="latitude"
//       value={formData.latitude}
//       onChange={handleChange}
//       placeholder="Enter Latitude"
//     />
//   </div>
// </div>

{/* <div className="row">
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
</div> */}

// {/* Alternate No, Aadhar No, OTP, FCM Token */}
// <div className="row">
//   <div className="col-md-6 mb-3">
//     <label className="form-label">Alternate No</label>
//     <input
//       type="text"
//       className="form-control"
//       name="alternate_no"
//       value={formData.alternate_no}
//       onChange={handleChange}
//       placeholder="Enter Alternate No"
//     />
//   </div>
//   <div className="col-md-6 mb-3">
//     <label className="form-label">Image</label>
//     <input
//       type="file"
//       className="form-control"
//       name="image"
//       value={formData.image}
//       onChange={handleChange}
//       placeholder="Enter Image"
//     />
//   </div>
//   <div className="col-md-6 mb-3">
//     <label className="form-label">Aadhar No</label>
//     <input
//       type="text"
//       className="form-control"
//       name="aadhar_no"
//       value={formData.aadhar_no}
//       onChange={handleChange}
//       placeholder="Enter Aadhar No"
//     />
//   </div>
// </div>



// <button type="submit" className="btn btn-primary">Submit</button>
// </form>