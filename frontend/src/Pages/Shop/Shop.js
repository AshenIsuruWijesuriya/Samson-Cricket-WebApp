import React from 'react';
import MainHeader from '../../Common/mainHeader';
import './Shop.css'; // Import your CSS file
import { FaShieldAlt, FaTshirt, FaShoePrints } from 'react-icons/fa';

import batImage1 from '../../assets/images/gripReplacement.jpg'; // Import your bat images
import batImage2 from '../../assets/images/gripReplacement.jpg';
import batImage3 from '../../assets/images/gripReplacement.jpg';
import batImage4 from '../../assets/images/gripReplacement.jpg';

import protectionImage1 from '../../assets/images/gripReplacement.jpg'; // Import your protection images
import protectionImage2 from '../../assets/images/gripReplacement.jpg';
import protectionImage3 from '../../assets/images/gripReplacement.jpg';
import protectionImage4 from '../../assets/images/gripReplacement.jpg';

import merchandiseImage1 from '../../assets/images/gripReplacement.jpg'; // Import your merchandise images
import merchandiseImage2 from '../../assets/images/gripReplacement.jpg';
import merchandiseImage3 from '../../assets/images/gripReplacement.jpg';
import merchandiseImage4 from '../../assets/images/gripReplacement.jpg';

import shoeImage1 from '../../assets/images/gripReplacement.jpg'; // Import your shoe images
import shoeImage2 from '../../assets/images/gripReplacement.jpg';
import shoeImage3 from '../../assets/images/gripReplacement.jpg';
import shoeImage4 from '../../assets/images/gripReplacement.jpg';

const Shop = () => {
    return (
        <div>
            <MainHeader />
            <main className="cricket-shop-content">
                <section className="cricket-shop-section cricket-bats-section">
                    <div className="cricket-shop-section-content">
                        <FaShieldAlt className="cricket-shop-icon" />
                        <h2>Cricket Bats</h2>
                        <p>
                            Explore our wide range of cricket bats, from beginner to professional levels. Find the perfect bat for your playing style.
                        </p>
                        <div className="cricket-shop-images">
                            <img src={batImage1} alt="Cricket Bat 1" />
                            <img src={batImage2} alt="Cricket Bat 2" />
                            <img src={batImage3} alt="Cricket Bat 3" />
                            <img src={batImage4} alt="Cricket Bat 4" />
                        </div>
                        <a href="/shop/bats" className="cricket-shop-button">
                            View Bats
                        </a>
                    </div>
                </section>

                <section className="cricket-shop-section cricket-protections-section">
                    <div className="cricket-shop-section-content">
                        <FaShieldAlt className="cricket-shop-icon" />
                        <h2>Protections & Others</h2>
                        <p>
                            Stay safe on the field with our protective gear and accessories. Helmets, pads, gloves, and more to keep you protected.
                        </p>
                        <div className="cricket-shop-images">
                            <img src={protectionImage1} alt="Protection 1" />
                            <img src={protectionImage2} alt="Protection 2" />
                            <img src={protectionImage3} alt="Protection 3" />
                            <img src={protectionImage4} alt="Protection 4" />
                        </div>
                        <a href="/shop/protections" className="cricket-shop-button">
                            View Protections
                        </a>
                    </div>
                </section>

                <section className="cricket-shop-section cricket-merchandise-section">
                    <div className="cricket-shop-section-content">
                        <FaTshirt className="cricket-shop-icon" />
                        <h2>Merchandise</h2>
                        <p>
                            Show your love for the game with our stylish cricket merchandise. Jerseys, caps, and other apparel for fans and players.
                        </p>
                        <div className="cricket-shop-images">
                            <img src={merchandiseImage1} alt="Merchandise 1" />
                            <img src={merchandiseImage2} alt="Merchandise 2" />
                            <img src={merchandiseImage3} alt="Merchandise 3" />
                            <img src={merchandiseImage4} alt="Merchandise 4" />
                        </div>
                        <a href="/shop/merchandise" className="cricket-shop-button">
                            View Merchandise
                        </a>
                    </div>
                </section>

                <section className="cricket-shop-section cricket-shoes-section">
                    <div className="cricket-shop-section-content">
                        <FaShoePrints className="cricket-shop-icon" />
                        <h2>Shoes</h2>
                        <p>
                            Get the right footwear for your game. Our cricket shoes provide comfort, support, and traction for peak performance.
                        </p>
                        <div className="cricket-shop-images">
                            <img src={shoeImage1} alt="Shoe 1" />
                            <img src={shoeImage2} alt="Shoe 2" />
                            <img src={shoeImage3} alt="Shoe 3" />
                            <img src={shoeImage4} alt="Shoe 4" />
                        </div>
                        <a href="/shop/shoes" className="cricket-shop-button">
                            View Shoes
                        </a>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Shop;