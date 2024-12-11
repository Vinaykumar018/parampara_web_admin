// // // SliderForm.jsx
// // import React, { useState, useEffect } from "react";
// // import {
// //   CButton,
// //   CModal,
// //   CModalBody,
// //   CModalFooter,
// //   CModalHeader,
// //   CModalTitle,
// // } from '@coreui/react';
// // import { getCategories } from "../Services/sliderApiService";

// // const SliderForm = ({ onSubmit }) => {
// //   const [visible, setVisible] = useState(false);
// //   const [formData, setFormData] = useState({ name: "", image: "", category: "" });
// //   const [categories, setCategories] = useState([]);
// //   const [imagePreview, setImagePreview] = useState(null);
// //   const [loading, setLoading] = useState(true); // Added loading state

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     onSubmit(formData);

// //     // Reset form data and close modal
// //     setFormData({ name: "", image: "", category: "" });
// //     setImagePreview(null); // Clear preview
// //     setVisible(false);
// //   };

// //   useEffect(() => {
// //     const fetchCategoryData = async () => {
// //       try {
// //         const result = await getCategories();
// //         if (result.status === 1) {
// //           console.log(result.data);
// //           setCategories(result.data);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching category data:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchCategoryData();
// //   }, []);

// //   return (
// //     <>
// //       <CButton color="warning" className="text-dark" size="sm" onClick={() => setVisible(!visible)}>
// //         Add Slider
// //       </CButton>
// //       <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
// //         <CModalHeader>
// //           <CModalTitle>Add Slider</CModalTitle>
// //         </CModalHeader>
// //         <form onSubmit={handleSubmit}>
// //           <CModalBody>
// //             <div className="mb-3">
// //               <label className="form-label">Choose Category</label>
// //               <select
// //                 className="form-control form-select"
// //                 value={formData.category}
// //                 onChange={(e) => setFormData({ ...formData, category: e.target.value })}
// //                 required
// //               >
// //                 <option value="" disabled>Select Category</option>
// //                 {categories.map((category) => (
// //                   <option key={category._id} value={category.name}>
// //                     {category.name}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>
// //             <div className="mb-3">
// //               <label className="form-label">Slider Name</label>
// //               <input
// //                 type="text"
// //                 placeholder="Name"
// //                 className="form-control"
// //                 value={formData.name}
// //                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// //                 required
// //               />
// //             </div>
// //             <div className="mb-3">
// //               <label className="form-label">Image</label>
// //               <input
// //                 type="file"
// //                 accept="image/*"
// //                 className="form-control"
// //                 onChange={(e) => {
// //                   const file = e.target.files[0];
// //                   if (file) {
// //                     setFormData({ ...formData, image: file });
// //                     setImagePreview(URL.createObjectURL(file));
// //                   }
// //                 }}
// //                 required
// //               />
// //               {imagePreview && (
// //                 <div className="mt-3">
// //                   <img
// //                     src={imagePreview}
// //                     alt="Image Preview"
// //                     style={{ maxWidth: '20%', height: 'auto' }}
// //                   />
// //                 </div>
// //               )}
// //             </div>
// //           </CModalBody>
// //           <CModalFooter>
// //             <CButton color="danger" className="text-white btn-sm" type="reset" onClick={() => setVisible(false)}>
// //               Close
// //             </CButton>
// //             <CButton color="primary" type="submit" className="text-white btn-sm">
// //               Save
// //             </CButton>
// //           </CModalFooter>
// //         </form>
// //       </CModal>
// //     </>
// //   );
// // };

// // export default SliderForm;


// import React, { useState, useEffect } from "react";
// import {
//   CButton,
//   CModal,
//   CModalBody,
//   CModalFooter,
//   CModalHeader,
//   CModalTitle,
// } from '@coreui/react';
// import { getCategories } from "../Services/sliderApiService";

// const SliderForm = ({ onSubmit }) => {
//   const [visible, setVisible] = useState(false);
//   const [formData, setFormData] = useState({ name: "", images: [], category: "" });
//   const [categories, setCategories] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);

//     setFormData({ name: "", images: [], category: "" });
//     setImagePreviews([]);
//     setVisible(false);
//   };

