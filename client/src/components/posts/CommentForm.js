import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addComment } from '../../actions/post';

import { btn } from '../styles/buttonStyle';
import { inputFormStyle } from '../styles/formStyle';
import { my1 } from '../styles/margin';
import { p } from '../styles/padding';
import {
  darkStyle,
  primaryStyle,
} from '../styles/utilsStyle';

const DivSub = styled.div`
  ${primaryStyle};
  ${p}
`;

const Form = styled.form`
  ${my1}
`;

const Submit = styled.input`
  ${my1}
  ${btn}
  ${darkStyle}
`;

const Textarea = styled.textarea`
  ${inputFormStyle}
`;

const CommentForm = ({ postId }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(addComment(postId, text));
  };
  return (
    <Fragment>
      <DivSub>
        <h3>Leave A Comment</h3>
      </DivSub>
      <Form onSubmit={onSubmitHandler}>
        <Textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Comment on this post'
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Submit type='submit' value='Submit' />
      </Form>
    </Fragment>
  );
};

export default CommentForm;
