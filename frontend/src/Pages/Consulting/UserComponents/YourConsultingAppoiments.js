import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './YourConsultingAppointments.css';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// PDF styles
const styles = StyleSheet.create({
    page: {
        backgroundColor: '#fff',
        padding: 30,
    },
    header: {
        marginBottom: 30,
        borderBottomWidth: 2,
        borderBottomColor: '#2b6cb0',
        paddingBottom: 10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2b6cb0',
        textAlign: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#2d3748',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    heading: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#2c5282',
    },
    infoContainer: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#f7fafc',
        borderRadius: 5,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    label: {
        width: '40%',
        fontWeight: 'bold',
        color: '#4a5568',
    },
    value: {
        width: '60%',
        color: '#2d3748',
    },
    status: {
        marginTop: 10,
        padding: 5,
        borderRadius: 5,
        alignSelf: 'flex-start',
    },
    pendingStatus: {
        backgroundColor: '#fed7aa',
        color: '#9a3412',
    },
    confirmedStatus: {
        backgroundColor: '#bbf7d0',
        color: '#166534',
    },
    completedStatus: {
        backgroundColor: '#bfdbfe',
        color: '#1e40af',
    },
    footer: {
        marginTop: 30,
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
        paddingTop: 10,
        fontSize: 10,
        textAlign: 'center',
        color: '#718096',
    },
});

// PDF Document Template
const SessionPDF = ({ session }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Samson Cricket Academy</Text>
            </View>
            
            <Text style={styles.title}>Consulting Session Details</Text>
            
            <View style={styles.section}>
                <View style={styles.infoContainer}>
                    <Text style={styles.heading}>Consultant Information</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Name:</Text>
                        <Text style={styles.value}>{session.consultantName}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Specialty:</Text>
                        <Text style={styles.value}>{session.consultantType} Consulting</Text>
                    </View>
                </View>
                
                <View style={styles.infoContainer}>
                    <Text style={styles.heading}>Session Information</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Date:</Text>
                        <Text style={styles.value}>
                            {new Date(session.sessionDate).toLocaleDateString('en-US', { 
                                year: 'numeric', month: 'long', day: 'numeric' 
                            })}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Time:</Text>
                        <Text style={styles.value}>
                            {(() => {
                                const [hours, minutes] = session.sessionTime.split(':');
                                const hour = parseInt(hours);
                                const ampm = hour >= 12 ? 'PM' : 'AM';
                                const formattedHour = hour % 12 || 12;
                                return `${formattedHour}:${minutes} ${ampm}`;
                            })()}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Duration:</Text>
                        <Text style={styles.value}>{session.sessionDuration} minutes</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Status:</Text>
                        <Text 
                            style={[
                                styles.status,
                                session.status === 'pending' ? styles.pendingStatus : 
                                session.status === 'confirmed' ? styles.confirmedStatus : 
                                styles.completedStatus
                            ]}
                        >
                            {session.status === 'pending' ? 'Awaiting Confirmation' : 
                             session.status === 'confirmed' ? 'Confirmed' : 'Completed'}
                        </Text>
                    </View>
                </View>
                
                <View style={styles.infoContainer}>
                    <Text style={styles.heading}>User Information</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Email:</Text>
                        <Text style={styles.value}>{session.userEmail}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Contact:</Text>
                        <Text style={styles.value}>{session.userContact}</Text>
                    </View>
                </View>
            </View>
            
            <Text style={styles.footer}>
                This document is automatically generated by Samson Cricket Academy.
                For any inquiries, please contact our support team.
            </Text>
        </Page>
    </Document>
);

const YourConsultingAppointments = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserSessions = async () => {
            try {
                // Get user info from localStorage
                const userId = localStorage.getItem('userId');
                
                if (!userId) {
                    console.log('No user ID found in localStorage');
                    const testUserId = "67e3a19a9178587fed38fb37";
                    
                    const response = await axios.get(`http://localhost:4000/api/consultants/user-sessions/${testUserId}`);
                    console.log('Fetched sessions:', response.data); 
                    setSessions(response.data);
                    setLoading(false);
                } else {
                    const response = await axios.get(`http://localhost:4000/api/consultants/user-sessions/${userId}`);
                    console.log('Fetched sessions:', response.data); 
                    setSessions(response.data);
                    setLoading(false);
                }
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                console.error('Error fetching sessions:', err);
                toast.error(`Failed to load your appointments: ${err.message}`);
                setLoading(false);
            }
        };

        fetchUserSessions();
    }, []);

    // Filter sessions by status
    const pendingSessions = sessions.filter(session => session.status === 'pending' || session.status === 'requested');
    const confirmedSessions = sessions.filter(session => session.status === 'confirmed');
    const completedSessions = sessions.filter(session => session.status === 'completed');

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    const formatTime = (timeString) => {
        // Format "18:00" to "6:00 PM"
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}:${minutes} ${ampm}`;
    };

    const renderSessionsList = (sessionsList, title) => {
        if (sessionsList.length === 0) {
            return (
                <div className="no-sessions">
                    <p>No {title.toLowerCase()} sessions available</p>
                </div>
            );
        }

        return (
            <div className="sessions-list">
                <h3>{title}</h3>
                <div className="sessions-cards">
                    {sessionsList.map(session => (
                        <div className="session-card" key={session._id}>
                            <h4>{session.consultantName}</h4>
                            <p className="session-type">{session.consultantType} Consulting</p>
                            <p><strong>Date:</strong> {formatDate(session.sessionDate)}</p>
                            <p><strong>Time:</strong> {formatTime(session.sessionTime)}</p>
                            <p><strong>Duration:</strong> {session.sessionDuration} minutes</p>
                            {session.status === 'pending' && (
                                <p className="session-status pending">Awaiting Confirmation</p>
                            )}
                            {session.status === 'confirmed' && (
                                <p className="session-status confirmed">Confirmed</p>
                            )}
                            {session.status === 'completed' && (
                                <p className="session-status completed">Completed</p>
                            )}
                            <div className="pdf-download-btn">
                                <PDFDownloadLink 
                                    document={<SessionPDF session={session} />} 
                                    fileName={`consulting-session-${session._id}.pdf`}
                                >
                                    {({ blob, url, loading, error }) => 
                                        loading ? 'Generating PDF...' : 'Download PDF'
                                    }
                                </PDFDownloadLink>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    if (loading) {
        return <div className="loading">Loading your appointments...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="dashboard-appointments">
            <h2>Your Consulting Appointments</h2>
            
            {renderSessionsList(pendingSessions, "Pending Sessions")}
            {renderSessionsList(confirmedSessions, "Confirmed Sessions")}
            {renderSessionsList(completedSessions, "Completed Sessions")}
            
            {sessions.length === 0 && (
                <div className="no-appointments">
                    <p>You don't have any consulting appointments yet.</p>
                    <a href="/consulting" className="book-now-btn">Book a Consultation</a>
                </div>
            )}
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
};

export default YourConsultingAppointments;