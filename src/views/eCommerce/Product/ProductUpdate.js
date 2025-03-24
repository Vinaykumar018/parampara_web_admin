import React, { useEffect, useState, useContext } from "react";
import RichTextEditor from "react-rte";
import { ToastContainer, toast } from "react-toastify";
import { fetchCategories, updateProduct } from "../../Services/productApiService";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";

const ProductUpdate = () => {
  const { globalContextProductData } = useContext(AppContext);
  const { id } = useParams();
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
    offer: "no_offer",
  });

  const [existingFeaturedImage, setExistingFeaturedImage] = useState(null);
  const [existingGalleryImages, setExistingGalleryImages] = useState([]);

  useEffect(() => {
    loadCategories();
    loadProductData();
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

  const loadProductData = () => {
    const product = globalContextProductData.find((item) => item._id === id);
    if (product) {
      setFormData({
        name: product.name || "",
        slug_url: product.slug || "",
        category: product.category || "",
        price: product.price || "",
        sellingPrice: product.sellingPrice || "",
        gst: product.gst || "",
        local_delivery: product.local_delivery || "",
        featuredImage: product.featuredImage || null,
        stock: product.stock || "",
        galleryImages: product.galleryImages || [],
        short_discription: product.short_discription || "",
        long_discription: product.long_discription
          ? RichTextEditor.createValueFromString(product.long_discription, "html")
          : RichTextEditor.createEmptyValue(),
        isFeatured: product.isFeatured || false,
        offer: product.offer || "no_offer",
      });

      // Set existing images
      setExistingFeaturedImage(product.featuredImage);
      setExistingGalleryImages(product.galleryImages);

      // Set image previews
      if (product.featuredImage) {
        setImagePreview((prev) => ({
          ...prev,
          featuredImage: `http://34.131.70.24:3000/${product.featuredImage}`,
        }));
      }
      if (product.galleryImages && product.galleryImages.length > 0) {
        setImagePreview((prev) => ({
          ...prev,
          galleryImages: product.galleryImages.map(
            (image) => `http://34.131.70.24:3000/${image}`
          ),
        }));
      }
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
    const { name, value, type, files, checked } = e.target;

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
    } else if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
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

    Object.keys(formData).forEach((key) => {
      if (key === "galleryImages") {
        // Append new gallery images if selected
        formData.galleryImages.forEach((file) => productData.append("galleryImages", file));
      } else if (key === "featuredImage") {
        // Append new featured image if selected, otherwise append existing URL
        if (formData.featuredImage) {
          productData.append(key, formData.featuredImage);
        } else {
          productData.append(key, existingFeaturedImage); // Use the existing URL
        }
      } else if (key === "long_discription") {
        productData.append(key, formData[key].toString("html"));
      } else {
        productData.append(key, formData[key]);
      }
    });

    try {
      await updateProduct(id, productData);
      toast.success("Product updated successfully!");
      navigate("/product");
    } catch (error) {
      toast.error("Failed to update product.");
      console.error(error);
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
                <h6 className="text-capitalize">Update Product</h6>
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

                    {/* Offer */}
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
                      />
                      {imagePreview.featuredImage && (
                        <img
                          src={imagePreview.featuredImage}
                          alt="Featured Preview"
                          className="mt-2"
                          style={{ width: "100px", height: "100px", objectFit: "cover" }}
                        />
                      )}
                      {existingFeaturedImage && !imagePreview.featuredImage && (
                        <img
                          src={`http://34.131.70.24:3000/${existingFeaturedImage}`}
                          alt="Existing Featured"
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
                        {existingGalleryImages.map((image, index) => (
                          <img
                            key={index}
                            src={`http://34.131.70.24:3000/${image}`}
                            alt={`Existing Gallery ${index + 1}`}
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

                    {/* isFeatured Checkbox */}
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

                    {/* Submit Button */}
                    <div className="col-md-12 text-end mb-3">
                      <button type="submit" className="btn btn-success text-light btn-sm">
                        Update
                      </button>
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

export default ProductUpdate;