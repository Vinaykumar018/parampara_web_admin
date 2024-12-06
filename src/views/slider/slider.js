


import React, { useState, useEffect } from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSpinner,
} from '@coreui/react'
import GetTable from "../dashboard/GetTable";
import { getCategories } from "../Services/sliderApiCategoryService";

const Slider = () => {
  const [sliderData, setSliderData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: "", image: "", category: "" });

  const apiUrl = "https://parampara-admin.vercel.app/api/slider";

  // Fetch slider data
  useEffect(() => {
    const fetchSliderData = async () => {
      try {
        const response = await fetch(`${apiUrl}/all-slider`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8`,
          },
        });
        const result = await response.json();
        if (result.status === 1) {
          setSliderData(result.data);
        }
      } catch (error) {
        console.error("Error fetching slider data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSliderData();
  }, []);
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const result = await getCategories();
        if (result.status === 1) {
          console.log(result.data);
          setCategories(result.data);
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, []);
  // Handle form submission to add a new slider
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", image: "", category: "" });
  };
  // Table columns for Sliders
  const columns = [
    { name: "S No.", selector: (row,index)=> index+1},
    { name: "ID", selector: (row) => row._id },
    { name: "Name", selector: (row) => row.name },
    { name: "Category", selector: (row) => row.category },
    {
      name: "Image",
      selector: (row) =>
        row.image ? (
          <img
            src={`${row.image}`} // Adjusted to display uploaded image URL
            alt={row.name}
            width={50}
            height={30}
          />
        ) : (
          "N/A"
        ),
    },
    { name: "Status", selector: (row) => row.status },
    { name: "Created At", selector: (row) => new Date(row.created_at).toLocaleString() },
  ];
  const VerticallyCentered = () => {
    const [visible, setVisible] = useState(false)
    return (
      <>
        <CButton color="primary" onClick={() => setVisible(!visible)}>
          Add Slider
        </CButton>
        <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>
            <CModalTitle>Add Slider</CModalTitle>
          </CModalHeader>
          <form onSubmit={handleSubmit}>
            <CModalBody>
              <div className="mb-3">
                <label className="form-label">Choose Category</label>
                <select  className="form-control form-select"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    required
                  >
                    <option value="" disabled>Select Category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Slider Name</label>
                <input type="text" placeholder="Name" className="form-control" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}  required/>
              </div>
              <div className="mb-3">
                <label className="form-label">Image</label>
                <input type="file" accept="image/*" className="form-control" onChange={(e) => {
                     const file = e.target.files[0];
                    if (file) {
                      setFormData({ ...formData, image: file });
                    }
                  }} required/>
              </div>
            </CModalBody>
            <CModalFooter>
              <CButton color="danger" type="reset" onClick={() => setVisible(false)}>
                Close
              </CButton>
              <CButton color="primary" type="submit">Save</CButton>
            </CModalFooter>
          </form>
        </CModal>
      </>
    )
  }
  return (
    <div>
      <div className="card shadow-lg mb-4 border-0">
      <div class="card-header bg-dark text-white py-2">
        <div className="d-flex align-items-center justify-content-between">
          <h6 className="mb-0">Image Slider</h6>
          <div>{VerticallyCentered()}</div>
        </div> 
      </div>
      {/* Loading Indicator or Table */}
      {loading ? (
        <div className="justify-content-center d-flex p-5"> 
            <CSpinner color="primary" />
        </div>
      ) : (
        <GetTable
          data={sliderData} // Pass fetched slider data
          columns={columns}
          title="Slider List"
        />
      )}
    </div>
    </div>
  );
};

export default Slider;
