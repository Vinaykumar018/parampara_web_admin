import React from "react";

const ViewProductCategory = ({ show, onClose, rowData }) => {
  if (!show || !rowData) return null;

  return (
    <div
      className="modal show"
      tabIndex="-1"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.7)" }}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-md"
        style={{
          maxWidth: "900px",
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
              Product Category
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
            <div className="row">
              {/* Content Section */}
              <div className="col-md-8">
                <table className="table table-striped table-borderless table-sm">
                  <tbody>
                    <tr>
                      <th className="text-muted small" style={{ width: "30%" }}>
                        Bhajan Category
                      </th>
                      <td className="small">{rowData?.category_name || "N/A"}</td>
                    </tr>
                    <tr>
                      <th className="text-muted small">Description</th>
                      <td className="small">{rowData?.description || "N/A"}</td>
                    </tr>
                    <tr>
                      <th className="text-muted small">Slug URL</th>
                      <td className="small">{rowData?.slug_url || "N/A"}</td>

                    </tr>
                    <tr>
                      <th className="text-muted small">Status</th>
                      <td className="small">
                      <span
                        className={`badge ${
                            rowData?.status?.toLowerCase() === "active" ? "bg-success" : "bg-danger"
                        }`}
                        >
                        {rowData?.status?.toLowerCase() === "active" ? "Active" : "Inactive"}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Image Section */}
              <div className="col-md-4 d-flex align-items-start justify-content-center">
                <img
                  src={
                    rowData?.bhajan_image
                      ? `http://34.131.41.101:3000/${rowData.category_image}`
                      : "https://via.placeholder.com/250" // Placeholder if image is missing
                  }
                  alt={rowData?.category || "Product Image"}
                  className="img-fluid rounded shadow-sm"
                  style={{ maxWidth: "100%", height: "auto", maxHeight: "250px" }}
                />
              </div>
            </div>
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

export default ViewProductCategory;
