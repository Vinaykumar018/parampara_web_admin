


import React, { useState } from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

const PoojaCategoryForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    category: "",
    pooja_image: null,
    short_discription: "",
    long_discription: "",
    slug_url: "", // Add a slug field
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle input changes dynamically
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      // Generate slug for the category dynamically
      slug_url: name === "category" ? generateSlug(value) : prevData.slug_url,
    }));
  };

  // Utility function to generate slug
  const generateSlug = (value) => {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  };

  const handleSubmit = (e) => {
    console.log(formData)
    e.preventDefault();
    onSubmit(formData);
    setVisible(!visible)

    // Reset form data
    setFormData({
      category: "",
      pooja_image: null,
      short_discription: "",
      long_discription: "",
      slug_url: "",
    });
  };

  const [visible, setVisible] = useState(false);

  return (
    <>
      <CButton
        color="warning"
        className="text-dark"
        size="sm"
        onClick={() => setVisible(!visible)}
      >
        Add Category
      </CButton>

      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Add Category</CModalTitle>
        </CModalHeader>
        <form onSubmit={handleSubmit}>
          <CModalBody>
            <div className="mb-3">
              <label className="form-label">Category Name</label>
              <input
                type="text"
                className="form-control"
                name="category"
                placeholder="Enter Category Name"
                value={formData.category}
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
                placeholder="Slug will be generated automatically"
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
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setFormData((prevData) => ({ ...prevData, pooja_image: file }));
                  }
                }}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Short Description</label>
              <textarea
                className="form-control"
                rows="4"
                name="short_discription"
                placeholder="Enter Short Description"
                value={formData.short_discription}
                onChange={handleInputChange}
                required
              />
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="danger text-white" type="reset" onClick={() => setVisible(false)}>
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

export default PoojaCategoryForm;



