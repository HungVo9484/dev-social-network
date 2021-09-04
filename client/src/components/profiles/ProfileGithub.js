import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Spinner from '../layout/Spinner';
import { getGithub } from '../../actions/profile';
import { my1 } from '../styles/margin';
import { p1 } from '../styles/padding';
import { textPrimary } from '../styles/textStyle';
import {
  darkStyle,
  lightStyle,
  primaryStyle,
  whiteStyle,
} from '../styles/utilsStyle';

const DivGithub = styled.div`
  grid-area: github;
  h2 {
    ${my1}
    ${textPrimary}
  }
  > div:last-child {
    flex: 3;
    flex-basis: 20%;
  }
`;

const DivRepo = styled.div`
  display: flex;
  ${whiteStyle}
  ${my1}
  ${p1}
  > div:first-child {
    flex: 7;
    flex-basis: 70%;
  }
  a {
    text-decoration: none;
    ${textPrimary}
  }
  .badge {
    font-size: 0.8rem;
    padding: 0.1rem;
    text-align: center;
    margin: 0.3rem;
    background: ${(p) => p.theme.lightColor};
    color: #333;
  }
  .badge-primary {
    ${primaryStyle}
  }
  .badge-dark {
    ${darkStyle}
  }
  .badge-light {
    ${lightStyle}
  }
`;

const RepoLink = styled.a`
  text-decoration: none;
  ${textPrimary}
  font: inherit;
  font-size: 1.3rem;
  font-weight: bold;
`;

const ProfileGithub = ({ githubUsername }) => {
  const dispatch = useDispatch();
  const repos = useSelector(
    (state) => state.profile.github
  );

  useEffect(() => {
    dispatch(getGithub(githubUsername));
  }, [dispatch, githubUsername]);
  return (
    <Fragment>
      {!repos ? (
        <Spinner />
      ) : (
        <DivGithub>
          <h2>
            <i className='fab fa-github'></i> Github Repos
          </h2>
          {repos.map((repo) => (
            <DivRepo key={repo.id}>
              <div>
                <RepoLink href={repo.html_url}>
                  {repo.name}
                </RepoLink>
                <p>{repo.description}</p>
              </div>
              <div>
                <ul>
                  <li className='badge badge-primary'>
                    Stars: {repo.stargazers_count}
                  </li>
                  <li className='badge badge-dark'>
                    Watchers: {repo.watchers_count}
                  </li>
                  <li className='badge badge-light'>
                    Forks: {repo.forks_count}
                  </li>
                </ul>
              </div>
            </DivRepo>
          ))}
        </DivGithub>
      )}
    </Fragment>
  );
};

export default ProfileGithub;
