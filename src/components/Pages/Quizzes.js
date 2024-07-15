import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CourseDiv = ({ title, iconClass, description }) => (
  <div className="Quizzes-div">
    <div className="course-div">
      <div className="icon">
        <i className={iconClass}></i>
      </div>
      <h3 className="section-common--title">{title}</h3>
      <p>{description}</p>
    </div>
  </div>
);

const SkeletonLoader = () => (
  <div className="Quizzes-div">
    <div className="course-div">
      <div className="icon">
        <Skeleton circle={true} height={100} width={100} />
      </div>
      <h3 className="section-common--title">
        <Skeleton width={150} />
      </h3>
      <p>
        <Skeleton count={2} />
      </p>
    </div>
  </div>
);

export const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://codemastersbackend-production.up.railway.app/api/quizzes')
      .then(response => {
        setQuizzes(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching quizzes:', error);
        setLoading(false);
      });
  }, []);

  return (
    <React.Fragment>
      <motion.div className="quizzes-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}>
        <div>
          <section className="section-course">
            <div className="container">
              <h2 className="section-common-heading">Explore Our Quizzes</h2>
              <p className="section-common-subheading">
                Quiz Excellence: Your Journey through Research, Design, and Development.
              </p>
            </div>
            <div className="container grid grid-four--cols">
              {loading ? (
                Array(8).fill().map((_, index) => (
                  <SkeletonLoader key={index} />
                ))
              ) : (
                quizzes.map(quiz => (
                  <Link key={quiz.id} to={quiz.path}>
                    <CourseDiv {...quiz} />
                  </Link>
                ))
              )}
            </div>
          </section>
        </div>
      </motion.div>
    </React.Fragment>
  );
};
