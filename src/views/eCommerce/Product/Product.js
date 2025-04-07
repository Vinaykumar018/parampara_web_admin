import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { fetchProduct, deleteProduct } from '../../Services/productApiService';
import { CSpinner } from '@coreui/react';
import GetTable from '../../dashboard/GetTable';
import { Link } from 'react-router-dom';
import ViewProductData from './ViewProductData';
import { useContext } from 'react';
import { AppContext } from '../../../context/AppContext';
import 'react-toastify/dist/ReactToastify.css';
import {
  updateFeaturedStatus,
  updateStatus,
} from '../../Services/productApiService';
import GetProductListTable from '../../dashboard/tables/GetProductListTable';

const Product = () => {
  const { globalContextProductData, setGlobalContextProductData } =
    useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const navigateToAddProduct = () => {
    navigate('/add-product');
  };

  // import { updateFeaturedStatus,updateStatus } from "../../Services/productApiService";
  //call these 2 updateFeaturedStatus,updateStatus

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetchProduct();
        console.log('Fetched Products:', response);

        if (response?.success && Array.isArray(response.data)) {
          setProducts(response.data);
          setGlobalContextProductData(response.data);
        } else {
          console.error('Invalid response format or empty data:', response);
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  // Toggle isFeatured Status
  const handleToggle = async (id) => {
    try {
      const updatedProduct = products.find((product) => product._id === id);
      if (!updatedProduct) return;

      const newStatus = !updatedProduct.isFeatured;
      const response = await updateFeaturedStatus(id, {
        isFeatured: newStatus,
      });

      if (response?.success) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === id
              ? { ...product, isFeatured: newStatus }
              : product,
          ),
        );
        setGlobalContextProductData((prevData) =>
          prevData.map((product) =>
            product._id === id
              ? { ...product, isFeatured: newStatus }
              : product,
          ),
        );
        console.log(`Updated product ${id} isFeatured: ${newStatus}`);
      }
    } catch (error) {
      console.error('Error updating isFeatured:', error);
    }
  };

  // Toggle Status
  const handleStatusToggle = async (id) => {
    try {
      const updatedProduct = products.find((product) => product._id === id);
      if (!updatedProduct) return;

      const newStatus =
        updatedProduct.status === 'active' ? 'inactive' : 'active';
      const response = await updateStatus(id, { status: newStatus });

      if (response?.success) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === id ? { ...product, status: newStatus } : product,
          ),
        );
        setGlobalContextProductData((prevData) =>
          prevData.map((product) =>
            product._id === id ? { ...product, status: newStatus } : product,
          ),
        );
        console.log(`Updated product ${id} status: ${newStatus}`);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const columns = [
    { name: 'S No.', selector: (row, index) => index + 1, grow: 0.3 },
    {
      name: 'Featured Image',
      selector: (row) => (
        <img
          src={`http://34.131.41.101:3000/${row.featuredImage}`}
          alt={row.name}
          width={80}
          height={80}
        />
      ),
      grow: 1,
    },
    { name: 'Product Name', selector: (row) => row.name, grow: 1 },
    { name: 'Category', selector: (row) => row.category, grow: 1 },
    {
      name: 'Selling Price',
      selector: (row) => `₹${row.sellingPrice}`,
      grow: 0.5,
    },
    { name: 'Price', selector: (row) => `₹${row.price}`, grow: 0.5 },
    { name: 'Stock', selector: (row) => row.stock, grow: 0.5 },
    {
      name: 'Featured',
      selector: (row) => (
        <div className="form-check form-switch p-2">
          <input
            className="form-check-input mx-1"
            type="checkbox"
            checked={row?.isFeatured}
            onChange={() => handleToggle(row._id)}
          />
        </div>
      ),
      grow: 0.5,
      width: '100px',
    },
    {
      name: 'Status',
      selector: (row) => (
        <span
          className={`badge ${row.status === 'active' ? 'bg-success' : 'bg-danger'}`}
          style={{ cursor: 'pointer' }}
          onClick={() => handleStatusToggle(row._id)}
        >
          {row.status}
        </span>
      ),
      grow: 0.5,
    },
    {
      name: 'Action',
      selector: (row) => (
        <div
          style={{
            display: 'flex',
            gap: '8px',
            justifyContent: 'center',
            flexWrap: 'nowrap',
          }}
        >
          <Link
            to={`/product/update-product/${row._id}`}
            className="btn btn-primary btn-sm"
          >
            Edit
          </Link>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(row._id)}
          >
            Delete
          </button>
          <button
            onClick={() => handleView(row)}
            className="btn btn-info btn-sm text-white"
          >
            View
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '250px',
      grow: 1,
    },
  ];

  const handleDelete = (id) => {
    console.log(id);
    setProductToDelete(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      const response = await deleteProduct(productToDelete);
      if (response.status === 1) {
        toast.success('Product deleted successfully!');
        setProducts(products.filter((item) => item._id !== productToDelete));
        console.log(products);
        setShowModal(false);
      }
    } catch (error) {
      toast.error('Error deleting Product. Please try again.');
      console.error('Error deleting Product:', error);
    } finally {
      setDeleting(false);
    }
  };

  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [rowToView, setRowToView] = useState(null);
  const handleView = (row) => {
    setRowToView(row);
    setViewModalVisible(true);
  };

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
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={navigateToAddProduct}
                  >
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
                  <GetProductListTable
                    data={products}
                    columns={columns}
                    title="Product List"
                    code="proudct-list-filter"
                  />
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
        deleting={deleting}
      />

      {viewModalVisible && (
        <ViewProductData
          show={viewModalVisible}
          onClose={() => setViewModalVisible(false)}
          rowData={rowToView}
        />
      )}
    </>
  );
};

export default Product;

const ConfirmDeleteModal = ({ show, onClose, onConfirm, deleting }) => {
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
              Are you sure you want to delete this Product?
            </p>
          </div>
          <div className="modal-footer d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              style={{ fontWeight: '600' }}
              disabled={deleting}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger text-white"
              onClick={onConfirm}
              style={{ fontWeight: '600' }}
              disabled={deleting}
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};