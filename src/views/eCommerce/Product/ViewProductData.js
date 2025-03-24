import React from "react";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";

const ViewProductData = ({ show, onClose, rowData }) => {
  if (!show || !rowData) return null;

   const { globalContextProductCategoryData } = useContext(AppContext);

  return (
    <div
      className="modal show"
      tabIndex="-1"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.7)" }}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{
          maxWidth: "700px",
          width: "90%",
          borderRadius: "15px",
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div
          className="modal-content"
          style={{
            fontFamily: "'Roboto', sans-serif",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          {/* Modal Header */}
          <div
            className="modal-header"
            style={{
              backgroundColor: "#f5f5f5",
              borderBottom: "1px solid #ddd",
              padding: "15px",
              borderRadius: "10px 10px 0 0",
            }}
          >
            <h5
              className="modal-title fw-bold"
              style={{ fontSize: "1.2rem", color: "#333" }}
            >
              View Product Details
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
              style={{ filter: "invert(50%)" }}
            ></button>
          </div>

          {/* Modal Body */}
          <div className="modal-body" style={{ padding: "15px 25px" }}>
            {/* Image Section */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              {rowData?.featuredImage ? (
                <img
                  src={`http://34.131.70.24:3000/${rowData.featuredImage}`}
                  alt={rowData?.name}
                  style={{
                    width: "250px",
                    height: "150px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                  }}
                />
              ) : (
                <span style={{ fontSize: "0.8rem", color: "#777" }}>
                  No Image
                </span>
              )}
            </div>

            {/* Details Section */}
            {[
              { label: "Product Name", value: rowData?.name },
              {
                label: "Category",
                value: (() => {
                  const category = globalContextProductCategoryData.find(
                    (item) =>{
                
                    return(
                     item._id === rowData?.category
                   ) }
                  
                  );
                  return category ? category.category_name : "-";
                })(),
              },
            
              { label: "Price", value: rowData?.price },
              { label: "Selling Price", value: rowData?.sellingPrice },
              { label: "GST", value: rowData?.gst },
              { label: "Local Delivery", value: rowData?.local_delivery },
              { label: "Short Description", value: rowData?.short_discription },
              { label: "Stock", value: rowData?.stock },
              {
                label: "Status",
                value: rowData?.status,
                isBadge: true,
              },
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #ddd",
                  padding: "8px 0",
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "0.85rem",
                    color: "#555",
                  }}
                >
                  {item.label}:
                </span>
                {item.isBadge ? (
                  <span
                    className={`badge ${
                      item.value === "active" ? "bg-success" : "bg-danger"
                    }`}
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.2rem 0.5rem",
                      color: "#fff",
                    }}
                  >
                    {item.value === "active" ? "Active" : "Inactive"}
                  </span>
                ) : (
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: "#777",
                    }}
                  >
                    {item.value || "-"}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Modal Footer */}
          <div
            className="modal-footer"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              borderTop: "1px solid #ddd",
              padding: "15px",
              backgroundColor: "#f9f9f9",
              borderRadius: "0 0 10px 10px",
            }}
          >
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              style={{
                fontWeight: "600",
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "#fff",
                borderRadius: "5px",
                border: "none",
                fontSize: "0.9rem",
                transition: "0.3s",
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProductData;