import React from 'react';

const ViewPoojaModal = ({ show, onClose, rowData }) => {
  if (!show) return null;

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
              View Pooja Details
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
              style={{
                filter: "invert(50%)",
              }}
            ></button>
          </div>
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
              {rowData?.pooja_image ? (
                <img
                  src={`http://34.131.70.24:3000${rowData.pooja_image}`}
                  alt={rowData?.pooja_name}
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
              { label: "Pooja Name", value: rowData?.pooja_name },
              { label: "Category", value: rowData?.pooja_category },
              { label: "Price (With Samagri)", value: rowData?.price_withSamagri },
              { label: "Price (Without Samagri)", value: rowData?.price_withoutSamagri },
              { label: "Short Description", value: rowData?.short_discription },
              { label: "Long Description", value: rowData?.long_discription },
              { label: "Status", value: rowData?.status },
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
                    fontSize: "0.85rem", // Reduced font size
                    color: "#555",
                  }}
                >
                  {item.label}:
                </span>
                <span
                  style={{
                    fontSize: "0.8rem", // Reduced font size
                    color: "#777",
                  }}
                >
                  {item.value || "-"}
                </span>
              </div>
            ))}
          </div>
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
                fontSize: "0.9rem", // Reduced font size
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

export default ViewPoojaModal;
