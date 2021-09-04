import { css } from 'styled-components';
import { my1 } from './margin';
import { p2 } from './padding';
import {
  large,
  lead,
  textDark,
  textPrimary,
} from './textStyle';

export const primaryStyle = css`
  background: ${(p) => p.theme.primaryColor};
  color: #fff;
`;

export const lightStyle = css`
  background: ${(p) => p.theme.lightColor};
  color: #333;
`;

export const darkStyle = css`
  background: ${(p) => p.theme.darkColor};
  color: #fff;
`;

export const dangerStyle = css`
  background: ${(p) => p.theme.dangerColor};
  color: #fff;
`;

export const successStyle = css`
  background: ${(p) => p.theme.successColor};
  color: #fff;
`;

export const whiteStyle = css`
  background: #fff;
  color: #333;
  border: #ccc solid 1px;
`;

export const lightBorder = css`
  border: #ccc solid 1px;
`;

export const roundImg = css`
  border-radius: 50%;
`;

export const line = css`
  height: 1px;
  background: #ccc;
  margin: 1.5rem 0;
`;

export const alert = css`
  padding: 0.8rem;
  margin: 1rem 0;
  opacity: 0.9;
  background: ${(p) => p.theme.lightColor};
  color: #333;
`;

export const socialInput = css`
  display: flex;
  i {
    padding: 0.5rem;
    width: 4rem;
  }
  i.fa-twitter {
    color: #38a1f3;
  }
  i.fa-facebook {
    color: #3b5998;
  }
  i.fa-instagram {
    color: #3f729b;
  }
  i.fa-youtube {
    color: #c4302b;
  }
  i.fa-linkedin {
    color: #0077b5;
  }
`;

export const post = css`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 2rem;
  align-items: center;

  > div:first-child {
    text-align: center;
  }

  & img {
    width: 100px;
  }

  & .comment-count {
    background: ${(p) => p.theme.lightColor};
    color: ${(p) => p.theme.primaryColor};
    padding: 0.1rem 0.2rem;
    border-radius: 5px;
    font-size: 0.8rem;
  }

  & .post-date {
    color: #aaa;
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
  }
`;

export const profile = css`
  display: grid;
  grid-template-columns: 2fr 4fr 2fr;
  align-items: center;
  grid-gap: 2rem;
  padding: 1rem;
  line-height: 1.8;
  margin-bottom: 1rem;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    text-align: center;
    ul {
      display: none;
    }
  }
`;

export const profileGrid = css`
  display: grid;
  grid-template-areas:
    'top top'
    'about about'
    'exp edu'
    'github github';
  grid-gap: 1rem;
`;

export const profileTop = css`
  grid-area: top;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  > img {
    width: 250px;
    border-radius: 50%;
    ${my1}
  }
  > h1 {
    ${large}
  }
  > .lead {
    ${lead}
  }
`;

export const profileAbout = css`
  grid-area: about;
  text-align: center;
  > .skills {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`;

export const profileExperience = css`
  grid-area: exp;
  ${whiteStyle};
  ${p2}
  h2 {
    margin-bottom: 1rem;
    ${textPrimary}
  }
  h3 {
    ${textDark}
  }
  > div {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: #ccc 1px dotted;
  }
  > div:last-child {
    border: 0;
  }
  p {
    margin: 0.5rem 0;
  }
`;

export const profileEducation = css`
  grid-area: edu;
  ${whiteStyle};
  ${p2}
  h2 {
    margin-bottom: 1rem;
    ${textPrimary}
  }
  h3 {
    ${textDark}
  }
  > div {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: #ccc 1px dotted;
  }
  > div:last-child {
    border: 0;
  }
  p {
    margin: 0.5rem 0;
  }
`;