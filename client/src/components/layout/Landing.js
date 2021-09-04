import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import showcaseURL from '../../img/showcase.jpg';
import { xLarge, lead } from '../styles/textStyle';
import { btn } from '../styles/buttonStyle';
import {
  lightStyle,
  primaryStyle,
} from '../styles/utilsStyle';

const LandingSection = styled.section`
  position: relative;
  background: url(${showcaseURL}) no-repeat center
    center/cover;
  height: 100vh;
`;

const DarkOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const LandingInner = styled.div`
  color: #fff;
  height: 100%;
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const H1xLarge = styled.h1`
  ${xLarge}
`;

const ParagraphLead = styled.p`
  ${lead}
`;

const BtnPrimary = styled(Link)`
  ${btn}
  ${primaryStyle}
  text-decoration: none;
`;

const BtnLight = styled(Link)`
  ${btn}
  ${lightStyle}
  text-decoration: none;
`;

const Landing = () => {
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );
  const loading = useSelector(
    (state) => state.auth.loading
  );

  const guestLinks = (
    <div className='buttons'>
      <BtnPrimary to='/register'>Sign Up</BtnPrimary>
      <BtnLight to='/login'>Login</BtnLight>
    </div>
  );

  return (
    <LandingSection>
      <DarkOverlay>
        <LandingInner>
          <H1xLarge>Developer Social Network</H1xLarge>
          <ParagraphLead>
            Create a developer profile/portfolio, share
            posts and get help from other developers
          </ParagraphLead>
          {loading ? null : isAuthenticated ? null : guestLinks}
        </LandingInner>
      </DarkOverlay>
    </LandingSection>
  );
};

export default Landing;
