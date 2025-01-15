import React, { useState } from "react";
import RichTextEditor from "react-rte";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createPooja, fetchCategories } from '../../Services/poojaApiService'; // Ensure this import path is correct
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { updatePoojaData } from '../../Services/poojaApiService';  
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";

const UpdatePoojaList = () => {
const {contextPoojaData,setContextPoojaData} = useContext(AppContext);
console.log(contextPoojaData)
  const [isSamagriChecked, setIsSamagriChecked] = useState(false);
  const [formData, setFormData] = useState({
    pooja_name: "",
    slug_url: '',
    pooja_category: "",
    pooja_Samegristatus: "0",
    price_withSamagri: "",
    price_withoutSamagri: "",
    pooja_image: null,
    short_discription: "",
    long_discription: RichTextEditor.createEmptyValue(),
    samagridynamicFields: [],
    samagriName: "",
    samagriPrice: "",
    samagriDescription: "",
    
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
      // Generate slug for pooja_name dynamically
      slug_url: name === 'pooja_name' ? generateSlug(value) : prevData.slug_url,
    }));
  };

  const generateSlug = (value) => {
    return value
      .toLowerCase() // Convert to lowercase
      .replace(/[^a-z0-9\s-]/g, '') // Remove invalid characters
      .trim() // Trim whitespace
      .replace(/\s+/g, '-'); // Replace spaces with hyphens
  };
  // Handle image file selection and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
      setFormData((prevData) => ({ ...prevData, pooja_image: file }));
    } else {
      toast.error('Invalid file type. Please select an image.');
    }
  };

  // Handle rich text editor changes
  const handleEditorChange = (value, fieldName) => {
    setFormData((prevData) => ({ ...prevData, [fieldName]: value }));
  };

  // Function to add a new dynamic field
  const addDynamicField = () => {
    setFormData((prevData) => ({
      ...prevData,
      samagridynamicFields: [
        ...prevData.samagridynamicFields,
        { samagriName: "", samagriPrice: "", samagriDescription: "" }
      ],
    }));
  };

  // Function to handle changes in the dynamic input fields
  const handleDynamicFieldChange = (index, fieldName) => (e) => {
    const { value } = e.target;
    const newFields = [...formData.samagridynamicFields];
    newFields[index][fieldName] = value;
    setFormData((prevData) => ({
      ...prevData,
      samagridynamicFields: newFields,
    }));
  };



  
  
 

  // Handle form submission
  const AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';
  const BASE_URL = `${import.meta.env.VITE_BASE_URL}/pooja/update-pooja`;
  const { id } = useParams();
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

    if (isSamagriChecked) {
      data.append('samagriData', JSON.stringify(formData.samagridynamicFields));
    }
    console.log(`${BASE_URL}/update/${id}`)

    try {
      const response = await axios.put(`${BASE_URL}/${id}`, data, {
        headers: {
          Authorization: AUTH_TOKEN,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.status === 1) {
        toast.success("Pooja updated successfully!");
                         
                             // Delay the navigation for 3000ms (3 seconds)
                             setTimeout(() => {
                              navigate("/pooja/pooja-list");
                          }, 1000);
        
        // Reset form data
        setFormData({
          pooja_name: "",
          pooja_category: "",
          pooja_Samegristatus: "0",
          price_withSamagri: "",
          price_withoutSamagri: "",
          pooja_image: null,
          short_discription: "",
          long_discription: RichTextEditor.createEmptyValue(),
          samagriName: "",
          samagriPrice: "",
          samagri_discription: "",
        });
        setDynamicSamagriData([{ samagriName: '', samagriPrice: '', samagriDescription: '' }]); // Reset dynamic fields
        setImagePreview(null);
      }
    } catch (error) {
      
      console.error("Error updating Pooja:", error);
    }
  };

  // Handle checkbox change for samagri status
  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsSamagriChecked(checked);
    setFormData((prevData) => ({
      ...prevData,
      pooja_Samegristatus: checked ? "1" : "0"
    }));
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);


  useEffect(() => {
    const poojaData = contextPoojaData.find(pooja => pooja._id === id);
    if (poojaData) {
      setFormData({
        pooja_name: poojaData.pooja_name,
        slug_url: poojaData.slug_url,
        pooja_category: poojaData.pooja_category,
        pooja_Samegristatus: poojaData.pooja_Samegristatus,
        price_withSamagri: poojaData.price_withSamagri,
        price_withoutSamagri: poojaData.price_withoutSamagri,
        pooja_image: poojaData.pooja_image, // You may want to handle image differently
        short_discription: poojaData.short_discription,
        long_discription: RichTextEditor.createValueFromString(poojaData.long_discription, 'html'),
        samagridynamicFields: poojaData.sagridynamicFields || [],
        samagriName: "",
        samagriPrice: "",
        samagriDescription: "",
      });
      setIsSamagriChecked(poojaData.pooja_Samegristatus === "1");
      if (poojaData.pooja_image) {
        setImagePreview(poojaData.pooja_image); // Assuming you have a URL for the image
      }
    }
  }, [contextPoojaData, id]);
