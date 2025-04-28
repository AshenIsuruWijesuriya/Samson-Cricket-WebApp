import React, { useState } from "react";
import MainHeader from "../../Common/mainHeader";
import MainFooter from "../../Common/mainFooter";
import RepairForm from "./RepairForm";
import "./Services.css";
import Swal from 'sweetalert2';

const Services = () => {
    const [showForm, setShowForm] = useState(false);
    const [repairRequests, setRepairRequests] = useState([]);
    document.title = 'Services';

    const handleRepairRequestAdded = (newRequest) => {
        setRepairRequests([...repairRequests, newRequest]);
        setShowForm(false);
    };

    const handleRequestRepairClick = () => {
        const token = localStorage.getItem('token');
        if (token) {
            setShowForm(true);
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Login Required',
                text: 'You must be logged in to submit a repair request.',
            }).then(() => {
                window.location.href = '/signin';
            });
        }
    };

    return (
        <div>
            <MainHeader />
            <div className="service-page-wrapper">
                <section className="repair-service-area">
                    <div className="repair-section-layout">
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
                        <div className="repair-info-panel">
                            <h2>How It Works</h2>
                            <p>From submission to delivery, we've got you covered!</p>
                            <ol>
                                <strong><li>Submit your repair request online.</li></strong>
                                <strong><li>Our team will contact you to confirm the details.</li></strong>
                                <strong><li>Send your bat to our workshop for repair.</li></strong>
                                <strong><li>Your bat is carefully repaired with premium materials.</li></strong>
                                <strong><li>Receive your bat in top condition within 7-10 days.</li></strong>
                            </ol>
                        </div>
                    </div>
                </section>

                <section className="repair-service-area">
                    <div className="repair-section-layout">
                        <div className="service-description-text">
                            <h2>Overview</h2>
                            <p>Our repair services ensure that your cricket bat remains in the best condition. Whether it's a handle replacement, minor crack sealing, or weight balancing, our expert team restores your bat to peak performance.</p>
                        </div>
                        <div className="repair-info-panel">
                            <h2>Cost Estimation</h2>
                            <p>The cost depends on the type of damage to your bat.</p>
                            <p>A simple cosmetic repair starts at <strong>LKR 12 000.00</strong>, while a full handle replacement with a complete refurbishment is available for under <strong>LKR 24 000.00</strong>.</p>
                            <p>If your bat cannot be repaired, we’ll offer you a <strong>LKR 10 000.00 discount</strong> toward a new 5★ or higher bat!</p>
                        </div>
                    </div>
                </section>

                <div className="action-button-zone">
                    <button className="initiate-repair-action" onClick={handleRequestRepairClick}>Request Repair</button>
                </div>

                {showForm && (
                    <RepairForm
                        closeForm={() => setShowForm(false)}
                        onRepairRequestAdded={handleRepairRequestAdded}
                    />
                )}
            </div>
            <MainFooter />
        </div>
    );
};

export default Services;