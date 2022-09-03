import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Login from './components/Login';
import Search from './components/Search';
import Album from './components/Album';
import Favorites from './components/Favorites';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import NotFound from './components/NotFound';

class App extends React.Component {
  state = {
    userName: '',
  };

  handlerChangeLogin = async (event) => {
    const { value } = event.target;
    console.log(value);
    this.setState({ userName: value });
  };

  render() {
    const { userName } = this.state;
    return (
      <div>
        <p>TrybeTunes</p>
        <Router>
          <div>
            <Switch>
              <Route path="/search" component={ Search } />
              <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />
              <Route path="/favorites" component={ Favorites } />
              <Route path="/profile/edit" component={ ProfileEdit } />
              <Route path="/profile/" component={ Profile } />
              <Route
                exact
                path="/"
                render={ () => (<Login
                  userName={ userName }
                  handlerChange={ this.handlerChangeLogin }
                />) }
              />
              <Route path="*" component={ NotFound } />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
