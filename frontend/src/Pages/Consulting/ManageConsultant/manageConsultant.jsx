import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

import "../ConsultantDashboard.css";
import "./manageConsultant.css";
import "react-toastify/dist/ReactToastify.css";

import ConsultantTable from "./components/ConsultantTable";

// PDF styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    padding: 30,
  },
  header: {
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: "#2b6cb0",
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2b6cb0",
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#2d3748",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  heading: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#2c5282",
  },
  infoContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f7fafc",
    borderRadius: 5,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    width: "40%",
    fontWeight: "bold",
    color: "#4a5568",
  },
  value: {
    width: "60%",
    color: "#2d3748",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#CBD5E0",
    backgroundColor: "#EDF2F7",
    padding: 8,
    fontWeight: "bold",
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#E2E8F0",
    padding: 8,
  },
  col1: { width: "4%" },
  col2: { width: "22%" }, // User email
  col3: { width: "15%" }, // Contact
  col4: { width: "18%" }, // Date
  col5: { width: "13%" }, // Time
  col6: { width: "12%" }, // Duration
  col7: { width: "16%" }, // Status
  text: {
    fontSize: 9,
  },
  tableText: {
    fontSize: 8,
    textOverflow: "ellipsis",
  },
  status: {
    marginTop: 5,
    padding: 5,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  pendingStatus: {
    backgroundColor: "#fed7aa",
    color: "#9a3412",
  },
  confirmedStatus: {
    backgroundColor: "#bbf7d0",
    color: "#166534",
  },
  completedStatus: {
    backgroundColor: "#bfdbfe",
    color: "#1e40af",
  },
  footer: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 10,
    fontSize: 10,
    textAlign: "center",
    color: "#718096",
  },
});

// PDF Document Template
const SessionsPDF = ({ data }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";

    try {
      const [hours, minutes] = timeString.split(":");
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 || 12;
      return `${formattedHour}:${minutes} ${ampm}`;
    } catch (err) {
      return timeString;
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Samson Cricket Academy</Text>
        </View>

        <Text style={styles.title}>
          Consulting Sessions for {data.consultantName}
        </Text>

        <View style={styles.section}>
          <View style={styles.infoContainer}>
            <Text style={styles.heading}>Consultant Information</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>{data.consultantName}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Specialty:</Text>
              <Text style={styles.value}>
                {data.consultantType.charAt(0).toUpperCase() +
                  data.consultantType.slice(1)}{" "}
                Consulting
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{data.consultantEmail}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Available Times:</Text>
              <Text style={styles.value}>
                {data.availableTimes || "Not specified"}
              </Text>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.heading}>Sessions List</Text>

            {data.sessions && data.sessions.length > 0 ? (
              <>
                <View style={styles.tableHeader}>
                  <Text style={[styles.col1, styles.text]}>#</Text>
                  <Text style={[styles.col2, styles.text]}>User</Text>
                  <Text style={[styles.col3, styles.text]}>Contact</Text>
                  <Text style={[styles.col4, styles.text]}>Date</Text>
                  <Text style={[styles.col5, styles.text]}>Time</Text>
                  <Text style={[styles.col6, styles.text]}>Duration</Text>
                  <Text style={[styles.col7, styles.text]}>Status</Text>
                </View>

                {data.sessions.map((session, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={[styles.col1, styles.tableText]}>
                      {index + 1}
                    </Text>
                    <Text style={[styles.col2, styles.tableText]}>
                      {session.userEmail}
                    </Text>
                    <Text style={[styles.col3, styles.tableText]}>
                      {session.userContact || "N/A"}
                    </Text>
                    <Text style={[styles.col4, styles.tableText]}>
                      {formatDate(session.sessionDate)}
                    </Text>
                    <Text style={[styles.col5, styles.tableText]}>
                      {formatTime(session.sessionTime)}
                    </Text>
                    <Text
                      style={[styles.col6, styles.tableText]}
                    >{`${session.sessionDuration} min`}</Text>
                    <Text style={[styles.col7, styles.tableText]}>
                      {session.status.charAt(0).toUpperCase() +
                        session.status.slice(1)}
                    </Text>
                  </View>
                ))}
              </>
            ) : (
              <Text>No sessions found for this consultant.</Text>
            )}
          </View>
        </View>

        <Text style={styles.footer}>
          Generated on {new Date().toLocaleDateString()} - Samson Cricket
          Academy
        </Text>
      </Page>
    </Document>
  );
};

