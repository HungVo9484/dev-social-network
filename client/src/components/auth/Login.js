import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { login } from '../../actions/auth';
import { btn } from '../styles/buttonStyle';
import {
  formGroup,
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
  ${large};
  ${textPrimary};
`;

const P1 = styled.p`
  ${lead}
`;

const FormGroup = styled.div`
  ${formGroup}
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

const Login = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChangeData = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  //! Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/' />
  };

  return (
    <Fragment>
      <H1>Sign In</H1>
      <P1>
        <i className='fas fa-user'></i> Sign into Your
        Account
      </P1>
      <form onSubmit={onSubmit}>
        <FormGroup>
          <Input
            type='email'
            placeholder='Email Address'
            name='email'
            required
            value={email}
            onChange={onChangeData}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={onChangeData}
          />
        </FormGroup>
        <Submit type='submit' value='Login' />
      </form>
      <P2>
        Don't have an account?{' '}
        <ALink to='/register'>Sign Up</ALink>
      </P2>
    </Fragment>
  );
};

export default Login;
