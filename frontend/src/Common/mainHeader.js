import React from "react";

import './mainHeader.css'

const MainHeader = () => {
    return (
        <header>
            <ul>
                <li>
                    <img 
                        src="path_to_your_image.jpg" // Replace with the actual path to your image
                        alt="Samson Cricket"
                        style={{ width: '100px', height: 'auto' }} // Adjust the size as needed
                    />
                    <h1>Samson Cricket</h1>
                </li>
            </ul>
        </header>
    );
}

export default MainHeader;