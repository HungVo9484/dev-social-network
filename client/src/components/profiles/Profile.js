import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getProfile } from '../../actions/profile';
import { CLEAR_PROFILE_USER } from '../../actions/types';
import Spinner from '../layout/Spinner';
import { btn } from '../styles/buttonStyle';
import { my1 } from '../styles/margin';
import {
  darkStyle,
  lightStyle,
  profileGrid,
} from '../styles/utilsStyle';
import ProfileAbout from './ProfileAbout';
import ProfileEducation from './ProfileEducation';
import ProfileExperience from './ProfileExperience';
import ProfileGithub from './ProfileGithub';
import ProfileTop from './ProfileTop';

const BackLink = styled(Link)`
  ${btn}
  ${lightStyle}
  text-decoration: none;
`;

const EditProfile = styled(Link)`
  ${btn}
  ${darkStyle}
  text-decoration: none;
`;

const DivGrid = styled.div`
  ${profileGrid}
  ${my1}
`;

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userProfile = useSelector(
    (state) => state.profile.userProfile
  );
  const { isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(getProfile(id));
    return () => {
      dispatch({
        type: CLEAR_PROFILE_USER,
      });
    };
  }, [dispatch, id]);
  
  return (
    <Fragment>
      <BackLink to='/profiles'>Back To Profiles</BackLink>
      {!userProfile ? (
        <Spinner />
      ) : (
        <Fragment>
          {isAuthenticated &&
            userProfile.user._id === user._id && (
              <EditProfile to='/edit-profile'>
                Edit Profile
              </EditProfile>
            )}
          <DivGrid>
            <ProfileTop
              avatar={userProfile.user.avatar}
              name={userProfile.user.name}
              company={userProfile.company}
              location={userProfile.location}
              social={userProfile.social}
              status={userProfile.status}
            />
            <ProfileAbout
              name={userProfile.user.name}
              bio={userProfile.bio}
              skills={userProfile.skills}
            />
            <ProfileExperience
              experience={userProfile.experience}
            />
            <ProfileEducation
              education={userProfile.education}
            />
            {userProfile.githubusername && (
              <ProfileGithub githubUsername={userProfile.githubusername} />
            )}
          </DivGrid>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
