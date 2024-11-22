import React, { useState } from 'react';
import GetTable from './GetTable';

const VendorsData = () => {
  // Initial vendor data
  const [vendorsData, setVendorsData] = useState([
    { id: 1, name: "Vendor One", phone: "9876543210", email: "vendorone@example.com", status: "Active" },
    { id: 2, name: "Vendor Two", phone: "9765432109", email: "vendortwo@example.com", status: "Inactive" },
    { id: 3, name: "Vendor Three", phone: "9654321098", email: "vendorthree@example.com", status: "Active" },
    { id: 4, name: "Vendor Four", phone: "9543210987", email: "vendorfour@example.com", status: "Inactive" },
    { id: 5, name: "Vendor Five", phone: "9432109876", email: "vendorfive@example.com", status: "Active" },
  ]);

  // Handle status toggle for each vendor
  const toggleStatus = (id, newStatus) => {
    setVendorsData(vendorsData.map(vendor =>
      vendor.id === id ? { ...vendor, status: newStatus } : vendor
    ));
  };

  // Table columns
  const columns = [
    { name: "Name", selector: row => row.name },
    { name: "Phone", selector: row => row.phone },
    { name: "Email", selector: row => row.email },
    { 
      name: "Status", 
      selector: row => row.status,
      cell: row => (
        <div>
          <button
            type="button"
            className="btn btn-outline-success btn-sm me-2"
            onClick={() => toggleStatus(row.id, 'Active')}
            disabled={row.status === 'Active'}
          >
            Active
          </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={() => toggleStatus(row.id, 'Inactive')}
            disabled={row.status === 'Inactive'}
          >
            Inactive
          </button>
        </div>
      )
    }
  ];

  return (
    <GetTable data={vendorsData} columns={columns} title="Vendor Contact Information" />
  );
};

export default VendorsData;
