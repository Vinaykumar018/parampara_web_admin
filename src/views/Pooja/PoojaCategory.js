import React, { useState, useEffect } from "react"; 
import axios from "axios"; 
import GetTable from "../dashboard/GetTable";

const PoojaCategory = () => {
  const [categoryData, setCategoryData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [formData, setFormData] = useState({
    category: "", 
    pooja_image: null, 
    short_discription: "", 
    long_discription: "",
  });

  // Fetch category data using useEffect
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await fetch(
          "http://192.168.1.38:3000/api/pooja/category",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8`, // Replace with actual token
            },
          }
        );
        
        const result = await response.json();
        console.log(result)
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

  // Handle form submission to create category
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled, including the image
    if (!formData.category || !formData.pooja_image || !formData.short_discription || !formData.long_discription) {
      alert("Please fill in all fields and select an image.");
      return;
    }

    // Prepare FormData for the API request
    const data = new FormData();
    data.append("category", formData.category);
    data.append("pooja_image", formData.pooja_image);
    data.append("short_discription", formData.short_discription);
    data.append("long_discription", formData.long_discription);

    try {
      console.log(data);  // Log FormData to check the contents
      const response = await axios.post(
        "http://192.168.1.38:3000/api/pooja/create-category",
        {
            category:formData.category,
            short_discription:formData.short_discription,long_discription:formData.long_discription,
            image:formData.pooja_image
        } ,// Send FormData here
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8`, // Replace with actual token
          },
        }
      );
      alert("Category created successfully!");
      // Optionally, refetch categories or reset form state after submission
      setFormData({
        category: "",
        pooja_image: null,
        short_discription: "",
        long_discription: "",
      });
    } catch (error) {
      console.error("Error creating category:", error);
      alert("Failed to create category. Please try again.");
    }
  };

  const columns = [
    { name: "ID", selector: (row) => row._id },
    { name: "Category", selector: (row) => row.category },
    {
      name: "Image",
      selector: (row) =>
        row.pooja_image ? (
          <img
            src={row.pooja_image}
            alt={row.category}
            width={50}
            height={30}
          />
        ) : (
          "N/A"
        ),
    },
    { name: "Short Description", selector: (row) => row.short_discription },
    { name: "Long Description", selector: (row) => row.long_discription },
    { name: "Status", selector: (row) => row.status },
  ];

  return (
    <section>
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div className="card shadow-lg mb-4">
            <div className="card-header bg-primary text-white">
              <h4 className="text-uppercase text-center">Add New Category</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Category Name Input */}
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

                {/* Category Image Input */}
                <div className="mb-3">
                  <label className="form-label">Category Image</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setFormData({ ...formData, pooja_image: file });
                      }
                    }}
                    required
                  />
                </div>

                {/* Short Description Input */}
                <div className="mb-3">
                  <label className="form-label">Short Description</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    placeholder="Enter Short Description"
                    value={formData.short_discription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        short_discription: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                {/* Long Description Input */}
                <div className="mb-3">
                  <label className="form-label">Long Description</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Enter Long Description"
                    value={formData.long_discription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        long_discription: e.target.value,
                      })
                    }
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
      {loading ? (
        <p>Loading...</p>
      ) : (
        <GetTable
          data={categoryData} // Pass fetched category data
          columns={columns}
          title="Category List"
        />
      )}
    </section>
  );
};

export default PoojaCategory;