//   useEffect(() => {
//     const fetchCategoryData = async () => {
//       try {
//         const result = await getCategories();
//         if (result.status === 1) {
//           setCategories(result.data);
//         }
//       } catch (error) {
//         console.error("Error fetching category data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategoryData();
//   }, []);

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     const updatedImages = [...formData.images, ...files];
//     const previews = files.map(file => URL.createObjectURL(file));
    
//     setFormData({ ...formData, images: updatedImages });
//     setImagePreviews([...imagePreviews, ...previews]);
//   };

//   return (
//     <>
//       <CButton color="warning" className="text-dark" size="sm" onClick={() => setVisible(!visible)}>
//         Add Slider
//       </CButton>
//       <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
//         <CModalHeader>
//           <CModalTitle>Add Slider</CModalTitle>
//         </CModalHeader>
//         <form onSubmit={handleSubmit}>
//           <CModalBody>
//             <div className="mb-3">
//               <label className="form-label">Choose Category</label>
//               <select
//                 className="form-control form-select"
//                 value={formData.category}
//                 onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                 required
//               >
//                 <option value="" disabled>Select Category</option>
//                 {categories.map((category) => (
//                   <option key={category._id} value={category.name}>
//                     {category.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Slider Name</label>
//               <input
//                 type="text"
//                 placeholder="Name"
//                 className="form-control"
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Images</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="form-control"
//                 onChange={handleImageChange}
//                 multiple
//                 required
//               />
//               {imagePreviews.length > 0 && (
//                 <div className="mt-3">
//                   {imagePreviews.map((preview, index) => (
//                     <img
//                       key={index}
//                       src={preview}
//                       alt={`Image Preview ${index + 1}`}
//                       style={{ maxWidth: '20%', height: 'auto', marginRight: '10px' }}
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>
//           </CModalBody>
//           <CModalFooter>
//             <CButton color="danger" className="text-white btn-sm" type="reset" onClick={() => setVisible(false)}>
//               Close
//             </CButton>
//             <CButton color="primary" type="submit" className="text-white btn-sm">
//               Save
//             </CButton>
//           </CModalFooter>
//         </form>
//       </CModal>
//     </>
//   );
// };

// export default SliderForm;


import React, { useState, useEffect } from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react';
import { getCategories } from "../Services/sliderApiService";

const SliderForm = ({ onSubmit }) => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", image: "", images: [], category: "" });
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    onSubmit(formData);

    setFormData({ name: "", image: "", images: [], category: "" });
    setImagePreview(null);
    setImagePreviews([]);
    setVisible(false);
  };

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const result = await getCategories();
        if (result.status === 1) {
          setCategories(result.data);
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, []);

  const handleSingleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleMultipleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const updatedImages = [...formData.images, ...files];
    const previews = files.map(file => URL.createObjectURL(file));

    setFormData({ ...formData, images: updatedImages });
    setImagePreviews([...imagePreviews, ...previews]);
  };

  return (
    <>
      <CButton color="warning" className="text-dark" size="sm" onClick={() => setVisible(!visible)}>
        Add Slider
      </CButton>
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Add Slider</CModalTitle>
        </CModalHeader>
        <form onSubmit={handleSubmit}>
          <CModalBody>
            <div className="mb-3">
              <label className="form-label">Choose Category</label>
              <select
                className="form-control form-select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="" disabled>Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Slider Name</label>
              <input
                type="text"
                placeholder="Name"
                className="form-control"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            {/* Single Image Field */}
            <div className="mb-3">
              <label className="form-label">Image</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={handleSingleImageChange}
                required
              />
              {imagePreview && (
                <div className="mt-3">
                  <img
                    src={imagePreview}
                    alt="Image Preview"
                    style={{ maxWidth: '20%', height: 'auto' }}
                  />
                </div>
              )}
            </div>

            {/* Multiple Images Field */}
            <div className="mb-3">
              <label className="form-label">Additional Images</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={handleMultipleImagesChange}
                multiple
              />
              {imagePreviews.length > 0 && (
                <div className="mt-3">
                  {imagePreviews.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`Image Preview ${index + 1}`}
                      style={{ maxWidth: '20%', height: 'auto', marginRight: '10px' }}
                    />
                  ))}
                </div>
              )}
            </div>

          </CModalBody>
          <CModalFooter>
            <CButton color="danger" className="text-white btn-sm" type="reset" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton color="primary" type="submit" className="text-white btn-sm">
              Save
            </CButton>
          </CModalFooter>
        </form>
      </CModal>
    </>
  );
};

export default SliderForm;
