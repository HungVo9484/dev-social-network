import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { logout } from '../../actions/auth';
import { darkStyle } from '../styles/utilsStyle';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem 2rem;
  position: fixed;
  z-index: 1;
  width: 100%;
  top: 0;
  border-bottom: solid 1px ${(p) => p.theme.primaryColor};
  opacity: 0.9;
  ${darkStyle}
  @media (max-width: 700px) {
    display: block;
    text-align: center;
  }
  h1 {
    @media (max-width: 700px) {
      margin-bottom: 1rem;
    }
  }
  ul {
    display: flex;
    @media (max-width: 700px) {
      text-align: center;
      justify-content: center;
    }
  }
  a {
    color: #fff;
    padding: 0.45rem;
    margin: 0 0.25rem;
    text-decoration: none;
    &:hover {
      color: ${(p) => p.theme.primaryColor};
    }
  }
`;

const NavLink = styled(Link)`
  color: #fff;
  padding: 0.45rem;
  margin: 0 0.25rem;
  text-decoration: none;
  &:hover {
    color: ${(p) => p.theme.primaryColor};
  }
`;

const HideSM = styled.span`
  @media (max-width: 700px) {
    display: none;
  }
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );
  const loading = useSelector(
    (state) => state.auth.loading
  );

  const logoutHandler = () => {
    dispatch(logout());
  };
  const authLinks = (
    <ul>
      <li>
        <NavLink to='/profiles'>
          Developers
        </NavLink>
      </li>
      <li>
        <NavLink to='/posts'>
          Posts
        </NavLink>
      </li>
      <li>
        |
        <NavLink to='/dashboard'>
          <i className='fas fa-user' />{' '}
          <HideSM>Dashboard</HideSM>
        </NavLink>
      </li>
      <li>
        <a href='#!' onClick={logoutHandler}>
          <i className='fas fa-sign-out-alt' />{' '}
          <HideSM>Logout</HideSM>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <NavLink to='/profiles'>Developers</NavLink>
      </li>
      <li>
        <NavLink to='/register'>Register</NavLink>
      </li>
      <li>
        <NavLink to='/login'>Login</NavLink>
      </li>
    </ul>
  );

  return (
    <Nav>
      <h1>
        <NavLink to='/'>
          <i className='fas fa-code'></i> Dev Social Network
        </NavLink>
      </h1>
      {loading
        ? null
        : isAuthenticated
        ? authLinks
        : guestLinks}
    </Nav>
  );
};

export default Navbar;
