import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GetTable from '../dashboard/GetTable';
import { CBadge } from '@coreui/react';
import { MdCancel } from 'react-icons/md';
import { Link } from 'react-router-dom';

const BrahmanBhoj = () => {
  const [orders, setOrders] = useState([]);
  const token =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';
  const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/brahman-bhoj/get-bhoj-request`,
        {
          headers: { Authorization: token },
        },
      );
      console.log('Fetched Orders:', response.data.data);
      setOrders(response.data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Function to format location as a string
  const formatLocation = (location) => {
    return `Latitude: ${location.latitude}, Longitude: ${location.longitude}`;
  };

  const columns = [
    {
      name: 'S.No',
      selector: (row, index) => index + 1,
      sortable: false,
      width: '80px',
    },
    {
      name: 'Booking ID',
      selector: (row) => row.bhojId,
      sortable: true,
      width: '300px',
    },
    {
      name: 'Name',
      selector: (row) => row.user_name,
      sortable: true,
      width: '100px',
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
      width: '200px',
    },
    {
      name: 'Mobile',
      selector: (row) => row.phone,
      sortable: true,
      width: '150px',
    },
    // Add a column for location if needed
    {
      name: 'Location',
      selector: (row) => row.location,
      sortable: true,
      width: '300px',
    },

    {
      name: 'Action',
      selector: (row) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'nowrap',
          }}
        >
          <Link
            to={`/bhoj/${row._id}`}
            className="btn btn-info btn-sm text-white me-2"
          >
            View
          </Link>

          {
           
          
          row.status == 2 ? (

            
            <button
              className="btn btn-danger disabled text-white btn-sm me-2"
              onClick={() => handleCancel(row._id)}
            >
                
              Cancelled
            </button>
          ) : (
            <button
              className="btn btn-danger text-white btn-sm me-2"
              onClick={() => handleCancel(row._id)}
            >
               
              Cancel
            </button>
          )}
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '200px',
    },
  ];

  async function handleCancel(id) {
    try {
      const response = await axios.put(
        `http://192.168.1.35:3000/api/brahman-bhoj/cancel-request/${id}`,
        {}, // Empty body since it's a PUT request with only headers
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8`,
          },
        },
      );
      if (response.status === 200) {
        fetchOrders();
      }
    } catch (error) {
      console.error('Error cancelling request:', error);
    }
  }

  const transformedOrders = orders.map((order) => ({
    ...order,
    location: formatLocation(order.location), // Replace the location object with a string
  }));

  return (
    <div className="col-12">
      <div className="card shadow-lg mb-4 border-0">
        <div className="card-header bg-dark text-white py-2">
          <div className="d-flex align-items-center justify-content-between py-1">
            <h6 className="mb-0">Brahman Bhoj Request</h6>
          </div>
        </div>
        <GetTable
          columns={columns}
          data={transformedOrders}
          pagination
          highlightOnHover
          striped
        />
      </div>
    </div>
  );
};

export default BrahmanBhoj;