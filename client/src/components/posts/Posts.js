import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import {
  large,
  lead,
  textPrimary,
} from '../styles/textStyle';
import PostDisplay from './PostDisplay';
import PostForm from './PostForm';

const H1 = styled.h1`
  ${large}
  ${textPrimary}
`;

const P = styled.p`
  ${lead}
`;

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
      dispatch(getPosts());
  }, [dispatch]);

  return (
    <Fragment>
      <H1>Posts</H1>
      <P>
        <i className='fas fa-user'></i> Welcome to the
        community!
      </P>
      <PostForm />
      {loading ? (
        <Spinner />
      ) : (
        posts.length > 0 && posts.map((post) => (
          <PostDisplay
            key={post._id}
            name={post.name}
            avatar={post.avatar}
            text={ post.text }
            userPost={ post.user }
            likes={ post.likes }
            comments={ post.comments }
            data={ post.date }
            id={post._id}
          />
        ))
      )}
    </Fragment>
  );
};

export default Posts;
