import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { CSVLink } from 'react-csv';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import './GetEcomTable.css';

const GetEcomTable = ({ data, columns, title, onUpdateStatus }) => {
  const [searchedData, setSearchedData] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});

  const notify = (message, type = "success") => toast[type](message);

  // Allowed Order Statuses
  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
  ];

  // Filter Data Based on Search
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchedData.trim().toLowerCase())
    )
  );

  // Prepare Data for Export
  const csvData = filteredData.map((item) => {
    const newObj = {};
    columns.forEach(({ name, selector }) => {
      newObj[name] = selector(item) || "N/A";
    });
    return newObj;
  });

  // Export to PDF
  const printToPDF = () => {
    const doc = new jsPDF();
    const tableContent = filteredData.map((item) =>
      columns.map(({ selector }) => selector(item) || "N/A")
    );

    doc.autoTable({
      head: [columns.map(({ name }) => name)],
      body: tableContent,
    });

    doc.save(`${title?.replace(/\s+/g, '_').toLowerCase()}.pdf`);
  };

  // Export to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, title);
    XLSX.writeFile(wb, `${title?.replace(/\s+/g, '_').toLowerCase()}.xlsx`);
  };

  // Handle Copy to Clipboard
  const handleCopyToClipboard = () => {
    try {
      const textToCopy = JSON.stringify(csvData, null, 2);
      navigator.clipboard.writeText(textToCopy).then(() => {
        notify("Data copied to clipboard!");
      });
    } catch (error) {
      console.error("Failed to copy data to clipboard:", error);
      notify("Failed to copy data to clipboard!", "error");
    }
  };

  // Handle Status Update
  const handleUpdateStatus = () => {
      if (!selectedStatus) {
        notify("Please select a status to update!", "error");
        return;
      }
      if (selectedRows.length === 0) {
        notify("No orders selected!", "error");
        return;
      }

      // Prepare updated data
      const updatedOrders = selectedRows.map((order) => ({
        ...order,
        orderStatus: selectedStatus.value,
      }));

      console.log("Updated Orders:", updatedOrders); // Print as an array

      // Call the parent function to update the order status in the backend
      onUpdateStatus(updatedOrders);

      notify("Order statuses updated successfully!");
      setSelectedRows([]); // Clear selection
      setSelectedStatus(null); // Reset status
  };

  // Handle Row Selection
  const handleRowSelected = (state) => {
    setSelectedRows(state.selectedRows);
  };

  // Handle Row Expansion
  const handleRowExpand = (row) => {
    setExpandedRows((prev) => ({
      ...prev,
      [row.orderId]: !prev[row.orderId],
    }));
  };

  // Group Data by Order ID
  const groupedData = filteredData.reduce((acc, item) => {
    if (!acc[item.orderId]) {
      acc[item.orderId] = [];
    }
    acc[item.orderId].push(item);
    return acc;
  }, {});

  // Add a unique identifier to each row
  const tableData = Object.keys(groupedData).map((orderId) => ({
    ...groupedData[orderId][0],
    id: orderId, // Ensure each row has a unique identifier
    orderId,
  }));

  // Custom Row Component
  const ExpandedRowComponent = ({ data }) => {
    return (
      <div style={{ padding: '10px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td></td>
                <td></td>
                {columns.map((column, colIndex) => (
                  <td key={colIndex} style={{ border: '1px solid #ddd', padding: '8px' }}>
                    {column.selector(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Custom Styles for DataTable
  const customStyles = {
    table: {
      style: {
        marginTop: '10px',
        border: '1px solid #dee2e6', // Bootstrap table border
      },
    },
    headRow: {
      style: {
        backgroundColor: '#f8f9fa', // Bootstrap table header background
        borderBottom: '2px solid #dee2e6', // Bootstrap table header border
        fontWeight: 'bold',
      },
    },
    rows: {
      style: {
        borderBottom: '1px solid #dee2e6', // Bootstrap table row border
        '&:hover': {
          backgroundColor: '#f8f9fa', // Bootstrap table row hover
        },
      },
    },
    pagination: {
      style: {
        borderTop: '1px solid #dee2e6', // Bootstrap pagination border
        padding: '10px',
      },
    },
  };

  return (
    <div className="card-body bg-white p-3">
      <div className="header-actions mb-3">
        {/* Buttons for Export, CSV, PDF, Copy */}
        <div className="button-group">
          <button className="btn btn-success btn-sm" onClick={exportToExcel}>Export</button>
          <CSVLink data={csvData} filename={`${title?.replace(/\s+/g, '_').toLowerCase()}.csv`}>
            <button className="btn btn-warning btn-sm">CSV</button>
          </CSVLink>
          <button className="btn btn-info btn-sm" onClick={printToPDF}>PDF</button>
          <button className="btn btn-secondary btn-sm" onClick={handleCopyToClipboard}>Copy</button>
        </div>

        {/* Status Selection and Update Button */}
        <div className="status-update">
          <Select
            options={statusOptions}
            value={selectedStatus}
            onChange={setSelectedStatus}
            placeholder="Select Status"
            className="status-select"
            menuPortalTarget={document.body}
            menuPosition="fixed"
          />
          <button className="btn btn-primary btn-sm" onClick={handleUpdateStatus}>Update Status</button>
        </div>

        {/* Search Input */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            className="form-control"
            value={searchedData}
            onChange={(e) => setSearchedData(e.target.value)}
          />
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={[
          ...columns,
        ]}
        data={tableData} // Use the tableData with unique identifiers
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 50, 100]}
        highlightOnHover
        selectableRows
        onSelectedRowsChange={handleRowSelected}
        customStyles={customStyles}
        className="bootstrap-table"
        expandableRows
        expandableRowsComponent={({ data }) => (
          <ExpandedRowComponent data={groupedData[data.orderId]} />
        )}
        expandableRowExpanded={(row) => expandedRows[row.orderId]}
      />
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default GetEcomTable;