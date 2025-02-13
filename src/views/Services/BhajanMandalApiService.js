// apiService.js
import axios from 'axios';

// const BASE_URL = 'https://parampara-admin.vercel.app/api/pooja';
const BASE_URL = `${import.meta.env.VITE_BASE_URL}/bhajanMandal`;
// const BASE_URL='http://localhost:3005/api/pooja'
const AUTH_TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';

export const createCategory = async (data) => {
  try {
    console.log(`${BASE_URL}/create-category`);
    const response = await axios.post(`${BASE_URL}/create-category`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: AUTH_TOKEN,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/category`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: AUTH_TOKEN,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const deleteBhajanCategory = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete-category/${id}`, {
      headers: {
        Authorization: AUTH_TOKEN,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting Category:', error);
    throw error;
  }
};

export const UpdateBhajanCategory = async (id, updatedData) => {
  console.log(id, updatedData);
  try {
    const response = await axios.put(
      `${BASE_URL}/update-category/${id}`,
      updatedData,
      {
        headers: {
          Authorization: AUTH_TOKEN,
        },
      },
    );
    return response.data; // Return the response data for further use
  } catch (error) {
    console.error('Error updating Pooja:', error);
    throw error; // Rethrow the error to handle it in the calling component
  }
};

export const UpdateBhajanMandalStatus = async ( bhajanCategoryId , newStatus) => {
  try {
    const response = axios.put(`${BASE_URL}/update-category-status`, {
      "bhajanCategoryId":bhajanCategoryId,
      "newStatus":newStatus

    }, {
      headers: {
        Authorization: AUTH_TOKEN,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating Status:', error);
    throw error;
  }
};




export const createBhajanMandal = async (data) => {
  try {
    await axios.post(`${BASE_URL}/create`, data, {
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



export const fetchBhajanMandalData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`, {
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


export const deleteBhajanMandal = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete-bhajan/${id}`, {
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