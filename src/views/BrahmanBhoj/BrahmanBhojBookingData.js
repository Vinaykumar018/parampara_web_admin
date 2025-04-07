import React, { useEffect, useState } from 'react';
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaCheckCircle, FaClock, FaList, FaInfoCircle, FaGlobe, FaIdCard } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { Accordion,Badge } from 'react-bootstrap';
import axios from 'axios';

const BrahmanBhojBookingData = () => {
  const { id } = useParams();
  const [BrahminBhojProfileData, setBrahminBhojProfileData] = useState([]);
  const [loading, setLoading] = useState(true);

  const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';

  useEffect(() => {
    const fetchBhojBookingData = async () => {
      try {
        const response = await axios.get(`http://192.168.1.36:3000/api/brahman-bhoj/get-details/${id}`, {
          headers: { Authorization: `Bearer ${TOKEN}` }
        });
        
        const data = response.data.data;
        setBrahminBhojProfileData(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBhojBookingData();
  }, [id]);

  console.log(BrahminBhojProfileData)

  return (
    <div className="container-fluid mb-4">
      <h4 className="text-primary mb-4">Brahman Bhoj Booking Details</h4>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        BrahminBhojProfileData.length > 0 ? (
          BrahminBhojProfileData.map((item, index) => (
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
      {item.bhojId}
    </Badge>
  </div>

  {/* Name Section */}
  <div className="d-flex align-items-center">
    <FaUser className="text-success me-2" size={24} />
    <strong className="me-2">Name:</strong>
    <span className="text-muted">{item.user_name}</span>
  </div>

  {/* Phone Section */}
  <div className="d-flex align-items-center">
    <FaPhone className="text-warning me-2" size={24} />
    <strong className="me-2">Phone:</strong>
    <span className="text-muted">{item.phone}</span>
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
      Request Pandit
    </button>
  </div>

</div>

      
      </div>
    </div>
  </div>
</div>

              {/* Personal Information Section */}
              <Accordion defaultActiveKey="0" className="mt-4">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <FaUser className="mx-1" /> More Information
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="row">
                      <div className="col-md-4">
                        <p><FaMapMarkerAlt className="mx-1" /><strong>Address:</strong> {item.address}</p>
                      </div>
                      <div className="col-md-4">
                        <p><FaCalendarAlt className="mx-1" /><strong>Event Date:</strong> {new Date(item.date).toDateString()}</p>
                      </div>
                      <div className="col-md-4">
                        <p><FaCheckCircle className="mx-1" /><strong>Status:</strong> {item.status === "1" ? "Confirmed" : "Pending"}</p>
                      </div>
                      <div className="col-md-4">
                        <p><FaClock className="mx-1" /><strong>Created At:</strong> {new Date(item.created_at).toLocaleString()}</p>
                      </div>
                      <div className="col-md-4">
                        <p><FaList className="mx-1" /><strong>Attendees:</strong> {item.attendees}</p>
                      </div>
                      <div className="col-md-4">
                        <p><FaInfoCircle className="mx-1" /><strong>Notes:</strong> {item.notes}</p>
                      </div>
                      <div className="col-md-4">
                        <p><FaGlobe className="mx-1" /><strong>Latitude:</strong> {item.location.latitude}</p>
                      </div>
                      <div className="col-md-4">
                        <p><FaGlobe className="mx-1" /><strong>Longitude:</strong> {item.location.longitude}</p>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          ))
        ) : (
          <p className="text-center">No data found</p>
        )
      )}
    </div>
  );
};

export default BrahmanBhojBookingData;