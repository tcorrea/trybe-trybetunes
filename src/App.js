import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" exact render={ (props) => <Login { ...props } /> } />
        <Route path="/search" component={ Search } />
        <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />
        <Route path="/favorites" component={ Favorites } />
        <Route path="/profile" component={ Profile } exact />
        <Route path="/profile/edit" component={ ProfileEdit } exact />
        <Route path="*" component={ NotFound } />
      </BrowserRouter>
    );
  }
}

export default App;
