import React, { useEffect } from 'react';
import { useState } from 'react';
import { FaUser, FaPhone, FaEnvelope, FaTransgender, FaBirthdayCake, FaIdCard, FaMapMarkerAlt, FaCity, FaGlobe, FaMapPin, FaCalendarAlt, FaCheckCircle, FaClock, FaBriefcase, FaUniversity, FaMoneyBillAlt, FaBook, FaBuilding, FaInfoCircle ,
  FaCalendarDay, FaList, FaBox
} from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { getPanditByID } from '../Services/panditApiService';
import GetTable from '../dashboard/GetTable';

import { Accordion} from "react-bootstrap";

const PanditProfileData = () => {
  const { id } = useParams();
  const [panditProfileData, setPanditProfileData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPanditByID(id);
      setPanditProfileData(data.data);
    };
    fetchData();
  }, [id]);

  console.log(panditProfileData);



  const bookingData = [
    {
      id: 1,
      bookingName: "Wedding Ceremony",
      bookingCategory: "Religious Event",
      price: "₹10,000",
      bookingItems: "Puja Samagri, Flowers, Prasad",
      bookingDay: "15th October 2023",
      bookingTime: "10:00 AM - 12:00 PM",
    },
    {
      id: 2,
      bookingName: "Housewarming Ceremony",
      bookingCategory: "Religious Event",
      price: "₹7,000",
      bookingItems: "Puja Samagri, Fruits, Prasad",
      bookingDay: "20th October 2023",
      bookingTime: "9:00 AM - 11:00 AM",
    },
    {
      id: 3,
      bookingName: "Baby Naming Ceremony",
      bookingCategory: "Cultural Event",
      price: "₹5,000",
      bookingItems: "Puja Samagri, Sweets, Prasad",
      bookingDay: "25th October 2023",
      bookingTime: "2:00 PM - 4:00 PM",
    },
  ];


  const bookingColumns = [
    {
      name: "Booking Name",
      selector: (row) => row.bookingName,
      sortable: true,
    },
    {
      name: "Booking Category",
      selector: (row) => row.bookingCategory,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Booking Items",
      selector: (row) => row.bookingItems,
      sortable: true,
    },
    {
      name: "Booking Day",
      selector: (row) => row.bookingDay,
      sortable: true,
    },
    {
      name: "Booking Time",
      selector: (row) => row.bookingTime,
      sortable: true,
    },
  ];

  return (
    <div>
      <div className="container-fluid mb-2">
        <h4 className="text-left text-primary mb-4">User Profile</h4>

        {/* User Profile Header */}
        <div className="mt-4 p-4 shadow rounded bg-white">
          <div className="row align-items-center">
            <div className="col-md-2 text-md-end text-center">
              <img
                src={panditProfileData?.image || "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/813px-Unknown_person.jpg"}
                alt="User Profile"
                className="img-fluid rounded-circle border"
                style={{ width: "120px", height: "120px" }}
              />
            </div>
            <div className="col-md-10 text-left">
              <p className="text-dark"><FaUser className="mx-1" />{panditProfileData?.username}</p>
              <p className="text-dark"><FaPhone className="mx-1" />{panditProfileData?.mobile}</p>
              <p className="text-dark"><FaEnvelope className="mx-1" />{panditProfileData?.email}</p>
            </div>
          </div>
        </div>

        {/* Personal Information Section */}
        <Accordion defaultActiveKey="0" className="mt-4 shadow rounded bg-white">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <FaUser className="mx-1" /> Personal Information
          </Accordion.Header>
          <Accordion.Body>
            <div className="row">
              <div className="col-md-4">
                <p><FaTransgender className="mx-1" /><strong>Gender:</strong> {panditProfileData?.gender}</p>
              </div>
              <div className="col-md-4">
                <p><FaBirthdayCake className="mx-1" /><strong>Date of Birth:</strong> {panditProfileData?.dob.split("T")[0] || "Not Provided"}</p>
              </div>
              <div className="col-md-4">
                <p><FaIdCard className="mx-1" /><strong>Aadhar No:</strong> {panditProfileData?.aadhar_no || "Not Provided"}</p>
              </div>
              <div className="col-md-4">
                <p><FaPhone className="mx-1" /><strong>Alternate No:</strong> {panditProfileData?.alternate_no || "Not Provided"}</p>
              </div>
              <div className="col-md-4">
                <p><FaCheckCircle className="mx-1" /><strong>Status:</strong> {panditProfileData?.status}</p>
              </div>
              <div className="col-md-4">
                <p><FaCheckCircle className="mx-1" /><strong>Approved:</strong> {panditProfileData?.approved ? "Yes" : "No"}</p>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

        {/* Address Information Section */}
        <Accordion defaultActiveKey="1" className="mt-4 shadow rounded bg-white">
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <FaMapMarkerAlt className="mx-1" /> Address Information
          </Accordion.Header>
          <Accordion.Body>
            <div className="row">
              <div className="col-md-4">
                <p><FaMapMarkerAlt className="mx-1" /><strong>Address:</strong> {panditProfileData?.address}</p>
              </div>
              <div className="col-md-4">
                <p><FaCity className="mx-1" /><strong>City:</strong> {panditProfileData?.city}</p>
              </div>
              <div className="col-md-4">
                <p><FaGlobe className="mx-1" /><strong>State:</strong> {panditProfileData?.state}</p>
              </div>
              <div className="col-md-4">
                <p><FaGlobe className="mx-1" /><strong>Country:</strong> {panditProfileData?.country}</p>
              </div>
              <div className="col-md-4">
                <p><FaMapPin className="mx-1" /><strong>Pincode:</strong> {panditProfileData?.pincode}</p>
              </div>
              <div className="col-md-4">
                <p><FaMapPin className="mx-1" /><strong>Longitude:</strong> {panditProfileData?.longitude || "Not Provided"}</p>
              </div>
              <div className="col-md-4">
                <p><FaMapPin className="mx-1" /><strong>Latitude:</strong> {panditProfileData?.latitude || "Not Provided"}</p>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Accordion defaultActiveKey="2" className="mt-4 shadow rounded bg-white">
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <FaBriefcase className="mx-1" /> Professional Information
          </Accordion.Header>
          <Accordion.Body>
            <div className="row">
              <div className="col-md-4">
                <p><FaBook className="mx-1" /><strong>Skills:</strong> {panditProfileData?.skills}</p>
              </div>
              <div className="col-md-4">
                <p><FaUniversity className="mx-1" /><strong>Degree:</strong> {panditProfileData?.degree}</p>
              </div>
              <div className="col-md-4">
                <p><FaBriefcase className="mx-1" /><strong>Experience:</strong> {panditProfileData?.experience} years</p>
              </div>
              <div className="col-md-4">
                <p><FaInfoCircle className="mx-1" /><strong>Type:</strong> {panditProfileData?.type}</p>
              </div>
              <div className="col-md-4">
                <p><FaInfoCircle className="mx-1" /><strong>Bio:</strong> {panditProfileData?.bio}</p>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Accordion defaultActiveKey="3" className="mt-4 shadow rounded bg-white">
        <Accordion.Item eventKey="3">
          <Accordion.Header>
            <FaMoneyBillAlt className="mx-1" /> Bank Details
          </Accordion.Header>
          <Accordion.Body>
            <div className="row">
              <div className="col-md-4">
                <p><FaBuilding className="mx-1" /><strong>Bank Name:</strong> {panditProfileData?.bank_name}</p>
              </div>
              <div className="col-md-4">
                <p><FaIdCard className="mx-1" /><strong>Account Holder Name:</strong> {panditProfileData?.acc_holder_name}</p>
              </div>
              <div className="col-md-4">
                <p><FaMoneyBillAlt className="mx-1" /><strong>Account Number:</strong> {panditProfileData?.bank_ac_no}</p>
              </div>
              <div className="col-md-4">
                <p><FaInfoCircle className="mx-1" /><strong>IFSC Code:</strong> {panditProfileData?.ifsc_code}</p>
              </div>
              <div className="col-md-4">
                <p><FaIdCard className="mx-1" /><strong>PAN Card No:</strong> {panditProfileData?.pancard_no}</p>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

        {/* Account Information Section */}

<Accordion defaultActiveKey="4" className="mt-4 shadow rounded bg-white mb-3" >
<Accordion.Item eventKey="4">



<Accordion.Header>
            <FaMoneyBillAlt className="mx-1" /> Booking Details
          </Accordion.Header>

       
          <Accordion.Body>
            <GetTable columns={bookingColumns} data={bookingData} />
          </Accordion.Body>
       
        </Accordion.Item>
        </Accordion>
       
      </div>
    </div>
  );
};

export default PanditProfileData;