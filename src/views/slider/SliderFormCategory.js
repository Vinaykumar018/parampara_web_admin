


//imports
import React, { useState } from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

const SliderFormCategory = ({ onSubmit }) => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", image: "", category: "" });
  const [imagePreview, setImagePreview] = useState(null);


  //form submit recieve and send data
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({ name: "", image: "", category: "" });
    setImagePreview(null);
    setVisible(false);
  };

  return (
    <>
      <CButton color="warning" className="text-dark" size="sm" onClick={() => setVisible(!visible)}>
        Add Category
      </CButton>
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Add Category</CModalTitle>
        </CModalHeader>
        <form onSubmit={handleFormSubmit}>
          <CModalBody>
            <div className="mb-3">
              <label className="form-label">Category Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Slider Category Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Category Slug</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Slider Category Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
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
                    setFormData({ ...formData, image: file });
                    setImagePreview(URL.createObjectURL(file));
                  }
                }}
                required
              />
              {imagePreview && (
                <div className="mt-3">
                  <img src={imagePreview} alt="Preview" style={{ maxWidth: "20%", height: "auto" }} />
                </div>
              )}
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="danger" type="reset" className="text-white btn-sm" onClick={() => setVisible(false)}>
              Close 
            </CButton>
            <CButton color="primary" type="submit" className="text-white btn-sm">
              Save
            </CButton>
          </CModalFooter>
        </form>
      </CModal>
    </>
  );
};

export default SliderFormCategory;

