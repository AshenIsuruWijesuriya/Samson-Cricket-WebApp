import React from 'react';
import { BrowserRouter as Router, Route, Routes as RouterRoutes, Navigate } from 'react-router-dom';
import Home from '../Pages/Home';

import SignIn from '../Pages/SignIn';
import SignUp from '../Pages/SignUp';

import Shop from '../Pages/Shop/Shop';
import Coaching from '../Pages/Coaching/Coaching';
import Services from '../Pages/Services/Service';
import Consulting from '../Pages/Consulting/Consulting';

import AdminDashboard from '../Pages/Admin/AdminDashboard';
import ManageUsers from '../Pages/Admin/ManageUsers/ManageUsers';
import ManageInventory from '../Pages/Admin/ManageInventory/ManageInventory';
import CustomerUsers from '../Pages/Admin/ManageUsers/CustomerUsers/CustomerUsers';
import AdminUsers from '../Pages/Admin/ManageUsers/AdminUsers/AdminUsers';

import ServiceManagerDashboard from '../Pages/ServiceManager/ServiceManagerDashboard';

import UserDashboard from '../Pages/UserDashboard/UserDashboard';

import ConsultantDashboard from '../Pages/Consulting/ConsultantDashboard';

import FinanceDashboard from '../Pages/Payment/FinanceDashboard';

import CoachingDashboard from '../Pages/Coaching/CoachingDashbaord/CoachingDashboard';

import BattingConsulting from '../Pages/Consulting/BattingConsulting/BattingConsulting';
import BawlingConsulting from '../Pages/Consulting/BawlingConsulting/BawlingConsulting';
import FieldingConsulting from '../Pages/Consulting/FieldingConsulting/FieldingConsulting';
import PhysicalConsulting from '../Pages/Consulting/PhysicalConsulting/PhysicalConsulting';


const AppRoutes = () => {
    const isAuthenticated = () => {
        return !!localStorage.getItem('token');
    };

    const getUserRole = () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                return payload.role;
            } catch (error) {
                console.error('Error decoding token:', error);
                return null;
            }
        }
        return null;
    };

    const ProtectedRoute = ({ children, roles }) => {
        if (!isAuthenticated()) {
            return <Navigate to="/signIn" />;
        }
        const userRole = getUserRole();
        if (roles && !roles.includes(userRole)) {
            return <Navigate to="/" />;
        }
        return children;
    };

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

                {/* Consulting Home Side */}
                <Route path="/batting-consulting" element={ <BattingConsulting /> }/>
                <Route path="/bawling-consulting" element={<BawlingConsulting />}/>
                <Route path="/fielding-consulting" element={<FieldingConsulting />}/>
                <Route path="/physical-consulting" element={<PhysicalConsulting />}/>

                {/* User Dashboard */}
                <Route
                    path="/userdashboard"
                    element={
                        <ProtectedRoute roles={['Normal']}>
                            <UserDashboard />
                        </ProtectedRoute>
                    }
                />
                {/* Admin Dashboard */}
                <Route
                    path="/admindashboard"
                    element={
                        <ProtectedRoute roles={['Admin']}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admindashboard/manage-users"
                    element={
                        <ProtectedRoute roles={['Admin']}>
                            <ManageUsers />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admindashboard/manage-users/customer-users"
                    element={
                        <ProtectedRoute roles={['Admin']}>
                            <CustomerUsers/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admindashboard/manage-users/admin-users"
                    element={
                        <ProtectedRoute roles={['Admin']}>
                            <AdminUsers/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admindashboard/manage-inventory"
                    element={
                        <ProtectedRoute roles={['Admin']}>
                            <ManageInventory />
                        </ProtectedRoute>
                    }
                />
                {/* Service Manager Dashboard */}
                <Route
                    path="/servicedashboard"
                    element={
                        <ProtectedRoute roles={['ServiceManager']}>
                            <ServiceManagerDashboard />
                        </ProtectedRoute>
                    }
                />
                {/* Consulting Dashboard */}
                <Route
                    path="/consultantdashboard"
                    element={
                        <ProtectedRoute roles={['Consultant']}>
                            <ConsultantDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Finance Dashboard */}
                <Route
                    path="/financedashboard"
                    element={
                        <ProtectedRoute roles={['Finance']}>
                            <FinanceDashboard />
                        </ProtectedRoute>
                    }
                />
                {/* Coaching Dashboard */}
                <Route
                    path="/coachingdashboard"
                    element={
                        <ProtectedRoute roles={['Coach']}>
                            <CoachingDashboard />
                        </ProtectedRoute>
                    }
                />
            </RouterRoutes>
        </Router>
    );
};
export default AppRoutes;