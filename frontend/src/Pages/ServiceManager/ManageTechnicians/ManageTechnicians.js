import React, { useState, useEffect } from "react";
import "./ManageTechnicians.css";
import ServiceManagerHeader from "../ServicemanagerHeader/ServiceManagerHeader";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const ManageTechnicians = () => {
    const initialTechnicians = [
        {
            _id: "tech1",
            name: "Priya Sharma",
            phoneNumber: "077-1234567",
            description: "Experienced in handling complex mechanical repairs.",
            repairTypes: ["Handle Replacement", "Weight Adjustment"],
        },
        {
            _id: "tech2",
            name: "Nuwan Perera",
            phoneNumber: "071-9876543",
            description: "Specializes in electronic diagnostics and repairs.",
            repairTypes: ["Crack Sealing"],
        },
        {
            _id: "tech3",
            name: "Samantha Silva",
            phoneNumber: "076-5551212",
            description: "Proficient in cosmetic repairs and refurbishments.",
            repairTypes: ["Grip & Sticker Replacement", "General Clean-Up"],
        },
        {
            _id: "tech4",
            name: "Imran Khan",
            phoneNumber: "070-1122334",
            description: "Expert in hydraulic and pneumatic systems.",
            repairTypes: [],
        },
        {
            _id: "tech5",
            name: "Dilini Weerasinghe",
            phoneNumber: "072-8899001",
            description: "Skilled in general maintenance and cleaning services.",
            repairTypes: ["General Clean-Up"],
        },
        {
            _id: "tech6",
            name: "Rajiv Fernando",
            phoneNumber: "075-3216549",
            description: "Certified in advanced welding techniques.",
            repairTypes: ["Handle Replacement"],
        },
        {
            _id: "tech7",
            name: "Nimali Rajapakse",
            phoneNumber: "078-7778889",
            description: "Experienced with precision alignment and calibration.",
            repairTypes: ["Weight Adjustment"],
        },
        {
            _id: "tech8",
            name: "Chamara De Silva",
            phoneNumber: "077-4455667",
            description: "Specializes in troubleshooting complex system failures.",
            repairTypes: ["Crack Sealing"],
        },
        {
            _id: "tech9",
            name: "Gayani Perera",
            phoneNumber: "071-6677889",
            description: "Proficient in surface preparation and finishing.",
            repairTypes: ["Grip & Sticker Replacement"],
        },
        {
            _id: "tech10",
            name: "Thusitha Bandara",
            phoneNumber: "076-9900112",
            description: "Expert in routine maintenance and inspections.",
            repairTypes: ["General Clean-Up"],
        },
    ];
    const [technicians, setTechnicians] = useState(initialTechnicians);
    const [repairTypes] = useState([
        "Handle Replacement",
        "Crack Sealing",
        "Weight Adjustment",
        "General Clean-Up",
        "Grip & Sticker Replacement",
    ]);
    const [selectedRepairType, setSelectedRepairType] = useState("");

    useEffect(() => {
        if (selectedRepairType) {
            const filteredTechnicians = initialTechnicians.filter((tech) =>
                tech.repairTypes.includes(selectedRepairType)
            );
            setTechnicians(filteredTechnicians);
        } else {
            setTechnicians(initialTechnicians);
        }
    }, [selectedRepairType, initialTechnicians]);

    const downloadTechnicianPDF = () => {
        const doc = new jsPDF();
        doc.text("Technician Details Summary", 10, 10);

        const tableColumn = ["Name", "Phone Number", "Description", "Repair Types"];
        const tableRows = [];

        technicians.forEach((technician) => {
            const technicianData = [
                technician.name,
                technician.phoneNumber || "N/A",
                technician.description,
                technician.repairTypes.join(", ") || "None",
            ];
            tableRows.push(technicianData);
        });

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.save("technician_summary.pdf");
    };

    const handleRepairTypeChange = (event) => {
        setSelectedRepairType(event.target.value);
    };

    return (
        <div className="manage-technicians">
            <ServiceManagerHeader />
            <h1>Technician Details</h1>

            <div className="button-container">
                <button className="download-button" onClick={downloadTechnicianPDF}>
                    Download PDF Summary
                </button>
            </div>

            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Filter Technicians by Repair Type</h2>
                </div>
                <div className="card-content">
                    <select value={selectedRepairType} onChange={handleRepairTypeChange}>
                        <option value="">All Repair Types</option>
                        {repairTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="card mt-4">
                <div className="card-header">
                    <h2 className="card-title">Technician Information</h2>
                    <p className="card-description">View details of {selectedRepairType ? `technicians skilled in ${selectedRepairType}` : "all technicians"}.</p>
                </div>
                <div className="card-content">
                    {technicians.length === 0 ? (
                        <p>{selectedRepairType ? `No technicians found for ${selectedRepairType}.` : "No technicians available."}</p>
                    ) : (
                        <div className="rounded-md border">
                            <table className="technician-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Phone Number</th>
                                        <th>Description</th>
                                        <th>Assigned Repair Types</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {technicians.map((technician) => (
                                        <tr key={technician._id}>
                                            <td>{technician.name}</td>
                                            <td>{technician.phoneNumber || "N/A"}</td>
                                            <td>{technician.description}</td>
                                            <td>{technician.repairTypes.join(", ") || "None"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageTechnicians;