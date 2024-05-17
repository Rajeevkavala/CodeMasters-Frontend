// import React from 'react';
// import { motion } from 'framer-motion';

// const roadmapsData = [
//   {
//     title: 'Frontend Developer',
//     description: 'Step by step guide to becoming a modern frontend developer in 2024',
//     href: 'https://roadmap.sh/pdfs/roadmaps/frontend.pdf',
//   },
//   {
//     title: 'Backend Developer',
//     description: 'Step by step guide to becoming a modern backend developer in 2024',
//     href: 'https://roadmap.sh/pdfs/roadmaps/backend.pdf',
//   },
//   {
//     title: 'Full Stack Developer',
//     description: 'Step by step guide to becoming a modern full stack developer in 2024',
//     href: 'https://roadmap.sh/pdfs/roadmaps/full-stack.pdf',
//   },
//   {
//     title: 'Cyber Security Expert',
//     description: 'Step by step guide to becoming a Cyber Security Expert in 2024',
//     href: 'https://roadmap.sh/pdfs/roadmaps/cyber-security.pdf',
//   },
//   {
//     title: 'Android Developer',
//     description: 'Step by step guide to becoming an Android developer in 2024',
//     href: 'https://roadmap.sh/pdfs/roadmaps/android.pdf',
//   },
//   {
//     title: 'DevOps Engineer',
//     description: 'Step by step guide for DevOps engineers in 2024',
//     href: 'https://roadmap.sh/pdfs/roadmaps/devops.pdf',
//   },
  
// ];

// export const Roadmaps = () => {
//   return (
//     <React.Fragment>

//         <motion.div className='road-map'
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 0.5 }}
//         >
//         <div className="roadmaps-heading">
//             <h1 className="roadmap-head">Developer Roadmaps</h1>
//             <p>Step by step guides and paths to learn different tools or technologies.</p>
//         </div>

//         <div className="grid-container">
//             {roadmapsData.map((roadmap) => (
//             <div className="grid-item" key={roadmap.title}>
//                 <a href={roadmap.href} target='_blank' rel="noreferrer" style={{ color: 'black' }}>
//                 <h2>{roadmap.title}</h2>
//                 <p>{roadmap.description}</p>
//                 </a>
//             </div>
//             ))}
//         </div>
//         </motion.div>
//     </React.Fragment>
//   );
// };


// Roadmaps.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export const Roadmaps = () => {
  const [roadmaps, setRoadmaps] = useState([]);

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const fetchRoadmaps = async () => {
    try {
      const response = await axios.get('http://localhost:9090/api/roadmaps');
      setRoadmaps(response.data);
    } catch (error) {
      console.error('Error fetching roadmaps:', error);
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
          {roadmaps.map((roadmap) => (
            <div className='grid-item' key={roadmap.id}>
              <a href={roadmap.href} target='_blank' rel='noreferrer' style={{ color: 'black' }}>
                <h2>{roadmap.title}</h2>
                <p>{roadmap.description}</p>
              </a>
            </div>
          ))}
        </div>
      </motion.div>
    </React.Fragment>
  );
};
