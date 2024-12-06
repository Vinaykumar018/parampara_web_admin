import React, { useState } from "react";
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CSpinner,
} from '@coreui/react'

import { createCategory } from "../Services/poojaApiService";

const PoojaCategoryForm = ({ onCategoryAdded }) => {
  const [formData, setFormData] = useState({
    category: "",
    pooja_image: null,
    short_discription: "",
    long_discription: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category || !formData.pooja_image || !formData.short_discription || !formData.long_discription) {
      alert("Please fill in all fields and select an image.");
      return;
    }

    const data = new FormData();
    data.append("category", formData.category);
    data.append("pooja_image", formData.pooja_image);
    data.append("short_discription", formData.short_discription);
    data.append("long_discription", formData.long_discription);

    try {
      await createCategory(data);
      alert("Category created successfully!");
      setFormData({
        category: "",
        pooja_image: null,
        short_discription: "",
        long_discription: "",
      });
      onCategoryAdded(); // Notify parent to refresh the category list
    } catch (error) {
      alert("Failed to create category. Please try again.");
    }
  };
  const [visible, setVisible] = useState(false)
  return (
    <>
        <CButton color="primary" onClick={() => setVisible(!visible)}>
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
                placeholder="Enter Category Name"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Category Image</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, pooja_image: e.target.files[0] })
                }
                required
              />
              <div className="mb-3">
              <label className="form-label">Short Description</label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Enter Short Description"
                value={formData.short_discription}
                onChange={(e) =>
                  setFormData({ ...formData, short_discription: e.target.value })
                }
                required
              />
            </div>
            </div>
            </CModalBody>
            <CModalFooter>
              <CButton color="danger text-white" type="reset" onClick={() => setVisible(false)}>
                  Close
              </CButton>
              <CButton color="success text-white" type="submit">Save</CButton>
            </CModalFooter>
          </form>
          
        </CModal>
      </>
  );
};

export default PoojaCategoryForm;
