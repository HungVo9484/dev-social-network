import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import PostCmt from './PostCmt';
import CommentForm from './CommentForm';
import Comment from './Comment';
import { btn } from '../styles/buttonStyle';
import { lightStyle } from '../styles/utilsStyle';
import Spinner from '../layout/Spinner';
import { CLEAR_POST } from '../../actions/types';
import { getPost } from '../../actions/post';

const BackLink = styled(Link)`
  ${btn}
  ${lightStyle}
  text-decoration: none;
`;

const Post = () => {
  const { post_id } = useParams();
  const dispatch = useDispatch();
  const { post, loading } = useSelector(
    (state) => state.post
  );
  useEffect(() => {
    dispatch(getPost(post_id));
    return () => {
      dispatch({
        type: CLEAR_POST,
      });
    };
  }, [dispatch, post_id]);

  return (
    <Fragment>
      <BackLink to='/posts'>Back To Posts</BackLink>
      {loading || !post ? (
        <Spinner />
      ) : (
        <Fragment>
          <PostCmt
            user={post.user}
            name={post.name}
            avatar={post.avatar}
            text={post.text}
          />
          <CommentForm postId={post_id} />
          {post.comments.map((comment) => (
            <Comment key={comment._id} comment={comment} postId={post_id} />
          ))}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Post;
