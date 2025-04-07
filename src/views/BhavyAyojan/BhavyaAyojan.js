import React from 'react';
import { useBhavyaAyojan } from '../../hooks/BhavyaAyojanHooks'; // adjust the path if needed
import GetTable from '../dashboard/GetTable';
import { Link } from 'react-router-dom';
import axios from 'axios';
const BhavyaAyojan = () => {


    
  const { bhavyaAyojanData, loading, error, isEmpty } = useBhavyaAyojan();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (isEmpty) return <p>No Bhavya Ayojan data found.</p>;

  const columns = [
    {
      name: 'Booking ID',
      selector: (row) => row.bookingId,
      sortable: true,
    },
    {
      name: 'Full Name',
      selector: (row) => row.full_name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Phone',
      selector: (row) => row.phone_number,
      sortable: true,
    },
    {
      name: 'Event Type',
      selector: (row) => row.event_type,
      sortable: true,
    },
    {
      name: 'Event Date',
      selector: (row) => new Date(row.event_date).toLocaleDateString(),
      sortable: true,
    },
    {
      name: 'Occasion',
      selector: (row) => row.occasion,
      sortable: true,
    },
    {
      name: 'Guest Count',
      selector: (row) => row.guest_count,
      sortable: true,
    },
    {
      name: 'Venue',
      selector: (row) => row.venue,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => (row.status === '0' ? 'Pending' : 'Confirmed'),
      sortable: true,
    },
    {
      name: 'Created At',
      selector: (row) => new Date(row.created_at).toLocaleDateString(),
      sortable: true,
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
            to={`/bhavya-ayojan/${row._id}`}
            className="btn btn-info btn-sm text-white me-2"
          >
            View
          </Link>

          {row.status == 2 ? (
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
          `http://192.168.1.36:3000/api/bhavya-ayojan/cancel/${id}`,
          {}, // Empty body since it's a PUT request with only headers
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8`,
            },
          },
        );

        console.log(response.status===200)
        if (response.status === 200) {
            window.location.reload();  
        }
      } catch (error) {
        console.error('Error cancelling request:', error);
      }
    }
  

  return (
    <div>
      <div className="card shadow-lg mb-4 border-0">
        <div className="card-header bg-dark text-white py-2">
          <div className="d-flex align-items-center justify-content-between py-1">
            <h6 className="mb-0">Bhavya Ayojan Request</h6>
          </div>
        </div>
        <GetTable
          columns={columns}
          data={bhavyaAyojanData}
          pagination
          highlightOnHover
          striped
        />
      </div>
    </div>
  );
};

export default BhavyaAyojan;
