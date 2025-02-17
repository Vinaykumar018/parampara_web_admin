import React, { useEffect, useState } from "react";
import axios from "axios";
import GetTable from "../dashboard/GetTable";
import {
  CBadge,
  
} from '@coreui/react'

import { MdCancel } from "react-icons/md";

const BookingListBhajanMandal = () => {
    const [orders, setOrders] = useState([]);
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';
     const BASE_URL = `${import.meta.env.VITE_BASE_URL}`

    useEffect(() => {  
        const fetchOrders = async () => { 
            try {
                const response = await axios.get(`${BASE_URL}/orders`, { 
                    headers: { Authorization: token },
                });
                console.log("Fetched Orders:", response.data);  
                const ordersWithAddresses = await fetchAddresses(response.data);
                setOrders(ordersWithAddresses);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders(); 
    }, []);

    // Function to fetch delivery addresses for each booking
    const fetchAddresses = async (ordersData) => {
        const updatedOrders = await Promise.all(
            ordersData.map(async (order) => {
                try {
                    const addressResponse = await axios.get(`${BASE_URL}/order/delivery-address/${order.bookingId}`, {
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: token
                        },
                      });
                      console.log( addressResponse.data.DeliveryAddress)
                    return { ...order, Address:  formatAddress(addressResponse.data.DeliveryAddress) || "N/A" };
                } catch (error) {
                    console.error(`Error fetching address for Booking ID: ${order.bookingId}`, error);
                    return { ...order, Address: "N/A" };
                }
            })
        );
        return updatedOrders;
    };

     const columns = [
          { name: 'S.No', selector: (row, index) => index + 1, sortable: false, width: "80px" },
          { name: 'Booking ID', selector: (row) => row.bookingId, sortable: true, width: "350px" },
          { name: 'Name', selector: (row) => row.userDetails.username, sortable: true, width: "150px" },
          { name: 'Email', selector: (row) => row.userDetails.email, sortable: true, width: "200px" },
          { name: 'Mobile', selector: (row) => row.userDetails.contactNumber, sortable: true, width: "150px" },
          { name: 'Pooja Name', selector: (row) => row.poojaDetails.poojaName, sortable: true, width: "180px" },
          { name: 'Pooja Type', selector: (row) => row.poojaDetails.poojaType, sortable: true, width: "250px" },
          { name: 'Book by Pandit ID', selector: (row) => row.panditId, sortable: true, width: "250px" },
          { 
            name: 'Schedule', 
            selector: (row) => `${row.schedule.date} ${row.schedule.time}`, 
            sortable: true, 
            width: "200px" 
          },
          { name: 'Amount', selector: (row) => `₹${row.paymentDetails.amount}`, sortable: true, width: "100px" },
          
          {
            name: "Address",
            selector: (row) => row.Address,
            sortable: true,
            width: "250px",
            wrap: true, // This ensures the text wraps automatically
          },
          {
            name: "Booking Status",
            selector: (row) => (
              <CBadge
                color={
                  row.bookingStatus === 0
                    ? "warning"
                    : row.bookingStatus === 2
                    ? "danger"
                    : "success"
                }
              >
                {row.bookingStatus === 0
                  ? "Pending"
                  : row.bookingStatus === 2
                  ? "Cancelled"
                  : "Confirmed"}
              </CBadge>
            ),
            sortable: true,
            width: "150px",
          },
          {
            name: 'Action',
            selector: (row) => (
              <div>
                <CBadge   
                  onClick={() => handleAction(row)} 
                  color="danger" 
                  shape="rounded-pill" 
                  style={{ cursor: "pointer", marginRight: "10px" }} 
                  role="button"
                  tabIndex="0"
                >
                  <MdCancel size={18} /> Cancel this Pooja Booking
                </CBadge>
              </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: "200px",
          },
        ];
        
    const handleAction = async (data) => {
        // Define your action logic here
        console.log(data)
    };

    // Format address into a single string
    const formatAddress = (address) => {
      
        if (!address) return "N/A";
        return `${address.AddressLine1 || ''}, ${address.AddressLine2 || ''}, ${address.Location || ''}, ${address.Landmark ? address.Landmark + ', ' : ''}${address.City || ''}, ${address.State || ''}, ${address.Country || ''} - ${address.PostalCode || ''}`;
    };
    return (
        <div className="col-12">
            <div className="card shadow-lg mb-4 border-0">
                <div className="card-header bg-dark text-white py-2">
                    <div className="d-flex align-items-center justify-content-between py-1">
                        <h6 className="mb-0">Bhajan Mandal Booking List</h6>
                    </div>
                </div>
                <GetTable
                    columns={columns}
                    data={orders}
                    pagination
                    highlightOnHover
                    striped
                />
            </div>
          
        </div>
    );
};

export default BookingListBhajanMandal;
