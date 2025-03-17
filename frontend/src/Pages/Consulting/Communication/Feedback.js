import React, { useState } from "react";
import "./Feedback.css";

const Feedback = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        feedback: "", // Changed "comment" to "feedback" to match the input name
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Feedback submitted:", formData);
        alert("Data was submitted!"); // Display the alert box
        setFormData({ name: "", email: "", feedback: "" }); // Clear the form data
    };

    return (
        <div className='feedbackcontainer'>
            <h2 className='feedbacktitle'>Feedback</h2>
            <div className='feedbackpara'>
                <p>
                    The feedback session in the consulting section provides players with personalized insights and performance analysis.
                    Coaches review strengths, areas for improvement,
                    and suggest actionable strategies. This ensures continuous skill development and refinement.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="feedbackform">
                <div className='feedbackpara2'>
                    <h2>Give your feedback</h2>
                </div>
                <div className="feedbackform-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="feedbackform-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="feedbackform-group">
                    <label htmlFor="feedback">Feedback:</label>
                    <textarea
                        id="feedback"
                        name="feedback"
                        value={formData.feedback}
                        onChange={handleChange}
                        required
                        rows="4"
                        cols="30" // Corrected cols value
                    />
                </div>

                <button type="submit" className="feedbacksubmit-btn">Submit</button>
            </form>
        </div>
    );
};

export default Feedback;