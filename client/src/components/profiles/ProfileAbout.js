import React from 'react';
import styled from 'styled-components';
import {
  lightStyle,
  line,
  profileAbout,
} from '../styles/utilsStyle';
import { p1, p2 } from '../styles/padding';
import { textPrimary } from '../styles/textStyle';

const DivAbout = styled.div`
  ${profileAbout}
  ${lightStyle}
  ${p2}
  > h2 {
    ${textPrimary}
  }
  > .line {
    ${line}
  }
  .p-1 {
    ${p1}
  }
`;

const ProfileAbout = ({ name, bio, skills }) => {
  return (
    <DivAbout>
      <h2>{name}'s Bio</h2>
      <p>{bio}</p>
      <div className='line'></div>
      <h2>Skill Set</h2>
      <div className='skills'>
        {skills.map((s, index) => (
          <div className='p-1' key={index}>
            <i className='fa fa-check'></i> {s}
          </div>
        ))}
      </div>
    </DivAbout>
  );
};

export default ProfileAbout;
