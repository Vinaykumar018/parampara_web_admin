// import React, { Suspense, useEffect } from 'react'
// import { HashRouter, Route, Routes } from 'react-router-dom'
// import { useSelector } from 'react-redux'

// import { CSpinner, useColorModes } from '@coreui/react'
// import './scss/style.scss'

// // Containers
// const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// // Pages
// const Login = React.lazy(() => import('./views/pages/login/Login'))
// const Register = React.lazy(() => import('./views/pages/register/Register'))
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

// const App = () => {
//   const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
//   const storedTheme = useSelector((state) => state.theme)

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.href.split('?')[1])
//     const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
//     if (theme) {
//       setColorMode(theme)
//     }

//     if (isColorModeSet()) {
//       return
//     }

//     setColorMode(storedTheme)
//   }, []) // eslint-disable-line react-hooks/exhaustive-deps

//   return (
//     <HashRouter>
//       <Suspense
//         fallback={
//           <div className="pt-3 text-center">
//             <CSpinner color="primary" variant="grow" />
//           </div>
//         }
//       >
//         <Routes>
//           <Route exact path="/login" name="Login Page" element={<Login />} />
//           <Route exact path="/register" name="Register Page" element={<Register />} />
//           <Route exact path="/404" name="Page 404" element={<Page404 />} />
//           <Route exact path="/500" name="Page 500" element={<Page500 />} />
//           <Route path="*" name="Home" element={<DefaultLayout />} />
//         </Routes>
//       </Suspense>
//     </HashRouter>
//   )
// }

// export default App


import React, { Suspense, useEffect } from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { fetchCategories } from './views/Services/BhajanMandalApiService';
import { fetchCategories as fetchCategoriesPooja } from './views/Services/poojaApiService';

import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import { CSpinner, useColorModes } from '@coreui/react';

import './scss/style.scss';
import { useState } from 'react';

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  return isLoggedIn === 'true' ? element : <Navigate to="/login" />;
};

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme');



 const { setGlobalContextBhajanMandalCategoryData,setGlobalContextPoojaCategoryData } = useContext(AppContext);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1]);
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0];
    if (theme) {
      setColorMode(theme);
    }

    if (isColorModeSet()) {
      return;
    }

    setColorMode(storedTheme);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps




  const loadCategories = async () => {
   

      
      try {
        const result = await fetchCategories();
        if (result.status === 1) {
          setGlobalContextBhajanMandalCategoryData(result.data);
          console.log(result.data)
        }
      } catch (error) {
        console.error('Error loading categories:', error);
      } 

      try {
        const result = await fetchCategoriesPooja();
        if (result.status === 1) {
          setGlobalContextPoojaCategoryData(result.data);
          
        }
      } catch (error) {
        console.error('Error loading categories:', error);
      } 
    };
  
    useEffect(() => {
      loadCategories();
    }, []);
    console.log("home page load")
   

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          {/* Public Routes */}
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />

          {/* Protected Routes */}
          <Route
            path="*"
            name="Home"
            element={<ProtectedRoute element={<DefaultLayout />} />}
          />
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

export default App;

