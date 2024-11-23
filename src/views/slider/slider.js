


import React, { useState, useEffect } from "react";
import GetTable from "../dashboard/GetTable";

const Slider = () => {
  const [sliderData, setSliderData] = useState([]);
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

  // Handle form submission to add a new slider
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("category", formData.category);

    try {
      const response = await fetch(`${apiUrl}/create-slider`, {
        method: "POST",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8`,
        },
        body: formDataToSend,
      });
      const result = await response.json();
      if (result.status === 1) {
        alert("Slider added successfully!");
        setFormData({ name: "", image: "", category: "" });
        fetchSliderData(); // Refresh slider data
      } else {
        alert("Failed to add slider!");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // Table columns for Sliders
  const columns = [
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
    { name: "Updated At", selector: (row) => new Date(row.updated_at).toLocaleString() },
    { name: "Created At", selector: (row) => new Date(row.created_at).toLocaleString() },
  ];

  return (
    <div>
      {/* Form for Adding New Slider */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <h3>Add New Slider</h3>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setFormData({ ...formData, image: file });
            }
          }}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        />
        <button type="submit">Add Slider</button>
      </form>

      {/* Loading Indicator or Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <GetTable
          data={sliderData} // Pass fetched slider data
          columns={columns}
          title="Slider List"
        />
      )}
    </div>
  );
};

export default Slider;
