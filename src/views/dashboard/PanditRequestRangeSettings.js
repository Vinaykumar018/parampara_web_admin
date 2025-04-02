import React from 'react';

const PanditRequestRangeSettings = () => {
  return (
    <div>


<div>
      <div className="container-fluid">
      <section>
        <div className="row justify-content-center">
          {/* Form Card */}
          <div className="col-md-12">
            <div className="card shadow-lg mb-4">
              <div className="card-header bg-primary text-white">
                <h4 className="text-uppercase text-center">Select Target Audience</h4>
              </div>
              <div className="card-body">
                {/* Target Audience Options */}
                <div className="mb-4">
                  <label className="form-label text-uppercase fw-bold">Target Audience</label>
                  <select className="form-select">
                    <option value="">Select Audience</option>
                    <option value="user">User</option>
                    <option value="pandit">Pandit</option>
                    <option value="vendor">Vendor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                {/* Form Fields */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-control" placeholder="Enter your name" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder="Enter your email" />
                  </div>
                </div>

                {/* <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Phone Number</label>
                    <input type="text" className="form-control" placeholder="Enter your phone number" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Delivery Address</label>
                    <input type="text" className="form-control" placeholder="Enter your address" />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label">Additional Information</label>
                  <textarea className="form-control" rows="4" placeholder="Enter any additional details"></textarea>
                </div> */}

                {/* Submit Button */}
                <div className="text-center">
                  <button type="submit" className="btn btn-primary btn-lg px-5">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </div>
      

    </div>
  );
}

export default PanditRequestRangeSettings;