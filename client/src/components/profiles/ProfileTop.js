import React from 'react';
import styled from 'styled-components';
import { my1 } from '../styles/margin';
import { p2 } from '../styles/padding';
import {
  primaryStyle,
  profileTop,
} from '../styles/utilsStyle';

const DivTop = styled.div`
  ${profileTop}
  ${primaryStyle}
  ${p2}
`;

const DivIcons = styled.div`
  ${my1}
`;

const SocialLink = styled.a`
  color: #fff;
  margin: 0 0.3rem;
  &:hover {
    color: ${(p) => p.theme.darkColor};
  }
`;

const ProfileTop = ({
  avatar,
  name,
  status,
  company,
  location,
  social,
}) => {
  const socialIcons = {
    youtube: 'fab fa-youtube fa-2x',
    twitter: 'fab fa-twitter fa-2x',
    facebook: 'fab fa-facebook fa-2x',
    linkedin: 'fab fa-linkedin fa-2x',
    instagram: 'fab fa-instagram fa-2x',
  };
  return (
    <DivTop>
      <img src={avatar} alt='' />
      <h1>{name}</h1>
      <p className='lead'>
        {status} {company && <span> at {company}</span>}
      </p>
      <p>{location}</p>
      <DivIcons>
        {social &&
          Object.keys(social).map((key) => (
            <SocialLink
              key={key}
              href={`http://${social[key]}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className={socialIcons[key]}></i>
            </SocialLink>
          ))}
      </DivIcons>
    </DivTop>
  );
};

export default ProfileTop;
