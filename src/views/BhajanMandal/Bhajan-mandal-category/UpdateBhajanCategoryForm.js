import React, { useState } from "react";
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react";
import { UpdateBhajanCategory } from "../../Services/BhajanMandalApiService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateBhajanCategoryForm = ({ handleEditFormSubmit, initialData = {}, onClose, sendResponse }) => {
  const [formData, setFormData] = useState({
    id: initialData.id || "",
    category: initialData.category || "",
    bhajan_image: null,
    short_discription: initialData.short_discription || "",
    long_discription: initialData.long_discription || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("id", formData.id);
      data.append("category", formData.category);
      data.append("bhajan_image", formData.bhajan_image);
      data.append("short_discription", formData.short_discription);
      data.append("long_discription", formData.long_discription);

      const response = await UpdateBhajanCategory(formData.id, data);
      if (response.status === 1) {
        toast.success("Bhajan category updated successfully");
        await sendResponse(true);
      } else {
        toast.error("Failed to update Bhajan category data");
      }
    } catch (error) {
      console.error("Error updating Bhajan category:", error);
    }
    onClose();
  };

  return (
    <CModal alignment="center" visible={true} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Update Bhajan Category</CModalTitle>
      </CModalHeader>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <CModalBody>
          <div className="mb-3">
            <label className="form-label">Category Name</label>
            <input
              type="text"
              className="form-control"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
              value={formData.short_discription}
              onChange={(e) =>
                setFormData({ ...formData, short_discription: e.target.value })
              }
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
                onChange={(e) =>
                  setFormData({ ...formData, long_discription: e.target.value })
                }
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

export default UpdateBhajanCategoryForm;
