import React, { useState } from "react";
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

  return (
    <div className="row justify-content-center">
  <div className="col-12">
    <div className="card shadow-lg mb-4 border-0">
      <div className="card-header text-center bg-dark text-white">
        <h4 className="text-uppercase font-weight-bold">Add New Category</h4>
      </div>
      <div className="card-body bg-light">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Category Name */}
            <div className="col-md-6 mb-3">
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

            {/* Category Image */}
            <div className="col-md-6 mb-3">
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
            </div>

            {/* Short Description */}
            <div className="col-md-8 mb-3">
              <label className="form-label">Short Description</label>
              <textarea
                className="form-control"
                rows="2"
                placeholder="Enter Short Description"
                value={formData.short_discription}
                onChange={(e) =>
                  setFormData({ ...formData, short_discription: e.target.value })
                }
                required
              />
            </div>

            {/* Long Description */}
            <div className="col-12 mb-3">
              <label className="form-label">Long Description</label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Enter Long Description"
                value={formData.long_discription}
                onChange={(e) =>
                  setFormData({ ...formData, long_discription: e.target.value })
                }
                required
              />
            </div>

            {/* Submit Button */}
            <div className="col-12 text-center">
              <button type="submit" className="me-2 btn btn-dark btn-lg">
                Add Category
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

  );
};

export default PoojaCategoryForm;
