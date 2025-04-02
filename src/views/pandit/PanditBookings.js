import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GetTable from '../dashboard/GetTable';
import { useParams } from 'react-router-dom';
import { CBadge } from '@coreui/react';

import { MdCancel } from 'react-icons/md';

const PanditBookings = () => {
  const { id } = useParams();
  console.log(id);

  const [panditBookingList, setPanditBookingList] = useState([]);
  const token =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';
  const url = 'http://192.168.1.35:3000/api/pandit/pooja-booking';

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await axios.get(`${url}/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      setPanditBookingList(response.data.data);
    };
    fetchBookings();
  }, []);


  const columns = [
    { name: "Booking ID", selector: row => row.bookingId, sortable: true, width: "150px" },
    { name: "Pandit ID", selector: row => row.panditId || "N/A", sortable: true, width: "210px" },
  
    // Booking Details
    { name: "Pooja Name", selector: row => row.bookingDetails.poojaName, sortable: true, width: "10%" },
    { name: "Type", selector: row => row.bookingDetails.Type, sortable: true, width: "120px" },
    { name: "Samagri Included", selector: row => row.bookingDetails.isSamagriIncluded ? "Yes" : "No", sortable: true, width: "160px" },
  
    // User Details
    { name: "Username", selector: row => row.userDetails.username, sortable: true, width: "150px" },
    { name: "Contact", selector: row => row.userDetails.contactNumber, sortable: true, width: "180px" },
    { name: "Email", selector: row => row.userDetails.email, sortable: true, width: "220px" },
  
    // Schedule
    { name: "Date", selector: row => row.schedule.date, sortable: true, width: "5%" },
    { name: "Time", selector: row => row.schedule.time, sortable: true, width: "140px" },
  
    // Payment Details
    { name: "Amount", selector: row => `₹${row.paymentDetails.amount}`, sortable: true, width: "150px" },
    { name: "Quantity", selector: row => row.paymentDetails.quantity, sortable: true, width: "120px" },
  
    // Transaction Details
    { name: "Transaction ID", selector: row => row.transactionDetails.transactionId, sortable: true, width: "300px" },
   
    { name: "Transaction Date", selector: row => new Date(row.transactionDetails.transactionDate).toLocaleString(), sortable: true, width: "200px" },
    { name: "Transaction Status", selector: row => row.transactionDetails.transactionStatus, sortable: true, width: "180px" },
  
    // Additional Info
   
    { 
      name: "Booking Status",
      selector: row => row.bookingStatus === 1 
        ? <span className="badge bg-success">Confirmed</span> 
        : <span className="badge bg-danger">Pending</span>,
      sortable: true,
      width: "160px" 
    }
  ];

  console.log(panditBookingList)
  return (
    <div className="col-12">
              <div className="card shadow-lg mb-4 border-0">
                   <div className="card-header bg-dark text-white py-2">
                       <div className="d-flex align-items-center justify-content-between py-1">
                           <h6 className="mb-0">Pandit Booking List</h6>
                       </div>
                   </div>
                   <GetTable
                        columns={columns}
                        data={panditBookingList}
                        pagination
                        highlightOnHover
                        striped
                    />
                </div>
    
            </div>
    
  )
};

export default PanditBookings;