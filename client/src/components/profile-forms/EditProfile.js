import React, {
  Fragment,
  useEffect,
  useState,
} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { createProfile } from '../../actions/profile';
import { getCurrentProfile } from '../../actions/profile';
import { btn } from '../styles/buttonStyle';
import {
  formGroup,
  formText,
  inputFormStyle,
} from '../styles/formStyle';
import { my1, my2 } from '../styles/margin';
import {
  large,
  lead,
  textPrimary,
} from '../styles/textStyle';
import {
  lightStyle,
  primaryStyle,
  socialInput,
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

const Select = styled.select`
  ${inputFormStyle}
`;

const Input = styled.input`
  ${inputFormStyle}
`;

const Textarea = styled.textarea`
  ${inputFormStyle}
`;

const Small = styled.small`
  ${formText}
`;

const DivMy2 = styled.div`
  ${my2}
`;

const LightBtn = styled.button`
  ${btn}
  ${lightStyle}
`;

const SocialInput = styled.div`
  ${formGroup}
  ${socialInput}
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

const initialState = {
  company: '',
  website: '',
  location: '',
  status: '',
  skills: '',
  githubusername: '',
  bio: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  youtube: '',
  instagram: '',
};

const EditProfile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { profile, loading } = useSelector(
    (state) => state.profile
  );

  const [displaySocialInput, toggleSocialInput] =
    useState(false);
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  });
  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  useEffect(() => {
    if (!profile) dispatch(getCurrentProfile());
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) {
          profileData[key] = profile[key];
        }
      }
      if (profile.social) {
        for (const key in profile.social) {
          if (key in profileData) {
            profileData[key] = profile.social[key];
          }
        }
      }
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(', ');
      setFormData(profileData);
    }
  }, [loading, dispatch, profile]);

  const onChangeHandler = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(createProfile(formData, history, true));
  };

  return (
    <Fragment>
      <H1>Edit Your Profile</H1>
      <P>
        <i className='fas fa-user'></i> Let's get some
        information to make your profile stand out
      </P>
      <Small>* = required field</Small>
      <form onSubmit={onSubmitHandler}>
        <FormGroup>
          <Select
            name='status'
            value={status}
            onChange={onChangeHandler}
          >
            <option value='0'>
              * Select Professional Status
            </option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>
              Junior Developer
            </option>
            <option value='Senior Developer'>
              Senior Developer
            </option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>
              Student or Learning
            </option>
            <option value='Instructor'>
              Instructor or Teacher
            </option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </Select>
          <Small>
            Give us an idea of where you are at in your
            career
          </Small>
        </FormGroup>
        <FormGroup>
          <Input
            type='text'
            placeholder='Company'
            name='company'
            value={company}
            onChange={onChangeHandler}
          />
          <Small>
            Could be your own company or one you work for
          </Small>
        </FormGroup>
        <FormGroup>
          <Input
            type='text'
            placeholder='Website'
            name='website'
            value={website}
            onChange={onChangeHandler}
          />
          <Small>
            Could be your own or a company website
          </Small>
        </FormGroup>
        <FormGroup>
          <Input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={onChangeHandler}
          />
          <Small>
            City & state suggested (eg. Boston, MA)
          </Small>
        </FormGroup>
        <FormGroup>
          <Input
            type='text'
            placeholder='* Skills'
            name='skills'
            value={skills}
            onChange={onChangeHandler}
          />
          <Small>
            Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)
          </Small>
        </FormGroup>
        <FormGroup>
          <Input
            type='text'
            placeholder='Github Username'
            name='githubusername'
            value={githubusername}
            onChange={onChangeHandler}
          />
          <Small>
            If you want your latest repos and a Github link,
            include your username
          </Small>
        </FormGroup>
        <FormGroup>
          <Textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
            onChange={onChangeHandler}
          />
          <Small>Tell us a little about yourself</Small>
        </FormGroup>

        <DivMy2>
          <LightBtn
            type='button'
            onClick={() =>
              toggleSocialInput(!displaySocialInput)
            }
          >
            Add Social Network Links
          </LightBtn>
          <span>Optional</span>
        </DivMy2>

        {displaySocialInput && (
          <Fragment>
            <SocialInput>
              <i className='fab fa-twitter fa-2x'></i>
              <Input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={onChangeHandler}
              />
            </SocialInput>

            <SocialInput>
              <i className='fab fa-facebook fa-2x'></i>
              <Input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={onChangeHandler}
              />
            </SocialInput>

            <SocialInput>
              <i className='fab fa-youtube fa-2x'></i>
              <Input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={onChangeHandler}
              />
            </SocialInput>

            <SocialInput>
              <i className='fab fa-linkedin fa-2x'></i>
              <Input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={onChangeHandler}
              />
            </SocialInput>

            <SocialInput>
              <i className='fab fa-instagram fa-2x'></i>
              <Input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={onChangeHandler}
              />
            </SocialInput>
          </Fragment>
        )}

        <Submit type='submit' />
        <GoBack to='/dashboard'>Go Back</GoBack>
      </form>
    </Fragment>
  );
};

export default EditProfile;
