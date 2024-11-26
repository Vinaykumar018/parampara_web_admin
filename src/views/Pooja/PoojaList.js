
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import GetTable from "../dashboard/GetTable";
// import RichTextEditor from "react-rte";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import './poojaList.css';

// import { useNavigate } from "react-router-dom";
// const PoojaList = () => {
//   // State for Pooja data and form data
//   const [poojaData, setPoojaData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [formData, setFormData] = useState({
//     pooja_name: "",
//     pooja_category: "",
//     pooja_Samegristatus: false,
//     price_withSamagri: "",
//     price_withoutSamagri: "",
//     pooja_image: null,
//     short_discription: "",

//     long_discription: RichTextEditor.createEmptyValue(),
//   });
//   const [imagePreview, setImagePreview] = useState(null);
//   const [showModal, setShowModal] = useState(false); // Modal visibility state
//   const [poojaToDelete, setPoojaToDelete] = useState(null); // Pooja ID to delete
//   const navigate = useNavigate(); // useNavigate hook
//   // Fetch Pooja data from API
//   useEffect(() => {
//     const fetchPoojaData = async () => {
//       try {
//         const response = await axios.get(
//           "http://192.168.1.38:3000/api/pooja/all-pooja",
//           {
//             headers: {
//               Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8`,
//             },
//           }
//         );
//         if (response.data.status === 1) {
//           setPoojaData(response.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching Pooja data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPoojaData();
//   }, []);

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   // Handle image file selection and preview
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file && file.type.startsWith('image/')) {
//       const reader = new FileReader();
//       reader.onloadend = () => setImagePreview(reader.result);
//       reader.readAsDataURL(file);
//     }
//     setFormData((prevData) => ({ ...prevData, pooja_image: file }));
//   };

//   // Handle rich text editor changes
//   const handleEditorChange = (value, fieldName) => {
//     setFormData((prevData) => ({ ...prevData, [fieldName]: value }));
//   };


  
//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     console.log(formData)
//     Object.keys(formData).forEach((key) => {
//       data.append(key, key === "short_discription" || key === "long_discription" ? formData[key].toString("html") : formData[key]);
//     });

//     try {
//       await axios.post("http://192.168.1.38:3000/api/pooja/create-pooja", data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8`,
//         },
//       });
//       toast.success("Pooja created successfully!");
//       setFormData({
//         pooja_name: "",
//         pooja_category: "",
//         pooja_Samegristatus: "",
//         price_withSamagri: "",
//         price_withoutSamagri: false,
//         pooja_image: null,
//         short_discription: "",
//         long_discription: RichTextEditor.createEmptyValue(),
//       });
//     } catch (error) {
//       toast.error("Failed to create Pooja. Please try again.");
//       console.error("Error creating Pooja:", error);
//     }
//   };

//   const handleEdit = (row) => {
//     // Set form data for editing
//     setFormData({
//       pooja_name: row.pooja_name,
//       pooja_category: row.pooja_category,
//       pooja_Samegristatus: row.pooja_Samegristatus,
//       price_withSamagri: row.price_withSamagri,
//       price_withoutSamagri: row.price_withoutSamagri,
//       pooja_image: row.pooja_image,
//       short_discription: row.short_discription,
//       long_discription: RichTextEditor.createValueFromString(row.long_discription, 'html'),
//     });
  
//     // Navigate to the update page and pass the pooja ID in the URL
//     navigate(`/pooja/pooja-update-list/${row}`);  // Assuming `row.id` holds the unique ID of the pooja
//   };
  
  
//   const handleDelete = (id) => {
//     setPoojaToDelete(id); // Set the pooja ID to delete
//     setShowModal(true); // Show the confirmation modal
//   };

//   const handleConfirmDelete = async () => {
//     try {
//       const response = await axios.delete(`http://192.168.1.38:3000/api/pooja/delete-pooja/${poojaToDelete}`, {
//         headers: {
//           Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8`,
//         },
//       });
//       if (response.data.status === 1) {
//         toast.success("Pooja deleted successfully!");
//         setPoojaData(poojaData.filter((item) => item._id !== poojaToDelete)); // Update the state after deletion
//         setShowModal(false); // Close the modal
//       } else {
//         toast.error("Failed to delete Pooja.");
//       }
//     } catch (error) {
//       toast.error("Error deleting Pooja. Please try again.");
//       console.error("Error deleting Pooja:", error);
//     }
//   };

//   const handleCloseModal = () => {
//     setShowModal(false); // Close the modal without deleting
//   };

//   // Table columns definition
//   const columns = [
//     { name: "ID", selector: (row) => row._id },
//     { name: "Pooja Name", selector: (row) => row.pooja_name },
//     { name: "Category", selector: (row) => row.pooja_category },
//     { name: "Price (With Samagri)", selector: (row) => row.price_withSamagri },
//     { name: "Price (Without Samagri)", selector: (row) => row.price_withoutSamagri },
//     {
//       name: "Image",
//       selector: (row) =>
//         row.pooja_image ? (
//           <img
//             src={`http://192.168.1.38:3000${row.pooja_image}`}
//             alt={row.pooja_name}
//             className="img-thumbnail"
//             width={50}
//           />
//         ) : (
//           "N/A"
//         ),
//     },
//     { name: "Short Description", selector: (row) => row.short_discription },
//     { name: "Long Description", selector: (row) => row.long_discription },
//     { name: "Status", selector: (row) => row.status },
//     {
//       name: "Action",
//       selector: (row) => (
//         <div>
//           <button
//             onClick={() => handleEdit(row._id)} 
//             className="btn btn-primary btn-sm me-2"
//           >
//             Edit
//           </button>
//           <button
//             onClick={() => handleDelete(row._id)} 
//             className="btn btn-danger btn-sm"
//           >
//             Delete
//           </button>
//         </div>
//       ),
// ignoreRowClick: true,
// allowOverflow: true,
// button: true,
//     },
    
//   ];

//   return (
//     <section>
//       <div className="container py-5">
//         <div className="row justify-content-center">
//           <div className="col-12">
//             <div className="card shadow-lg mb-4 border-0">
//               <div className="card-header text-center bg-dark text-white">
//                 <h4 className="text-uppercase font-weight-bold">Add New Pooja</h4>
//               </div>
//               <div className="card-body bg-light">
//                 <form onSubmit={handleSubmit}>
//                   <div className="row">
//                     {/* Pooja Name */}
//                     <div className="col-md-6 mb-3">
//                       <label className="form-label">Pooja Name</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="pooja_name"
//                         placeholder="Enter Pooja Name"
//                         value={formData.pooja_name}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>

//                     <div className="col-md-6 mb-3">
//   <label className="form-label">Samagri Status</label>
//   <div className="form-check">
//     <input
//       type="checkbox"
//       className="form-check-input"
//       id="pooja_Samegristatus"
//       name="pooja_Samegristatus"
//       checked={formData.pooja_Samegristatus === "true"} // Convert string to boolean
//       onChange={(e) =>
//         setFormData((prevData) => ({
//           ...prevData,
//           pooja_Samegristatus: e.target.checked ? "true" : "false", // Set true/false as a string
//         }))
//       }
//     />
//     <label className="form-check-label" htmlFor="pooja_Samegristatus">
//       Include Samagri
//     </label>
//   </div>
// </div>
//                     {/* Pooja Category */}
//                     <div className="col-md-6 mb-3">
//                       <label className="form-label">Pooja Category</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="pooja_category"
//                         placeholder="Enter Pooja Category"
//                         value={formData.pooja_category}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
//                     {/* Price With Samagri */}
//                     <div className="col-md-6 mb-3">
//                       <label className="form-label">Price (With Samagri)</label>
//                       <input
//                         type="number"
//                         className="form-control"
//                         name="price_withSamagri"
//                         placeholder="Enter Price With Samagri"
//                         value={formData.price_withSamagri}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
//                     {/* Price Without Samagri */}
//                     <div className="col-md-6 mb-3">
//                       <label className="form-label">Price (Without Samagri)</label>
//                       <input
//                         type="number"
//                         className="form-control"
//                         name="price_withoutSamagri"
//                         placeholder="Enter Price Without Samagri"
//                         value={formData.price_withoutSamagri}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
//                     {/* Pooja Image */}
//                     <div className="col-md-6 mb-3">
//                       <label className="form-label">Pooja Image</label>
//                       <input
//                         type="file"
//                         className="form-control"
//                         accept="image/*"
//                         onChange={handleFileChange}
//                         required
//                       />
//                     </div>
//                     {/* Image Preview */}
//                     {imagePreview && (
//                       <div className="mb-3">
//                         <img
//                           src={imagePreview}
//                           alt="Preview"
//                           className="img-fluid"
//                           style={{ maxWidth: '100%', maxHeight: '80px', objectFit: 'contain' }}
//                         />
//                       </div>
//                     )}
//                     {/* Short Description */}
//                     <div className="col-md-8 mb-3">
//                       <label className="form-label">Short Description</label>
//                       <textarea
//                         className="form-control"
//                         rows="2"
//                         placeholder="Enter Short Description"
//                         name="short_discription"
//                         value={formData.short_discription}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
//                     {/* Long Description */}
//                     <div className="mb-3">
//                       <label className="form-label">Long Description</label>
//                       <RichTextEditor
//                         editorStyle={{ minHeight: "120px", backgroundColor: "#f4f4f4", border: "1px solid #ccc", color: "#333" }}
//                         value={formData.long_discription}
//                         onChange={(value) => handleEditorChange(value, "long_discription")}
//                       />
//                     </div>
//                     <div className="d-flex justify-content-end">
//                       <button type="submit" className="me-2 btn btn-dark btn-lg">Add Pooja</button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Display table if data is loaded */}
//         {loading ? <p>Loading...</p> : <GetTable columns={columns} data={poojaData} />}
//       </div>

//       <ConfirmDeleteModal
//         show={showModal}
//         onClose={handleCloseModal}
//         onConfirm={handleConfirmDelete}
//       />
//       <ToastContainer />
      
//     </section>
//   );
// };

// export default PoojaList;
// const ConfirmDeleteModal = ({ show, onClose, onConfirm }) => {
//   if (!show) return null;

//   return (
//     <div
//     className="modal show"
//     tabIndex="-1"
//     style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//   >
//     <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "400px" }}>
//       <div className="modal-content" style={{ fontFamily: "'Roboto', sans-serif", borderRadius: "12px" }}>
//         <div className="modal-header">
//           <h5 className="modal-title fw-bold" style={{ fontSize: "1.25rem" }}>Confirm Deletion</h5>
//           <button
//             type="button"
//             className="btn-close"
//             onClick={onClose}
//             aria-label="Close"
//           ></button>
//         </div>
//         <div className="modal-body text-center" style={{ fontSize: "1rem" }}>
//           <p style={{ fontWeight: "500" }}>Are you sure you want to delete this Pooja?</p>
//         </div>
//         <div className="modal-footer d-flex justify-content-between">
//           <button
//             type="button"
//             className="btn btn-secondary"
//             onClick={onClose}
//             style={{ fontWeight: "600" }}
//           >
//             Cancel
//           </button>
//           <button
//             type="button"
//             className="btn btn-danger"
//             onClick={onConfirm}
//             style={{ fontWeight: "600" }}
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
  
//   );
// };


import React, { useState, useEffect } from "react";
import axios from "axios";
import GetTable from "../dashboard/GetTable";
import RichTextEditor from "react-rte";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import './poojaList.css';

const PoojaList = () => {
  const [poojaData, setPoojaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    pooja_name: "", pooja_category: "", pooja_Samegristatus: false,
    price_withSamagri: "", price_withoutSamagri: "", pooja_image: null,
    short_discription: "", long_discription: RichTextEditor.createEmptyValue()
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [poojaToDelete, setPoojaToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://192.168.1.38:3000/api/pooja/all-pooja", {
      headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8` }
    })
    .then(response => response.data.status === 1 && setPoojaData(response.data.data))
    .catch(error => console.error("Error fetching data:", error))
    .finally(() => setLoading(false));
  }, []);

  const handleInputChange = (e) => setFormData(prevData => ({ ...prevData, [e.target.name]: e.target.value }));
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file?.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
    setFormData(prevData => ({ ...prevData, pooja_image: file }));
  };
  const handleEditorChange = (value, fieldName) => setFormData(prevData => ({ ...prevData, [fieldName]: value }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => 
      data.append(key, key === "short_discription" || key === "long_discription" ? formData[key].toString("html") : formData[key])
    );
    try {
      await axios.post("http://192.168.1.38:3000/api/pooja/create-pooja", data, { 
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8` }
      });
      toast.success("Pooja created successfully!");
      setFormData({ pooja_name: "", pooja_category: "", pooja_Samegristatus: false, price_withSamagri: "", price_withoutSamagri: "", pooja_image: null, short_discription: "", long_discription: RichTextEditor.createEmptyValue() });
    } catch (error) {
      toast.error("Failed to create Pooja. Please try again.");
      console.error("Error creating Pooja:", error);
    }
  };

  const handleEdit = (row) => {
    setFormData({ ...row, long_discription: RichTextEditor.createValueFromString(row.long_discription, 'html') });
    navigate(`/pooja/pooja-update-list/${row._id}`);
  };

  const handleDelete = (id) => {
    setPoojaToDelete(id);
    setShowModal(true);
  };
  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(`http://192.168.1.38:3000/api/pooja/delete-pooja/${poojaToDelete}`, { 
        headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8` }
      });
      if (response.data.status === 1) {
        toast.success("Pooja deleted successfully!");
        setPoojaData(poojaData.filter(item => item._id !== poojaToDelete));
        setShowModal(false);
      } else {
        toast.error("Failed to delete Pooja.");
      }
    } catch (error) {
      toast.error("Error deleting Pooja. Please try again.");
      console.error("Error deleting Pooja:", error);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  const columns = [
    { name: "ID", selector: (row) => row._id },
    { name: "Pooja Name", selector: (row) => row.pooja_name },
    { name: "Category", selector: (row) => row.pooja_category },
    { name: "Price (With Samagri)", selector: (row) => row.price_withSamagri },
    { name: "Price (Without Samagri)", selector: (row) => row.price_withoutSamagri },
    { name: "Image", selector: (row) => row.pooja_image ? <img src={`http://192.168.1.38:3000${row.pooja_image}`} alt={row.pooja_name} className="img-thumbnail" width={50} /> : "N/A" },
    { name: "Short Description", selector: (row) => row.short_discription },
    { name: "Long Description", selector: (row) => row.long_discription },
    { name: "Status", selector: (row) => row.status },
    {
      name: "Action", selector: (row) => (
        <div>
          <button onClick={() => handleEdit(row)} className="btn btn-primary btn-sm me-2">Edit</button>
          <button onClick={() => handleDelete(row._id)} className="btn btn-danger btn-sm">Delete</button>
        </div>
      ), ignoreRowClick: true, allowOverflow: true, button: true
    }
  ];

  return (
    <section>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="card shadow-lg mb-4 border-0">
              <div className="card-header text-center bg-dark text-white">
                <h4 className="text-uppercase font-weight-bold">Add New Pooja</h4>
              </div>
              <div className="card-body bg-light">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Pooja Name</label>
                      <input type="text" className="form-control" name="pooja_name" placeholder="Enter Pooja Name" value={formData.pooja_name} onChange={handleInputChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Samagri Status</label>
                      <input type="checkbox" className="form-check-input" name="pooja_Samegristatus" checked={formData.pooja_Samegristatus} onChange={handleInputChange} />
                      <label className="form-check-label">Include Samagri</label>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Pooja Category</label>
                      <input type="text" className="form-control" name="pooja_category" placeholder="Enter Pooja Category" value={formData.pooja_category} onChange={handleInputChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Price (With Samagri)</label>
                      <input type="number" className="form-control" name="price_withSamagri" placeholder="Enter Price With Samagri" value={formData.price_withSamagri} onChange={handleInputChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Price (Without Samagri)</label>
                      <input type="number" className="form-control" name="price_withoutSamagri" placeholder="Enter Price Without Samagri" value={formData.price_withoutSamagri} onChange={handleInputChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Pooja Image</label>
                      <input type="file" className="form-control" accept="image/*" onChange={handleFileChange} required />
                    </div>
                    {imagePreview && <div className="mb-3"><img src={imagePreview} alt="Preview" className="img-thumbnail" width={100} /></div>}
                    <div className="col-12 mb-3">
                      <label className="form-label">Short Description</label>
                      <textarea className="form-control" name="short_discription" value={formData.short_discription} onChange={handleInputChange} rows="3" required></textarea>
                    </div>
                    <div className="col-12 mb-3">
                      <label className="form-label">Long Description</label>
                      <RichTextEditor value={formData.long_discription} onChange={(value) => handleEditorChange(value, "long_discription")} />
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-success w-100">Add Pooja</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {loading ? <p>Loading...</p> : <GetTable columns={columns} data={poojaData} />}
      </div>
      {showModal && (
        <div className="modal show" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this Pooja?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </section>
  );
};

export default PoojaList;
