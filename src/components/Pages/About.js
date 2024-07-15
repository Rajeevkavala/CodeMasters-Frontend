import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Cards'
import { motion } from 'framer-motion';
import Footer from '../Outlet/Footer';
import LazyLoad from 'react-lazyload';
 export const About = () => {
    const [aboutData, setAboutData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const response = await axios.get('https://codemastersbackend-production.up.railway.app/api/about'); // Update with your backend URL
                setAboutData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching about data:', error);
                setLoading(false);
            }
        };

        fetchAboutData();
    }, []);

    if (loading) { 
        return (
            <React.Fragment>
                <motion.div className='ab'
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.5}}>
                    <section className="section-about">
                        <div className="container">
                            <h2 className="section-common-heading">Loading...</h2>
                            <p className="section-common-subheading">Please wait while we fetch the data.</p>
                        </div>
                        <div className="container grid grid-three--cols">
                            {[1, 2, 3].map((index) => (
                                <div className="about-div loading" key={index}>
                                    <div className="icon skeleton"></div>
                                    <div className="text-skeleton">
                                        <h3 className="section-common--title skeleton"></h3>
                                        <p className="skeleton"></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </motion.div>
                <Footer />
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>

            <motion.div className='ab'
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.5}}>
                <section className="section-about">
                    <div className="container">
                        <h2 className="section-common-heading">About CodeMasters</h2>
                        <p className="section-common-subheading">
                            Guiding Your Learning Journey through Research, Design, and Development Excellence.
                        </p>
                    </div>
                    <div className="container grid grid-three--cols">
                        {aboutData.map((item) => (
                            <LazyLoad height={200} key={item.title} once>
                                <div className="about-div aos-init aos-animate" data-aos="fade-up" data-aos-delay={item.delay}>
                                    <div className="icon">
                                        <img src={item.icon} alt={item.alt} />
                                    </div>
                                    <h3 className="section-common--title">{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                            </LazyLoad>
                        ))}
                    </div>
                </section>
                <Card/>
            </motion.div>
            <Footer />
        </React.Fragment>
    );
};

