// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import GetTable from "../dashboard/GetTable";
// import {
//   CBadge,

// } from '@coreui/react'

// import { MdCancel } from "react-icons/md";

// const UserBookingList = () => {
//     const [orders, setOrders] = useState([]);
//     const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';
//     const BASE_URL = `${import.meta.env.VITE_BASE_URL}`
//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 const response = await axios.get(`${BASE_URL }/orders`, {
//                     headers: { Authorization: token },
//                 });
//                 console.log("Fetched Orders:", response.data);
//                 const ordersWithAddresses = await fetchAddresses(response.data);
//                 setOrders(ordersWithAddresses);
//             } catch (error) {
//                 console.error('Error fetching orders:', error);
//             }
//         };

//         fetchOrders();
//     }, []);

//     // Function to fetch delivery addresses for each booking
//     const fetchAddresses = async (ordersData) => {
//         const updatedOrders = await Promise.all(
//             ordersData.map(async (order) => {
//                 try {
//                     const addressResponse = await axios.get(`${BASE_URL }/order/delivery-address/${order.bookingId}`, {
//                         headers: {
//                           "Content-Type": "application/json",
//                           Authorization: token
//                         },
//                       });
//                       console.log( addressResponse.data.DeliveryAddress)
//                     return { ...order, Address:  formatAddress(addressResponse.data.DeliveryAddress) || "N/A" };
//                 } catch (error) {
//                     console.error(`Error fetching address for Booking ID: ${order.bookingId}`, error);
//                     return { ...order, Address: "N/A" };
//                 }
//             })
//         );
//         return updatedOrders;
//     };

//     const columns = [
//       { name: 'S.No', selector: (row, index) => index + 1, sortable: false, width: "80px" },
//       { name: 'Booking ID', selector: (row) => row.bookingId, sortable: true, width: "150px" },
//       { name: 'Pooja Name', selector: (row) => row.bookingDetails.poojaName, sortable: true, width: "180px" },
//       { name: 'User Details', selector: (row) => (<>
//       <b>Name : </b>{row.userDetails.username}<br/>
//       <b>Email : </b>{row.userDetails.email}<br/>
//       <b>Mobile  : </b>{row.userDetails.contactNumber}<br/>
//       </>
//       ), sortable: true, width: "250px" },
//       {
//         name: "Address",
//         selector: (row) => row.Address,
//         sortable: true,
//         width: "250px",
//         wrap: true, // This ensures the text wraps automatically
//       },
//       // { name: 'Email', selector: (row) => row.userDetails.email, sortable: true, width: "200px" },
//       // { name: 'Mobile', selector: (row) => row.userDetails.contactNumber, sortable: true, width: "150px" },
//       // { name: 'Pooja Type', selector: (row) => row.bookingDetails.Type, sortable: true, width: "250px" },
//       { name: 'Book by Pandit ID', selector: (row) => row.panditId, sortable: true, width: "250px" },
//       {
//         name: 'Schedule',
//         selector: (row) => `${row.schedule.date} ${row.schedule.time}`,
//         sortable: true,
//         width: "200px"
//       },
//       { name: 'Amount', selector: (row) => `₹${row.paymentDetails.amount}`, sortable: true, width: "100px" },

//       {
//         name: "Booking Status",
//         selector: (row) => (
//           <CBadge
//             color={
//               row.bookingStatus === 0
//                 ? "warning"
//                 : row.bookingStatus === 2
//                 ? "danger"
//                 : "success"
//             }
//           >
//             {row.bookingStatus === 0
//               ? "Pending"
//               : row.bookingStatus === 2
//               ? "Cancelled"
//               : "Confirmed"}
//           </CBadge>
//         ),
//         sortable: true,
//         width: "150px",
//       },
//       {
//         name: 'Action',
//         selector: (row) => (
//           <div>
//             <CBadge
//               onClick={() => handleAction(row)}
//               color="danger"
//               shape="rounded-pill"
//               style={{ cursor: "pointer", marginRight: "10px" }}
//               role="button"
//               tabIndex="0"
//             >
//               <MdCancel size={18} /> Cancel this Pooja Booking
//             </CBadge>
//           </div>
//         ),
//         ignoreRowClick: true,
//         allowOverflow: true,
//         button: true,
//         width: "200px",
//       },
//     ];

