import { css } from 'styled-components';

export const xLarge = css`
  font-size: 4rem;
  line-height: 1.2;
  margin-bottom: 1rem;
  @media (max-width: 700px) {
    font-size: 3rem;
  }

`;

export const large = css`
  font-size: 3rem;
  line-height: 1.2;
  margin-bottom: 1rem;
  @media (max-width: 700px) {
    font-size: 2rem;
  }
`;

export const lead = css`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  @media (max-width: 700px) {
    font-size: 1rem;
  }
`;

export const textCenter = css`
  text-align: center;
`;

export const textPrimary = css`
  color: ${p => p.theme.primaryColor}
`;

export const textDark = css`
  color: ${p => p.theme.darkColor}
`;

export const btnFont = css`
  font: inherit;
`;




