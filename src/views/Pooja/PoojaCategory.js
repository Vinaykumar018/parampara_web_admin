import React, { useState, useEffect } from "react";
import { fetchCategories } from "../Services/poojaApiService";
import PoojaCategoryForm from "./AddPoojaCategory";
import GetTable from "../dashboard/GetTable";

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

  return (
    <section>
      <div className="row justify-content-center">
      <PoojaCategoryForm onCategoryAdded={loadCategories} />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <GetTable data={categoryData} columns={columns} title="Category List" />
      )}
    </section>
  );
};

export default PoojaCategory;
