import React from 'react';
import { useState } from 'react';
import GetTable from '../dashboard/GetTable';

const PanditPage = () => {
    const [showForm, setShowForm] = useState(false);

const toggleForm = () => {
  setShowForm((prev) => !prev);
};

const usersData = [
    { name: "Shivanshu", phone: "1234567890", email: "batham.shivanshu31@gmail.com" },
    { name: "Chandni", phone: "9644554331", email: "chandniverma4478557@gmail.com" },
    { name: "Chandni", phone: "6388482208", email: "chandniverma4478557@gmail.com" },
    { name: "Rachit Tripathi", phone: "8601599299", email: "rachit.tripathi.75@gmail.com" },
    { name: "Vinay Kumar", phone: "9336713280", email: "kumarvinay15381@gmail.com" },
  ];

  // Table columns
  const userColumns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Phone", selector: (row) => row.phone },
    { name: "Email", selector: (row) => row.email },
  ];

return (
    <div className="container-fluid">

          {/* Add User Button */}
          
  <div className="text-end my-4">
    <button className="btn btn-primary btn-sm" onClick={toggleForm}>
      {showForm ? "Add User" : "Add User"}
    </button>
  </div>

   {/* Conditionally Render Form */}
   {showForm && (
<section>
<div className="row justify-content-center">
  <div className="col-md-12">
    <div className="card shadow-lg mb-4">
      <div className="card-header bg-primary text-white">
        <h4 className="text-uppercase text-center">Add User</h4>
      </div>
      <div className="card-body">
        {/* Form Fields */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">User Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name Of User"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Mobile</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Mobile Of User"
            />
          </div>
        
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email Of User"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Address"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password Of User"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">User Image</label>
            <input type="file" className="form-control" />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-sm px-5">
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</section>)}

<GetTable data={usersData} columns={userColumns} title="User Contact Information" />
</div>

);
};

const styles = {
container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
    color: '#333',
},
heading: {
    fontSize: '2rem',
    marginBottom: '1rem',
},
message: {
    fontSize: '1.2rem',
    color: '#555',
},
};

export default PanditPage;
