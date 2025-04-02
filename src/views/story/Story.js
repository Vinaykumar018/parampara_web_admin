import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import AddStory from "./AddStory";

const Story = () => {
  return (
    <div>
      <ToastContainer /> 
      <div className="card shadow-lg mb-4 border-0">
        <div className="card-header bg-dark text-white py-2">
          <div className="d-flex align-items-center justify-content-between">
            <h6 className="mb-0">Story</h6>
            <AddStory/>
          </div>
        </div>
        <div className="card-body ">

        </div>
      </div>
      
    </div>
    
  );
};

export default Story;


