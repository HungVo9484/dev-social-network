import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router';

const PrivateRoute = ({
  component: Component,
  ...rest
}) => {
  const isAuth = useSelector(
    (state) => state.auth.isAuthenticated
  );
  const loading = useSelector(
    (state) => state.auth.loading
  );

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuth && !loading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
