import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import Navbar from './pages/Navbar';

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



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  };

  return (
    <div className="App">
      {/* ye token check karega aur isAuthenticated ko true/false karega */}
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
        {isAuthenticated && <Navbar/>}
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />

        {/* Public routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        {/* Protected routes */}
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />

        <Route path='/khetrent' element={<PrivateRoute element={<Khetrent />} />} />
        <Route path='/warehouse' element={<PrivateRoute element={<Warehouse />} />} />
        <Route path='/directsell' element={<PrivateRoute element={<Directsell />} />} />
        <Route path='/add-crop-listing' element={<PrivateRoute element={<AddCropListing />}/>} />
        <Route path='/soildetection' element={<PrivateRoute element={<Soildetection />} />} />
        <Route path='/watermanagement' element={<PrivateRoute element={<WaterManagement />} />} />
        <Route path='/Machinery' element={<PrivateRoute element={<Machinery />} />} />
        <Route path='/seeds' element={<PrivateRoute element={<Seeds />} />} />
        <Route path='/payafterharvest' element={<PrivateRoute element={<Payafterharvest />} />} />
        <Route path='/personaladvisory' element={<PrivateRoute element={<PersonalAdvisory />} />} />
        <Route path='/transportation' element={<PrivateRoute element={<Transportation />} />} />
        <Route path='/insurance' element={<PrivateRoute element={<Insurance />} />} />
        <Route path='/labour' element={<PrivateRoute element={<Labour />} />} />
        <Route path='/profile' element={<PrivateRoute element={<Profile />} />} />
        <Route path='/Chat'    element={<PrivateRoute element={<Chat/>} />}/>
        <Route path="/khetrent/add" element={<PrivateRoute element={<AddLand/>}/>}/>
        <Route path='/add-warehouse' element={<PrivateRoute element={<AddWarehouse/>}/>}/>
        <Route path='/add-machinery' element={<PrivateRoute element={<AddMachinery/>}/>}/>
        <Route path='/add-seeds' element={<PrivateRoute element={<AddSeeds />}/>} />
        <Route path='/add-transportation'element={<PrivateRoute element={<AddTransportation />} />}   />
        <Route path='/book-soil-test' element={<PrivateRoute element={<BookSoilTest />} />}/>
      </Routes>
    </div>
  );
}

export default App;