import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { btn } from '../styles/buttonStyle';
import { lightStyle } from '../styles/utilsStyle';

const DashButtons = styled.div``;

const LinkBtn = styled(Link)`
  display: block;
  margin-bottom: 0.2rem;
  text-decoration: none;
  ${btn}
  ${lightStyle}
  & > i {
    color: ${(p) => p.theme.primaryColor};
  }
`;

const DashboardActions = () => {
  return (
    <DashButtons>
      <LinkBtn to='/edit-profile'>
        <i className='fas fa-user-circle'></i>{' '}
        Edit Profile
      </LinkBtn>
      <LinkBtn to='/add-experience'>
        <i className='fab fa-black-tie'></i>{' '}
        Add Experience
      </LinkBtn>
      <LinkBtn to='/add-education'>
        <i className='fas fa-graduation-cap'></i>{' '}
        Add Education
      </LinkBtn>
    </DashButtons>
  );
};

export default DashboardActions;
