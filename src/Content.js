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
        <Route path="/Album/:id" component={ Album } />
        <Route path="/Favorites" component={ Favorites } />
        <Route path="/" component={ Login } />
        <Route path="*" component={ NotFound } />
        <Route path="/Profile" component={ Profile } />
        <Route path="/ProfileEdit" component={ ProfileEdit } />
        <Route path="/Search" component={ Search } />
      </main>
    );
  }
}

export default Content;
