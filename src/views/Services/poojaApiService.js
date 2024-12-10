// apiService.js
import axios from 'axios';

const BASE_URL = 'https://parampara-admin.vercel.app/api/pooja';
// const BASE_URL='http://192.168.1.36:3000/api/pooja';
const AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';

// Function to fetch all pooja data
export const fetchPoojaData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all-pooja`, {
      headers: {
        Authorization: AUTH_TOKEN,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Pooja data:', error);
    throw error;
  }
};

// Function to create a new pooja
export const createPooja = async (data) => {
  try {
    await axios.post(`${BASE_URL}/create-pooja`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: AUTH_TOKEN,
      },
    });
  } catch (error) {
    console.error('Error creating Pooja:', error);
    throw error;
  }
};

// Function to delete a pooja
export const deletePooja = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete-pooja/${id}`, {
      headers: {
        Authorization: AUTH_TOKEN,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting Pooja:', error);
    throw error;
  }
};



// columns.js
export const columns = [
  { name: "ID", selector: (row) => row._id },
  { name: "Pooja Name", selector: (row) => row.pooja_name },
  { name: "Category", selector: (row) => row.pooja_category },
  { name: "Price (With Samagri)", selector: (row) => row.price_withSamagri },
  { name: "Price (Without Samagri)", selector: (row) => row.price_withoutSamagri },
  {
    name: "Image",
    selector: (row) =>
      row.pooja_image ? (
        <img
          src={`http://192.168.1.38:3000${row.pooja_image}`}
          alt={row.pooja_name}
          className="img-thumbnail"
          width={50}
        />
      ) : (
        "N/A"
      ),
  },
  { name: "Short Description", selector: (row) => row.short_discription },
  { name: "Long Description", selector: (row) => row.long_discription },
  { name: "Status", selector: (row) => row.status },
  {
    name: "Action",
    selector: (row) => (
      <div>
        <button
          onClick={() => handleEdit(row._id)} 
          className="btn btn-primary btn-sm me-2"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(row._id)} 
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];


export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/category`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: AUTH_TOKEN,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const createCategory = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/create-category`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: AUTH_TOKEN,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};