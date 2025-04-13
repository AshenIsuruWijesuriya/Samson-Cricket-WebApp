import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import './MyServices.css';
import { FaPhoneAlt } from 'react-icons/fa';

const MyServices = () => {
    const [services, setServices] = useState([]);
    const api = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const userId = decoded.id;

                fetch(`${api}/api/services/user-repair/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Failed to fetch services');
                        }
                        return response.json();
                    })
                    .then((data) => {
                        setServices(data);
                    })
                    .catch((error) => {
                        console.error('Error fetching services:', error);
                    });
            } catch (error) {
                console.error('Error decoding token or fetching services:', error);
            }
        }
    }, [api]);

    const handleContact = (service) => {
        console.log(`Contacting about service: ${service._id}`);
        // Implement your contact logic here
    };

    return (
        <div>
            <div className="services-container">
                <h2>Your Service Requests</h2>
                {services.length === 0 ? (
                    <p>No service requests found.</p>
                ) : (
                    <table className="services-table">
                        <thead>
                            <tr>
                                <th>Repair Type</th>
                                <th>Details</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Contact</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service) => (
                                <tr key={service._id}>
                                    <td>{service.repairType}</td>
                                    <td>{service.details}</td>
                                    <td>{service.status}</td>
                                    <td>{new Date(service.createdAt).toLocaleString()}</td>
                                    <td>
                                        <button className="contact-button" onClick={() => handleContact(service)}>
                                            <FaPhoneAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default MyServices;