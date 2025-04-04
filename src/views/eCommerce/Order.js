import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import GetEcomTable from './GetEcomTable';
import { CBadge } from '@coreui/react';
import { MdCancel } from "react-icons/md";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Order = () => {
    const [orders, setOrders] = useState([]);
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/e-store/all-order`, {
                headers: { Authorization: token },
            });
            const ordersWithAddresses = await fetchAddresses(response.data.orderData);
            setOrders(ordersWithAddresses);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const fetchAddresses = async (ordersData) => {
        const updatedOrders = await Promise.all(
            ordersData.map(async (order) => {
                try {
                    const addressResponse = await axios.get(`${BASE_URL}/order/delivery-address/${order.orderId}`, {
                        headers: { Authorization: token },
                    });
                    return { ...order, Address: addressResponse.data.DeliveryAddress || "N/A" };
                } catch (error) {
                    return { ...order, Address: "N/A" };
                }
            })
        );
        return updatedOrders;
    };
    const transformedData = orders.flatMap(order =>
        order.orderDetails.map(product => ({
            orderId: order.orderId,
            productName: product.productName,
            amount: product.amount,
            quantity: product.quantity,
            userDetails: order.userDetails,
            address: order.Address,
            totalAmount: order.paymentDetails.totalAmount,
            transactionStatus: order.paymentDetails.transactionStatus,
            orderStatus: order.orderStatus || "pending",
        }))
    );

    const handleCancelOrder = async (order) => {
        try {
            await axios.put(`${BASE_URL}/e-store/update-order-status/${order.orderId}`, {
                orderStatus: "cancelled",
            }, { headers: { Authorization: token } });

            toast.success("Order cancelled successfully!");

            // Update UI in real-time without full reload
            setOrders(prevOrders =>
                prevOrders.map(o =>
                    o.orderId === order.orderId ? { ...o, orderStatus: "cancelled" } : o
                )
            );
        } catch (error) {
            toast.error("Failed to cancel order!");
        }
    };

    const handleStatusUpdate = async (updatedOrders) => {
        try {
            await axios.put(`${BASE_URL}/e-store/update-multiple-order-status`, {
                orders: updatedOrders,
            }, { headers: { Authorization: token } });

            toast.success("All order statuses updated successfully!");

            // Auto-refresh data
            fetchOrders();
        } catch (error) {
            toast.error("Failed to update order statuses!");
        }
    };

    const columns = [
        { name: 'S.No', selector: (row, index) => index + 1, width: "80px" },
        { name: 'Order ID', selector: (row) => (
            <>
            <Link to={'/order-details/'+row.orderId}>{row.orderId}</Link>
            </>
            ),
            width: "150px" },
        { name: 'Product Name', selector: (row) => row.productName, width: "200px" },
        { name: 'Amount', selector: (row) => `₹${row.amount}`, width: "100px" },
        { name: 'Quantity', selector: (row) => row.quantity, width: "100px" },
        {
            name: 'User Details',
            selector: (row) => (
                <>
                    <b>Name:</b> {row.userDetails.username} <br />
                    <b>Email:</b> {row.userDetails.email} <br />
                    <b>Mobile:</b> {row.userDetails.contactNumber}
                </>
            ),
            width: "250px"
        },
        {
            name: 'Address',
            selector: (row) => row.address !== "N/A" ? (
                <div>
                    <div>{row.address.AddressLine1}</div>
                    <div>{row.address.AddressLine2}</div>
                    <div>{row.address.City}, {row.address.State}</div>
                    <div>{row.address.PostalCode}</div>
                    <div>{row.address.Country}</div>
                </div>
            ) : "N/A",
            width: "250px",
            wrap: true
        },
        { name: 'Total Amount', selector: (row) => `₹${row.totalAmount}`, width: "150px" },
        {
            name: 'Payment Status',
            selector: (row) => (
                <CBadge color={row.transactionStatus === "completed" ? "success" : "warning"}>
                    {row.transactionStatus}
                </CBadge>
            ),
            width: "150px"
        },
        {
            name: 'Status',
            selector: (row) => (
                <CBadge color={row.orderStatus === "delivered" ? "success" : "warning"}>
                    {row.orderStatus}
                </CBadge>
            ),
            width: "150px"
        },
        {
            name: 'Action',
            selector: (row) => (
                <div style={{ display: "flex", gap: "10px" }}>
                    <Link to={'/order-details/' + row.orderId}>
                        <CBadge color="primary" className='py-2 px-4' style={{ cursor: "pointer", }}>
                            View
                        </CBadge>
                    </Link>
                    {row.orderStatus === "cancelled" ? (
                        <CBadge color="danger">
                            {row.orderStatus}
                        </CBadge>
                    ) : (
                        <CBadge
                            onClick={() => handleCancelOrder(row)}
                            color="danger"
                            shape="rounded-pill"
                            style={{ cursor: "pointer" }}
                            role="button"
                            tabIndex="0"
                        >
                            <MdCancel size={18} /> Cancel Order
                        </CBadge>
                    )}
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: "250px",
        }
    ];

    return (
        <section>
            <ToastContainer />
            <div className="row justify-content-center">
                <div className="col-12">
                    <div className="card shadow-lg mb-4 border-0">
                        <div className="card-header bg-dark text-white py-2">
                            <h6 className="mb-0">Order</h6>
                        </div>
                        <GetEcomTable
                            columns={columns}
                            data={transformedData}
                            title="Orders"
                            onUpdateStatus={handleStatusUpdate}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Order;