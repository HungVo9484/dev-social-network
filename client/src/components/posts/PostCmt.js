import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { post, whiteStyle } from '../styles/utilsStyle';
import { p1 } from '../styles/padding';
import { my1 } from '../styles/margin';

const DivPost = styled.div`
  ${post}
  ${whiteStyle};
  ${p1}
  ${my1}
`;

const ProfileLink = styled(Link)`
  text-decoration: none;
  color: ${(p) => p.theme.primaryColor};
  > img {
    border-radius: 50%;
  }
`;

const Text = styled.p`
  ${my1}
`;

const PostCmt = ({ user, name, avatar, text }) => {
  return (
    <DivPost>
      <div>
        <ProfileLink to={`/profile/${user}`}>
          <img src={avatar} alt='' />
          <h4>{name}</h4>
        </ProfileLink>
      </div>
      <div>
        <Text>{text}</Text>
      </div>
    </DivPost>
  );
};

export default PostCmt;
