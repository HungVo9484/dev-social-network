import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addPost } from '../../actions/post';

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

const PostForm = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addPost(text));
  };
  return (
    <Fragment>
      <DivSub>
        <h3>Say Something...</h3>
      </DivSub>
      <Form onSubmit={onSubmit}>
        <Textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a post'
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Submit type='submit' value='Submit' />
      </Form>
    </Fragment>
  );
};

export default PostForm;
