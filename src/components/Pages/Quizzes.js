import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CourseDiv = ({ title, iconClass, description,path }) => (
  <div className="Quizzes-div">
    {/* <Link to={path}>
    </Link> */}
      <div className="course-div">
        <div className="icon">
          <i className={iconClass}></i>
        </div>
        <h3 className="section-common--title">{title}</h3>
        <p>{description}</p>
      </div>
  </div>
);

export const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9090/api/quizzes') // Adjust URL based on your Spring Boot backend
      .then(response => setQuizzes(response.data))
      .catch(error => console.error('Error fetching quizzes:', error));
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
              {quizzes.map(quiz => (
                <div>
                  <Link to={quiz.path}>
                  <CourseDiv key={quiz.id} {...quiz} />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>
      </motion.div>
    </React.Fragment>
  );
};
