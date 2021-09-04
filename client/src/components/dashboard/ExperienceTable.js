import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Moment from 'react-moment';

import { btn } from '../styles/buttonStyle';
import { my2 } from '../styles/margin';
import { dangerStyle } from '../styles/utilsStyle';
import { deleteExperience } from '../../actions/profile';

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

const ExperienceTable = () => {
  const dispatch = useDispatch();
  const experience = useSelector(
    (state) => state.profile.profile.experience
  );

  const deleteExpHandler = (id) => {
    console.log(id);
    dispatch(deleteExperience(id));
  };
  return (
    <Fragment>
      <H2>Experience Credentials</H2>
      <TableContainer>
        <THead>
          <TR>
            <TH>Company</TH>
            <THhideSM>Title</THhideSM>
            <THhideSM>Years</THhideSM>
            <TH></TH>
          </TR>
        </THead>
        <TBody>
          {experience.map((exp) => (
            <TR key={exp._id}>
              <TD>{exp.company}</TD>
              <TDhideSM>{exp.title}</TDhideSM>
              <TDhideSM>
                <Moment format='MM-DD-YYYY'>
                  {exp.from}
                </Moment>{' '}
                -{' '}
                {exp.to ? (
                  <Moment format='YYYY/MM/DD'>
                    {exp.from}
                  </Moment>
                ) : (
                  'Now'
                )}
              </TDhideSM>
              <TD>
                <Button
                  onClick={() => deleteExpHandler(exp._id)}
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

export default ExperienceTable;
