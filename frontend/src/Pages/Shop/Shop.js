import React from 'react';
import MainHeader from '../../Common/mainHeader';
import './Shop.css';
import { GiCricketBat, GiAmericanFootballHelmet, GiRunningShoe, GiPoloShirt } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';

import batImage1 from '../../assets/images/bat1.png';
import batImage2 from '../../assets/images/bat2.png';
import batImage3 from '../../assets/images/bat3.png';
import batImage4 from '../../assets/images/bat4.png';

import protectionImage1 from '../../assets/images/helmet.png';
import protectionImage2 from '../../assets/images/pads.png';
import protectionImage3 from '../../assets/images/gloves.png';
import protectionImage4 from '../../assets/images/cricketball.png';

import merchandiseImage1 from '../../assets/images/merch3.png';
import merchandiseImage2 from '../../assets/images/merch1.png';
import merchandiseImage3 from '../../assets/images/merch4.png';
import merchandiseImage4 from '../../assets/images/merch2.png';

import shoeImage1 from '../../assets/images/shoe1.png';
import shoeImage2 from '../../assets/images/shoe2.png';
import shoeImage3 from '../../assets/images/shoe3.png';
import shoeImage4 from '../../assets/images/shoe4.png';

const Shop = () => {
    const navigate = useNavigate();

    const navigateTo = (path) => {
        navigate(path);
    };

    return (
        <div>
            <MainHeader />
            <main className="cricket-shop-content">
                <section
                    className="cricket-shop-section cricket-bats-section"
                    onClick={() => navigateTo('/shop/bats')}
                >
                    <div className="cricket-shop-section-content">
                        <GiCricketBat className="cricket-shop-icon" />
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
                        <p className="browse-more">Click to browse more</p>
                    </div>
                </section>

                <section
                    className="cricket-shop-section cricket-protections-section"
                    onClick={() => navigateTo('/shop/protections')}
                >
                    <div className="cricket-shop-section-content">
                        <GiAmericanFootballHelmet className="cricket-shop-icon" />
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
                         <p className="browse-more">Click to browse more</p>
                    </div>
                </section>

                <section
                    className="cricket-shop-section cricket-merchandise-section"
                    onClick={() => navigateTo('/shop/merchandise')}
                >
                    <div className="cricket-shop-section-content">
                        <GiPoloShirt className="cricket-shop-icon" />
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
                        <p className="browse-more">Click to browse more</p>
                    </div>
                </section>

                <section
                    className="cricket-shop-section cricket-shoes-section"
                    onClick={() => navigateTo('/shop/shoes')}
                >
                    <div className="cricket-shop-section-content">
                        <GiRunningShoe className="cricket-shop-icon" />
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
                         <p className="browse-more">Click to browse more</p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Shop;