console.log(formData)

  return (
    <div className="card-body bg-light">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="card shadow-lg mb-4 border-0">
            <div className="card-header text-left bg-dark text-white">
              <h6 className="text-Capitalize">Update Pooja</h6>
            </div>
            <div className="card-body bg-light">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Pooja Name */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Pooja Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="pooja_name"
                      placeholder="Enter Pooja Name"
                      value={formData.pooja_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
        <label className="form-label">Pooja Slug</label>
        <input
          type="text"
          className="form-control"
          name="slug_url"
          placeholder="Slug will be generated automatically"
          value={formData.slug_url}
          readOnly
        />
      </div>

                  {/* Pooja Category */}
                  {/* Pooja Category */}
<div className="col-md-6 mb-3">
  <label className="form-label">Choose Category</label>
  <select
    className="form-control form-select"
    placeholder="Enter Pooja Category"
    name="pooja_category"
    value={formData.pooja_category}
    onChange={(e) => setFormData((prevData) => ({
      ...prevData,
      pooja_category: e.target.value, // Update the pooja_category field
    }))}
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


                  {/* Price With Samagri */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Price (With Samagri)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="price_withSamagri"
                      placeholder="Enter Price With Samagri"
                      value={formData.price_withSamagri}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Price Without Samagri */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Price (Without Samagri)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="price_withoutSamagri"
                      placeholder="Enter Price Without Samagri"
                      value={formData.price_withoutSamagri}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Pooja Image */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Pooja Image</label>
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

                  {/* Samagri Status */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Samagri Status</label>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={isSamagriChecked}
                        onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label">Include Samagri</label>
                    </div>
                  </div>


                   {isSamagriChecked && (
        <div className="row">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Samagri Name"
              name="samagriName"
              value={formData.samagriName}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              placeholder="Price"
              name="samagriPrice"
              value={formData.samagriPrice}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              name="samagriDescription"
              value={formData.samagriDescription}
              onChange={handleInputChange}
            />
          </div>
        </div>
      )}
                  {/* Dynamic Samagri Fields */}
                  {isSamagriChecked && formData.samagridynamicFields.map((field, index) => (
                    <div key={index} className="mb-3 row">
                      <div className="col-md-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Samagri Name"
                          value={field.samagriName}
                          onChange={handleDynamicFieldChange(index, 'samagriName')}
                        />
                      </div>
                      <div className="col-md-4">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Price"
                          value={field.samagriPrice}
                          onChange={handleDynamicFieldChange(index, 'samagriPrice')}
                        />
                      </div>
                      <div className="col-md-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Description"
                          value={field.samagriDescription}
                          onChange={handleDynamicFieldChange(index, 'samagriDescription')}
                        />
                      </div>
                    </div>
                  ))}

                  {/* Add More Samagri Fields */}
                  {isSamagriChecked && (
                    <div className="col-12 mb-3 mt-4">
                      <button type="button" className="btn btn-dark btn-sm" onClick={addDynamicField}>
                        Add More Fields
                      </button>
                    </div>
                  )}

                  <div className="text-end mb-3">
                    <button type="submit" className="me-2 btn btn-dark btn-sm">Update Pooja</button>
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

export default UpdatePoojaList;