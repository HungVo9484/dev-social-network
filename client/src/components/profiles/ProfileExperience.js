import React from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';

import { profileExperience } from '../styles/utilsStyle';

const DivExperience = styled.div`
  ${profileExperience}
`;

const ProfileExperience = ({ experience }) => {
  return (
    <DivExperience>
      <h2>Experience</h2>
      {!experience.length > 0
        ? 'No data'
        : experience.map((exp) => (
            <div key={exp._id}>
              <h3>{exp.company}</h3>
              <p>
                <Moment format='MM-DD-YYYY'>
                  {exp.from}
                </Moment>{' '}
                -{' '}
                {exp.to ? (
                  <Moment format='YYYY/MM/DD'>
                    {exp.from}
                  </Moment>
                ) : (
                  'Now'
                )}
              </p>
              <p>
                <strong>Position: </strong>{exp.title}
              </p>
              <p>
                <strong>Description: </strong>{exp.description}
              </p>
            </div>
          ))}
    </DivExperience>
  );
};

export default ProfileExperience;
