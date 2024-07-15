import React, { useState, useEffect } from 'react';
import LazyLoad from 'react-lazyload';
import './cards.css';

const Card = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a state variable for loading

  useEffect(() => {
    fetch('https://codemastersbackend-production.up.railway.app/api/team-members') // Update the URL to match your backend endpoint
      .then(response => response.json())
      .then(data => {
        setTeamMembers(data);
        setIsLoading(false); // Set loading to false when data is fetched
      })
      .catch(error => console.error('Error fetching team members:', error));
  }, []);

  const skeletonItems = [...Array(3)].map((_, index) => ( // Create skeleton items for loading state
    <div className="card loading" key={index}>
      <div className="profile-pic skeleton"></div>
      <h2>Skeleton Name {index + 1}</h2>
      <p>Loading...</p>
    </div>
  ));

  return (
    <React.Fragment>
      <div className="cards">
        <div className="team-container">
          <div className="text-about">
            <h2 className="About-team">About Team-Members</h2>
          </div>
          <div className="profile-cards">
            {isLoading ? (
              skeletonItems // Display skeleton items while loading
            ) : (
              teamMembers.map((member, index) => (
                <LazyLoad key={index} height={200} offset={100}>
                  <div className="card">
                    <img className="profile-pic" src={member.imageUrl} alt={member.name} />
                    <h2>{member.name}</h2>
                    <p>{member.roll}</p>
                  </div>
                </LazyLoad>
              ))
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Card;
