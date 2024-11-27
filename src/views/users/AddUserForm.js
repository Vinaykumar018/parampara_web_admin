// import React from 'react';

// const AddUserForm = ({ formData, handleChange, handleSubmit }) => (
//   <section>
//     <div className="row justify-content-center">
//       <div className="col-md-12">
//         <div className="card shadow-lg mb-4">
//           <div className="card-header bg-primary text-white">
//             <h4 className="text-uppercase text-center">Add User</h4>
//           </div>
//           <div className="card-body">
//             <form onSubmit={handleSubmit}>
//               {/* Username and Mobile */}
//               <div className="row">
//                 <div className="col-md-6 mb-3">
//                   <label className="form-label">User Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     placeholder="Enter Name Of User"
//                   />
//                 </div>
//                 <div className="col-md-6 mb-3">
//                   <label className="form-label">Mobile</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="mobile"
//                     value={formData.mobile}
//                     onChange={handleChange}
//                     placeholder="Enter Mobile Of User"
//                   />
//                 </div>
//               </div>
//               {/* Email and Address */}
//               <div className="row">
//                 <div className="col-md-6 mb-3">
//                   <label className="form-label">Email</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="Enter Email Of User"
//                   />
//                 </div>
//                 <div className="col-md-6 mb-3">
//                   <label className="form-label">Address</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="address"
//                     value={formData.address}
//                     onChange={handleChange}
//                     placeholder="Enter Address"
//                   />
//                 </div>
//               </div>
//               {/* Password and Gender */}
//               <div className="row">
//                 <div className="col-md-6 mb-3">
//                   <label className="form-label">Password</label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     placeholder="Enter Password"
//                   />
//                 </div>
//                 <div className="col-md-6 mb-3">
//                   <label className="form-label">Gender</label>
//                   <select
//                     className="form-control"
//                     name="gender"
//                     value={formData.gender}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>
//                 {/* City, State, Country, Pincode */}
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
// <div className="row">
//   <div className="col-md-6 mb-3">
//     <label className="form-label">Landmark</label>
//     <input
//       type="text"
//       className="form-control"
//       name="landmark"
//       value={formData.landmark}
//       onChange={handleChange}
//       placeholder="Enter Landmark"
//     />
//   </div>
//   <div className="col-md-6 mb-3">
//     <label className="form-label">Social Type</label>
//     <input
//       type="text"
//       className="form-control"
//       name="social_type"
//       value={formData.social_type}
//       onChange={handleChange}
//       placeholder="Enter Social Type"
//     />
//   </div>
// </div>

//                 <div className="row">
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
//               </div>
//               <button type="submit" className="btn btn-success">
//                 Submit
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   </section>
// );

// export default AddUserForm;
import React from 'react';

const AddUserForm = ({ formData, handleChange, handleSubmit }) => (
  <section>
    <div className="row justify-content-center">
      <div className="col-12">
        <div className="card shadow-lg mb-4 border-0">
          <div className="card-header text-center bg-dark text-white">
            <h4 className="text-uppercase font-weight-bold">Add User</h4>
          </div>
          <div className="card-body bg-light">
            <form onSubmit={handleSubmit}>
              {/* Username and Mobile */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">User Name</label>
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
                  <label className="form-label">Alternate No</label>
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

              <button type="submit" className="btn btn-success w-100 mt-3">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AddUserForm;
