import React, { useState, useEffect } from "react";
import RichTextEditor from "react-rte";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBhajanMandal, fetchCategories } from '../../Services/BhajanMandalApiService' // Ensure this import path is correct
import { useNavigate } from "react-router-dom";

const AddBhajanMandal = () => {
  const [formData, setFormData] = useState({
    bhajan_name: "",
    slug_url: '',
    bhajan_category: "",
    bhajan_image: null,
    bhajan_price: "",
    short_discription: "",
    bhajan_member:"",
    long_discription: RichTextEditor.createEmptyValue(),
  });
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the formData state
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      // Generate slug for bhajan_name dynamically
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "long_discription" || key === "short_discription") {
        data.append(key, formData[key].toString("html"));
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      await createBhajanMandal(data);
      toast.success("Bhajan Mandal created successfully!");
      setTimeout(() => {
        navigate("/bhajan-list");
      }, 1000);
      setFormData({
        bhajan_member:"",
        bhajan_name: "",
        bhajan_category: "",
        bhajan_image: null,
        bhajan_price: "",
        short_discription: "",
        long_discription: RichTextEditor.createEmptyValue(),
      });
      setImagePreview(null);
    } catch (error) {
      toast.error("Failed to create Bhajan Mandal. Please try again.");
      console.error("Error creating Bhajan Mandal:", error);
    }
  };

  const [categoryData, setCategoryData] = useState([]);
  const loadCategories = async () => {
    try {
      const result = await fetchCategories();
      if (result.status === 1) {
        setCategoryData(result.data);
      }
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="card-body bg-light">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="card shadow-lg mb-4 border-0">
            <div className="card-header text-left bg-dark text-white">
              <h6 className="text-Capitalize">Add Bhajan Mandali</h6>
            </div>
            <div className="card-body bg-light">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Bhajan Name */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Mandali Name</label>
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
                    <label className="form-label">Mandali Slug</label>
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

                  {/* Bhajan Image */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Mandali Photo</label>
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
                  <div className="col-md-12 mb-3">
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
                    <button type="submit" className="me-2 btn btn-success text-light btn-sm">Save</button>
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

export default AddBhajanMandal;