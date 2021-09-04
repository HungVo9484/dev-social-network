import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  lightStyle,
  profile,
  primaryStyle,
} from '../styles/utilsStyle';
import { btn } from '../styles/buttonStyle';
import { textPrimary } from '../styles/textStyle';

const DivProfile = styled.div`
  ${profile}
  ${lightStyle}
  > .round-img {
    border-radius: 50%;
  }
  li {
    ${textPrimary}
  }
`;

const ProfileLink = styled(Link)`
  ${btn}
  ${primaryStyle}
  text-decoration: none;
`;

const Developer = ({
  avatar,
  name,
  company,
  location,
  skills,
  id,
}) => {
  return (
    <DivProfile>
      <img className='round-img' src={avatar} alt='' />
      <div>
        <h2>{name}</h2>
        <p>{company}</p>
        <p>{location}</p>
        <ProfileLink to={`/profile/${id}`}>
          View Profile
        </ProfileLink>
      </div>

      <ul>
        {skills.map((s, index) => (
          <li key={index}>
            <i className='fas fa-check'></i> {s}
          </li>
        ))}
      </ul>
    </DivProfile>
  );
};

export default Developer;
