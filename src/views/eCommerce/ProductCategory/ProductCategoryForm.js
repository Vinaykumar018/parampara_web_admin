import React, { useState } from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { createCategory } from '../../Services/productApiService';

const ProductCategoryForm = ({ onCategoryCreated }) => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    category_name: "",
    category_image: null,
    discription: "",
    slug_url: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      slug_url: name === "category_name" ? generateSlug(value) : prevData.slug_url,
    }));
  };

  const generateSlug = (value) => {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        category_image: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createCategory(formData);
      alert("Category added successfully!");
      setVisible(false);
      setFormData({
        category_name: "",
        category_image: null,
        discription: "",
        slug_url: "",
      });

      if (onCategoryCreated) {
        onCategoryCreated(); // Refresh category list if provided
      }
    } catch (error) {
      alert("Failed to add category. Check console for details.");
      console.error(error);
    }
  };

  return (
    <>
      <CButton
        color="warning"
        className="text-dark"
        size="sm"
        onClick={() => setVisible(true)}
      >
        Add Product Category
      </CButton>

      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Add Product Category</CModalTitle>
        </CModalHeader>
        <form onSubmit={handleSubmit}>
          <CModalBody>
            <div className="mb-3">
              <label className="form-label">Category Name</label>
              <input
                type="text"
                className="form-control"
                name="category_name"
                placeholder="Enter Category Name"
                value={formData.category_name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Category Slug</label>
              <input
                type="text"
                className="form-control"
                name="slug_url"
                value={formData.slug_url}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Category Image</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleFileChange}
              />
              {formData.category_image && (
                <div className="mt-3">
                  <img
                    src={
                      formData.category_image instanceof File
                        ? URL.createObjectURL(formData.category_image)
                        : ""
                    }
                    alt="Preview"
                    style={{ width: "80%", maxHeight: "100px", objectFit: "cover" }}
                  />
                </div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Short Description</label>
              <textarea
                className="form-control"
                rows="2"
                name="discription"
                placeholder="Enter Description"
                value={formData.discription}
                onChange={handleInputChange}
                required
              />
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="danger text-white" type="button" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton color="success text-white" type="submit">
              Save
            </CButton>
          </CModalFooter>
        </form>
      </CModal>
    </>
  );
};

export default ProductCategoryForm;
