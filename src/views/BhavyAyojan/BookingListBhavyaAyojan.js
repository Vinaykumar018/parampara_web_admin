import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Accordion, Badge } from 'react-bootstrap';
import { 
  FaIdCard, 
  FaUser, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaCheckCircle, 
  FaClock, 
  FaList, 
  FaInfoCircle, 
  FaGlobe 
} from 'react-icons/fa';

const BookingListBhavyaAyojan = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [bhavyaAyojanData, setBhavyaAyojanData] = useState([]);

  const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';

  useEffect(() => {
    const fetchBhavyaAyojanBookingData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.36:3000/api/bhavya-ayojan/${id}`,
          {
            headers: { Authorization: `Bearer ${TOKEN}` },
          },
        );

        const data = response.data.data;
        setBhavyaAyojanData(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBhavyaAyojanBookingData();
  }, [id]);

  // Helper function to format address
  const formatAddress = (address) => {
    if (!address) return 'Not specified';
    return `${address.street || ''}, ${address.city || ''}, ${address.state || ''} - ${address.pin_code || ''}`;
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container py-4">
      {bhavyaAyojanData.length > 0 ? (
        bhavyaAyojanData.map((item, index) => (
          <div key={index} className="mt-4 p-4 shadow rounded bg-white">
            {/* User Profile Section */}
            <div className="row mb-4">
              <div className="col-md-12">
                <div className="card shadow-sm rounded bg-light">
                  <div className="card-body">
                    <div className="d-flex flex-wrap gap-4 align-items-center">
                      {/* ID Section */}
                      <div className="d-flex align-items-center">
                        <FaIdCard className="text-primary me-2" size={24} />
                        <strong className="me-2">ID:</strong>
                        <Badge bg="white" text="dark" className="px-2 py-2">
                          {item.bookingId}
                        </Badge>
                      </div>

                      {/* Name Section */}
                      <div className="d-flex align-items-center">
                        <FaUser className="text-success me-2" size={24} />
                        <strong className="me-2">Name:</strong>
                        <span className="text-muted">{item.full_name}</span>
                      </div>

                      {/* Phone Section */}
                      <div className="d-flex align-items-center">
                        <FaPhone className="text-warning me-2" size={24} />
                        <strong className="me-2">Phone:</strong>
                        <span className="text-muted">{item.phone_number}</span>
                      </div>

                      {/* Email Section */}
                      <div className="d-flex align-items-center">
                        <FaEnvelope className="text-danger me-2" size={24} />
                        <strong className="me-2">Email:</strong>
                        <span className="text-muted">{item.email}</span>
                      </div>

                      {/* Request Button at Extreme Right */}
                      <div className="ms-auto">
                        <button type="button" className="btn btn-outline-primary btn-sm">
                          Request Services
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Information Section */}
            <Accordion defaultActiveKey="0" className="mt-4">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <FaUser className="mx-1" /> Event Details
                </Accordion.Header>
                <Accordion.Body>
                  <div className="row">
                    <div className="col-md-4">
                      <p>
                        <FaMapMarkerAlt className="mx-1" />
                        <strong>Address:</strong> {formatAddress(item.address)}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <FaCalendarAlt className="mx-1" />
                        <strong>Event Date:</strong> {item.event_date ? new Date(item.event_date).toDateString() : 'Not specified'}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <FaCheckCircle className="mx-1" />
                        <strong>Status:</strong> {item.status === "1" ? "Confirmed" : "Pending"}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <FaClock className="mx-1" />
                        <strong>Created At:</strong> {item.created_at ? new Date(item.created_at).toLocaleString() : 'Not specified'}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <FaList className="mx-1" />
                        <strong>Event Type:</strong> {item.event_type || 'Not specified'}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <FaInfoCircle className="mx-1" />
                        <strong>Requirements:</strong> {item.special_requirements || 'None'}
                      </p>
                    </div>
                    {item.location && (
                      <>
                        <div className="col-md-4">
                          <p>
                            <FaGlobe className="mx-1" />
                            <strong>Latitude:</strong> {item.location.latitude || 'Not specified'}
                          </p>
                        </div>
                        <div className="col-md-4">
                          <p>
                            <FaGlobe className="mx-1" />
                            <strong>Longitude:</strong> {item.location.longitude || 'Not specified'}
                          </p>
                        </div>
                      </>
                    )}
                    {item.guests && (
                      <div className="col-md-4">
                        <p>
                          <FaUser className="mx-1" />
                          <strong>Expected Guests:</strong> {item.guests}
                        </p>
                      </div>
                    )}
                    {item.budget && (
                      <div className="col-md-4">
                        <p>
                          <FaInfoCircle className="mx-1" />
                          <strong>Budget:</strong> {item.budget}
                        </p>
                      </div>
                    )}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        ))
      ) : (
        <div className="text-center mt-5">No Bhavya Ayojan data found</div>
      )}
    </div>
  );
};

export default BookingListBhavyaAyojan;