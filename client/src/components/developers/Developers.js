import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getProfiles } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import {
  large,
  textPrimary,
  lead,
} from '../styles/textStyle';
import Developer from './Developer';

const H1 = styled.h1`
  ${large}
  ${textPrimary}
`;

const P1 = styled.p`
  ${lead}
`;

const Developers = () => {
  const dispatch = useDispatch();
  const profiles = useSelector(
    (state) => state.profile.profiles
  );

  useEffect(() => {
    if (profiles.length === 0) {
      dispatch(getProfiles());
    }
  }, [profiles, dispatch]);

  return (
    <Fragment>
      <H1>Developers</H1>
      <P1>
        <i className='fab fa-connectdevelop'></i> Browse and
        connect with developers
      </P1>
      {!profiles.length > 0 ? (
        <Spinner />
      ) : (
        profiles.map((p) => (
          <Developer
            key={p._id}
            avatar={p.user.avatar}
            name={p.user.name}
            company={p.company}
            location={p.location}
            skills={p.skills}
            id={p.user._id}
          />
        ))
      )}
    </Fragment>
  );
};

export default Developers;
