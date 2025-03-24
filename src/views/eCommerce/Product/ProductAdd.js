import React, { useEffect, useState } from "react";
import RichTextEditor from "react-rte";
import { ToastContainer, toast } from "react-toastify";
import { fetchCategories, createProduct } from "../../Services/productApiService";
import { useNavigate } from "react-router-dom";

const ProductAdd = () => {
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState([]);
  const [imagePreview, setImagePreview] = useState({ featuredImage: null, galleryImages: [] });
  const [formData, setFormData] = useState({
    name: "",
    slug_url: "",
    category: "",
    price: "",
    sellingPrice: "",
    gst: "",
    local_delivery: "",
    featuredImage: null,
    stock: "",
    galleryImages: [],
    short_discription: "",
    long_discription: RichTextEditor.createEmptyValue(),
    isFeatured: false,
            offer: false,
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const result = await fetchCategories();
      if (result.status === 1) {
        setCategoryData(result.data);
      }
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const generateSlug = (value) => {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      if (name === "featuredImage") {
        const file = files[0];
        setFormData((prevData) => ({ ...prevData, featuredImage: file }));
        setImagePreview((prev) => ({ ...prev, featuredImage: URL.createObjectURL(file) }));
      } else if (name === "galleryImages") {
        const filesArray = Array.from(files);
        setFormData((prevData) => ({ ...prevData, galleryImages: filesArray }));
        setImagePreview((prev) => ({
          ...prev,
          galleryImages: filesArray.map((file) => URL.createObjectURL(file)),
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        ...(name === "name" && { slug_url: generateSlug(value) }),
      }));
    }
  };

  const handleEditorChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      long_discription: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const productData = new FormData();
  
    // Append all form data to FormData
    Object.keys(formData).forEach((key) => {
      if (key === "galleryImages") {
        formData[key].forEach((file) => productData.append("galleryImages", file));
      } else if (key === "long_discription") {
        productData.append(key, formData[key].toString("html"));
      } else {
        productData.append(key, formData[key]);
      }
    });
  
    // Debugging: Log FormData entries
    for (let [key, value] of productData.entries()) {
      console.log(key, value);
    }
  
    try {
      const response = await createProduct(productData);
      if (response.status === 1) {
        toast.success("Product added successfully!");
        navigate("/product");
      } else {
        toast.error("Failed to add product.");
      }
    } catch (error) {
      toast.error("Failed to add product.");
      console.error("Error during form submission:", error);
    }
  };
  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
      <div className="card-body bg-light">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="card shadow-lg mb-4 border-0">
              <div className="card-header text-left bg-dark text-white">
                <h6 className="text-capitalize">Add Product</h6>
              </div>
              <div className="card-body bg-light">
                <form method="post" onSubmit={handleSubmit}>
                  <div className="row">
                    {/* Product Name */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Product Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Enter Product Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    {/* Product Slug */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Product Slug</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Slug Url"
                        name="slug_url"
                        value={formData.slug_url}
                        readOnly
                      />
                    </div>

                    {/* Category */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Choose Category</label>
                      <select
                        className="form-control form-select"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Category</option>
                        {categoryData.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.category_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Offer</label>
                      <select
                        className="form-select"
                        name="offer"
                        value={formData.offer}
                        onChange={handleInputChange}
                      >
                        <option value="no_offer">No Offer</option>
                        <option value="on_sale">On Sale</option>
                        <option value="most_featured">Most Featured</option>
                        <option value="discounted">Discounted</option>
                      </select>
                    </div>

                   

                    {/* Price */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Price</label>
                      <input
                        type="number"
                        className="form-control"
                        name="price"
                        placeholder="Enter Price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    {/* Sale Price */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Sale Price</label>
                      <input
                        type="number"
                        className="form-control"
                        name="sellingPrice"
                        placeholder="Sale Price"
                        value={formData.sellingPrice}
                        onChange={handleInputChange}
                        required
                      />
                    </div>


                    

                    {/* GST */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">GST</label>
                      <input
                        type="number"
                        className="form-control"
                        name="gst"  
                        placeholder="Enter GST in Percentage"
                        value={formData.gst}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    {/* Shipping Charges */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Shipping Charges</label>
                      <input
                        type="number"
                        className="form-control"
                        name="local_delivery"
                        placeholder="Delivery Charge"
                        value={formData.local_delivery}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    {/* Stock */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Stock</label>
                      <input
                        type="number"
                        className="form-control"
                        name="stock"
                        placeholder="Enter Stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    {/* Featured Image */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Featured Image</label>
                      <input
                        type="file"
                        className="form-control"
                        name="featuredImage"
                        onChange={handleInputChange}
                        required
                      />
                      {imagePreview.featuredImage && (
                        <img
                          src={imagePreview.featuredImage}
                          alt="Featured Preview"
                          className="mt-2"
                          style={{ width: "100px", height: "100px", objectFit: "cover" }}
                        />
                      )}
                    </div>




                    {/* Gallery Images */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Gallery Images</label>
                      <input
                        type="file"
                        className="form-control"
                        name="galleryImages"
                        onChange={handleInputChange}
                        multiple
                        required
                      />
                      <div className="mt-2 d-flex flex-wrap">
                        {imagePreview.galleryImages.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Gallery Preview ${index + 1}`}
                            style={{ width: "100px", height: "100px", objectFit: "cover", margin: "5px" }}
                          />
                        ))}
                      </div>
                    </div>


                    {/* Short Description */}
                    <div className="col-md-12 mb-3">
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
                       editorStyle={{
                        minHeight: "120px",
                        backgroundColor: "#f4f4f4",
                        border: "1px solid #ccc",
                        color: "#333",
                        padding: "10px",
                        cursor: "pointer",
                      }}
                        value={formData.long_discription}
                        onChange={handleEditorChange}
                      />
                    </div>
                   

                    <div className="col-md-12 ">
                    <div className="form-check form-switch form-check-lg">
  <input
    className="form-check-input"
    type="checkbox"
    name="isFeatured"
    checked={formData.isFeatured}
    onChange={(e) =>
      setFormData({ ...formData, isFeatured: e.target.checked })
    }
    id="isFeatured"
  />
  <label className="form-check-label" htmlFor="isFeatured">
    Is Featured
  </label>
</div>


</div>

<div className="col-md-12 mb-3">


  <div className="text-end mb-3">
                        <button type="submit" className="me-2 btn btn-success text-light btn-sm">Save</button>
                    </div>
</div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductAdd;