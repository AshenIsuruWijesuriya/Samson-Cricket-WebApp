import React from 'react';
import { BrowserRouter as Router, Route, Routes as RouterRoutes } from 'react-router-dom';
import Home from '../Pages/Home'; 
import Shop from '../Pages/Shop/Shop'; 
import Coaching from '../Pages/Coaching/Coaching';
import Services from '../Pages/Services/Service';
import SignIn from '../Pages/SignIn';

const AppRoutes = () => {
    return (
        <Router>
            <RouterRoutes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/coaching" element={<Coaching />} />
                <Route path="/services" element={<Services />} />

                <Route path="/signIn" element={<SignIn />} />
            </RouterRoutes>
        </Router>
    );
}

export default AppRoutes;