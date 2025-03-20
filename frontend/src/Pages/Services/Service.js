import React, { useState } from "react";
import MainHeader from "../../Common/mainHeader";
import MainFooter from "../../Common/mainFooter";
import RepairForm from "./RepairForm"; // Import Repair Form Component
import "./Services.css"; // Import CSS file

const Services = () => {
    const [showForm, setShowForm] = useState(false); // State for pop-up form visibility
    const [repairRequests, setRepairRequests] = useState([]); // State to store repair requests

    const handleRepairRequestAdded = (newRequest) => {
        setRepairRequests([...repairRequests, newRequest]);
        setShowForm(false); // Close the form after submission
    };

    return (
        <div>
            <MainHeader />
        <div className="service-page-wrapper">
            {/* Bat Repairs & Restoration Section */}
            <section className="repair-service-area">
                <div className="repair-section-layout">
                    {/* Text on Left */}
                    <div className="service-description-text">
                        <h2>Bat Repairs & Restoration</h2>
                        <p>We bring your cricket bat back to life with expert craftsmanship and top-quality materials.</p>
                        <ul>
                            <li><strong>Handle Replacement:</strong> Replacing broken handles with premium cane.</li>
                            <li><strong>Crack Sealing:</strong> Sealing minor cracks to maintain strength.</li>
                            <li><strong>Weight Adjustment:</strong> Perfectly balancing your bat for optimum performance.</li>
                            <li><strong>General Clean-Up:</strong> Removing dirt and scratches for a polished look.</li>
                        </ul>
                    </div>

                    {/* How It Works on Right */}
                    <div className="repair-info-panel">
                        <h2>How It Works</h2>
                        <p>From submission to delivery, we've got you covered!</p>
                        <ol>
                            <li>Submit your repair request online.</li>
                            <li>Receive a professional evaluation.</li>
                            <li>Your bat is carefully repaired with premium materials.</li>
                            <li>Ready for delivery or pickup.</li>
                        </ol>
                    </div>
                </div>
            </section>

            {/* Overview Section */}
            <section className="repair-service-area">
                <div className="repair-section-layout">
                    {/* Text on Left */}
                    <div className="service-description-text">
                        <h2>Overview</h2>
                        <p>Our repair services ensure that your cricket bat remains in the best condition. Whether it's a handle replacement, minor crack sealing, or weight balancing, our expert team restores your bat to peak performance.</p>
                    </div>

                    {/* Cost Estimation on Right */}
                    <div className="repair-info-panel">
                        <h2>Cost Estimation</h2>
                        <p>The cost depends on the type of damage to your bat.</p>
                        <p>A simple cosmetic repair starts at <strong>£30</strong>, while a full handle replacement with a complete refurbishment is available for under <strong>£60</strong>.</p>
                        <p>If your bat cannot be repaired, we’ll offer you a <strong>£25 discount</strong> toward a new 5★ or higher bat!</p>
                    </div>
                </div>
            </section>

            {/* Bottom Request Repair Button */}
            <div className="action-button-zone">
                <button className="initiate-repair-action" onClick={() => setShowForm(true)}>Request Repair</button>
            </div>

            {/* Render Repair Form */}
            {showForm && (
                <RepairForm
                    closeForm={() => setShowForm(false)}
                    onRepairRequestAdded={handleRepairRequestAdded} // Pass the function
                />
            )}
        </div>
        <MainFooter/>
        </div>
    );
};

export default Services;