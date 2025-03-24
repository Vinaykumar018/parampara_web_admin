import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserByID } from '../Services/userApiService';
import { FaUser, FaPhone, FaEnvelope, FaTransgender, FaBirthdayCake, FaIdCard, FaMapMarkerAlt, FaCity, FaGlobe, FaMapPin, FaCalendarAlt, FaCheckCircle, FaClock, FaCalendarDay, FaList, FaMoneyBillAlt, FaBox } from 'react-icons/fa';
import GetTable from '../dashboard/GetTable';
import { Accordion } from 'react-bootstrap';

const UserProfilePage = () => {
  const { id } = useParams();
  const [userProfileData, setUserProfileData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserByID(id);
      setUserProfileData(data.data);
    };
    fetchData();
  }, [id]);

  if (!userProfileData) {
    return <div className="text-center mt-5">Loading...</div>;
  }


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


    
    <div className="container-fluid mb-2" >
      <h4 className="text-left text-primary mb-4">User Profile</h4>

      {/* User Profile Header */}
      <div className="mt-4 p-4 shadow rounded bg-white">
        <div className="row align-items-center">
          <div className="col-md-2 text-md-end text-center">
            <img
              src={userProfileData?.image || "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/813px-Unknown_person.jpg"}
              alt="User Profile"
              className="img-fluid rounded-circle border"
              style={{ width: "120px", height: "120px" }}
            />
          </div>
          <div className="col-md-10 text-left">
            <p className="text-dark "><FaUser className="mx-1 "/>{userProfileData?.username}</p>
            <p className="text-dark"><FaPhone className="mx-1" />{userProfileData?.mobile}</p>
            <p className="text-dark"><FaEnvelope className="mx-1" />{userProfileData?.email}</p>
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
              <p><FaTransgender className="mx-1" /><strong>Gender:</strong> {userProfileData?.gender}</p>
            </div>
            <div className="col-md-4">
              <p><FaBirthdayCake className="mx-1" /><strong>Date of Birth:</strong> {userProfileData?.dob?.split("T")[0] || "Not Provided"}</p>
            </div>
            <div className="col-md-4">
              <p><FaIdCard className="mx-1" /><strong>Aadhar No:</strong> {userProfileData?.aadhar_no || "Not Provided"}</p>
            </div>
            <div className="col-md-4">
              <p><FaPhone className="mx-1" /><strong>Alternate No:</strong> {userProfileData?.alternate_no || "Not Provided"}</p>
            </div>
            <div className="col-md-4">
              <p><FaCheckCircle className="mx-1" /><strong>Status:</strong> {userProfileData?.status}</p>
            </div>
            <div className="col-md-4">
              <p><FaCheckCircle className="mx-1" /><strong>Approved:</strong> {userProfileData?.approved ? "Yes" : "No"}</p>
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
                <p><FaMapMarkerAlt className="mx-1" /><strong>Address:</strong> {userProfileData?.address}</p>
              </div>
              <div className="col-md-4">
                <p><FaMapMarkerAlt className="mx-1" /><strong>Landmark:</strong> {userProfileData?.landmark}</p>
              </div>
              <div className="col-md-4">
                <p><FaCity className="mx-1" /><strong>City:</strong> {userProfileData?.city}</p>
              </div>
              <div className="col-md-4">
                <p><FaGlobe className="mx-1" /><strong>State:</strong> {userProfileData?.state}</p>
              </div>
              <div className="col-md-4">
                <p><FaGlobe className="mx-1" /><strong>Country:</strong> {userProfileData?.country}</p>
              </div>
              <div className="col-md-4">
                <p><FaMapPin className="mx-1" /><strong>Pincode:</strong> {userProfileData?.pincode}</p>
              </div>
              <div className="col-md-4">
                <p><FaMapPin className="mx-1" /><strong>Longitude:</strong> {userProfileData?.longitude}</p>
              </div>
              <div className="col-md-4">
                <p><FaMapPin className="mx-1" /><strong>Latitude:</strong> {userProfileData?.latitude}</p>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

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
  );
};

export default UserProfilePage;