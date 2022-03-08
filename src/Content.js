import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class Content extends React.Component {
  render() {
    return (
      <main className="Content">
        <Switch>
          <Route path="/profile/edit" component={ ProfileEdit } exact />
          <Route path="/Album/:id" component={ Album } />
          <Route path="/Favorites" component={ Favorites } />
          <Route path="/profile" component={ Profile } exact />
          <Route path="/Search" component={ Search } />
          <Route path="/" component={ Login } exact />
          <Route path="*" component={ NotFound } />
        </Switch>
      </main>
    );
  }
}

export default Content;
