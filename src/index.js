import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import 'core-js';

import App from './App';
import store from './store/rootReducer' // Import the new combined store

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);



// export default Users;
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUsers } from '../../slices/userSlice'; // Adjust the import path accordingly
// import GetTable from '../dashboard/GetTable';

// const Users = () => {
//   const dispatch = useDispatch();

//   // Get data from Redux store
//   const { users, status, error } = useSelector((state) => state.users);

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchUsers());
//     }
//   }, [status, dispatch]);

//   // Log the response (users data) once it has been updated in the Redux store
//   useEffect(() => {
//     if (status === 'succeeded') {
//       console.log('API Response:', users); // Log the users data
//     }
//   }, [status, users]);

//   const userColumns = [
//     { name: 'Name', selector: (row) => row.name, sortable: true },
//     { name: 'Phone', selector: (row) => row.phone },
//     { name: 'Email', selector: (row) => row.email },
//   ];

//   return (
//     <div className="container-fluid">
//       <div className="text-end my-4">
//         <button className="btn btn-primary btn-sm">
//           Add User
//         </button>
//       </div>

//       {/* Loading or Error Messages */}
//       {status === 'loading' && <p>Loading users...</p>}
//       {status === 'failed' && <p>Error: {error}</p>}

//       {/* Table */}
//       {status === 'succeeded' && (
//         <GetTable data={users} columns={userColumns} title="User Contact Information" />
//       )}
//     </div>
//   );
// };

// export default Users;
