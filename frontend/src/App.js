import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainHeader from './Common/mainHeader'; // Adjust the path as necessary
import Navbar from './Common/Navbar'; // Adjust the path as necessary
import Home from './Pages/Home'; // Your Home component
import Shop from './Pages/Shop/Shop'; // Your Shop component
import Coaching from './Pages/Coaching/Coaching';

const App = () => {
    return (
        <Router>
            <MainHeader />
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/coaching" element={<Coaching />} />
            </Routes>
        </Router>
    );
}

export default App;


