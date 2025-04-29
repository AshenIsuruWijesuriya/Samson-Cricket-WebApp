import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserBookings.css";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// PDF styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#2b6cb0',
    paddingBottom: 20,
  },
  headerLeft: {
    flexDirection: 'column',
  },
  academyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2b6cb0',
    marginBottom: 5,
  },
  academyAddress: {
    fontSize: 10,
    color: '#666',
  },
  invoiceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2d3748',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c5282',
    backgroundColor: '#f7fafc',
    padding: 8,
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  label: {
    width: '40%',
    fontWeight: 'bold',
    color: '#4a5568',
    fontSize: 10,
  },
  value: {
    width: '60%',
    color: '#2d3748',
    fontSize: 10,
  },
  status: {
    marginTop: 10,
    padding: 5,
    borderRadius: 4,
    alignSelf: 'flex-start',
    fontSize: 10,
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
  notes: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f7fafc',
    borderRadius: 4,
  },
  notesTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#4a5568',
  },
  notesContent: {
    fontSize: 10,
    color: '#2d3748',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    fontSize: 8,
    color: '#718096',
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 10,
  },
  invoiceNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2b6cb0',
    marginBottom: 5,
  },
  date: {
    fontSize: 10,
    color: '#718096',
  },
});

// PDF Document Template
const SessionPDF = ({ session }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.academyName}>Samson Cricket Academy</Text>
          <Text style={styles.academyAddress}>
            123 Cricket Lane, Sports City, 12345
          </Text>
          <Text style={styles.academyAddress}>
            Phone: +1 234 567 8900 | Email: info@samsoncricket.com
          </Text>
        </View>
        <View>
          <Text style={styles.invoiceNumber}>Invoice #SCA-{session._id.slice(-6)}</Text>
          <Text style={styles.date}>Date: {new Date().toLocaleDateString()}</Text>
        </View>
      </View>

      <Text style={styles.invoiceTitle}>Coaching Session Invoice</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Session Details</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{new Date(session.preferredDate).toLocaleDateString()}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.value}>{session.preferredTime}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Duration:</Text>
          <Text style={styles.value}>1 Hour</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Status:</Text>
          <Text style={[styles.value, styles[`${session.status}Status`]]}>
            {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Coach Information</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Coach Name:</Text>
          <Text style={styles.value}>{session.coachName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Coach Type:</Text>
          <Text style={styles.value}>{session.coachType}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Details</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Session Fee:</Text>
          <Text style={styles.value}>$50.00</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Payment Status:</Text>
          <Text style={styles.value}>
            {session.status === 'completed' ? 'Paid' : 'Pending'}
          </Text>
        </View>
      </View>

      {session.notes && (
        <View style={styles.notes}>
          <Text style={styles.notesTitle}>Additional Notes</Text>
          <Text style={styles.notesContent}>{session.notes}</Text>
        </View>
      )}

      <View style={styles.footer}>
        <Text>Thank you for choosing Samson Cricket Academy</Text>
        <Text>This is a computer-generated invoice and does not require a signature</Text>
        <Text>Generated on {new Date().toLocaleDateString()}</Text>
      </View>
    </Page>
  </Document>
);

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const api = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchUserEmailAndBookings = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        // 1️⃣ Get user email using userId
        const userRes = await axios.get(`${api}/api/users/${userId}`);
        const userEmail = userRes.data.email;

        // 2️⃣ Get all sessions and filter by user email
        const sessionRes = await axios.get(`${api}/api/coach/sessions`);
        const userSessions = sessionRes.data.filter(
          (session) => session.userEmail === userEmail
        );

        setBookings(userSessions);
      } catch (err) {
        console.error("Error fetching user sessions:", err);
      }
    };

    fetchUserEmailAndBookings();
  }, [api]);

  return (
    <>
    <div className="user-booking-container">
      <h2>Your Coach Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="user-booking-table">
          <thead>
            <tr>
              <th>Coach</th>
              <th>Type</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.coachName}</td>
                <td>{b.coachType}</td>
                <td>{new Date(b.preferredDate).toLocaleDateString()}</td>
                <td>{b.preferredTime}</td>
                <td className={`status-${b.status}`}>{b.status}</td>
                <td>{b.notes || "-"}</td>
                <td>
                  <div className="coach-pdf-download-btn">
                    <PDFDownloadLink 
                      document={<SessionPDF session={b} />} 
                      fileName={`coaching-session-${b._id}.pdf`}
                    >
                      {({ blob, url, loading, error }) => 
                        loading ? 'Generating PDF...' : 'Download PDF'
                      }
                    </PDFDownloadLink>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </>
  );
};

export default UserBookings;
