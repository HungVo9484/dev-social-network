import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import DashboardActions from './DashboardActions';
import ExperienceTable from './ExperienceTable';
import { deleteAccount, getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { btn } from '../styles/buttonStyle';
import { my1, my2 } from '../styles/margin';
import {
  large,
  lead,
  textPrimary,
} from '../styles/textStyle';
import {
  dangerStyle,
  primaryStyle,
} from '../styles/utilsStyle';
import EducationTable from './EducationTable';

const H1 = styled.h1`
  ${large}
  ${textPrimary}
`;

const P1 = styled.p`
  ${lead}
`;

const Button = styled.button`
  ${btn}
  ${dangerStyle}
`;

const Div = styled.div`
  ${my2}
`;

const CreateProfileBtn = styled(Link)`
  ${btn}
  ${primaryStyle}
  ${my1}
`;

const Dashboard = () => {
  const history = useHistory();
  const user = useSelector((state) => state.auth.user);
  const { profile, loading } = useSelector(
    (state) => state.profile
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!profile) dispatch(getCurrentProfile());
  }, [dispatch, profile]);

  const deleteAccHandler = () => {
    dispatch(deleteAccount(history));
  }

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <H1>Dashboard</H1>
      <P1>
        <i className='fas fa-user'></i> Welcome{' '}
        {user && user.name}
      </P1>
      {profile === null ? (
        <Fragment>
          <p>
            You have not yet setup a profile, please add
            some info.
          </p>
          <CreateProfileBtn to='/create-profile'>
            Create Profile
          </CreateProfileBtn>
        </Fragment>
      ) : (
        <Fragment>
          <DashboardActions />
          <ExperienceTable />
          <EducationTable />
        </Fragment>
      )}
      <Div>
        <Button onClick={deleteAccHandler}>
          <i className='fas fa-user-minus'></i> Delete My
          Account
        </Button>
      </Div>
    </Fragment>
  );
};

export default Dashboard;
