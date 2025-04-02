import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/pandit`;

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';


export const getPanditByID =async(id)=>{


  try {
    const response = await axios.get(`${BASE_URL}/get-pandit/${id}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error.response ? error.response.data : error.message);
  }
}



// {categoryList.map((item, index) => (
//   <span key={item.pooja_id} className='badge bg-dark mx-1'>
//     {item.pooja_name}
//     {index < categoryList.length - 1 && ', '} {/* Add comma except for the last item */}
//   </span>
// ))}