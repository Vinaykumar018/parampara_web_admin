import React, { useState } from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

const BhajanCategoryForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    category: "",
    bhajan_image: null,
    short_discription: "",
    long_discription: "",
    slug_url: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      slug_url: name === "category" ? generateSlug(value) : prevData.slug_url,
    }));
  };

  const generateSlug = (value) => {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setVisible(false);
    setFormData({
      category: "",
      bhajan_image: null,
      short_discription: "",
      long_discription: "",
      slug_url: "",
    });
  };

  const [visible, setVisible] = useState(false);

  return (
    <>
      <CButton color="warning" className="text-dark" size="sm" onClick={() => setVisible(!visible)}>
        Add Bhajan Category
      </CButton>

      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Add Bhajan Category</CModalTitle>
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
              <input type="text" className="form-control" name="slug_url" value={formData.slug_url} readOnly />
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
                  setFormData({ ...formData, bhajan_image: file });
                }
              }}
            />
            {formData.bhajan_image && (
              <div className="mt-3">
                <img
                  src={
                    formData.bhajan_image instanceof File
                      ? URL.createObjectURL(formData.bhajan_image)
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
                name="short_discription"
                placeholder="Enter Short Description"
                value={formData.short_discription}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Long Description</label>
              <textarea
                className="form-control"
                rows="4"
                name="long_discription"
                placeholder="Enter Long Description"
                value={formData.long_discription}
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

export default BhajanCategoryForm;
