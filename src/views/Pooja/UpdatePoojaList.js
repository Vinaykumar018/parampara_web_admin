import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RichTextEditor from 'react-rte';  // Make sure to import RichTextEditor if you're using it

const UpdatePoojaList = () => {
  const { id } = useParams();  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pooja_name: '',
    pooja_category: '',
    price_withSamagri: '',
    price_withoutSamagri: '',
    pooja_image: '',
    short_discription: '',
    long_discription: RichTextEditor.createEmptyValue(),
  });
  const [imagePreview, setImagePreview] = useState('');
  
  // Fetch data when the component mounts (using the `id`)
  useEffect(() => {
    const fetchPoojaData = async () => {
      try {
        const response = await fetch(`http://localhost:2000/pooja/${id}`);  // Update with your API endpoint
        const data = await response.json();
        setFormData({
          pooja_name: data.pooja_name,
          pooja_category: data.pooja_category,
          price_withSamagri: data.price_withSamagri,
          price_withoutSamagri: data.price_withoutSamagri,
          pooja_image: data.pooja_image,
          short_discription: data.short_discription,
          long_discription: data.long_discription,
        });
        setImagePreview(data.pooja_image);  // Set the image preview if available
      } catch (error) {
        console.error("Error fetching pooja data:", error);
      }
    };

    fetchPoojaData();
  }, [id]);

  // Handle form data changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file change (for image upload)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      pooja_image: file,
    }));
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);  // Preview image
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Handle long description editor change
  const handleEditorChange = (value, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value.toString('html'),
    }));
  };

  // Handle form submission (update the Pooja data)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updatedData = new FormData();
    Object.keys(formData).forEach((key) => {
      updatedData.append(key, formData[key]);
    });

    try {
      const response = await fetch(`http://localhost:2000/pooja/update/${id}`, {
        method: 'PUT',
        body: updatedData,
      });
      if (response.ok) {
        alert('Pooja updated successfully!');
        navigate('/pooja/pooja-list');  // Navigate to the Pooja list page after updating
      } else {
        alert('Failed to update Pooja');
      }
    } catch (error) {
      console.error("Error updating pooja:", error);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12">
        <div className="card shadow-lg mb-4 border-0">
          <div className="card-header text-center bg-dark text-white">
            <h4 className="text-uppercase font-weight-bold">Update Pooja</h4>
          </div>
          <div className="card-body bg-light">
            <form onSubmit={handleSubmit}>
              <div className="row">
                {/* Pooja Name */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Pooja Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="pooja_name"
                    placeholder="Enter Pooja Name"
                    value={formData.pooja_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {/* Pooja Category */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Pooja Category</label>
                  <input
                    type="text"
                    className="form-control"
                    name="pooja_category"
                    placeholder="Enter Pooja Category"
                    value={formData.pooja_category}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {/* Price With Samagri */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Price (With Samagri)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price_withSamagri"
                    placeholder="Enter Price With Samagri"
                    value={formData.price_withSamagri}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {/* Price Without Samagri */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Price (Without Samagri)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price_withoutSamagri"
                    placeholder="Enter Price Without Samagri"
                    value={formData.price_withoutSamagri}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {/* Pooja Image */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Pooja Image</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                  />
                </div>
                {/* Image Preview */}
                {imagePreview && (
                  <div className="mb-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="img-fluid"
                      style={{ maxWidth: '100%', maxHeight: '80px', objectFit: 'contain' }}
                    />
                  </div>
                )}
                {/* Short Description */}
                <div className="col-md-8 mb-3">
                  <label className="form-label">Short Description</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    placeholder="Enter Short Description"
                    name="short_discription"
                    value={formData.short_discription}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {/* Long Description */}
                <div className="mb-3">
                  <label className="form-label">Long Description</label>
                  <RichTextEditor
                    editorStyle={{ minHeight: "120px", backgroundColor: "#f4f4f4", border: "1px solid #ccc", color: "#333" }}
                    value={formData.long_discription}
                    onChange={(value) => handleEditorChange(value, "long_discription")}
                  />
                </div>
                <div className="d-flex justify-content-end">
                  <button type="submit" className="me-2 btn btn-dark btn-lg">Update Pooja</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePoojaList;
