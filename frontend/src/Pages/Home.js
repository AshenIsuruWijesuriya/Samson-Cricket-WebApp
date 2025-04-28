import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainHeader from '../Common/mainHeader';
import './Home.css';  // Keep this for general Home.css styles
import shopImage from '../assets/images/shophome.png';
import coachingImage from '../assets/images/coaching.png';
import servicesImage from '../assets/images/servhome.jpeg';
import consultingImage from '../assets/images/consulthome.png';
import MainFooter from '../Common/mainFooter';

// New CSS file (Home.module.css - create this) for more specific styling
import styles from './Home.module.css';

const Home = () => {
    const [bats, setBats] = useState([]);
    const [shoes, setShoes] = useState([]);
    const [protection, setProtection] = useState([]);
    const [merchandise, setMerchandise] = useState([]);
    const api = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        document.title = 'Samson Cricket';

        const fetchData = async (endpoint, setter, limit = 5) => {
            try {
                const response = await axios.get(`${api}/api/${endpoint}`);
                setter(response.data.slice(0, limit));
            } catch (error) {
                console.error(`Error fetching ${endpoint}:`, error);
            }
        };

        fetchData('bats', setBats);
        fetchData('shoes', setShoes);
        fetchData('protection', setProtection);
        fetchData('merch', setMerchandise);

    }, [api]);

    return (
        <div>
            <MainHeader />
            <main className={styles.homeContent}>
                <section className={styles.homeSection + ' ' + styles.shopSection}>
                    <div className={styles.sectionContent}>
                        <img src={shopImage} alt="Shop" className={styles.sectionImage} />
                        <div className={styles.sectionText}>
                            <h2>Shop Our Premium Cricket Gear</h2>
                            <p>Discover a wide range of high-quality cricket bats, balls, protective gear, and accessories. Gear up for your next match with the best equipment.</p>
                            <a href="/shop" className={styles.sectionButton}>Explore Shop</a>
                        </div>
                    </div>
                </section>

                {/* Preview Bats Section */}
                <section className={styles.homeSection + ' ' + styles.previewSection}>
                    <div className={styles.previewContent}>
                        <h2 className={styles.previewTitle}>Featured Bats</h2>
                        <div className={styles.previewGrid}>
                            {bats.map((bat) => (
                                <div key={bat._id} className={styles.previewItem}>
                                    <div className={styles.previewImageContainer}>
                                        {bat.images && bat.images.length > 0 && (
                                            <img
                                                src={`${api}/uploads/${bat.images[0]}`}
                                                alt={bat.model}
                                                className={styles.previewImage}
                                            />
                                        )}
                                    </div>
                                    <div className={styles.previewDetails}>
                                        <h3>{bat.brand} {bat.model}</h3>
                                        <p>LKR {bat.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <a href="/shop/bats" className={styles.sectionButton}>View All Bats</a>
                    </div>
                </section>

                <section className={styles.homeSection + ' ' + styles.coachingSection}>
                    <div className={styles.sectionContent}>
                        <div className={styles.sectionText}>
                            <h2>Expert Cricket Coaching</h2>
                            <p>Enhance your skills with our professional coaching programs. Whether you're a beginner or an advanced player, our coaches will help you reach your full potential.</p>
                            <a href="/coaching" className={styles.sectionButton}>Learn More</a>
                        </div>
                        <img src={coachingImage} alt="Coaching" className={styles.sectionImage} />
                    </div>
                </section>

                {/* Preview Shoes Section */}
                <section className={styles.homeSection + ' ' + styles.previewSection}>
                    <div className={styles.previewContent}>
                        <h2 className={styles.previewTitle}>Featured Shoes</h2>
                        <div className={styles.previewGrid}>
                            {shoes.map((shoe) => (
                                <div key={shoe._id} className={styles.previewItem}>
                                    <div className={styles.previewImageContainer}>
                                        {shoe.images && shoe.images.length > 0 && (
                                            <img
                                                src={`${api}/uploads/${shoe.images[0]}`}
                                                alt={shoe.model}
                                                className={styles.previewImage}
                                            />
                                        )}
                                    </div>
                                    <div className={styles.previewDetails}>
                                        <h3>{shoe.brand} {shoe.model}</h3>
                                        <p>LKR {shoe.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <a href="/shop/shoes" className={styles.sectionButton}>View All Shoes</a>
                    </div>
                </section>

                <section className={styles.homeSection + ' ' + styles.servicesSection}>
                    <div className={styles.sectionContent}>
                        <img src={servicesImage} alt="Services" className={styles.sectionImage} />
                        <div className={styles.sectionText}>
                            <h2>Comprehensive Cricket Services</h2>
                            <p>From pitch maintenance to equipment repairs, we offer a variety of services to support your cricket needs. Trust our experts to keep your gear and facilities in top condition.</p>
                            <a href="/services" className={styles.sectionButton}>View Services</a>
                        </div>
                    </div>
                </section>

                {/* Preview Protective Gear */}
                <section className={styles.homeSection + ' ' + styles.previewSection}>
                    <div className={styles.previewContent}>
                        <h2 className={styles.previewTitle}>Featured Protective Gear</h2>
                        <div className={styles.previewGrid}>
                            {protection.map((item) => (
                                <div key={item._id} className={styles.previewItem}>
                                    <div className={styles.previewImageContainer}>
                                        {item.images && item.images.length > 0 && (
                                            <img
                                                src={`${api}/uploads/${item.images[0]}`}
                                                alt={item.model}
                                                className={styles.previewImage}
                                            />
                                        )}
                                    </div>
                                    <div className={styles.previewDetails}>
                                        <h3>{item.brand} {item.model}</h3>
                                        <p>LKR {item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <a href="/shop/protection-gears" className={styles.sectionButton}>View All Protective Gear</a>
                    </div>
                </section>

                <section className={styles.homeSection + ' ' + styles.consultingSection}>
                    <div className={styles.sectionContent}>
                        <div className={styles.sectionText}>
                            <h2>Personalized Cricket Consulting</h2>
                            <p>Get tailored advice and strategies from our cricket consultants. Whether you need help with your technique or match planning, we're here to guide you.</p>
                            <a href="/consulting" className={styles.sectionButton}>Book a Session</a>
                        </div>
                        <img src={consultingImage} alt="Consulting" className={styles.sectionImage} />
                    </div>
                </section>

                {/* Preview Merchandise */}
                <section className={styles.homeSection + ' ' + styles.previewSection}>
                    <div className={styles.previewContent}>
                        <h2 className={styles.previewTitle}>Featured Merchandise</h2>
                        <div className={styles.previewGrid}>
                            {merchandise.map((item) => (
                                <div key={item._id} className={styles.previewItem}>
                                    <div className={styles.previewImageContainer}>
                                        {item.images && item.images.length > 0 && (
                                            <img
                                                src={`${api}/uploads/${item.images[0]}`}
                                                alt={item.model}
                                                className={styles.previewImage}
                                            />
                                        )}
                                    </div>
                                    <div className={styles.previewDetails}>
                                        <h3>{item.brand} {item.model}</h3>
                                        <p>LKR {item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <a href="/shop/merchandise" className={styles.sectionButton}>View All Merchandise</a>
                    </div>
                </section>
            </main>
            <MainFooter />
        </div>
    );
};

export default Home;

