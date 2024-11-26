import React, { useState, useEffect } from "react";
import GetTable from "../dashboard/GetTable";

const SliderList = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: "", image: "", category: "" });

  const apiUrl = "https://parampara-admin.vercel.app/api/slider";
  const [showForm, setShowForm] = useState(false);
 
  // Fetch category data
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

  // Handle form submission to add a new category
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

  // Table columns for Categories
  const columns = [
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
    { name: "Created At", selector: (row) => new Date(row.created_at).toLocaleString() },
  ];

  return (
    <div>

<div className="container-fluid">
      <div className="text-end my-4">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setShowForm((prev) => !prev)}
        >
          {showForm ? "Add Slider Category" : "Add Slider Category"}
        </button>
      </div>

      {showForm && (
        <section>
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8">
              <div className="card shadow-lg mb-4">
                <div className="card-header bg-primary text-white">
                  <h4 className="text-uppercase text-center">Add New Slider Category</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
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
                        }
                        required
                      />
                    </div>

                    {/* Image Input */}
                    <div className="mb-3">
                      <label className="form-label">Cateogry Image</label>
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
                        required
                      />
                    </div>

                 
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary">
                        Add Category
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
     
      {loading ? (
        <p>Loading...</p>
      ) : (
        <GetTable
          data={categoryData} // Pass fetched category data
          columns={columns}
          title="Category List"
        />
      )}
    </div>
  );
};

export default SliderList;


