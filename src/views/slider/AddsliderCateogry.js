import React, { useState, useEffect } from "react";
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CSpinner,
} from '@coreui/react'
import GetTable from "../dashboard/GetTable";
const SliderList = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: "", image: "", category: "" });
  const apiUrl = "https://parampara-admin.vercel.app/api/slider";
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await fetch(`${apiUrl}/all-category`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8`,
          },
        });
        const result = await response.json();
        if (result.status === 1) {
          setCategoryData(result.data);
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryData();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("category", formData.category);
    try {
      const response = await fetch(`${apiUrl}/create-category`, {
        method: "POST",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8`,
        },
        body: formDataToSend, // Send the FormData object with the image
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const columns = [
    { name: "S No.", selector: (row,index)=>index+1 },
    { name: "ID", selector: (row) => row._id },
    { name: "Name", selector: (row) => row.name },
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
    { name: "Status", selector:(row)=> row.status},
    { name: "Created At", selector: (row) => new Date(row.created_at).toLocaleString() },
    { name: "Action", selector:(row)=>(
      <div>
        <CButton color="danger text-light">Delete</CButton>
        <CButton color="info text-light">Edit</CButton>
      </div>
    )},
  ];
  const VerticallyCentered = () => {
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
             {/* Name Input */}
              <div className="mb-3">
                <label className="form-label">Category Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Slider Cateogory Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }  required/>
              </div>
              <div className="mb-3">
                <label className="form-label">Cateogry Image</label>
                  <input type="file" className="form-control" accept="image/*"
                   onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                    setFormData({ ...formData, image: file });
                   }
                  }}  required/>
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
          <h6 className="mb-0">Slider Category</h6>
          <div>{VerticallyCentered()}</div>
        </div> 
      </div>
      {loading ? (
          <div className="justify-content-center d-flex p-5"> 
              <CSpinner color="primary" />
          </div>
      ) : (
        <GetTable
          data={categoryData} // Pass fetched category data
          columns={columns}
          title="Category List"
        />
      )}
      </div>
    </div>
  );
};

export default SliderList;


