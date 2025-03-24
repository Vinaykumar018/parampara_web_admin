import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_BASE_URL}/user`;

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';

export const fetchUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/all-user`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    if (data.status !== 1) {
      throw new Error(data.message || 'Failed to fetch users');
    }
    return data.data; // Return user list if successful
  } catch (error) {
    throw new Error(error.message || 'Something went wrong');
  }
};

export const createUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/create-user`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        // Remove the Content-Type header for FormData
      },
      body: userData, // Send FormData directly
    });

    const data = await response.json();

    if (data.status !== 1) {
      throw new Error(data.message || 'Failed to create user');
    }
    return data; // Return created user data if successful
  } catch (error) {
    throw new Error(error.message || 'Something went wrong');
  }
};

export const updateUser = async (userId, userData) => {
  console.log(userId,userData)
  try {
    const response = await fetch(`${BASE_URL}/update-user/${userId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        // Remove the Content-Type header for FormData
      },
      body: userData, // Send FormData directly
    });

    const data = await response.json();

    if (data.status !== 1) {
      throw new Error(data.message || 'Failed to update user');
    }
    return data; // Return updated user data if successful
  } catch (error) {
    throw new Error(error.message || 'Something went wrong');
  }
};

export const getUserByID =async(id)=>{


  try {
    const response = await axios.get(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8",
        "Content-Type": "application/json",
      },
    });

    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error.response ? error.response.data : error.message);
  }
}