import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Moment from 'react-moment';

import { btn } from '../styles/buttonStyle';
import { my2 } from '../styles/margin';
import { dangerStyle } from '../styles/utilsStyle';
import { deleteEducation } from '../../actions/profile';

const H2 = styled.h2`
  ${my2}
`;

const TableContainer = styled.table``;

const THead = styled.thead`
  padding: 1rem;
  text-align: left;
`;

const TR = styled.tr``;

const TH = styled.th`
  padding: 1rem;
  text-align: left;
  background: ${(p) => p.theme.lightColor};
`;

const THhideSM = styled.th`
  padding: 1rem;
  text-align: left;
  background: ${(p) => p.theme.lightColor};
  @media (max-width: 700px) {
    display: none;
  }
`;

const TBody = styled.tbody``;

const TD = styled.td`
  padding: 1rem;
  text-align: left;
`;

const TDhideSM = styled.td`
  padding: 1rem;
  text-align: left;
  @media (max-width: 700px) {
    display: none;
  }
`;

const Button = styled.button`
  ${btn}
  ${dangerStyle}
`;

const EducationTable = () => {
  const dispatch = useDispatch();
  const education = useSelector(
    (state) => state.profile.profile.education
  );

  const deleteEduHandler = (id) => {
    console.log(id);
    dispatch(deleteEducation(id));
  };
  return (
    <Fragment>
      <H2>Education Credentials</H2>
      <TableContainer>
        <THead>
          <TR>
            <TH>School</TH>
            <THhideSM>Degree</THhideSM>
            <THhideSM>Years</THhideSM>
            <TH />
          </TR>
        </THead>
        <TBody>
          {education.map((edu) => (
            <TR key={edu._id}>
              <TD>{edu.school}</TD>
              <TDhideSM>{edu.degree}</TDhideSM>
              <TDhideSM>
                <Moment format='MM-DD-YYYY'>
                  {edu.from}
                </Moment>{' '}
                -{' '}
                {edu.to ? (
                  <Moment format='YYYY/MM/DD'>
                    {edu.to}
                  </Moment>
                ) : (
                  'Now'
                )}
              </TDhideSM>
              <TD>
                <Button
                  onClick={() => deleteEduHandler(edu._id)}
                >
                  Delete
                </Button>
              </TD>
            </TR>
          ))}
        </TBody>
      </TableContainer>
    </Fragment>
  );
};

export default EducationTable;
