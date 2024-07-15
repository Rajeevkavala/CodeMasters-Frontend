import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonLoader = () => (
  <div className='grid-item'>
    <h2><Skeleton width={200} /></h2>
    <p><Skeleton count={2} /></p>
  </div>
);

export const Roadmaps = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const fetchRoadmaps = async () => {
    try {
      const response = await axios.get('https://codemastersbackend-production.up.railway.app/api/roadmaps');
      setRoadmaps(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching roadmaps:', error);
      setLoading(false);  // Set loading to false even on error to avoid infinite loading state
    }
  };

  return (
    <React.Fragment>
      <motion.div
        className='road-map'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className='roadmaps-heading'>
          <h1 className='roadmap-head'>Developer Roadmaps</h1>
          <p>Step by step guides and paths to learn different tools or technologies.</p>
        </div>

        <div className='grid-container'>
          {loading ? (
            Array(6).fill().map((_, index) => (
              <SkeletonLoader key={index} />
            ))
          ) : (
            roadmaps.map((roadmap) => (
              <div className='grid-item' key={roadmap.id}>
                <a href={roadmap.href} target='_blank' rel='noreferrer' style={{ color: 'black' }}>
                  <h2>{roadmap.title}</h2>
                  <p>{roadmap.description}</p>
                </a>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </React.Fragment>
  );
};
