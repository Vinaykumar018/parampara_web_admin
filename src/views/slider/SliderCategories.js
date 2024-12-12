
//imports 
import React, { useState, useEffect } from "react";
import { CButton, CSpinner } from "@coreui/react";
import GetTable from "../dashboard/GetTable";
import { getCategories,createCategory } from "../Services/sliderApiCategoryService";
import SliderFormCategory from "./SliderFormCategory";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; 
import { deleteSliderCategory } from "../Services/sliderApiService";
import UpdateSliderCategoryForm from "./UpdateSliderCategoryForm";



const SliderCategoryList = () => {

  //same state syntax
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
 const [showModal, setShowModal] = useState(false);
 const [editModalVisible, setEditModalVisible] = useState(false);
 //for fetching data nd call from service api
    const fetchCategoryData = async () => {
      setLoading(true);
      try {
        const result = await getCategories();
        if (result.status === 1) {
          setCategoryData(result.data);
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
      fetchCategoryData();
    }, []);


    //form submit pass and receive data
  const handleFormSubmit = async (formData) => {
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("image", formData.image);
      form.append("category", formData.category);

      const result = await createCategory(form);
      if (result.status === 1) {
       
        toast.success("Slider category created successfully!");
        fetchCategoryData()
       
      } else {
        toast.error("Failed to create Slider category."); 
      }
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("An error occurred while creating the Slider category."); 
    }
  };

  const [sliderToDelete,setSliderToDelete]=useState()
     const handleDelete = (id) => {
      
        
         setSliderToDelete(id);
        setShowModal(true);
      };
      const handleCloseModal = () => {
        setShowModal(false);
      };
      const handleConfirmDelete = async () => {
        try {
          
          const response = await deleteSliderCategory(sliderToDelete);
          if (response.status === 1) {
            toast.success("Slider Category deleted successfully!");
            setCategoryData(categoryData.filter((item) => item._id !== sliderToDelete));
            setShowModal(false);
          } else {
            toast.error("Failed to delete Pooja.");
          }
        } catch (error) {
          toast.error("Error deleting Pooja. Please try again.");
          console.error("Error deleting Pooja:", error);
        }
      };

      const handleEdit = (id, name, image) => {
        // console.log({ id, name, short_discription, category,pooja_image });
      
        console.log(id,name,image)
        // setEditModalVisible(true);
       // Show the modal
      };


  //table columns
  const columns = [
    { name: "S No.", selector: (row, index) => index + 1 },
    { name: "Slider Cateogry", selector: (row) => row.name },
    {
      name: "Slider Category Image",
      selector: (row) =>
        row.image ? (
          <img src={`${row.image}`} alt={row.name} width={50} height={30} />
        ) : (
          "N/A"
        ),
    },
    {
      name: "Action",
      selector: (row) => (
        <div>
          <CButton color="btn btn-danger btn-sm text-white"  onClick={() => handleDelete(row._id)}>Delete</CButton>
          <CButton color="btn btn-primary btn-sm me-2"  onClick={() => handleEdit(row._id,row.name,row.image )}>Edit</CButton>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div>
      <div className="card shadow-lg mb-4 border-0">
        <div className="card-header bg-dark text-white py-2">
          <div className="d-flex align-items-center justify-content-between">
            <h6 className="mb-0">Slider Category List</h6>
            <SliderFormCategory onSubmit={handleFormSubmit} />
          </div>
        </div>
        {loading ? (
          <div className="justify-content-center d-flex p-5">
            <CSpinner color="primary" />
          </div>
        ) : (
          <GetTable data={categoryData} columns={columns} title="Category List" />
        )}
      </div>
      {editModalVisible && (
        <UpdateSliderCategoryForm
      
          initialData={categoryToEdit}
          onClose={() => setEditModalVisible(false)}
        />
      )}

      <ConfirmDeleteModal
        show={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default SliderCategoryList;


const ConfirmDeleteModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div
      className="modal show"
      tabIndex="-1"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "400px" }}>
        <div className="modal-content" style={{ fontFamily: "'Roboto', sans-serif", borderRadius: "12px" }}>
          <div className="modal-header">
            <h5 className="modal-title fw-bold" style={{ fontSize: "1.25rem" }}>Confirm Deletion</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body text-center" style={{ fontSize: "1rem" }}>
            <p style={{ fontWeight: "500" }}>Are you sure you want to delete this Slider ?</p>
          </div>
          <div className="modal-footer d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              style={{ fontWeight: "600" }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger text-white"
              onClick={onConfirm}
              style={{ fontWeight: "600" }}
            >
              Delete
            </button>
          </div>
         
        </div>
      </div>
    </div>
  );
};