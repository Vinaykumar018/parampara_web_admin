import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';

const UpdatePandit = () => {
  const { id } = useParams();

  const { contextPanditData } = useContext(AppContext);

  console.log(contextPanditData);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    address: '',
    longitude: '',
    latitude: '',
    password: '',
    alternate_no: '',
    gender: '',
    city: '',
    state: '',
    fcm_tokken: '',
    social_type: 'other',
    image: null,
    aadhar_no: '',
    aadhar_image: null,
    dob: '',
    country: '',
    pincode: '',
    skills: '',
    account_type: '',
    pancard_no: '',
    degree: '',
    bank_ac_no: '',
    experience: '',
    ifsc_code: '',
    acc_holder_name: '',
    bank_name: '',
    bio: '',
    type: '',
    register_id: '',
    booking_status: '',
    status: 'active',
    otp: '',
    approved: true,
    otp_verified: true,
    created_at: '',
    update_at: '',
  });

  const [imagePreview, setImagePreview] = useState(null);
  const token =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8'; // Replace with your actual token

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    // Append each field to the formData
    for (let key in formData) {
      if (key === 'image' && formData[key]) {
        formDataToSend.append(key, formData[key]);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    // Call API to create pandit
    fetch(`http://34.131.41.101:3000/api/pandit/update-pandit/${id}`, {
      method: 'POST',
      headers: {
        Authorization: token,
      },
      body: formDataToSend,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);
        toast.success('Pandit created successfully!');

        // Delay the navigation for 3000ms (3 seconds)
        setTimeout(() => {
          navigate('/pandit');
        }, 1000);
        // Reset form after successful submission
        setFormData({
          username: '',
          email: '',
          mobile: '',
          address: '',
          longitude: '',
          latitude: '',
          password: '',
          alternate_no: '',
          gender: '',
          city: '',
          state: '',
          fcm_tokken: '',
          social_type: 'other',
          image: null,
          aadhar_no: '',
          aadhar_image: null,
          dob: '',
          country: '',
          pincode: '',
          skills: '',
          account_type: '',
          pancard_no: '',
          degree: '',
          bank_ac_no: '',
          experience: '',
          ifsc_code: '',
          acc_holder_name: '',
          bank_name: '',
          bio: '',
          type: '',
          register_id: '',
          booking_status: '',
          status: 'active',
          otp: '',
          approved: true,
          otp_verified: true,
          created_at: '',
          update_at: '',
        });
        setImagePreview(null);
      })
      .catch((error) => {
        toast.error(
          error.message || 'Failed to create pandit. Please try again.',
        );
        console.error('Error:', error);
        // Optionally, you can show an error message to the user here
      });
  };

  // Set initial form data based on context data
  useEffect(() => {
    const panditData = contextPanditData.find((pandit) => pandit._id === id);
    if (panditData) {
      setFormData(panditData);
    }
  }, [contextPanditData, id]);

  return (
    <>
      <ToastContainer />
      <div className="card-body bg-light">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="card shadow-lg mb-4 border-0">
              <div className="card-header text-left bg-dark text-white">
                <h6 className="text-Capitalize">Update Pandit</h6>
              </div>
              <div className="card-body">
                <form onSubmit={handleFormSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.username}
                        onChange={(e) =>
                          setFormData({ ...formData, username: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Mobile</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.mobile}
                        onChange={(e) =>
                          setFormData({ ...formData, mobile: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">State</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.state}
                        onChange={(e) =>
                          setFormData({ ...formData, state: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Gender</label>
                      <select
                        className="form-control"
                        value={formData.gender}
                        onChange={(e) =>
                          setFormData({ ...formData, gender: e.target.value })
                        }
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Date of Birth</label>
                      <input
                        type="date"
                        className="form-control"
                        value={formData.dob}
                        onChange={(e) =>
                          setFormData({ ...formData, dob: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Country</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.country}
                        onChange={(e) =>
                          setFormData({ ...formData, country: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Pincode</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.pincode}
                        onChange={(e) =>
                          setFormData({ ...formData, pincode: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Skills</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.skills}
                        onChange={(e) =>
                          setFormData({ ...formData, skills: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Aadhar Number</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.aadhar_no}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            aadhar_no: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Aadhar Image</label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setFormData({ ...formData, aadhar_image: file });
                          }
                        }}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Bank Account Number</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.bank_ac_no}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            bank_ac_no: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">IFSC Code</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.ifsc_code}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            ifsc_code: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Account Holder Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.acc_holder_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            acc_holder_name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Bank Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.bank_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            bank_name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Experience (in years)
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.experience}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            experience: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Degree</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.degree}
                        onChange={(e) =>
                          setFormData({ ...formData, degree: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Pancard Number</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.pancard_no}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            pancard_no: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Bio</label>
                      <textarea
                        className="form-control"
                        value={formData.bio}
                        onChange={(e) =>
                          setFormData({ ...formData, bio: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Social Type</label>
                      <select
                        className=" form-control"
                        value={formData.social_type}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            social_type: e.target.value,
                          })
                        }
                      >
                        <option value="other">Other</option>
                        <option value="google">Google</option>
                        <option value="facebook">Facebook</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Image</label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setFormData({ ...formData, image: file });
                            setImagePreview(URL.createObjectURL(file));
                          }
                        }}
                      />
                      {imagePreview && (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="img-preview mt-2"
                        />
                      )}
                    </div>

                    <div className="text-end mb-3">
                      <button
                        type="submit"
                        className="me-2 btn btn-dark btn-sm"
                      >
                        Update Pandit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePandit;