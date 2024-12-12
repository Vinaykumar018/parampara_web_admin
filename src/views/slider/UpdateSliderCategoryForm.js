import React, { useState } from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { toast } from "react-toastify"; // Ensure toast is properly imported
import { UpdateSliderCategory } from "../Services/sliderApiService";

const UpdateSliderCategoryForm = ({ initialData, onClose }) => {
  const [formData, setFormData] = useState({
    id: initialData?.id || "",
    name: initialData?.name || "",
    image: initialData?.image || null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.image) {
      toast.error("Please fill all the required fields.");
      return;
    }

    try {
      const data = new FormData();
      data.append("id", formData.id);
      data.append("name", formData.name);
      data.append("image", formData.image);

      const response = await UpdateSliderCategory(formData.id, data);

      if (response.status === 1) {
        toast.success("Category updated successfully!");
        onClose(); // Close modal after successful update
      } else {
        toast.error("Failed to update category.");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("An error occurred while updating the category.");
    }
  };

  return (
    <CModal alignment="center" visible={true} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Update Category</CModalTitle>
      </CModalHeader>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <CModalBody>
          <div className="mb-3">
            <label className="form-label">Category Name</label>
            <input
              type="text"
              className="form-control"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
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
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setFormData({ ...formData, image: file });
                }
              }}
            />
            {formData.image && (
              <div className="mt-3">
                <img
                  src={
                    formData.image instanceof File
                      ? URL.createObjectURL(formData.image)
                      : formData.image
                  }
                  alt="Preview"
                  style={{
                    width: "80%",
                    maxHeight: "100px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
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

export default UpdateSliderCategoryForm;
