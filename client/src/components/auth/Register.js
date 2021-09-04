import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

import { btn } from '../styles/buttonStyle';
import {
  formGroup,
  formText,
  inputFormStyle,
} from '../styles/formStyle';
import { my1 } from '../styles/margin';
import {
  large,
  lead,
  textPrimary,
} from '../styles/textStyle';
import { primaryStyle } from '../styles/utilsStyle';

const H1 = styled.h1`
  ${large}
  ${textPrimary}
`;

const P1 = styled.p`
  ${lead}
`;

const FormGroup = styled.div`
  ${formGroup}
`;

const Small = styled.small`
  ${formText}
`;

const Input = styled.input`
  ${inputFormStyle}
`;

const Submit = styled.input`
  ${btn}
  ${primaryStyle}
  font: inherit;
`;

const P2 = styled.p`
  ${my1}
`;

const ALink = styled(Link)`
  color: ${(p) => p.theme.primaryColor};
`;

const Register = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChangeData = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(
        setAlert('Passwords do not matched', 'dangerStyle')
      );
    } else {
      dispatch(register(name, email, password));
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <H1>Sign Up</H1>
      <P1>
        <i className='fas fa-user'></i> Create Your Account
      </P1>
      <form onSubmit={onSubmit}>
        <FormGroup>
          <Input
            type='text'
            placeholder='Name'
            name='name'
            required
            value={name}
            onChange={onChangeData}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={onChangeData}
          />
          <Small>
            This site uses Gravatar so if you want a profile
            image, use a Gravatar email
          </Small>
        </FormGroup>
        <FormGroup>
          <Input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={onChangeData}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            minLength='6'
            value={password2}
            onChange={onChangeData}
          />
        </FormGroup>
        <Submit type='submit' value='Register' />
      </form>
      <P2>
        Already have an account?{' '}
        <ALink to='/login'>Sign In</ALink>
      </P2>
    </Fragment>
  );
};

export default Register;
