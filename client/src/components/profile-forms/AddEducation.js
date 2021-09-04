import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { addEducation } from '../../actions/profile';
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

const AddEducation = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    current: false,
    to: '',
    description: '',
  });

  const {
    school,
    degree,
    fieldofstudy,
    from,
    current,
    to,
    description,
  } = formData;

  const [toDateDisable, toggleDisabled] = useState(false);

  const onChangeHandler = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(addEducation(formData, history));
  };

  return (
    <Fragment>
      <H1>Add Your Education</H1>
      <P>
        <i className='fas fa-graduation-cap'></i> Add any
        school, bootcamp, etc that you have attended
      </P>
      <small>* = required field</small>
      <form onSubmit={onSubmitHandler}>
        <FormGroup>
          <Input
            type='text'
            placeholder='* School or Bootcamp'
            name='school'
            required
            value={school}
            onChange={onChangeHandler}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type='text'
            placeholder='* Degree or Certificate'
            name='degree'
            required
            value={degree}
            onChange={onChangeHandler}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type='text'
            placeholder='Field Of Study'
            name='fieldofstudy'
            value={fieldofstudy}
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
            Current School or Bootcamp
          </p>
        </FormGroup>
        <FormGroup>
          <h4>To Date</h4>
          <Input
            type='date'
            name='to'
            value={to}
            onChange={onChangeHandler}
            disabled={toDateDisable}
          />
        </FormGroup>
        <FormGroup>
          <Textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Program Description'
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

export default AddEducation;
