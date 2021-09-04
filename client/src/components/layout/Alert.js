import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import * as typeAlert from '../styles/utilsStyle';

const AlertCard = styled.div`
  ${typeAlert.alert}
  ${(p) => typeAlert[p.type]}
`;

const Alert = () => {
  const alerts = useSelector((state) => state.alert);
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <AlertCard key={alert.id} type={alert.alertType}>
        {alert.msg}
      </AlertCard>
    ))
  );
};

export default Alert;
