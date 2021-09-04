import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { addExperience } from '../../actions/profile';

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
import {
  lightStyle,
  primaryStyle,
} from '../styles/utilsStyle';

const H1 = styled.h1`
  ${large}
  ${textPrimary}
`;

const P = styled.p`
  ${lead}
`;

const FormGroup = styled.div`
  ${formGroup}
`;

const Input = styled.input`
  ${inputFormStyle}
`;

const Textarea = styled.textarea`
  ${inputFormStyle}
`;

const Submit = styled.input`
  ${my1}
  ${btn}
  ${primaryStyle}
`;

const GoBack = styled(Link)`
  ${my1}
  ${btn}
  ${lightStyle}
  text-decoration: none;
`;

const AddExperience = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const [toDateDisable, toggleDisabled] = useState(false);

  const {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  } = formData;

  const onChangeHandler = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(addExperience(formData, history));
  };
  return (
    <Fragment>
      <H1>Add An Experience</H1>
      <P>
        <i className='fas fa-code-branch'></i> Add any
        developer/programming positions that you have had in
        the past
      </P>
      <small>* = required field</small>
      <form onSubmit={onSubmitHandler}>
        <FormGroup>
          <Input
            type='text'
            placeholder='* Job Title'
            name='title'
            required
            value={title}
            onChange={onChangeHandler}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type='text'
            placeholder='* Company'
            name='company'
            required
            value={company}
            onChange={onChangeHandler}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={onChangeHandler}
          />
        </FormGroup>
        <FormGroup>
          <h4>From Date</h4>
          <Input
            type='date'
            name='from'
            value={from}
            onChange={onChangeHandler}
          />
        </FormGroup>
        <FormGroup>
          <p>
            <input
              type='checkbox'
              name='current'
              defaultChecked={current}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  current: !current,
                });
                toggleDisabled(!toDateDisable);
              }}
            />{' '}
            Current Job
          </p>
        </FormGroup>
        <FormGroup>
          <h4>To Date</h4>
          <Input
            type='date'
            name='to'
            value={to}
            onChange={ onChangeHandler }
            disabled={toDateDisable}
          />
        </FormGroup>
        <FormGroup>
          <Textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Job Description'
            value={description}
            onChange={onChangeHandler}
          />
        </FormGroup>
        <Submit type='submit' />
        <GoBack to='/dashboard'>Go Back</GoBack>
      </form>
    </Fragment>
  );
};

export default AddExperience;
