import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import Navbar from './pages/Navbar';
import { LanguageProvider } from './LanguageContext';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';

import Khetrent from './pages/Khetrent';
import Warehouse from './pages/Warehouse';
import Directsell from './pages/Directsell';
import Soildetection from './pages/Soildetection';
import WaterManagement from './pages/WaterManagement';
import Machinery from './pages/Machinery';
import Seeds from './pages/Seeds';
import Payafterharvest from './pages/Payafterharvest';
import PersonalAdvisory from './pages/PersonalAdvisory';
import Transportation from './pages/Transportation';
import Insurance from './pages/Insurance';
import Labour from './pages/Labour';
// import Profile from './pages/Profile';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import AddSeeds from './pages/AddSeeds';
import RefrshHandler from './RefrshHandler';
import AddLand from './pages/AddLand';
import AddWarehouse from './pages/AddWarehouse';
import AddCropListing from './pages/AddCropListing';
import AddMachinery from './pages/AddMachinery';
import AddTransportation from './pages/AddTransportation';
import BookSoilTest from './pages/BookSoilTest';
import AdminExpertForm from './pages/AdminExpertForm'; 
import AddTubewell from './pages/AddTubewell';


// Routes allowed per role
const ROLE_ROUTES = {
  farmer:   ['/home','/khetrent','/warehouse','/directsell','/add-crop-listing','/soildetection','/watermanagement','/Machinery','/add-machinery','/seeds','/add-seeds','/payafterharvest','/personaladvisory','/transportation','/add-transportation','/insurance','/profile','/Chat','/khetrent/add','/book-soil-test'],
  provider: ['/home','/khetrent','/khetrent/add','/warehouse','/add-warehouse','/Machinery','/add-machinery','/transportation','/add-transportation','/profile','/Chat'],
  buyer:    ['/home','/warehouse','/directsell','/transportation','/profile','/Chat'],
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Redirect to /home if not authenticated
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  // Redirect to /home if role doesn't have access
  const RoleRoute = ({ element, allowedRoles }) => {
    if (!isAuthenticated) return <Navigate to="/login" />;
    const role = localStorage.getItem('userRole') || 'farmer';
    if (!allowedRoles.includes(role)) return <Navigate to="/home" />;
    return element;
  };

  return (
    <LanguageProvider>
    <div className="App">
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />

        {/* Public routes */}
        <Route path='/login'  element={<Login />} />
        <Route path='/signup' element={<Signup />} />



        {/* All-roles protected */}
        <Route path='/home'    element={<PrivateRoute element={<Home />} />} />
        <Route path='/profile' element={<PrivateRoute element={<Profile />} />} />
        <Route path='/Chat'    element={<PrivateRoute element={<Chat />} />} />

        {/* Farmer + Provider */}
        <Route path='/khetrent'     element={<RoleRoute element={<Khetrent />}      allowedRoles={['farmer','provider']} />} />
        <Route path='/khetrent/add' element={<RoleRoute element={<AddLand />}       allowedRoles={['farmer','provider']} />} />
        <Route path='/warehouse'    element={<RoleRoute element={<Warehouse />}     allowedRoles={['farmer','provider','buyer']} />} />
        <Route path='/add-warehouse'element={<RoleRoute element={<AddWarehouse />}  allowedRoles={['farmer','provider']} />} />
        <Route path='/Machinery'    element={<RoleRoute element={<Machinery />}     allowedRoles={['farmer','provider']} />} />
        <Route path='/add-machinery'element={<RoleRoute element={<AddMachinery />}  allowedRoles={['farmer','provider']} />} />
        <Route path='/transportation'    element={<RoleRoute element={<Transportation />}    allowedRoles={['farmer','provider','buyer']} />} />
        <Route path='/add-transportation'element={<RoleRoute element={<AddTransportation />} allowedRoles={['farmer','provider']} />} />

        {/* Farmer + Buyer */}
        <Route path='/directsell'      element={<RoleRoute element={<Directsell />}     allowedRoles={['farmer','buyer']} />} />
        <Route path='/add-crop-listing'element={<RoleRoute element={<AddCropListing />} allowedRoles={['farmer','buyer']} />} />

        {/* Farmer only */}
        <Route path='/soildetection'   element={<RoleRoute element={<Soildetection />}   allowedRoles={['farmer']} />} />
        <Route path='/book-soil-test'  element={<RoleRoute element={<BookSoilTest />}    allowedRoles={['farmer']} />} />
        <Route path='/watermanagement' element={<RoleRoute element={<WaterManagement />} allowedRoles={['farmer']} />} />
        <Route path='/seeds'           element={<RoleRoute element={<Seeds />}           allowedRoles={['farmer']} />} />
        <Route path='/add-seeds'       element={<RoleRoute element={<AddSeeds />}        allowedRoles={['farmer']} />} />
        <Route path='/payafterharvest' element={<RoleRoute element={<Payafterharvest />} allowedRoles={['farmer']} />} />
        <Route path='/personaladvisory'element={<RoleRoute element={<PersonalAdvisory />}allowedRoles={['farmer']} />} />
        <Route path='/insurance'       element={<RoleRoute element={<Insurance />}       allowedRoles={['farmer']} />} />
        <Route path='/labour'          element={<RoleRoute element={<Labour />}          allowedRoles={['farmer']} />} />
        <Route path='/add-tubewell' element={<PrivateRoute element={<AddTubewell />} />} />
        <Route path='/admin-experts' element={<AdminExpertForm />} />

      </Routes>
    </div>
    </LanguageProvider>
  );
}

export default App;