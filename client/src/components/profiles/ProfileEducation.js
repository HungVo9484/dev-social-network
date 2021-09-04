import React from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';

import { profileEducation } from '../styles/utilsStyle';

const DivEducation = styled.div`
  ${profileEducation}
`;

const ProfileEducation = ({ education }) => {
  return (
    <DivEducation>
      <h2>Education</h2>
      {!education.length > 0
        ? 'No data'
        : education.map((edu) => (
            <div key={edu._id}>
              <h3>{edu.school}</h3>
              <p>
                <Moment format='MM-DD-YYYY'>
                  {edu.from}
                </Moment>{' '}
                -{' '}
                {edu.to ? (
                  <Moment format='YYYY/MM/DD'>
                    {edu.from}
                  </Moment>
                ) : (
                  'Now'
                )}
              </p>
              <p>
                <strong>Degree: </strong>{edu.degree}
              </p>
              <p>
                <strong>Field Of Study: </strong>{edu.fieldofstudy}
              </p>
              <p>
                <strong>Description: </strong>{edu.description}
              </p>
            </div>
          ))}
    </DivEducation>
  );
};

export default ProfileEducation;
