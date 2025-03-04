import React, { useState, useEffect } from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { updateCategory } from "../../Services/productApiService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProductCategory = ({ initialData = {}, onClose, sendResponse }) => {
  const [formData, setFormData] = useState({
    id: initialData.id || "",
    category_name: initialData.category_name || "",
    category_image: null,
    discription: initialData.discription || "",
    slug_url: initialData.slug_url || "",
  });

  useEffect(() => {
    setFormData({
      id: initialData.id || "",
      category_name: initialData.category_name || "",
      category_image: null,
      discription: initialData.discription || "",
      slug_url: initialData.slug_url || generateSlug(initialData.category_name || ""),
    });
  }, [initialData]);

  const generateSlug = (value) => {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      slug_url: name === "category_name" ? generateSlug(value) : prevData.slug_url,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({ ...prevData, category_image: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("id", formData.id);
      data.append("category_name", formData.category_name);
      data.append("category_image", formData.category_image);
      data.append("discription", formData.discription);
      data.append("slug_url", formData.slug_url);
      
      const response = await updateCategory(formData.id, data);
      if (response.status === 1) {
        toast.success("Category updated successfully");
        await sendResponse(true);
      } else {
        toast.error("Failed to update category");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("An error occurred");
    }
    onClose();
  };

  return (
    <CModal alignment="center" visible={true} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Update Product Category</CModalTitle>
      </CModalHeader>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <CModalBody>
          <div className="mb-3">
            <label className="form-label">Category Name</label>
            <input
              type="text"
              className="form-control"
              name="category_name"
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
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="2"
              name="discription"
              value={formData.discription}
              onChange={handleInputChange}
              required
            />
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="danger text-white" onClick={onClose}>
            Close
          </CButton>
          <CButton color="success text-white" type="submit">
            Save
          </CButton>
        </CModalFooter>
      </form>
    </CModal>
  );
};

export default UpdateProductCategory;
