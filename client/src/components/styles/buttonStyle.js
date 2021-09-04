import { css } from 'styled-components';

export const btn = css`
  display: inline-block;
  padding: 0.4rem 1.3rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  margin-right: 0.5rem;
  transition: opacity 0.2s ease-in;
  outline: none;
  font: inherit;
  &:hover {
    opacity: 0.8;
  }
`;
