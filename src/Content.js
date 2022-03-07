import React from 'react';
import { Route } from 'react-router-dom';
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
        <Route path="/Album/:id" component={ Album } exact />
        <Route path="/Favorites" component={ Favorites } exact />
        <Route path="/" component={ Login } exact />
        <Route path="*" component={ NotFound } exact />
        <Route path="/Profile" component={ Profile } exact />
        <Route path="/Profile/Edit" component={ ProfileEdit } exact />
        <Route path="/Search" component={ Search } exact />
      </main>
    );
  }
}

export default Content;
