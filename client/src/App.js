import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import lightTheme from './theme/light';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Container from './components/layout/Container';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import Alert from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Posts from './components/posts/Posts';
import Developers from './components/developers/Developers';
import Profile from './components/profiles/Profile';
import Post from './components/posts/Post';

const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  };
  body{
    font-family: 'Raleway', sans-serif;
    font-size: 1rem;
    line-height: 1.6;
    background-color: #fff;
    color: #333;
  };
  ul{
    list-style: none;
  };
  img{
    width: 100%;
  };
`;

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <Navbar />
      <Switch>
        <Route path='/' exact>
          <Landing />
        </Route>
        <Container>
          <Alert />
          <Route path='/register' exact>
            <Register />
          </Route>
          <Route path='/login' exact>
            <Login />
          </Route>
          <Route path='/profiles' exact>
            <Developers />
          </Route>
          <Route path='/profile/:id' exact>
            <Profile />
          </Route>
          <PrivateRoute
            path='/dashboard'
            exact
            component={Dashboard}
          />
          <PrivateRoute
            path='/create-profile'
            exact
            component={CreateProfile}
          />
          <PrivateRoute
            path='/edit-profile'
            exact
            component={EditProfile}
          />
          <PrivateRoute
            path='/add-experience'
            exact
            component={AddExperience}
          />
          <PrivateRoute
            path='/add-education'
            exact
            component={AddEducation}
          />
          <PrivateRoute path='/posts' exact component={Posts} />
          <PrivateRoute
            path='/post/:post_id'
            exact
            component={Post}
          />
        </Container>
      </Switch>
    </ThemeProvider>
  );
};

export default App;
