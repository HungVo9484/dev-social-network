import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Moment from 'react-moment';

import {
  dangerStyle,
  lightStyle,
  post,
  primaryStyle,
  whiteStyle,
} from '../styles/utilsStyle';
import { p1 } from '../styles/padding';
import { my1 } from '../styles/margin';
import { btn } from '../styles/buttonStyle';
import { useDispatch, useSelector } from 'react-redux';
import {
  deletePost,
  likePost,
  unlikePost,
} from '../../actions/post';
import Spinner from '../layout/Spinner';

const Div = styled.div`
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

const LikeBtn = styled.button`
  ${btn}
  ${lightStyle}
  color: ${(p) => (p.like ? p.theme.primaryColor : '#333')};
`;

const PostLink = styled(Link)`
  text-decoration: none;
  ${btn}
  ${primaryStyle}
`;

const Button = styled.button`
  ${btn}
  ${dangerStyle}
`;

const PostDisplay = ({
  name,
  avatar,
  text,
  userPost,
  likes,
  comments,
  date,
  id,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const likeHandler = () => {
    dispatch(likePost(id));
  };

  const unlikeHandler = () => {
    dispatch(unlikePost(id));
  };

  const deletePostHandler = () => {
    dispatch(deletePost(id));
  };
  return (
    <div className='posts'>
      {!user ? (
        <Spinner />
      ) : (
        <Div>
          <div>
            <ProfileLink to={`/profile/${userPost}`}>
              <img src={avatar} alt='' />
              <h4>{name}</h4>
            </ProfileLink>
          </div>
          <div>
            <Text>{text}</Text>
            <p className='post-date'>
              Posted on{' '}
              <Moment format='MM-DD-YYYY'>{date}</Moment>
            </p>
            <LikeBtn
              like={likes
                .map((like) => like.user)
                .includes(user._id)}
              onClick={likeHandler}
            >
              <i className='fas fa-thumbs-up'></i>
              <span> {likes.length}</span>
            </LikeBtn>
            <LikeBtn onClick={unlikeHandler}>
              <i className='fas fa-thumbs-down'></i>
            </LikeBtn>
            <PostLink to={`/post/${id}`}>
              Discussion{' '}
              <span className='comment-count'>
                {comments.length}
              </span>
            </PostLink>
            {user._id === userPost && (
              <Button onClick={deletePostHandler}>
                <i className='fas fa-times'></i>
              </Button>
            )}
          </div>
        </Div>
      )}
    </div>
  );
};

export default PostDisplay;
