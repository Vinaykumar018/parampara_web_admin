import React, { useState, useEffect } from "react";
import { fetchCategories } from "../Services/poojaApiService";
import PoojaCategoryForm from "./AddPoojaCategory";
import GetTable from "../dashboard/GetTable";
import { CSpinner} from '@coreui/react'

const PoojaCategory = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const result = await fetchCategories();
      if (result.status === 1) {
        setCategoryData(result.data);
      }
    } catch (error) {
      console.error("Error loading categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);
  const columns = [
    { name: "S No.",selector: (row,index) => index+1},
    { name: "ID", selector: (row) => row._id },
    { name: "Category", selector: (row) => row.category },
    {
      name: "Image",
      selector: (row) =>
        row.pooja_image ? (
          <img src={row.pooja_image} alt={row.category} width={50} height={30} />
        ) : (
          "N/A"
        ),
    },
    { name: "Short Description", selector: (row) => row.short_discription },
    { name: "Long Description", selector: (row) => row.long_discription },
    { name: "Status", selector: (row) => row.status },
  ];
  const VerticallyCentered = () => {
    return (
      <>
        <PoojaCategoryForm onCategoryAdded={loadCategories} />        
      </>
    )
  }
  return (
    <section>
      <div className="row justify-content-center">
      <div classNmae="col-12">
      <div className="card shadow-lg mb-4 border-0">
        <div class="card-header bg-dark text-white py-2">
          <div className="d-flex align-items-center justify-content-between">
            <h6 className="mb-0">Pooja Category</h6>
            <div>{VerticallyCentered()}</div>
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
      </div>
      </div>
    </section>
  );
};

export default PoojaCategory;
