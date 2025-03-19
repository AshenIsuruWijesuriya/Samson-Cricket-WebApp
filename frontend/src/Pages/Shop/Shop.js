import React from 'react';
import MainHeader from '../../Common/mainHeader';
import './Shop.css'; // Import your CSS file
import {FaShieldAlt, FaTshirt, FaShoePrints } from "react-icons/fa";

const Shop = () => {
    return (
        <div>
            <MainHeader />
            <main className="cricket-shop-content">
                <section className="cricket-shop-section cricket-bats-section">
                    <div className="cricket-shop-section-content">
                        <FaShieldAlt className="cricket-shop-icon" />
                        <h2>Cricket Bats</h2>
                        <p>Explore our wide range of cricket bats, from beginner to professional levels. Find the perfect bat for your playing style.</p>
                        <a href="/shop/bats" className="cricket-shop-button">View Bats</a>
                    </div>
                </section>

                <section className="cricket-shop-section cricket-protections-section">
                    <div className="cricket-shop-section-content">
                        <FaShieldAlt className="cricket-shop-icon" />
                        <h2>Protections & Others</h2>
                        <p>Stay safe on the field with our protective gear and accessories. Helmets, pads, gloves, and more to keep you protected.</p>
                        <a href="/shop/protections" className="cricket-shop-button">View Protections</a>
                    </div>
                </section>

                <section className="cricket-shop-section cricket-merchandise-section">
                    <div className="cricket-shop-section-content">
                        <FaTshirt className="cricket-shop-icon" />
                        <h2>Merchandise</h2>
                        <p>Show your love for the game with our stylish cricket merchandise. Jerseys, caps, and other apparel for fans and players.</p>
                        <a href="/shop/merchandise" className="cricket-shop-button">View Merchandise</a>
                    </div>
                </section>

                <section className="cricket-shop-section cricket-shoes-section">
                    <div className="cricket-shop-section-content">
                        <FaShoePrints className="cricket-shop-icon" />
                        <h2>Shoes</h2>
                        <p>Get the right footwear for your game. Our cricket shoes provide comfort, support, and traction for peak performance.</p>
                        <a href="/shop/shoes" className="cricket-shop-button">View Shoes</a>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Shop;