import { Fragment } from "react";
import styled from "styled-components";
import { large, textPrimary } from "../styles/textStyle";

const H1 = styled.h1`
  ${large}
  ${textPrimary}
`;

const P = styled.p`
  ${large}
`;

const NotFound = () => {
  return (
    <Fragment>
      <H1>
        <i className='fas fa-exclamation-triangle' /> Page Not Found
      </H1>
      <P>Sorry, this page does not exist</P>
    </Fragment>
   );
}
 
export default NotFound;