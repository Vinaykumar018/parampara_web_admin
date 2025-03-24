import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./SingleOrderDetails.css" // Import the CSS file for styling

const SingleOderDetails = () => {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [delivery, setDelivery] = useState(null)
  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8"
  const BASE_URL = import.meta.env.VITE_BASE_URL

  useEffect(() => {
    fetchOrder()
    fetchDelivery()
  }, [orderId])

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/e-store/orders/${orderId}`, {
        headers: { Authorization: token },
      })
      setOrder(response.data.order)
    } catch (error) {
      toast.error("Error fetching order details")
    }
  }

  const fetchDelivery = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/order/delivery-address/${orderId}`, {
        headers: { Authorization: token },
      })
      setDelivery(response.data)
    } catch (error) {
      toast.error("Error fetching delivery details")
    }
  }

  if (!order || !delivery) {
    return <div>Loading...</div>
  }
  const getStatusClass = (status) => {
    return status === "delivered"
      ? "timeline-dot completed"
      : status === "shipped"
      ? "timeline-dot in-progress"
      : "timeline-dot pending";
  };
  return (
    <section>
      <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-default order-panel">
              <div className="panel-heading">
                <i className="fa fa-shopping-cart"></i> Order Details
              </div>
              <div className="panel-body">
                {/* Order ID and Status */}
                <div className="order-section">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="info-item">
                        <span className="info-label">Order Date:</span>
                        <span className="info-value">{new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="info-item w-75">
                        <div className="row">
                          <div className="col-8">
                            <span className="info-label">Payment Status:</span>
                            <span className="info-value">
                              <span
                                className={`status-badge ${order.paymentDetails.transactionStatus === "completed" ? "status-completed" : "status-pending"}`}
                              >
                                {order.paymentDetails.transactionStatus}
                              </span>
                            </span>
                          </div>
                          <div class="col-4">
                            <div className="btn-group">
                                <select className="form-control" style={{ marginRight: "10px", width: "150px" }}>
                                  <option value="pending">Pending</option>
                                  <option value="processing">Processing</option>
                                  <option value="shipped">Shipped</option>
                                  <option value="delivered">Delivered</option>
                                </select>
                                <button className="btn btn-warning">
                                  <i className="fa fa-edit"></i> Update
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Timeline */}
                <div className="order-section">
                  <div className="order-timeline">
                    <div className="timeline-item">
                      <div className={getStatusClass("placed")}></div>
                      <div className="timeline-line"></div>
                      <div className="timeline-label">Order Placed</div>
                    </div>
                    <div className="timeline-item">
                      <div className={getStatusClass(order.paymentDetails.paymentDate ? "completed" : "pending")}></div>
                      <div className="timeline-line"></div>
                      <div className="timeline-label">Payment Completed</div>
                    </div>
                    <div className="timeline-item">
                      <div className={getStatusClass(order.orderStatus === "processing" ? "in-progress" : "pending")}></div>
                      <div className="timeline-line"></div>
                      <div className="timeline-label">Order Processing</div>
                    </div>
                    <div className="timeline-item">
                      <div className={getStatusClass(order.orderStatus === "shipped" ? "in-progress" : "pending")}></div>
                      <div className="timeline-line"></div>
                      <div className="timeline-label">Shipped</div>
                    </div>
                    <div className="timeline-item">
                      <div className={getStatusClass(order.orderStatus === "delivered" ? "completed" : "pending")}></div>
                      <div className="timeline-label">Delivered</div>
                    </div>
                  </div>
                </div>

                {/* Customer Information */}
                <div className="order-section">
                  <div className="section-title">
                    <i className="fa fa-user"></i> Customer Information
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="info-item">
                        <span className="info-label">Name:</span>
                        <span className="info-value">{order.userDetails.username}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Email:</span>
                        <span className="info-value">{order.userDetails.email}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Mobile:</span>
                        <span className="info-value">{order.userDetails.contactNumber}</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="address-block">
                        <div className="address-line">{delivery.DeliveryAddress.AddressLine1}</div>
                        <div className="address-line">{delivery.DeliveryAddress.AddressLine2}</div>
                        <div className="address-line">
                          {delivery.DeliveryAddress.City}, {delivery.DeliveryAddress.State}
                        </div>
                        <div className="address-line">{delivery.DeliveryAddress.PostalCode}</div>
                        <div className="address-line">{delivery.DeliveryAddress.Country}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="order-section">
                  <div className="section-title">
                    <i className="fa fa-file-text-o"></i> Order Summary
                  </div>
                  <div className="row">
                    <div className="col-md-8">
                      <div className="product-list">
                        {order.orderDetails.map((product, index) => (
                          <div className="product-item" key={index}>
                            <div className="product-name">{product.productName}</div>
                            <div className="product-details">{product.description}</div>
                            <div className="product-price">
                              ₹{product.amount} x {product.quantity}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <i className="fa fa-money"></i> Payment Details
                        </div>
                        <div className="panel-body">
                          <div className="info-item">
                            <span className="info-label">Subtotal:</span>
                            <span className="info-value">₹{order.paymentDetails.totalAmount}</span>
                          </div>
                          <div className="info-item">
                            <span className="info-label">Shipping:</span>
                            <span className="info-value">₹0</span>
                          </div>
                          <hr />
                          <div className="info-item">
                            <span className="info-label">Total Amount:</span>
                            <span className="info-value total-amount">₹{order.paymentDetails.totalAmount}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SingleOderDetails
