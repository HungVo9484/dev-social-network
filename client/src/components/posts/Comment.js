import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Moment from 'react-moment';

import {
  dangerStyle,
  post,
  whiteStyle,
} from '../styles/utilsStyle';
import { p1 } from '../styles/padding';
import { my1 } from '../styles/margin';
import { btn } from '../styles/buttonStyle';
import { deleteComment } from '../../actions/post';

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

const Button = styled.button`
  ${btn}
  ${dangerStyle}
`;

const Comment = ({ comment, postId }) => {
  const dispatch = useDispatch();
  return (
    <DivPost>
      <div>
        <ProfileLink to={`/profile/${comment.user}`}>
          <img src={comment.avatar} alt='' />
          <h4>{comment.name}</h4>
        </ProfileLink>
      </div>
      <div>
        <Text>{comment.text}</Text>
        <p className='post-date'>
          Posted on{' '}
          <Moment format='MM-DD-YYYY'>
            {comment.date}
          </Moment>
        </p>
        <Button
          onClick={() =>
            dispatch(deleteComment(postId, comment._id))
          }
        >
          <i className='fas fa-times'></i>
        </Button>
      </div>
    </DivPost>
  );
};

export default Comment;
