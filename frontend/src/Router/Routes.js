import React from 'react';
import { BrowserRouter as Router, Route, Routes as RouterRoutes } from 'react-router-dom';
import Home from '../Pages/Home'; 
import Shop from '../Pages/Shop/Shop'; 
import Coaching from '../Pages/Coaching/Coaching';
import Services from '../Pages/Services/Service';

import SignIn from '../Pages/SignIn';
import SignUp from '../Pages/SignUp';

import Consulting from '../Pages/Consulting/Consulting';
import AdminDashboard from '../Pages/Admin/AdminDashboard';
import ManageUsers from '../Pages/Admin/ManageUsers/ManageUsers';
import ManageInventory from '../Pages/Admin/ManageInventory/ManageInventory';

import ServiceManagerDashboard from '../Pages/ServiceManager/ServiceManagerDashboard';

import UserDashboard from '../Pages/UserDashboard/UserDashboard';

import ConsultantDashboard from '../Pages/Consulting/ConsultantDashboard';
import BookSessions from '../Pages/Consulting/BookSessions/BookSessions';
import BattingConsulting from '../Pages/Consulting/BattingConsulting/BattingConsulting';


const AppRoutes = () => {
    return (
        <Router>
            <RouterRoutes>

                {/* Homepage */}
                <Route path="/" element={<Home />} />
                {/* Navbar */}
                <Route path="/shop" element={<Shop />} />
                <Route path="/services" element={<Services />} />
                <Route path="/coaching" element={<Coaching />} />
                <Route path="/consulting" element={<Consulting />} />

                {/* Sign In & Sign Up */}
                <Route path="/signIn" element={<SignIn />} />
                <Route path="/signUp" element={<SignUp />} />

                {/* User Dashboard */}
                <Route path="/userdashboard" element={<UserDashboard />} />

                {/* Admin Dashboard */}
                <Route path="/admindashboard" element={<AdminDashboard />} />
                <Route path="/admindashboard/manage-users" element={<ManageUsers />} />
                <Route path="/admindashboard/manage-inventory" element={<ManageInventory />} />

                {/* Service Manager Dashboard */}
                <Route path="/servicedashboard" element={<ServiceManagerDashboard />} />

                {/* Consulting Dashboard */}
                <Route path="/consultantdashboard" element={<ConsultantDashboard />} />
                <Route path="/consultantdashboard/book-sessions" element={<BookSessions/>} />
                <Route path="/batting-consulting" element={<BattingConsulting/>} />



            </RouterRoutes>
        </Router>
    );
}

export default AppRoutes;