//     const handleAction = async (data) => {
//         // Define your action logic here
//         console.log(data)
//     };

//     // Format address into a single string
//     const formatAddress = (address) => {

//         if (!address) return "N/A";
//         return `${address.AddressLine1 || ''}, ${address.AddressLine2 || ''}, ${address.Location || ''}, ${address.Landmark ? address.Landmark + ', ' : ''}${address.City || ''}, ${address.State || ''}, ${address.Country || ''} - ${address.PostalCode || ''}`;
//     };
//     return (
//         <div className="col-12">
//             <div className="card shadow-lg mb-4 border-0">
//                 <div className="card-header bg-dark text-white py-2">
//                     <div className="d-flex align-items-center justify-content-between py-1">
//                         <h6 className="mb-0">User Booking List</h6>
//                     </div>
//                 </div>
//                 <GetTable
//                     columns={columns}
//                     data={orders}
//                     pagination
//                     highlightOnHover
//                     striped
//                 />
//             </div>

//         </div>
//     );
// };

// export default UserBookingList;

//  const [orders, setOrders] = useState([]);
//     const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';
//      const BASE_URL = `${import.meta.env.VITE_BASE_URL}`

//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 const response = await axios.get(`${BASE_URL}/brahman-bhoj/get-bhoj-request`, {
//                     headers: { Authorization: token },
//                 });
//                 console.log("Fetched Orders:", response.data.data);
//                 setOrders(response.data.data);
//             } catch (error) {
//                 console.error('Error fetching orders:', error);
//             }
//         };

//         fetchOrders();
//     }, []);

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GetTable from '../dashboard/GetTable';
import { useParams } from 'react-router-dom';
import { CBadge } from '@coreui/react';

import { MdCancel } from 'react-icons/md';

const UserBookingList = () => {
  const { id } = useParams();
  console.log(id);

  const [userBookingList, setUserBookingList] = useState([]);
  const token =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';
  const url = 'http://192.168.1.35:3000/api/user/get-booking-user';

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await axios.get(`${url}/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      setUserBookingList(response.data.data);
    };
    fetchBookings();
  }, []);


  const columns = [
    { name: "Booking ID", selector: row => row.bookingId, sortable: true, width: "150px" },
    { name: "Pandit ID", selector: row => row.panditId || "N/A", sortable: true, width: "210px" },
  
    // Booking Details
    { name: "Pooja Name", selector: row => row.bookingDetails.poojaName, sortable: true, width: "300px" },
    { name: "Type", selector: row => row.bookingDetails.Type, sortable: true, width: "120px" },
    { name: "Samagri Included", selector: row => row.bookingDetails.isSamagriIncluded ? "Yes" : "No", sortable: true, width: "160px" },
  
    // User Details
    { name: "Username", selector: row => row.userDetails.username, sortable: true, width: "150px" },
    { name: "Contact", selector: row => row.userDetails.contactNumber, sortable: true, width: "180px" },
    { name: "Email", selector: row => row.userDetails.email, sortable: true, width: "220px" },
  
    // Schedule
    { name: "Date", selector: row => row.schedule.date, sortable: true, width: "20px" },
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
  return (
    <div className="col-12">
              <div className="card shadow-lg mb-4 border-0">
                   <div className="card-header bg-dark text-white py-2">
                       <div className="d-flex align-items-center justify-content-between py-1">
                           <h6 className="mb-0">User Booking List</h6>
                       </div>
                   </div>
                   <GetTable
                        columns={columns}
                        data={userBookingList}
                        pagination
                        highlightOnHover
                        striped
                    />
                </div>
    
            </div>
    
  )
};

export default UserBookingList;