const ManageConsultant = ({ onBack }) => {
  // State for consultants, loading and error handling
  const [consultants, setConsultants] = useState([]);
  const [isConsultantsLoading, setIsConsultantsLoading] = useState(true);
  const [consultantsError, setConsultantsError] = useState(null);

  // States
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newConsultant, setNewConsultant] = useState({
    firstName: "",
    lastName: "",
    email: "",
    type: "batting",
    availableTimes: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [activeConsultantData, setActiveConsultantData] = useState(null);

  // Fetch consultants from API
  useEffect(() => {
    const fetchConsultants = async () => {
      setIsConsultantsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:4000/api/consultants"
        );

        const formattedConsultants = response.data.map((consultant) => ({
          id: consultant._id,
          name: `${consultant.firstName} ${consultant.lastName}`,
          type:
            consultant.type.charAt(0).toUpperCase() + consultant.type.slice(1),
          availableTimes: consultant.availableTimes,
          email: consultant.email,
        }));

        setConsultants(formattedConsultants);
        setConsultantsError(null);
      } catch (err) {
        console.error("Error fetching consultants:", err);
        setConsultantsError(
          "Failed to load consultants. Please try again later."
        );
        toast.error("Failed to load consultants");
      } finally {
        setIsConsultantsLoading(false);
      }
    };

    fetchConsultants();
  }, []);

  // Filter consultants by type
  const battingConsultants = consultants.filter(
    (c) => c.type.toLowerCase() === "batting"
  );
  const bowlingConsultants = consultants.filter(
    (c) => c.type.toLowerCase() === "bowling"
  );
  const fieldingConsultants = consultants.filter(
    (c) => c.type.toLowerCase() === "fielding"
  );
  const physicalConsultants = consultants.filter(
    (c) => c.type.toLowerCase() === "physical"
  );

  // Handle input changes for new consultant
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewConsultant({
      ...newConsultant,
      [name]: value,
    });
  };

  // Handle edit button click
  const handleEditClick = (consultant) => {
    const nameParts = consultant.name.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");

    // Set form data with consultant details
    setNewConsultant({
      id: consultant.id,
      firstName: firstName,
      lastName: lastName,
      email: consultant.email,
      type: consultant.type.toLowerCase(),
      availableTimes: consultant.availableTimes,
    });

    setIsEditMode(true);
    setShowModal(true);
  };

  // Updated handleSubmit to handle both add and edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let response;
      let successMessage;

      if (isEditMode) {
        // Update existing consultant
        response = await axios.put(
          `http://localhost:4000/api/consultants/${newConsultant.id}`,
          {
            firstName: newConsultant.firstName,
            lastName: newConsultant.lastName,
            email: newConsultant.email,
            type: newConsultant.type,
            availableTimes: newConsultant.availableTimes,
          }
        );

        // Update the local state
        const fullName = `${newConsultant.firstName} ${newConsultant.lastName}`;
        setConsultants(
          consultants.map((c) =>
            c.id === newConsultant.id
              ? {
                  ...c,
                  name: fullName,
                  type:
                    newConsultant.type.charAt(0).toUpperCase() +
                    newConsultant.type.slice(1),
                  availableTimes: newConsultant.availableTimes,
                  email: newConsultant.email,
                }
              : c
          )
        );

        successMessage = `Consultant ${fullName} updated successfully`;
      } else {
        // Add new consultant
        response = await axios.post(
          "http://localhost:4000/api/consultants",
          newConsultant
        );

        // Add new consultant
        const createdConsultant = response.data;
        const fullName = `${createdConsultant.firstName} ${createdConsultant.lastName}`;

        setConsultants([
          ...consultants,
          {
            id: createdConsultant._id,
            name: fullName,
            type:
              createdConsultant.type.charAt(0).toUpperCase() +
              createdConsultant.type.slice(1),
            availableTimes: createdConsultant.availableTimes,
            email: createdConsultant.email,
          },
        ]);

        successMessage = `Consultant ${fullName} added successfully`;
      }

      toast.success(successMessage);
      setShowModal(false);
      setIsEditMode(false);
      setNewConsultant({
        firstName: "",
        lastName: "",
        email: "",
        type: "batting",
        availableTimes: "",
      });
    } catch (err) {
      // Show error toast notification
      toast.error(
        err.response?.data?.message ||
          `Failed to ${isEditMode ? "update" : "add"} consultant`
      );
      console.error(
        `Error ${isEditMode ? "updating" : "adding"} consultant:`,
        err
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Delete consultant
  const handleDeleteConsultant = async (consultantId, consultantName) => {
    try {
      await axios.delete(
        `http://localhost:4000/api/consultants/${consultantId}`
      );
      setConsultants(consultants.filter((c) => c.id !== consultantId));
      toast.success(`Consultant ${consultantName} deleted successfully`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete consultant");
      console.error("Error deleting consultant:", err);
    }
  };

  // Download consultant sessions as PDF
  const handleDownloadSessions = async (consultantId, consultantName) => {
    try {
      setIsConsultantsLoading(true);
      // Fetch consultant details with sessions
      const response = await axios.get(
        `http://localhost:4000/api/consultants/${consultantId}`
      );
      const consultant = response.data;

      if (!consultant.sessions || consultant.sessions.length === 0) {
        toast.info(`No sessions found for ${consultantName}`);
        setIsConsultantsLoading(false);
        return;
      }

      // Store the sessions data for PDF generation
      const sessionData = {
        consultantName: consultantName,
        consultantType: consultant.type,
        consultantEmail: consultant.email,
        availableTimes: consultant.availableTimes,
        sessions: consultant.sessions,
      };

      // Set data and show the PDF modal
      setActiveConsultantData(sessionData);
      setShowPdfModal(true);
    } catch (err) {
      console.error("Error fetching consultant sessions:", err);
      toast.error("Failed to download consultant sessions");
    } finally {
      setIsConsultantsLoading(false);
    }
  };

  // toast notifications
  const handleAddTimeSlot = () => {
    const day = document.getElementById("daySelect").value;
    const start = document.getElementById("startTime").value;
    const end = document.getElementById("endTime").value;

    if (!start || !end) {
      toast.warning("Please select both start and end times");
      return;
    }

    // Convert 24h format to 12h format for display
    const formatTime = (timeStr) => {
      const [hours, minutes] = timeStr.split(":");
      const hour = parseInt(hours);
      return `${hour % 12 || 12}${minutes ? `:${minutes}` : ""} ${
        hour >= 12 ? "PM" : "AM"
      }`;
    };

    const newSchedule = `${day}: ${formatTime(start)}-${formatTime(end)}`;

    setNewConsultant({
      ...newConsultant,
      availableTimes: newConsultant.availableTimes
        ? `${newConsultant.availableTimes}, ${newSchedule}`
        : newSchedule,
    });

    toast.info(`Time slot "${newSchedule}" added`);
  };

  return (
    <div className="content-area consultant-content">
      {/* Top bar with Back and Add buttons */}
      <div className="consultant-topbar">
        <button
          className="consultant-back-dashboard-btn"
          onClick={onBack}
        >
          &#8592; Back to Dashboard
        </button>
        <div className="add-consultant-container">
          <button
            onClick={() => {
              setIsEditMode(false);
              setNewConsultant({
                firstName: "",
                lastName: "",
                email: "",
                type: "batting",
                availableTimes: "",
              });
              setShowModal(true);
            }}
            className="add-consultant-btn"
          >
            Add New Consultant
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {isConsultantsLoading ? (
        <div className="loading-message">Loading consultants...</div>
      ) : consultantsError ? (
        <div className="error-message">{consultantsError}</div>
      ) : (
        <div className="consultant-tables-container">
          <div className="consultant-tables">
            {/* Batting Consultants */}
            <div className="consultant-section">
              <h2>Batting Consultants</h2>
              <ConsultantTable
                consultants={battingConsultants}
                onDelete={handleDeleteConsultant}
                onEdit={handleEditClick}
                onDownloadSessions={handleDownloadSessions}
              />
            </div>

            {/* Bowling Consultants */}
            <div className="consultant-section">
              <h2>Bowling Consultants</h2>
              <ConsultantTable
                consultants={bowlingConsultants}
                onDelete={handleDeleteConsultant}
                onEdit={handleEditClick}
                onDownloadSessions={handleDownloadSessions}
              />
            </div>

            {/* Fielding Consultants */}
            <div className="consultant-section">
              <h2>Fielding Consultants</h2>
              <ConsultantTable
                consultants={fieldingConsultants}
                onDelete={handleDeleteConsultant}
                onEdit={handleEditClick}
                onDownloadSessions={handleDownloadSessions}
              />
            </div>

            {/* Physical Consultants */}
            <div className="consultant-section">
              <h2>Physical Consultants</h2>
              <ConsultantTable
                consultants={physicalConsultants}
                onDelete={handleDeleteConsultant}
                onEdit={handleEditClick}
                onDownloadSessions={handleDownloadSessions}
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal code remains unchanged */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{isEditMode ? "Edit Consultant" : "Add New Consultant"}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="consultant-form">
              <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={newConsultant.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={newConsultant.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newConsultant.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="type">Type:</label>
                <select
                  id="type"
                  name="type"
                  value={newConsultant.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="batting">Batting</option>
                  <option value="bowling">Bowling</option>
                  <option value="fielding">Fielding</option>
                  <option value="physical">Physical</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="availableTimes">Available Times:</label>
                <div className="schedule-container">
                  {/* Current schedules display */}
                  {newConsultant.availableTimes && (
                    <div className="selected-schedules">
                      {newConsultant.availableTimes
                        .split(",")
                        .map((schedule, index) => (
                          <div key={index} className="schedule-item">
                            <span>{schedule.trim()}</span>
                            <button
                              type="button"
                              className="remove-schedule"
                              onClick={() => {
                                const updatedTimes =
                                  newConsultant.availableTimes
                                    .split(",")
                                    .filter((_, i) => i !== index)
                                    .join(",");
                                setNewConsultant({
                                  ...newConsultant,
                                  availableTimes: updatedTimes,
                                });
                              }}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                    </div>
                  )}

                  {/* Schedule selector */}
                  <div className="schedule-selector">
                    <div className="day-selector">
                      <label>Day:</label>
                      <select id="daySelect" className="day-select">
                        <option value="Mon">Monday</option>
                        <option value="Tue">Tuesday</option>
                        <option value="Wed">Wednesday</option>
                        <option value="Thu">Thursday</option>
                        <option value="Fri">Friday</option>
                        <option value="Sat">Saturday</option>
                        <option value="Sun">Sunday</option>
                        <option value="Mon-Fri">Monday-Friday</option>
                        <option value="Sat-Sun">Weekend</option>
                      </select>
                    </div>

                    <div className="time-selector">
                      <label>From:</label>
                      <input
                        type="time"
                        id="startTime"
                        className="time-input"
                      />

                      <label>To:</label>
                      <input type="time" id="endTime" className="time-input" />
                    </div>

                    <button
                      type="button"
                      className="add-time-btn"
                      onClick={handleAddTimeSlot}
                    >
                      Add Time Slot
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isLoading}
                >
                  {isLoading
                    ? isEditMode
                      ? "Updating..."
                      : "Adding..."
                    : isEditMode
                    ? "Update Consultant"
                    : "Add Consultant"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* PDF Download Modal */}
      {showPdfModal && activeConsultantData && (
        <div className="modal-overlay">
          <div className="modal-content pdf-modal">
            <div className="modal-header">
              <h2>Download Sessions Report</h2>
              <button
                className="close-btn"
                onClick={() => setShowPdfModal(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>
                Ready to download sessions for{" "}
                <strong>{activeConsultantData.consultantName}</strong>
              </p>
              <p className="pdf-info">
                This PDF includes all session details for this consultant.
              </p>
              <div className="pdf-download-container">
                <PDFDownloadLink
                  document={<SessionsPDF data={activeConsultantData} />}
                  fileName={`${activeConsultantData.consultantName.replace(
                    /\s+/g,
                    "_"
                  )}_Sessions.pdf`}
                  className="pdf-download-link"
                >
                  {({ blob, url, loading, error }) =>
                    loading ? "Generating PDF..." : "Download PDF Report"
                  }
                </PDFDownloadLink>
              </div>
            </div>
            <div className="form-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowPdfModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageConsultant;
