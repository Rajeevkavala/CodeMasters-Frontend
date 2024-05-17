import React, { useState, useEffect } from 'react';
import LazyLoad from 'react-lazyload';
import './cards.css';

const Card = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9090/api/team-members') // Update the URL to match your backend endpoint
      .then(response => response.json())
      .then(data => setTeamMembers(data))
      .catch(error => console.error('Error fetching team members:', error));
  }, []);

  return (
    <React.Fragment>
      <div className="cards">
        <div className="team-container">
          <div className="text-about">
            <h2 className="About-team">About Team-Members</h2>
          </div>
          <div className="profile-cards">
            {teamMembers.map((member, index) => (
              <LazyLoad key={index} height={200} offset={100}>
                <div className="card">
                  <img className="profile-pic" src={member.imageUrl} alt={member.name} />
                  <h2>{member.name}</h2>
                  <p>{member.roll}</p>
                </div>
              </LazyLoad>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Card;
