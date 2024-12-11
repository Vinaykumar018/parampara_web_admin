
import React, { useState } from "react";
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react";
import { UpdatePoojaCategory } from "../Services/poojaApiService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const UpdatePoojaCategoryForm = ({ handleEditFormSubmit,initialData = {}, onClose,sendResponse }) => {
  
  const [formData, setFormData] = useState({
    id: initialData.id || "",
    category: initialData.category || "",
    pooja_image:initialData.pooja_image,
    short_discription: initialData.short_discription || "",
    long_discription: initialData.long_discription || "",
  });


  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(initialData.id )
    try {
      const response = await UpdatePoojaCategory(formData.id, formData);
      if (response.status === 1) {
        toast.success('pooja category updated successfully');
        sendResponse(true);
      } else {
        toast.error('Failed to update Pooja category data');
      }
      
    } catch (error) {
     
      console.error('Error updating pooja:', error);
    }
   
    onClose();
  };

  return (
    <CModal alignment="center" visible={true} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Update Category</CModalTitle>
      </CModalHeader>
      <form onSubmit={handleSubmit}>
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
        const reader = new FileReader();
        reader.onload = () => {
          setFormData({ ...formData, pooja_image: reader.result });
        };
        reader.readAsDataURL(file);
      }
    }}
  />
  {formData.pooja_image && (
    <div className="mt-3">
      {/* <label className="form-label">Image Preview:</label> */}
      <img
        src={typeof formData.pooja_image === "string" ? formData.pooja_image : ""}
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
              rows="4"
              value={formData.short_discription}
              onChange={(e) =>
                setFormData({ ...formData, short_discription: e.target.value })
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

export default UpdatePoojaCategoryForm;
