import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fetchProduct,deleteProduct } from "../../Services/productApiService";
import { CSpinner } from "@coreui/react";
import GetTable from "../../dashboard/GetTable";
import { Link } from "react-router-dom";
const Product = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [ProductToDelete, setProductToDelete] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const navigateToAddProduct = () => {
        navigate("/add-product");
    };

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await fetchProduct();
                console.log("Fetched Products:", response);

                if (response && response.success && Array.isArray(response.data)) {
                    setProducts(response.data);
                } else {
                    console.error("Invalid response format or empty data:", response);
                    setProducts([]);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, []);
    const handleDelete = (id) => {
        setProductToDelete(id);
        setShowModal(true);
      };
    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handleConfirmDelete = async () => {
        try {
        const response = await deleteProduct(ProductToDelete);
        if (response.status === 1) {
            toast.success('Product deleted successfully!');
            setCategoryData(
            categoryData.filter((item) => item._id !== ProductToDelete),
            );
            setShowModal(false);
        } else {
            toast.error('Failed to delete Product.');
        }
        } catch (error) {
        toast.error('Error deleting Product Category. Please try again.');
        console.error('Error deleting Product Category:', error);
        }
    };
    const columns = [
        { name: "S No.", selector: (row, index) => index + 1, grow: 0.3 },
        { 
            name: "Featured Image", 
            selector: (row) => (
                <img
                    src={`http://localhost:3000/` + row.featuredImage}
                    alt={row.name}
                    width={80}
                    height={80}
                />
            ), 
            grow: 1 
        },
        { name: "Product Name", selector: (row) => row.name, grow: 1 },
        { 
            name: "Category", 
            selector: (row) => row.category, 
            grow: 1 
        },
        { name: "Selling Price", selector: (row) => `₹${row.sellingPrice}`, grow: 0.5 },
        { name: "Price", selector: (row) => `₹${row.price}`, grow: 0.5 },
        { name: "Stock", selector: (row) => row.stock, grow: 0.5 },
        {
          name: "Featured", selector:(row)=>row.isFeatured,grow:0.5
        },
        { 
            name: "Status", 
            selector: (row) => (
                <span className={`badge ${row.status === "active" ? "bg-success" : "bg-danger"}`}>
                    {row.status}
                </span>
            ),
            grow: 0.5
        },
        { 
            name: "Action",
            selector: (row) => (
                <div style={{
                    display: "flex",
                    gap: "8px", // Uniform spacing between buttons
                    justifyContent: "center", // Align buttons in the center
                    flexWrap: "nowrap", // Prevent overflow and wrap buttons when necessary
                  }}>
                    <Link to={'/product/update-product/'+row._id} className="btn btn-primary btn-sm">Edit</Link>
                    <button className="btn btn-danger btn-sm"  onClick={() => handleDelete(row._id)}>Delete</button>
                    <button className="btn btn-info btn-sm">View</button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: "250px", 
            grow: 1
        }
    ];
    return (
        <>
            <section>
            <ToastContainer position="top-right" autoClose={3000} />
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="card shadow-lg mb-4 border-0">
                            <div className="card-header bg-dark text-white py-2">
                                <div className="d-flex align-items-center justify-content-between">
                                    <h6 className="mb-0">Product List</h6>
                                    <button className="btn btn-warning btn-sm" onClick={navigateToAddProduct}>
                                        Add Product
                                    </button>
                                </div>
                            </div>
                            <div className="card-body">
                                {loading ? (
                                    <div className="justify-content-center d-flex p-5">
                                        <CSpinner color="primary" />
                                    </div>
                                ) : (
                                    <GetTable data={products} columns={columns} title="Product List" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ConfirmDeleteModal
                show={showModal}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                />
        </>
    );
};

export default Product;

const ConfirmDeleteModal = ({ show, onClose, onConfirm }) => {
    if (!show) return null;
  
    return (
      <div
        className="modal show"
        tabIndex="-1"
        style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          style={{ maxWidth: '400px' }}
        >
          <div
            className="modal-content"
            style={{ fontFamily: "'Roboto', sans-serif", borderRadius: '12px' }}
          >
            <div className="modal-header">
              <h5 className="modal-title fw-bold" style={{ fontSize: '1.25rem' }}>
                Confirm Deletion
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center" style={{ fontSize: '1rem' }}>
              <p style={{ fontWeight: '500' }}>
                Are you sure you want to delete this Product Category Category?
              </p>
            </div>
            <div className="modal-footer d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
                style={{ fontWeight: '600' }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger text-white"
                onClick={onConfirm}
                style={{ fontWeight: '600' }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };