import React, { useState, useEffect, useContext } from "react";
import RichTextEditor from "react-rte";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchCategories } from '../../Services/BhajanMandalApiService'; // Ensure this import path is correct
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../../context/AppContext";

const UpdateBhajanMandal = () => {
  const { contextBhajanMandalData } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bhajan_name: "",
    slug_url: "",
    bhajan_category: "",
    bhajan_price: "",
    bhajan_member: "",
    bhajan_image: null,
    short_discription: "",
    long_discription: RichTextEditor.createEmptyValue(),
    exp_year: "", // New field
    address: "", // New field
    city: "", // New field
    location: "", // New field
    state: "", // New field
    country: "", // New field
    pin_code: "", // New field
    area: "", // New field
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      slug_url: name === 'bhajan_name' ? generateSlug(value) : prevData.slug_url,
    }));
  };

  const generateSlug = (value) => {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  };

  // Handle image file selection and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
      setFormData((prevData) => ({ ...prevData, bhajan_image: file }));
    } else {
      toast.error('Invalid file type. Please select an image.');
    }
  };

  // Handle rich text editor changes
  const handleEditorChange = (value, fieldName) => {
    setFormData((prevData) => ({ ...prevData, [fieldName]: value }));
  };

  // Handle form submission
  const AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8'; // Replace with your actual token
  const BASE_URL = `${import.meta.env.VITE_BASE_URL}/bhajanMandal/update-bhajan`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "long_discription") {
        data.append(key, formData[key].toString("html"));
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.put(`${BASE_URL}/${id}`, data, {
        headers: {
          Authorization: AUTH_TOKEN,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.status === 1) {
        toast.success("Bhajan Mandal updated successfully!");
        setTimeout(() => {
          navigate("/bhajan-list");
        }, 1000);
      }
    } catch (error) {
      toast.error("Error updating Bhajan Mandal. Please try again.");
      console.error("Error updating Bhajan Mandal:", error);
    }
  };

  // Load categories
  const loadCategories = async () => {
    try {
      const result = await fetchCategories();
      if (result.status === 1) {
        setCategoryData(result.data);
      }
    } catch (error) {
      console.error("Error loading categories:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load Bhajan Mandal data for editing
  useEffect(() => {
    const bhajanMandal = contextBhajanMandalData.find((item) => item._id === id);
    console.log(bhajanMandal)
    if (bhajanMandal) {
      setFormData({
        bhajan_name: bhajanMandal.bhajan_name,
        slug_url: bhajanMandal.slug_url,
        bhajan_category: bhajanMandal.bhajan_category,
        bhajan_price: bhajanMandal.bhajan_price,
        bhajan_member: bhajanMandal.bhajan_member,
        bhajan_image: bhajanMandal.bhajan_image,
        short_discription: bhajanMandal.short_discription,
        long_discription: RichTextEditor.createValueFromString(bhajanMandal.long_discription, 'html'),
        exp_year: bhajanMandal.exp_year || "", // New field
        address: bhajanMandal.mandali_address.address || "", // New field
        city: bhajanMandal.mandali_address.city || "", // New field
        location: bhajanMandal.mandali_address.location || "", // New field
        state: bhajanMandal.mandali_address.state || "", // New field
        country: bhajanMandal.mandali_address.country || "", // New field
        pin_code: bhajanMandal.mandali_address.pin_code || "", // New field
        area: bhajanMandal.mandali_address.area || "", // New field
      });
      if (bhajanMandal.bhajan_image) {
        setImagePreview(bhajanMandal.bhajan_image);
      }
    }
  }, [contextBhajanMandalData, id]);

  // Load categories on component mount
  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="card-body bg-light">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="card shadow-lg mb-4 border-0">
            <div className="card-header text-left bg-dark text-white">
              <h6 className="text-Capitalize">Update Bhajan Mandal</h6>
            </div>
            <div className="card-body bg-light">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Bhajan Name */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Bhajan Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="bhajan_name"
                      placeholder="Enter Bhajan Name"
                      value={formData.bhajan_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Bhajan Slug */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Bhajan Slug</label>
                    <input
                      type="text"
                      className="form-control"
                      name="slug_url"
                      placeholder="Slug will be generated automatically"
                      value={formData.slug_url}
                      readOnly
                    />
                  </div>

                  {/* Bhajan Category */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Choose Category</label>
                    <select
                      className="form-control form-select"
                      name="bhajan_category"
                      value={formData.bhajan_category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled>Select Category</option>
                      {categoryData.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Bhajan Price */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      name="bhajan_price"
                      placeholder="Enter Price"
                      value={formData.bhajan_price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Total Members */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Total Members</label>
                    <input
                      type="number"
                      className="form-control"
                      name="bhajan_member"
                      placeholder="Enter Total Members"
                      value={formData.bhajan_member}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Experience Year */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Experience Year</label>
                    <input
                      type="text"
                      className="form-control"
                      name="exp_year"
                      placeholder="Enter Experience Year"
                      value={formData.exp_year}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Address */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      placeholder="Enter Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* City */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      placeholder="Enter City"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Location */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      placeholder="Enter Location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* State */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">State</label>
                    <input
                      type="text"
                      className="form-control"
                      name="state"
                      placeholder="Enter State"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Country */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Country</label>
                    <input
                      type="text"
                      className="form-control"
                      name="country"
                      placeholder="Enter Country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Pin Code */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Pin Code</label>
                    <input
                      type="text"
                      className="form-control"
                      name="pin_code"
                      placeholder="Enter Pin Code"
                      value={formData.pin_code}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Area */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Area</label>
                    <input
                      type="text"
                      className="form-control"
                      name="area"
                      placeholder="Enter Area"
                      value={formData.area}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Bhajan Image */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Bhajan Image</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={handleFileChange}
                      required
                    />
                  </div>

                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="mb-3">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="img-fluid"
                        style={{ maxWidth: '100%', maxHeight: '80px', objectFit: 'contain' }}
                      />
                    </div>
                  )}

                  {/* Short Description */}
                  <div className="col-md-8 mb-3">
                    <label className="form-label">Short Description</label>
                    <textarea
                      className="form-control"
                      rows="2"
                      placeholder="Enter Short Description"
                      name="short_discription"
                      value={formData.short_discription}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Long Description */}
                  <div className="mb-3">
                    <label className="form-label">Long Description</label>
                    <RichTextEditor
                      editorStyle={{
                        minHeight: "120px",
                        backgroundColor: "#f4f4f4",
                        border: "1px solid #ccc",
                        color: "#333",
                        padding: "10px",
                        cursor: "pointer",
                      }}
                      value={formData.long_discription}
                      onChange={(value) => handleEditorChange(value, "long_discription")}
                    />
                  </div>

                  <div className="text-end mb-3">
                    <button type="submit" className="me-2 btn btn-dark btn-sm">Update Bhajan Mandal</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateBhajanMandal;